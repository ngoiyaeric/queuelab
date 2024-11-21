import React from 'react';
import { ActionButton } from '@/components/action-button';

const pricingTiers = [
   {
    title: 'Trial',
    price: 'Limited Usage',
    features: ['Internet Search', 'Upload and analyze unlimited files', 'Mapping tools', 'Location Intelligence'],
  },
  {
    title: 'Basic',
    price: '$20/month',
    features: ['Internet Search', 'Upload and analyze unlimited files', 'Mapping tools', 'Location Intelligence'],
  },
  {
    title: 'Standard',
    price: '$50/month',
    features: ['Everything in Basic', 'Browser Agents', 'Physics Models'],
  },
];

export function PricingSection() {
  return (
    <section className="py-20 md:py-24">
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
                <ActionButton label={`${tier.price} - ${tier.title}`} href={"https://tally.so/r/wkWqkd"} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
