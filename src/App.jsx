import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HomeServices from './components/HomeServices';
import Groceries from './components/Groceries';
import SmartManagement from './components/SmartManagement';
import About from './components/About';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cart from './components/Cart';
import BookingModal from './components/BookingModal';
import SignupModal from './components/SignupModal';
import Toast from './components/Toast';
import BackToTop from './components/BackToTop';
import { products } from './data/products';
import './App.css';

const CART_KEY = 'easy-nest-cart';

// Load the saved cart (only ids + quantities) from localStorage.
// Wrapped in try/catch because storage can be blocked in private mode.
function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_KEY));
    return Array.isArray(saved) ? saved.filter((item) => products.some((p) => p.id === item.id)) : [];
  } catch {
    return [];
  }
}

function App() {
  // ---------- Cart state ----------
  // Each entry is { id, quantity }. Full product details are looked up from data.
  const [cart, setCart] = useState(loadCart);
  const [cartOpen, setCartOpen] = useState(false);

  // ---------- Modal state ----------
  const [booking, setBooking] = useState({ open: false, service: '' });
  const [signup, setSignup] = useState({ open: false, plan: 'Basic', billing: 'monthly' });

  // ---------- Toast messages ----------
  const [toasts, setToasts] = useState([]);
  const toastId = useRef(0);

  const showToast = useCallback((message, type = 'success') => {
    const id = ++toastId.current;
    setToasts((prev) => [...prev.slice(-2), { id, message, type }]); // keep at most 3
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 2800);
  }, []);

  // Save the cart whenever it changes.
  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      /* storage unavailable — the cart still works for this visit */
    }
  }, [cart]);

  // Combine cart entries with product details for display and totals.
  const cartItems = useMemo(
    () =>
      cart
        .map((item) => {
          const product = products.find((p) => p.id === item.id);
          return product ? { ...product, quantity: item.quantity } : null;
        })
        .filter(Boolean),
    [cart]
  );

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // ---------- Cart actions ----------
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...prev, { id: product.id, quantity: 1 }];
    });
    showToast(`${product.name} added to cart`, 'success');
  };

  const increaseQty = (id) =>
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)));

  // Decreasing below 1 removes the item from the cart.
  const decreaseQty = (id) => {
    const item = cart.find((i) => i.id === id);
    if (item && item.quantity === 1) {
      removeFromCart(id);
      return;
    }
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i)));
  };

  const removeFromCart = (id) => {
    const product = products.find((p) => p.id === id);
    setCart((prev) => prev.filter((item) => item.id !== id));
    if (product) showToast(`${product.name} removed from cart`, 'remove');
  };

  const clearCart = () => {
    setCart([]);
    showToast('Cart cleared', 'remove');
  };

  const handleCheckout = () => {
    showToast('Demo checkout only — no order placed, no payment taken', 'info');
  };

  // ---------- Modal handlers (useCallback keeps them stable for effects) ----------
  const closeCart = useCallback(() => setCartOpen(false), []);
  const closeBooking = useCallback(() => setBooking((b) => ({ ...b, open: false })), []);
  const closeSignup = useCallback(() => setSignup((s) => ({ ...s, open: false })), []);

  const openBooking = (service = '') => {
    setBooking({ open: true, service });
  };

  const openSignup = (plan = 'Basic', billing = 'monthly') => setSignup({ open: true, plan, billing });

  const handleBooked = (form) => {
    showToast(`${form.service} booked (demo)`, 'success');
  };

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <Navbar
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        onGetStarted={() => openSignup()}
      />

      <main id="main">
        <Hero />
        <HomeServices onBook={openBooking} />
        <Groceries
          cart={cart}
          onAdd={addToCart}
          onIncrease={increaseQty}
          onDecrease={decreaseQty}
          onCartOpen={() => setCartOpen(true)}
        />
        <SmartManagement />
        <About />
        <Pricing onSelectPlan={openSignup} />
        <Contact onToast={showToast} />
      </main>

      <Footer />

      {/* Overlays */}
      <Cart
        isOpen={cartOpen}
        items={cartItems}
        onClose={closeCart}
        onIncrease={increaseQty}
        onDecrease={decreaseQty}
        onRemove={removeFromCart}
        onClear={clearCart}
        onCheckout={handleCheckout}
      />
      <BookingModal
        isOpen={booking.open}
        initialService={booking.service}
        onClose={closeBooking}
        onBooked={handleBooked}
      />
      <SignupModal
        isOpen={signup.open}
        initialPlan={signup.plan}
        billing={signup.billing}
        onClose={closeSignup}
        onSignedUp={(plan) => showToast(`${plan} plan selected (demo)`, 'success')}
      />
      <BackToTop />
      <Toast toasts={toasts} />
    </>
  );
}

export default App;
