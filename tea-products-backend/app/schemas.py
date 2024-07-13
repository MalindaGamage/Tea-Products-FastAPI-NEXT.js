from pydantic import BaseModel, Field

class TeaProductBase(BaseModel):
    name: str = Field(..., min_length=1)
    type: str = Field(..., min_length=1)
    price: float = Field(..., gt=0)
    description: str = None

class TeaProductCreate(TeaProductBase):
    pass

class TeaProduct(TeaProductBase):
    id: int

    class Config:
        from_attributes = True
