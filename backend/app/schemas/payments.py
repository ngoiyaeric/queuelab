from pydantic import BaseModel

class CheckoutRequest(BaseModel):
    amount: float
