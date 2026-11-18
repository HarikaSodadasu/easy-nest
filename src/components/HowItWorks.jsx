import { Search, MousePointerClick, Sparkles } from 'lucide-react';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';
import './HowItWorks.css';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Explore',
    text: 'Discover home services and grocery products in one place, with simple categories and search.',
  },
  {
    number: '02',
    icon: MousePointerClick,
    title: 'Choose',
    text: 'Select a service and preferred date, or add grocery products to your cart.',
  },
  {
    number: '03',
    icon: Sparkles,
    title: 'Simplify',
    text: 'Get home tasks and grocery shopping done from one place, with less effort.',
  },
];

// The three-step guide shown inside the About section.
function HowItWorks() {
  return (
    <div id="how-it-works" className="how">
      <SectionHeader eyebrow="How it works" title="Three simple steps" />

      <ol className="how__steps">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <Reveal as="li" key={step.title} delay={index * 120} className="step">
              <div className="step__top">
                <span className="step__icon">
                  <Icon aria-hidden="true" />
                </span>
                <span className="step__number" aria-hidden="true">
                  {step.number}
                </span>
              </div>
              <h3>
                <span className="sr-only">Step {index + 1}: </span>
                {step.title}
              </h3>
              <p>{step.text}</p>
            </Reveal>
          );
        })}
      </ol>
    </div>
  );
}

export default HowItWorks;
