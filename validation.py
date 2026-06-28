from fastapi import APIRouter
from app.agents.validation_agent import run_validation_agent

router = APIRouter()

@router.post("/validate")
def validate(payload: dict):
    return run_validation_agent(payload)