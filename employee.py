from pydantic import BaseModel

class EmployeeSchema(BaseModel):
    employee_name: str
    employee_id: str
    client_name: str | None = None