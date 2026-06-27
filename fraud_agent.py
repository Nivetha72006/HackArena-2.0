def run_fraud_agent(payload: dict):
    data = payload.get("extracted_json", payload)

    flags = []
    score = 10

    if data.get("working_days", 24) > 26:
        flags.append("Impossible working days detected")
        score += 40

    if data.get("overtime_hours", 8) > 20:
        flags.append("Abnormal overtime detected")
        score += 30

    if data.get("reimbursement", 1200) > 5000:
        flags.append("High reimbursement claim")
        score += 20

    risk = "LOW" if score < 30 else "MEDIUM" if score < 60 else "HIGH"

    return {
        "agent": "Fraud Detection Agent",
        "fraud_risk": risk,
        "risk_score": score,
        "flags": flags,
        "confidence": 91
    }