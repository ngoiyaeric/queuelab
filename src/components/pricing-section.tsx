import React from 'react';
import { ActionButton } from '@/components/action-button';

const pricingTiers = [
   {
    title: 'Trial',
    price: 'Limited Usage',
    features: ['Internet Search', 'Upload and analyze unlimited files', 'Mapping tools', 'Location Intelligence'],
  },
  {
    title: 'Standard',
    price: '$23+/Month',
    features: ['Internet Search', 'Upload and analyze unlimited files', 'Mapping tools', 'Location Intelligence'],
  },
  {
    title: 'Pro',
    price: '$52+/Month',
    features: ['Everything in Standard', 'Browser Agents', 'Physics Models', 'Environment Aware *', 'Collaborative'],
  },
  {
    title: 'Enterprise',
    price: '$$$$+/Month',
    features: ['Service Level Agreements', 'Extensive Copilot', 'Extensive Support', 'Extensive Security'],
  },
];

export function PricingSection({ id }: { id: string }) {
  return (
    <section className="py-20 md:py-24" id={id}>
      <div className="container">
        <h2 className="text-5xl md:text-6xl font-medium text-center tracking-tighter">
          Pricing Plans
        </h2>
        <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto text-center tracking-tight mt-5">
          Choose the plan that suits you best, pay as you go after limits. 
        </p>
        <div className="mt-10 grid lg:grid-cols-4 gap-6">
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
                {tier.title === 'Enterprise' ? (
                  <ActionButton label="Contact Us" href="https://cal.com/ericngoiya" />
                ) : (
                  <ActionButton label={`${tier.price} - ${tier.title}`} href={tier.title === 'Standard' ? "https://www.paypal.com/ncp/payment/V4DU34TVVWY76" : tier.title === 'Pro' ? "https://www.paypal.com/ncp/payment/B72MURM7SZ7MN" : "https://www.paypal.com/ncp/payment/5K2S6VPMMVUXA"} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
