from pydantic import BaseModel

class Payroll(BaseModel):
    employee_id: str
    working_days: int = 0
    overtime_hours: int = 0
    net_pay: float = 0
    currency: str = "AED"