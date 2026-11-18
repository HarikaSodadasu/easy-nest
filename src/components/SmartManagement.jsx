import { Users, CalendarClock, Check, Crown, ArrowRight } from 'lucide-react';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';
import './SmartManagement.css';

// The two things the Premium plan is planned to offer, explained in simple words.
const premiumFeatures = [
  {
    icon: Users,
    title: 'Family sharing',
    text: 'Add your family members to your Easy Nest account and plan your shopping together.',
    points: [
      'Add family members to your account',
      'Share your shopping lists with them',
      'See the lists your family members create',
    ],
  },
  {
    icon: CalendarClock,
    title: 'Scheduled orders',
    text: 'Get your items ready in advance and choose when the order should be placed.',
    points: [
      'Keep your items ready in the cart',
      'Set a date and time for the order',
      'The order is placed automatically at that time',
      'Repeat it every week if you like',
    ],
  },
];

function SmartManagement() {
  return (
    <section id="premium" className="section section--ice smart">
      <div className="container">
        <SectionHeader
          eyebrow="Easy Nest Premium"
          title="Shop together. Order on time."
          subtitle="Home services and groceries are free to explore. Premium adds family sharing and scheduled orders."
        >
          <div className="smart__badge">
            <span className="demo-badge">
              <Crown size={13} aria-hidden="true" /> Premium plan features · coming soon
            </span>
          </div>
        </SectionHeader>

        <div className="smart__grid">
          {premiumFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Reveal as="article" key={feature.title} delay={index * 120} className="smart-card">
                <span className="smart-card__icon">
                  <Icon aria-hidden="true" />
                </span>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
                <ul className="smart-card__points">
                  {feature.points.map((point) => (
                    <li key={point}>
                      <span className="smart-card__check">
                        <Check aria-hidden="true" />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="smart__cta">
          <a href="#pricing" className="btn btn--primary">
            View Premium plan <ArrowRight aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export default SmartManagement;
