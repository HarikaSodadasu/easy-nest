import Reveal from './Reveal';
import SafeImage from './SafeImage';
import HowItWorks from './HowItWorks';
import kitchenImg from '../assets/images/about-kitchen.jpg';
import './About.css';

// About section: what Easy Nest is, followed by the three-step "How it works" guide.
function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="about__intro">
          <Reveal className="about__media">
            <SafeImage src={kitchenImg} alt="A couple cooking together in a bright modern kitchen" loading="lazy" />
            <div className="about__media-card">
              <strong>Built for real routines</strong>
              <span>Students · Professionals · Families</span>
            </div>
          </Reveal>

          <Reveal className="about__copy" delay={100}>
            <span className="eyebrow">About Easy Nest</span>
            <h2 className="section-title">A calmer way to run your home</h2>
            <p>
              Easy Nest is a conceptual platform that brings home services and grocery shopping together.
              Instead of switching between separate apps for repairs and groceries, you get one simple
              place for both.
            </p>
            <p>
              It's designed for everyone — young professionals, students, families and busy households who
              want everyday tasks to feel lighter.
            </p>
            <a href="#pricing" className="btn btn--secondary">
              See plans
            </a>
          </Reveal>
        </div>

        <HowItWorks />
      </div>
    </section>
  );
}

export default About;
