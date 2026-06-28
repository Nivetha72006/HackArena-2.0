from fastapi import APIRouter

router = APIRouter()

@router.get("/analytics")
def analytics():
    return {
        "today_invoices": 128,
        "pending": 34,
        "revenue": "AED 18.4L",
        "ai_accuracy": "96.8%",
        "fraud_alerts": 3,
        "processing_time": "2.4 minutes"
    }