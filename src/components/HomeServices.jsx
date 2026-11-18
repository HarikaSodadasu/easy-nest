import { ArrowRight, Clock } from 'lucide-react';
import Reveal from './Reveal';
import SafeImage from './SafeImage';
import SectionHeader from './SectionHeader';
import { services } from '../data/services';
import electricianImg from '../assets/images/hero-electrician.jpg';
import './HomeServices.css';

function HomeServices({ onBook }) {
  return (
    <section id="services" className="section section--ice services">
      <div className="container">
        <div className="services__top">
          <SectionHeader
            align="left"
            eyebrow="Home services"
            title="Reliable help for every corner of your home"
            subtitle="Pick a service, choose a date and you're done. Booking here is a front-end demo — no real appointment is created."
          />
          <Reveal className="services__feature">
            <SafeImage src={electricianImg} alt="Electrician safely repairing a switchboard" loading="lazy" />
            <div className="services__feature-note">
              <strong>Verified professionals</strong>
              <span>Concept preview</span>
            </div>
          </Reveal>
        </div>

        <div className="services__grid">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal as="article" key={service.id} delay={(index % 3) * 90} className="service-card">
                <div className="service-card__head">
                  <span className="service-card__icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <span className="service-card__time">
                    <Clock aria-hidden="true" /> {service.duration}
                  </span>
                </div>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <button className="service-card__btn" onClick={() => onBook(service.name)}>
                  Book Now <ArrowRight aria-hidden="true" />
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HomeServices;
