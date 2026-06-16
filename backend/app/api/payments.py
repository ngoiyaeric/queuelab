from fastapi import APIRouter, Header, HTTPException, Request
from typing import Optional
from app.services.payments_service import payments_service
from app.core.config import settings
import stripe

router = APIRouter(prefix="/payments", tags=["payments"])

@router.get("/customer")
async def get_customer(x_user_id: str = Header(...), x_user_email: str = Header(...)):
    customer_id = await payments_service.get_or_create_customer(x_user_id, x_user_email)
    return {"customer_id": customer_id}

@router.post("/checkout")
async def create_checkout(amount: int, x_user_id: str = Header(...), x_user_email: str = Header(...)):
    customer_id = await payments_service.get_or_create_customer(x_user_id, x_user_email)
    session = await payments_service.create_checkout_session(customer_id, amount)
    return session

@router.get("/balance")
async def get_balance(x_user_id: str = Header(...), x_user_email: str = Header(...)):
    customer_id = await payments_service.get_or_create_customer(x_user_id, x_user_email)
    balance = await payments_service.get_balance(customer_id)
    return {"balance": balance}

@router.post("/webhook")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid payload")
    except stripe.error.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Invalid signature")

    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        # Handle successful payment (e.g., update user balance in DB)
        print(f"Payment completed for session: {session['id']}")

    return {"status": "success"}
