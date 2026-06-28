from pydantic import BaseModel

class ApprovalSchema(BaseModel):
    trust_score: int
    fraud_risk: str