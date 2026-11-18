import { useState } from 'react';
import { Check, Info } from 'lucide-react';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';
import { pricingPlans } from '../data/content';
import { formatPrice } from '../utils/validation';
import './Pricing.css';

function Pricing({ onSelectPlan }) {
  const [billing, setBilling] = useState('monthly'); // 'monthly' | 'yearly'

  return (
    <section id="pricing" className="section section--ice pricing">
      <div className="container">
        <SectionHeader
          eyebrow="Pricing"
          title="Simple plans for every household"
          subtitle="Start free and upgrade when your home needs more. All prices are illustrative demo prices."
        >
          <div className="billing-toggle" role="group" aria-label="Billing period">
            {['monthly', 'yearly'].map((option) => (
              <button
                key={option}
                className={billing === option ? 'is-active' : ''}
                aria-pressed={billing === option}
                onClick={() => setBilling(option)}
              >
                {option === 'monthly' ? 'Monthly' : 'Yearly'}
                {option === 'yearly' && <span className="billing-toggle__save">2 months free</span>}
              </button>
            ))}
          </div>
        </SectionHeader>

        <div className="pricing__grid">
          {pricingPlans.map((plan, index) => {
            const price = billing === 'monthly' ? plan.monthly : plan.yearly;
            return (
              <Reveal
                as="article"
                key={plan.id}
                delay={index * 120}
                className={`plan ${plan.highlighted ? 'plan--featured' : ''}`}
              >
                {plan.highlighted && <span className="plan__ribbon">Most popular</span>}
                <h3>{plan.name}</h3>
                <p className="plan__desc">{plan.description}</p>

                <div className="plan__price">
                  <strong>{price === 0 ? 'Free' : formatPrice(price)}</strong>
                  {price > 0 && <span>/{billing === 'monthly' ? 'month' : 'year'}</span>}
                </div>
                <p className="plan__note">
                  {price === 0
                    ? 'Free forever in this concept'
                    : billing === 'yearly'
                      ? `Works out to ${formatPrice(Math.round(plan.yearly / 12))}/month`
                      : 'Billed monthly · cancel anytime'}
                </p>

                <button
                  className={`btn btn--block ${plan.highlighted ? 'btn--primary' : 'btn--secondary'}`}
                  onClick={() => onSelectPlan(plan.name, billing)}
                >
                  {price === 0 ? 'Start with Basic' : 'Choose Premium'}
                </button>

                <ul className="plan__features">
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <span className="plan__check">
                        <Check aria-hidden="true" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>

        <p className="pricing__disclaimer">
          <Info aria-hidden="true" /> Illustrative demo prices. No payment is collected on this website.
        </p>
      </div>
    </section>
  );
}

export default Pricing;
