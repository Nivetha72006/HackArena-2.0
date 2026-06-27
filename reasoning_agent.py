def run_reasoning_agent(payload: dict):
    issues = payload.get("issues", [])

    if issues:
        decision = "Needs Human Review"
        explanation = "Invoice needs review because: " + ", ".join(issues)
        trust_score = 74
    else:
        decision = "Safe to Proceed"
        explanation = "Employee, client, payroll, working days, and overtime rules passed successfully."
        trust_score = 96

    return {
        "agent": "Reasoning Agent",
        "decision": decision,
        "summary": "AI reviewed the extracted timesheet and validation results.",
        "explanation": explanation,
        "trust_score": trust_score,
        "confidence": trust_score
    }