import os
import uuid
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4

def run_invoice_agent(payload: dict):
    data = payload.get("extracted_json", payload)

    os.makedirs("generated_invoices", exist_ok=True)

    invoice_id = "INV-" + str(uuid.uuid4())[:8].upper()
    file_path = f"generated_invoices/{invoice_id}.pdf"

    employee = data.get("employee_name", "Ravi Menon")
    emp_id = data.get("employee_id", "EMP10136")
    client = data.get("client_name", "Meridian Logistics")
    month = data.get("month", "June 2026")
    working_days = data.get("working_days", 24)
    overtime = data.get("overtime_hours", 8)
    reimbursement = data.get("reimbursement", 1200)

    base_amount = working_days * 300
    ot_amount = overtime * 50
    total = base_amount + ot_amount + reimbursement

    c = canvas.Canvas(file_path, pagesize=A4)
    c.setFont("Helvetica-Bold", 20)
    c.drawString(50, 800, "InvoiceOS Generated Invoice")

    c.setFont("Helvetica", 12)
    c.drawString(50, 750, f"Invoice ID: {invoice_id}")
    c.drawString(50, 725, f"Employee: {employee}")
    c.drawString(50, 700, f"Employee ID: {emp_id}")
    c.drawString(50, 675, f"Client: {client}")
    c.drawString(50, 650, f"Month: {month}")
    c.drawString(50, 625, f"Working Days: {working_days}")
    c.drawString(50, 600, f"Overtime Hours: {overtime}")
    c.drawString(50, 575, f"Reimbursement: AED {reimbursement}")
    c.drawString(50, 530, f"Total Amount: AED {total}")
    c.save()

    return {
        "agent": "Invoice Generator Agent",
        "status": "generated",
        "invoice_id": invoice_id,
        "invoice_file": file_path,
        "amount": total,
        "currency": "AED"
    }