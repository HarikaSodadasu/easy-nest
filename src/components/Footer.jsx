import Logo from './Logo';
import { navLinks } from '../data/content';
import { services } from '../data/services';
import { groceryCategories } from '../data/products';
import './Footer.css';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Logo />
            <p>
              Everything your home needs, made easy. Home services, groceries and household planning in one calm
              place.
            </p>
            <span className="demo-badge">Concept project · Frontend demo</span>
          </div>

          <nav className="footer__col" aria-label="Quick links">
            <h3>Quick links</h3>
            <ul>
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer__col" aria-label="Home services">
            <h3>Home services</h3>
            <ul>
              {services.map((service) => (
                <li key={service.id}>
                  <a href="#services">{service.name}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer__col" aria-label="Grocery categories">
            <h3>Groceries</h3>
            <ul>
              {groceryCategories.map((category) => (
                <li key={category}>
                  <a href="#groceries">{category}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__col">
            <h3>Contact</h3>
            <ul className="footer__contact">
              <li>hello@easynest.example</li>
              <li>+91 00000 00000</li>
              <li>Placeholder address, India</li>
            </ul>
            <p className="footer__note">Illustrative placeholders</p>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {year} Easy Nest. All rights reserved.</p>
          <p>Prices, bookings and sign-ups on this site are for demonstration only.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
