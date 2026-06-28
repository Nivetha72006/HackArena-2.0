# 🚀 InvoiceOS – Autonomous Multi-Agent Payroll & Invoice Automation

InvoiceOS is an AI-powered payroll and invoice automation platform that uses a multi-agent architecture to automate the complete workflow from document upload to invoice dispatch.

The system extracts payroll information from uploaded documents, validates business rules, detects fraud, generates invoices, provides AI reasoning, and simulates approval and dispatch workflows through an intuitive dashboard.

---

# 📌 Features

### 📄 Multi-Format Document Upload
- Excel (.xlsx, .xls, .csv)
- PDF
- Images (.png, .jpg, .jpeg)
- Email (.eml, .msg)

---

### 🤖 Autonomous AI Agent Pipeline

The application consists of eight independent AI agents.

| Agent | Responsibility |
|--------|----------------|
| Intake Agent | Detect document type and extract payroll information |
| Validation Agent | Validate employee and payroll information |
| Reasoning Agent | Explain AI decisions with confidence score |
| Auto Resolve Agent | Automatically resolve minor payroll issues |
| Fraud Detection Agent | Detect duplicate claims and suspicious payroll |
| Invoice Generator Agent | Generate payroll invoice |
| Approval Agent | Auto approve or route for approval |
| Dispatch Agent | Dispatch invoice through client portal |

---

# ⚙️ Current Workflow

```
Upload Document
        │
        ▼
Intake Agent
        │
        ▼
Validation Agent
        │
        ▼
Reasoning Agent
        │
        ▼
Auto Resolve Agent
        │
        ▼
Fraud Detection Agent
        │
        ▼
Invoice Generator Agent
        │
        ▼
Approval Agent
        │
        ▼
Dispatch Center
```

---

# 📂 Implemented Features

## Upload Module

✔ Excel Upload

✔ PDF Upload

✔ Image Upload

✔ Email Upload

✔ File Type Detection

✔ Upload Progress

---

## Intake Agent

Implemented

- Detect document type
- Read uploaded Excel files
- Extract employee details
- Extract payroll details
- Read multiple sheets
- Confidence Score
- Status tracking

Extracted Fields

- Employee Name
- Employee ID
- Email
- Client Name
- Client Code
- Department
- Job Title
- Payroll Month
- Working Days
- Overtime Hours
- OT Amount
- Net Pay

---

## Validation Agent

Current Validation Rules

- Employee Exists
- Client Exists
- Payroll Match
- Working Days Validation
- Overtime Validation
- Duplicate Check

Returns

- Validation Status
- Confidence Score
- Issues List

---

## Reasoning Agent

Provides

- AI Decision
- Explanation
- Summary
- Trust Score
- Confidence

Example

```
Decision:
Safe to Proceed

Reason:
Employee verified
Payroll matched
No duplicate entries detected.
```

---

## Auto Resolve Agent

Automatically resolves

- Minor formatting issues
- Missing values (supported cases)
- Retry workflow
- Escalation support

---

## Fraud Detection Agent

Checks

- Duplicate Claims
- Impossible Hours
- Ghost Employee
- Fraud Risk Score

Returns

- LOW
- MEDIUM
- HIGH

Fraud Risk

Confidence Score

---

## Invoice Generator

Currently Generates

- Invoice ID
- Employee Information
- Payroll Details
- Total Amount
- Currency
- Invoice Status

Supports

- PDF
- Excel
- Email Draft
- ERP Format

---

## Approval Agent

Current Workflow

Validation Passed

↓

Fraud Risk Checked

↓

Auto Approved

or

Manual Review

---

## Dispatch Center

Current Features

- Delivery Status
- Email Dispatch UI
- Portal Delivery UI
- Dispatch Timeline

---

## Dashboard

Displays

- Today's Invoices
- Pending Invoices
- Revenue
- AI Accuracy
- Fraud Alerts
- Weekly Revenue Graph
- Recent Activity

---

## Analytics

Shows

- Revenue Trend
- Processing Time
- Fraud Trend
- AI Accuracy
- Live Backend Metrics

---

## Client Portal

Contains

- Upload Timesheet
- Track Invoice
- Approve Invoice
- Raise Query
- Download Invoice

---

## Admin Settings

Available Modules

- Clients
- Employees
- Payroll
- Business Rules
- Prompt Settings
- LLM Settings

---

# 📋 Business Rules Implemented

Employee Validation

- Employee ID must exist
- Client must exist
- Payroll record must match

Payroll Rules

- Working days validation
- Overtime validation

Fraud Rules

- Duplicate claim detection
- Ghost employee detection

Invoice Rules

- Generate invoice only after validation

Approval Rules

- Auto approval after successful validation

Dispatch Rules

- Dispatch only after invoice generation

---

# 🛠 Tech Stack

## Frontend

- React.js
- Tailwind CSS
- Axios
- Lucide React

---

## Backend

- FastAPI
- Python
- Pandas
- Pydantic
- Uvicorn

---

## Data Processing

- Excel Parsing
- Rule Engine
- JSON Workflow
- Confidence Scoring

---

# 📁 Project Structure

```
InvoiceOS
│
├── backend
│   ├── agents
│   ├── api
│   ├── database
│   ├── models
│   ├── routes
│   ├── schemas
│   ├── uploads
│   └── generated_invoices
│
├── frontend
│   ├── src
│   ├── assets
│   ├── components
│   └── api.js
│
└── README.md
```

---

# 🚀 Installation

## Backend

```bash
cd backend

pip install -r requirements.txt

python -m uvicorn app.main:app --reload
```

Backend runs at

```
http://127.0.0.1:8000
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

# 📷 Supported Input Formats

- Excel
- CSV
- PDF
- PNG
- JPG
- JPEG
- Email

---

# ⚠ Current Limitations

- OCR for PDF/Image is placeholder (planned)
- Email dispatch is simulated
- Analytics are partially dynamic
- Fraud detection is rule-based
- Some dashboard modules are prototype implementations

---

# 🔮 Future Enhancements

- OCR Integration
- LLM-based document understanding
- Real Email Service
- ERP Integration
- SAP Integration
- Cloud Deployment
- Database Persistence
- Advanced Fraud Detection
- AI Chat Assistant
- Multi-company Support

---
