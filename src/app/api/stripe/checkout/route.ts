import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/config';
import { getUserStripeCustomerId } from '@/lib/clerk/metadata';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const { amount } = await req.json();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!amount || isNaN(amount) || amount <= 0) {
      return new NextResponse('Invalid amount', { status: 400 });
    }

    const stripeCustomerId = await getUserStripeCustomerId(userId);

    if (!stripeCustomerId) {
      return new NextResponse('Customer not found', { status: 404 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Add Balance',
              description: 'Credit to your account balance',
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/base?checkout=success`,
      cancel_url: `${baseUrl}/base?checkout=canceled`,
      metadata: {
        userId,
        purpose: 'add_balance',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('[STRIPE_CHECKOUT_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
