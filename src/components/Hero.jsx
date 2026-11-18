import { ArrowRight, CalendarCheck, ShieldCheck, ShoppingBasket } from 'lucide-react';
import SafeImage from './SafeImage';
import livingRoom from '../assets/images/hero-living-room.jpg';
import groceryBag from '../assets/images/hero-grocery-bag.jpg';
import './Hero.css';

const highlights = [
  { value: '6', label: 'Home services' },
  { value: '18+', label: 'Grocery essentials' },
  { value: 'Free', label: 'Basic plan' },
];

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero__grid">
        {/* Left: copy and calls to action */}
        <div className="hero__content">
          <span className="hero__pill">
            <ShieldCheck aria-hidden="true" />
            Home services · Groceries · One simple app
          </span>

          <h1 className="hero__title">
            Everything Your Home Needs, <span>Made Easy.</span>
          </h1>

          <p className="hero__text">
            From trusted home services to fresh groceries and everyday essentials, Easy Nest brings
            everything together to make your daily life simpler.
          </p>

          <div className="hero__actions">
            <a href="#services" className="btn btn--primary">
              Explore Services <ArrowRight aria-hidden="true" />
            </a>
            <a href="#groceries" className="btn btn--secondary">
              <ShoppingBasket aria-hidden="true" /> Explore Groceries
            </a>
          </div>

          <dl className="hero__stats">
            {highlights.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Right: image composition with floating UI cards */}
        <div className="hero__visual" aria-hidden="true">
          <div className="hero__image-main">
            <SafeImage src={livingRoom} alt="" fetchpriority="high" />
          </div>

          <div className="hero__image-secondary">
            <SafeImage src={groceryBag} alt="" />
          </div>

          <div className="float-card float-card--booking">
            <span className="float-card__icon">
              <CalendarCheck />
            </span>
            <div>
              <strong>Home Cleaning</strong>
              <small>Tomorrow · 10:00 AM</small>
            </div>
            <span className="float-card__status">Scheduled</span>
          </div>

          <div className="float-card float-card--rating">
            <span className="float-card__label">
              <ShoppingBasket /> Grocery cart
            </span>
            <small>Weekly essentials</small>
            <div className="float-card__progress">
              <span style={{ width: '72%' }} />
            </div>
            <small className="float-card__meta">12 items added</small>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
