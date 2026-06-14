import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/config';
import { getUserStripeCustomerId, setUserStripeCustomerId } from '@/lib/clerk/metadata';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    let stripeCustomerId = await getUserStripeCustomerId(userId);

    if (!stripeCustomerId) {
      const client = await clerkClient();
      const user = await client.users.getUser(userId);
      const email = user.emailAddresses[0]?.emailAddress;
      const name = `${user.firstName || ''} ${user.lastName || ''}`.trim();

      const customer = await stripe.customers.create({
        email,
        name: name || undefined,
        metadata: {
          clerkUserId: userId,
        },
      });

      stripeCustomerId = customer.id;
      await setUserStripeCustomerId(userId, stripeCustomerId);
    }

    return NextResponse.json({ stripeCustomerId });
  } catch (error) {
    console.error('[STRIPE_CUSTOMER_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
