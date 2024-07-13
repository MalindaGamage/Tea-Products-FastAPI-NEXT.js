from fastapi import FastAPI, Depends, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
from . import crud, models, schemas
from .database import SessionLocal, engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Tea Products API"}

@app.post("/products/", response_model=schemas.TeaProduct)
def create_product(product: schemas.TeaProductCreate, db: Session = Depends(get_db)):
    return crud.create_product(db=db, product=product)

@app.get("/products", response_model=List[schemas.TeaProduct])
def read_products(response: Response, skip: int = 0, limit: int = 10, search: Optional[str] = None, db: Session = Depends(get_db)):
    products = crud.get_products(db, skip=skip, limit=limit, search=search)
    total_products = db.query(models.TeaProduct).count()
    response.headers["X-Total-Count"] = str(total_products)
    return products

@app.get("/products/{product_id}", response_model=schemas.TeaProduct)
def read_product(product_id: int, db: Session = Depends(get_db)):
    db_product = crud.get_product(db, product_id=product_id)
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return db_product

@app.put("/products/{product_id}", response_model=schemas.TeaProduct)
def update_product(product_id: int, product: schemas.TeaProductCreate, db: Session = Depends(get_db)):
    return crud.update_product(db=db, product_id=product_id, product=product)

@app.delete("/products/{product_id}", response_model=schemas.TeaProduct)
def delete_product(product_id: int, db: Session = Depends(get_db)):
    return crud.delete_product(db=db, product_id=product_id)
