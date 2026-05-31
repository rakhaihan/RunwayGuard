from app.utils.risk import assess_risk_and_status
from app.schemas.runway import RiskLevel, RunwayStatus


def test_clear_runway_when_no_alerts():
    risk, status, _ = assess_risk_and_status(0, 0.0, 0)
    assert risk == RiskLevel.LOW
    assert status == RunwayStatus.CLEAR


def test_critical_risk_on_high_confidence():
    risk, status, _ = assess_risk_and_status(1, 0.9, 1)
    assert risk == RiskLevel.CRITICAL
    assert status == RunwayStatus.UNSAFE
