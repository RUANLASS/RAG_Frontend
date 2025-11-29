# rag.py
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.schema import Document
import fitz  # PyMuPDF
from typing import List
import os

class RAGSystem:
    def __init__(self):
        self.embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
        self.vectorstore = Chroma(embedding_function=self.embeddings, persist_directory=None)
        self.text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        self.last_retrieved = []
        self.last_latency = 0.0

    def extract_text_from_pdf(self, pdf_bytes: bytes) -> str:
        doc = fitz.open(stream=pdf_bytes, filetype="pdf")
        text = ""
        for page in doc:
            text += page.get_text()
        return text

    def add_document(self, text: str, metadata: dict):
        chunks = self.text_splitter.split_text(text)
        docs = [Document(page_content=chunk, metadata={**metadata, "chunk_id": i}) 
                for i, chunk in enumerate(chunks)]
        self.vectorstore.add_documents(docs)

    def retrieve(self, query: str, k: int = 5) -> List[SourceChunk]:
        results = self.vectorstore.similarity_search_with_score(query, k=k)
        chunks = []
        for doc, score in results:
            chunks.append(SourceChunk(
                content=doc.page_content,
                metadata=doc.metadata,
                score=float(score)
            ))
        self.last_retrieved = chunks
        return chunks

    def build_prompt(self, messages: List[dict], sources: List[SourceChunk]) -> str:
        context = "\n\n".join([
            f"[Source {i+1} — {s.metadata.get('source', 'Unknown')}]\n{s.content}"
            for i, s in enumerate(sources)
        ])

        system_prompt = f"""You are a helpful assistant. Use the following context to answer accurately.
Only reference information from the provided sources. If unsure, say "I don't know".

Context:
{context}

Answer in markdown. Include citations like [1], [2] at the end of relevant sentences."""

        user_message = messages[-1].content
        return f"{system_prompt}\n\nUser: {user_message}\nAssistant:"

    def stream_generate(self, prompt: str, temperature: float = 0.7):
        """
        Replace this with your actual LLM (OpenAI, Ollama, vLLM, etc.)
        Example with OpenAI:
        """
        # MOCK STREAMING RESPONSE (replace with real LLM)
        full_response = (
            "This is a streamed response from the RAG system. "
            "We retrieved 5 relevant chunks and used them to generate this answer. "
            "Here are the key points from the documents [1][3]:\n\n"
            "- The model uses all-MiniLM-L6-v2 embeddings\n"
            "- Chunk size is 1000 with 200 overlap\n"
            "- Top-5 retrieval with cosine similarity [2]\n\n"
            "This ensures high recall and citation accuracy."
        )

        words = full_response.split()
        for word in words:
            yield word + " "
        # In production: use openai.AsyncClient().chat.completions.create(..., stream=True)

    def get_total_chunks(self) -> int:
        return len(self.vectorstore.get()["ids"])

    def clear_db(self):
        self.vectorstore = Chroma(embedding_function=self.embeddings)
        self.last_retrieved = []


# Global instance
rag_system = RAGSystem()