# main.py
from fastapi import FastAPI, File, UploadFile, HTTPException, Depends
from fastapi.responses import StreamingResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any
import uuid
from datetime import datetime

from models import ChatMessage, ChatRequest, ChatResponse, SourceChunk, MetricsResponse
from rag import rag_system

app = FastAPI(
    title="RAG Chatbot API",
    description="Retrieval-Augmented Generation with streaming, citations, and evaluation",
    version="1.0.0"
)

# Enable CORS for frontend (Next.js, React, etc.)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Track active sessions (in-memory)
active_sessions: Dict[str, str] = {}


@app.post("/upload", response_model=dict)
async def upload_documents(
    files: List[UploadFile] = File(..., description="PDF or TXT files")
):
    """
    Upload PDF/TXT files → extract text → chunk → embed → store in Chroma
    """
    if not files:
        raise HTTPException(400, "No files provided")

    session_id = str(uuid.uuid4())
    processed = 0

    for file in files:
        if file.content_type not in ["application/pdf", "text/plain"]:
            continue

        content = await file.read()
        if file.filename.endswith(".pdf"):
            text = rag_system.extract_text_from_pdf(content)
        else:
            text = content.decode("utf-8")

        rag_system.add_document(text, metadata={"source": file.filename})
        processed += 1

    active_sessions[session_id] = session_id
    return {
        "session_id": session_id,
        "message": f"Successfully processed {processed} files",
        "chunks_added": rag_system.get_total_chunks()
    }


@app.post("/chat", response_class=StreamingResponse)
async def chat(request: ChatRequest):
    """
    Streaming chat endpoint with retrieval + citation-aware generation
    """
    if request.session_id not in active_sessions:
        # Allow chat without upload (for demo)
        pass

    def event_stream():
        retrieved = rag_system.retrieve(
            query=request.messages[-1].content,
            k=request.top_k or 5
        )

        # Store sources for /sources endpoint
        rag_system.last_retrieved = retrieved

        prompt = rag_system.build_prompt(request.messages, retrieved)

        start_time = datetime.now()
        for token in rag_system.stream_generate(prompt, temperature=request.temperature):
            latency_ms = (datetime.now() - start_time).total_seconds() * 1000
            yield f"data: {token}\n\n"
            if latency_ms > 100:  # rough latency tracking
                rag_system.last_latency = latency_ms

        yield "data: [DONE]\n\n"

    return StreamingResponse(event_stream(), media_type="text/event-stream")


@app.get("/sources", response_model=List[SourceChunk])
async def get_sources():
    """
    Return last retrieved chunks for citation panel in UI
    """
    if not hasattr(rag_system, "last_retrieved") or not rag_system.last_retrieved:
        return []
    return rag_system.last_retrieved


@app.get("/metrics", response_model=MetricsResponse)
async def get_metrics():
    """
    Mock RAG evaluation metrics
    """
    return MetricsResponse(
        accuracy=0.96,
        recall_at_5=0.94,
        average_latency_ms=rag_system.last_latency or 180.0,
        citation_recall=0.91,
        total_chunks=rag_system.get_total_chunks(),
        timestamp=datetime.now().isoformat()
    )


@app.delete("/clear")
async def clear_vector_db():
    """
    Reset in-memory Chroma DB and session
    """
    rag_system.clear_db()
    active_sessions.clear()
    return {"message": "Vector DB cleared"}


@app.get("/")
async def root():
    return {"message": "RAG Chatbot API is running", "docs": "/docs"}