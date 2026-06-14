import { clerkClient } from '@clerk/nextjs/server';

export async function getUserStripeCustomerId(userId: string): Promise<string | undefined> {
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  return user.privateMetadata.stripeCustomerId as string | undefined;
}

export async function setUserStripeCustomerId(userId: string, stripeCustomerId: string): Promise<void> {
  const client = await clerkClient();
  await client.users.updateUser(userId, {
    privateMetadata: {
      stripeCustomerId,
    },
  });
}
