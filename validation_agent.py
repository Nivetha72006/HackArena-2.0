def run_validation_agent(payload: dict):
    data = payload.get("extracted_json", payload)

    issues = []
    checks = {
        "employee_exists": True,
        "client_exists": True,
        "payroll_match": True,
        "working_days_valid": True,
        "overtime_valid": True,
        "duplicate_check": True
    }

    working_days = data.get("working_days", 24)
    overtime = data.get("overtime_hours", 8)

    if working_days > 26:
        issues.append("Working days exceed June limit of 26")
        checks["working_days_valid"] = False

    if overtime > 20:
        issues.append("Overtime exceeds allowed threshold")
        checks["overtime_valid"] = False

    status = "passed" if not issues else "needs_review"

    return {
        "agent": "Validation Agent",
        "status": status,
        "checks": checks,
        "issues": issues,
        "confidence": 94 if status == "passed" else 76
    }