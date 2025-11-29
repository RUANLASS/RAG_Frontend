# models.py
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime


class ChatMessage(BaseModel):
    role: str = Field(..., examples=["user", "assistant"])
    content: str


class ChatRequest(BaseModel):
    session_id: Optional[str] = None
    messages: List[ChatMessage]
    temperature: float = Field(0.7, ge=0.0, le=2.0)
    top_k: int = Field(5, ge=1, le=20)


class SourceChunk(BaseModel):
    content: str
    metadata: dict
    score: float


class MetricsResponse(BaseModel):
    accuracy: float
    recall_at_5: float
    average_latency_ms: float
    citation_recall: float
    total_chunks: int
    timestamp: str