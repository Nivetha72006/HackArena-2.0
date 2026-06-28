from fastapi import APIRouter

from app.api.routes.upload import router as upload_router
from app.api.routes.intake import router as intake_router
from app.api.routes.validation import router as validation_router
from app.api.routes.reasoning import router as reasoning_router
from app.api.routes.autoresolve import router as autoresolve_router
from app.api.routes.fraud import router as fraud_router
from app.api.routes.invoice import router as invoice_router
from app.api.routes.approval import router as approval_router
from app.api.routes.analytics import router as analytics_router
from app.api.routes.assistant import router as assistant_router

from app.agents.intake_agent import run_intake_agent
from app.agents.validation_agent import run_validation_agent
from app.agents.reasoning_agent import run_reasoning_agent
from app.agents.autoresolve_agent import run_autoresolve_agent
from app.agents.fraud_agent import run_fraud_agent
from app.agents.invoice_agent import run_invoice_agent
from app.agents.approval_agent import run_approval_agent

router = APIRouter()

router.include_router(upload_router)
router.include_router(intake_router)
router.include_router(validation_router)
router.include_router(reasoning_router)
router.include_router(autoresolve_router)
router.include_router(fraud_router)
router.include_router(invoice_router)
router.include_router(approval_router)
router.include_router(analytics_router)
router.include_router(assistant_router)

@router.post("/process")
def process(payload: dict):
    intake_result = run_intake_agent(payload)
    extracted_json = intake_result.get("extracted_json", {})

    validation_result = run_validation_agent({"extracted_json": extracted_json})
    reasoning_result = run_reasoning_agent({"issues": validation_result.get("issues", [])})
    autoresolve_result = run_autoresolve_agent({"issues": validation_result.get("issues", [])})
    fraud_result = run_fraud_agent({"extracted_json": extracted_json})
    invoice_result = run_invoice_agent({"extracted_json": extracted_json})
    approval_result = run_approval_agent({
        "trust_score": reasoning_result.get("trust_score", 96),
        "fraud_risk": fraud_result.get("fraud_risk", "LOW")
    })

    return {
        "status": "completed",
        "workflow": {
            "intake": intake_result,
            "validation": validation_result,
            "reasoning": reasoning_result,
            "autoresolve": autoresolve_result,
            "fraud": fraud_result,
            "invoice": invoice_result,
            "approval": approval_result
        }
    }