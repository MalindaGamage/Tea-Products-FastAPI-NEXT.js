from sqlalchemy.orm import Session
from sqlalchemy import or_
from . import models, schemas

def get_product(db: Session, product_id: int):
    return db.query(models.TeaProduct).filter(models.TeaProduct.id == product_id).first()

def get_products(db: Session, skip: int = 0, limit: int = 10, search: str = None):
    query = db.query(models.TeaProduct)
    if search:
        query = query.filter(
            or_(
                models.TeaProduct.name.ilike(f'%{search}%'),
                models.TeaProduct.type.ilike(f'%{search}%')
            )
        )
    return query.offset(skip).limit(limit).all()

def create_product(db: Session, product: schemas.TeaProductCreate):
    db_product = models.TeaProduct(name=product.name, type=product.type, price=product.price, description=product.description)
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

def update_product(db: Session, product_id: int, product: schemas.TeaProductCreate):
    db_product = db.query(models.TeaProduct).filter(models.TeaProduct.id == product_id).first()
    if not db_product:
        return None
    for key, value in product.dict().items():
        setattr(db_product, key, value)
    db.commit()
    db.refresh(db_product)
    return db_product

def delete_product(db: Session, product_id: int):
    db_product = db.query(models.TeaProduct).filter(models.TeaProduct.id == product_id).first()
    if not db_product:
        return None
    db.delete(db_product)
    db.commit()
    return db_product
