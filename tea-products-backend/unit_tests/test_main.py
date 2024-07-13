# test_main.py
# python -m pytest unit_tests/test_main.py

from fastapi.testclient import TestClient
from app.main import app
from app.database import get_db, Base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

def test_create_product():
    response = client.post(
        "/products/",
        json={"name": "Test Tea", "type": "Green", "price": 10.5, "description": "A test tea"}
    )
    assert response.status_code == 200
    assert response.json()["name"] == "Test Tea"

def test_read_products():
    response = client.get("/products?skip=0&limit=10")
    assert response.status_code == 200
    assert len(response.json()) > 0

def test_update_product():
    response = client.post(
        "/products/",
        json={"name": "Update Test Tea", "type": "Green", "price": 10.5, "description": "A test tea to update"}
    )
    product_id = response.json()["id"]

    response = client.put(
        f"/products/{product_id}",
        json={"name": "Updated Test Tea", "type": "Green", "price": 15.5, "description": "Updated test tea"}
    )
    assert response.status_code == 200
    assert response.json()["name"] == "Updated Test Tea"

def test_delete_product():
    response = client.post(
        "/products/",
        json={"name": "Delete Test Tea", "type": "Green", "price": 10.5, "description": "A test tea to delete"}
    )
    product_id = response.json()["id"]

    response = client.delete(f"/products/{product_id}")
    assert response.status_code == 200
    assert response.json()["id"] == product_id
