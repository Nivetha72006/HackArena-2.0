def run_approval_agent(payload: dict):
    trust_score = payload.get("trust_score", 96)
    fraud_risk = payload.get("fraud_risk", "LOW")

    if trust_score >= 90 and fraud_risk == "LOW":
        decision = "Auto Approved"
        route = "Direct Dispatch"
    elif trust_score >= 75:
        decision = "Manager Review Required"
        route = "Manager Approval Queue"
    else:
        decision = "Finance Review Required"
        route = "Finance Team Queue"

    return {
        "agent": "Approval Agent",
        "decision": decision,
        "route": route,
        "status": "completed"
    }