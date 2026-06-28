from fastapi import APIRouter
from app.agents.approval_agent import run_approval_agent

router = APIRouter()

@router.post("/approval")
def approval(payload: dict):
    return run_approval_agent(payload)