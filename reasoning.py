from fastapi import APIRouter
from app.agents.reasoning_agent import run_reasoning_agent

router = APIRouter()

@router.post("/reason")
def reason(payload: dict):
    return run_reasoning_agent(payload)