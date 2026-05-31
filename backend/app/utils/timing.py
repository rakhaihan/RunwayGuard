import time
from contextlib import contextmanager
from typing import Generator


@contextmanager
def measure_ms() -> Generator[list[float], None, None]:
    bucket: list[float] = []
    start = time.perf_counter()
    try:
        yield bucket
    finally:
        bucket.append((time.perf_counter() - start) * 1000)
