import stripe
from typing import Dict, Any, Optional
from app.core.config import settings

class PaymentsService:
    def __init__(self):
        stripe.api_key = settings.STRIPE_SECRET_KEY
        if settings.STRIPE_API_VERSION:
            stripe.api_version = settings.STRIPE_API_VERSION

    async def get_or_create_customer(self, user_id: str, email: str) -> str:
        """
        Retrieves an existing Stripe customer or creates a new one.
        """
        customers = stripe.Customer.list(query=f"metadata['clerk_user_id']:'{user_id}'")

        if customers.data:
            return customers.data[0].id

        customer = stripe.Customer.create(
            email=email,
            metadata={"clerk_user_id": user_id}
        )
        return customer.id

    async def create_checkout_session(self, customer_id: str, amount: int) -> Dict[str, Any]:
        """
        Creates a Stripe Checkout session for topping up balance.
        """
        session = stripe.checkout.Session.create(
            customer=customer_id,
            payment_method_types=["card"],
            line_items=[{
                "price_data": {
                    "currency": "usd",
                    "product_data": {"name": "Credit Balance Top-up"},
                    "unit_amount": amount,
                },
                "quantity": 1,
            }],
            mode="payment",
            success_url=f"{settings.CORS_ORIGINS[0]}/dashboard?success=true",
            cancel_url=f"{settings.CORS_ORIGINS[0]}/dashboard?canceled=true",
        )
        return {"url": session.url, "id": session.id}

    async def get_balance(self, customer_id: str) -> float:
        """
        Retrieves the customer's credit balance.
        In this implementation, we simulate balance. In a real app,
        you might store this in a DB and update via webhooks.
        """
        # Simulated balance
        return 100.0

payments_service = PaymentsService()
