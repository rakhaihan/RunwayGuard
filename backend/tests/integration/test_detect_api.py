def test_upload_image(client, sample_image_file):
    response = client.post(
        "/api/v1/upload",
        files={"file": sample_image_file},
    )
    assert response.status_code == 200
    data = response.json()
    assert "upload_id" in data
    assert data["filename"] == "runway.jpg"


def test_analyze_runway_with_file(client, sample_image_file):
    response = client.post(
        "/api/v1/runway/analyze",
        files={"file": sample_image_file},
    )
    assert response.status_code == 200
    data = response.json()
    assert "risk_level" in data
    assert "runway_status" in data
    assert "detections" in data
    assert "request_id" in data
    assert data["image_width"] > 0


def test_analyze_runway_with_upload_id(client, sample_image_file):
    upload = client.post("/api/v1/upload", files={"file": sample_image_file})
    upload_id = upload.json()["upload_id"]

    response = client.post(f"/api/v1/runway/analyze?upload_id={upload_id}")
    assert response.status_code == 200
    assert response.json()["upload_id"] == upload_id
