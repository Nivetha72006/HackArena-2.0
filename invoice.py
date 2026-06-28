from pydantic import BaseModel

class Invoice(BaseModel):
    invoice_id: str
    employee_id: str | None = None
    amount: float = 0
    currency: str = "AED"
    status: str = "draft"