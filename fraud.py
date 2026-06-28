from fastapi import APIRouter
from app.agents.fraud_agent import run_fraud_agent

router = APIRouter()

@router.post("/fraud")
def fraud(payload: dict):
    return run_fraud_agent(payload)