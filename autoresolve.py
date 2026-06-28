from fastapi import APIRouter
from app.agents.autoresolve_agent import run_autoresolve_agent

router = APIRouter()

@router.post("/autoresolve")
def autoresolve(payload: dict):
    return run_autoresolve_agent(payload)