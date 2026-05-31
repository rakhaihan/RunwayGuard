from app.schemas.runway import RiskLevel, RunwayStatus


def assess_risk_and_status(
    alert_count: int,
    max_confidence: float,
    detection_count: int,
) -> tuple[RiskLevel, RunwayStatus, str]:
    """Map detections to operational risk level and runway status."""
    if alert_count == 0:
        return (
            RiskLevel.LOW,
            RunwayStatus.CLEAR,
            "No suspected FOD above confidence threshold. Runway appears clear.",
        )

    if max_confidence >= 0.85 and alert_count >= 1:
        return (
            RiskLevel.CRITICAL,
            RunwayStatus.UNSAFE,
            "High-confidence FOD detected. Runway marked unsafe for operations.",
        )

    if alert_count >= 4 or max_confidence >= 0.75:
        return (
            RiskLevel.HIGH,
            RunwayStatus.CAUTION,
            "Multiple or strong FOD signatures detected. Caution advised.",
        )

    if alert_count >= 2 or max_confidence >= 0.6:
        return (
            RiskLevel.MEDIUM,
            RunwayStatus.ADVISORY,
            "Possible FOD present. Visual verification recommended.",
        )

    return (
        RiskLevel.LOW,
        RunwayStatus.ADVISORY if detection_count > 0 else RunwayStatus.CLEAR,
        "Minor signatures detected. Continue monitoring.",
    )
