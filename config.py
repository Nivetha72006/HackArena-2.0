import os
from dotenv import load_dotenv

load_dotenv()

APP_NAME = os.getenv("APP_NAME", "InvoiceOS Backend")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

UPLOAD_DIR = "uploads"
INVOICE_DIR = "generated_invoices"