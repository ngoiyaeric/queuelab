import React from 'react';
import { useRouter } from 'next/navigation'; // Updated import
import { ActionButton } from '@/components/action-button';

const pricingTiers = [
   {
    title: 'Trial',
    price: 'Limited Usage',
    features: ['Internet Search', 'Upload and analyze unlimited files', 'Mapping tools', 'Location Intelligence'],
    paymentRoute: '/checkout/trial',
    externalPaymentLink: "https://www.paypal.com/ncp/payment/Z47M6SLXWZ2BA"
  },
  {
    title: 'Standard',
    price: '$20/month',
    features: ['Internet Search', 'Upload and analyze unlimited files', 'Mapping tools', 'Location Intelligence'],
    paymentRoute: '/checkout/standard',
    externalPaymentLink: "https://www.paypal.com/ncp/payment/V4DU34TVVWY76"
  },
  {
    title: 'Premium',
    price: '$50/month',
    features: ['Everything in Standard', 'Browser Agents', 'Physics Models', 'Exclusive Updates'],
    paymentRoute: '/checkout/premium',
    externalPaymentLink: "https://www.paypal.com/ncp/payment/B72MURM7SZ7MN"
  },
];

export function PricingSection({ id }: { id: string }) {
  const router = useRouter(); 

  const handlePurchase = (tier: typeof pricingTiers[0]) => {
    // Option 1: External link (recommended for PayPal)
    if (tier.externalPaymentLink) {
      window.location.href = tier.externalPaymentLink;
    }

    // Option 2: Internal routing (if you prefer)
    // router.push(tier.paymentRoute);
  };

  return (
    <section className="py-20 md:py-24" id={id}>
      <div className="container">
        <h2 className="text-5xl md:text-6xl font-medium text-center tracking-tighter">
          Pricing Plans
        </h2>
        <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto text-center tracking-tight mt-5">
          Choose the plan that suits you best.
        </p>
        <div className="mt-10 grid lg:grid-cols-3 gap-6">
          {pricingTiers.map((tier) => (
            <div key={tier.title} className="border border-muted p-6 rounded-xl">
              <h3 className="text-2xl font-semibold">{tier.title}</h3>
              <p className="text-4xl font-bold my-4">{tier.price}</p>
              <ul className="text-[#7CFC00] text-lg">
                {tier.features.map((feature, index) => (
                  <li key={index} className="mt-2">
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <ActionButton 
                  label={`${tier.price} - ${tier.title}`} 
                  onClick={() => handlePurchase(tier)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
