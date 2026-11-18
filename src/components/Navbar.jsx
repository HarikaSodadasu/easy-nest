import { useEffect, useState } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import Logo from './Logo';
import { navLinks } from '../data/content';
import { useActiveSection } from '../hooks/useActiveSection';
import './Navbar.css';

const sectionIds = navLinks.map((link) => link.id);

function Navbar({ cartCount, onCartOpen, onGetStarted }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeId = useActiveSection(sectionIds);

  // Add a soft border/shadow once the page is scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent the page behind the mobile menu from scrolling.
  useEffect(() => {
    document.body.classList.toggle('no-scroll', menuOpen);
    return () => document.body.classList.remove('no-scroll');
  }, [menuOpen]);

  // Close the mobile menu if the window grows to desktop width.
  useEffect(() => {
    const onResize = () => window.innerWidth > 960 && setMenuOpen(false);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`navbar ${scrolled || menuOpen ? 'navbar--scrolled' : ''}`}>
      <nav className="container navbar__inner" aria-label="Main navigation">
        <Logo onClick={closeMenu} />

        <ul className="navbar__links">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`} className={activeId === link.id ? 'is-active' : ''}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          <button className="icon-btn navbar__cart" onClick={onCartOpen} aria-label={`Open cart, ${cartCount} items`}>
            <ShoppingBag />
            {cartCount > 0 && (
              <span key={cartCount} className="navbar__badge">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </button>
          <button className="btn btn--primary btn--sm navbar__cta" onClick={onGetStarted}>
            Get Started
          </button>
          <button
            className="icon-btn navbar__toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      <div id="mobile-menu" className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} hidden={!menuOpen}>
        <ul>
          {navLinks.map((link, index) => (
            <li key={link.id} style={{ animationDelay: `${index * 40}ms` }}>
              <a
                href={`#${link.id}`}
                className={activeId === link.id ? 'is-active' : ''}
                onClick={closeMenu}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          className="btn btn--primary btn--block"
          onClick={() => {
            closeMenu();
            onGetStarted();
          }}
        >
          Get Started
        </button>
      </div>
    </header>
  );
}

export default Navbar;
