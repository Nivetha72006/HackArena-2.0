from fastapi import APIRouter

router = APIRouter()

@router.post("/assistant")
def assistant(payload: dict):
    query = payload.get("query", "")

    return {
        "answer": f"InvoiceOS AI Assistant received your query: {query}",
        "suggestion": "Check validation, fraud risk, and approval status before dispatch."
    }