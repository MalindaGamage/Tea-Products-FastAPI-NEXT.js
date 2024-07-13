from sqlalchemy import Column, Integer, String, Float
from .database import Base

class TeaProduct(Base):
    __tablename__ = "tea_products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    type = Column(String, index=True)
    price = Column(Float)
    description = Column(String, index=True, nullable=True)
