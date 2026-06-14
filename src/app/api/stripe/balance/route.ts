import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/config';
import { getUserStripeCustomerId } from '@/lib/clerk/metadata';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const stripeCustomerId = await getUserStripeCustomerId(userId);

    if (!stripeCustomerId) {
      return NextResponse.json({ balance: 0 });
    }

    const customer = await stripe.customers.retrieve(stripeCustomerId);

    if (customer.deleted) {
       return NextResponse.json({ balance: 0 });
    }

    const balanceInCents = customer.balance || 0;
    const balanceInDollars = Math.abs(balanceInCents) / 100;

    return NextResponse.json({ balance: balanceInDollars });
  } catch (error) {
    console.error('[STRIPE_BALANCE_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
