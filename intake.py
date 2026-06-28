from fastapi import APIRouter
from app.agents.intake_agent import run_intake_agent

router = APIRouter()

@router.post("/intake")
def intake(payload: dict):
    return run_intake_agent(payload)