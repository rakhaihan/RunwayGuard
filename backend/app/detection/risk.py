from app.detection.models import FodObject


def compute_risk_score(objects: list[FodObject]) -> float:
    """
    Aggregate runway risk score in [0, 1] from detected objects.

    Weights confidence and relative object size; scales with object count.
    """
    if not objects:
        return 0.0

    scores: list[float] = []
    for obj in objects:
        area_factor = min(1.0, obj.size.area_pixels / 4000.0)
        scores.append(obj.confidence * (0.6 + 0.4 * area_factor))

    mean_score = sum(scores) / len(scores)
    count_boost = min(0.25, len(objects) * 0.04)
    return round(min(1.0, mean_score + count_boost), 4)
