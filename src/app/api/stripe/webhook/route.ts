import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/config';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as any;

  if (event.type === 'checkout.session.completed') {
    if (session?.metadata?.purpose === 'add_balance') {
      const amount = session.amount_total;
      const customerId = session.customer;

      if (customerId && amount) {
        // Create a Customer Balance Transaction to credit the amount
        // Note: In Stripe, a negative balance is a credit to the customer.
        await stripe.customers.createBalanceTransaction(customerId, {
          amount: -amount, // Negative credits the customer
          currency: 'usd',
          description: 'Balance top-up from checkout session',
          metadata: {
            checkoutSessionId: session.id,
            userId: session.metadata.userId,
          },
        });
      }
    }
  }

  return new NextResponse(null, { status: 200 });
}
