from fastapi import APIRouter
from app.agents.invoice_agent import run_invoice_agent

router = APIRouter()

@router.post("/invoice")
def invoice(payload: dict):
    return run_invoice_agent(payload)