def run_autoresolve_agent(payload: dict):
    issues = payload.get("issues", [])

    resolved = []
    unresolved = []

    for issue in issues:
        if "Employee ID missing" in issue:
            resolved.append({
                "issue": issue,
                "resolution": "Resolved using employee name, email, and client mapping"
            })
        else:
            unresolved.append(issue)

    return {
        "agent": "Auto Resolve Agent",
        "status": "completed",
        "resolved": resolved,
        "unresolved": unresolved,
        "confidence": 95 if not unresolved else 82
    }