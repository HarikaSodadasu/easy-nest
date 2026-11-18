import { useEffect, useRef } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, Info } from 'lucide-react';
import SafeImage from './SafeImage';
import { formatPrice } from '../utils/validation';
import './Cart.css';

const DELIVERY_FEE = 40;
const FREE_DELIVERY_FROM = 499;

// Slide-in cart drawer. All cart data and actions are passed in as props
// from App.jsx, so this component only displays and forwards events.
function Cart({ isOpen, items, onClose, onIncrease, onDecrease, onRemove, onClear, onCheckout }) {
  const panelRef = useRef(null);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE;
  const total = subtotal + delivery;
  const toFreeDelivery = Math.max(FREE_DELIVERY_FROM - subtotal, 0);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.classList.add('no-scroll');
    panelRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen, onClose]);

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'is-open' : ''}`} onClick={onClose} aria-hidden="true" />
      <aside
        ref={panelRef}
        className={`cart ${isOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        aria-hidden={!isOpen}
        tabIndex={-1}
        inert={!isOpen}
      >
        <header className="cart__header">
          <div>
            <h2 id="cart-title">Your cart</h2>
            <span>
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </span>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close cart">
            <X />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="cart__empty">
            <span className="cart__empty-icon">
              <ShoppingBag aria-hidden="true" />
            </span>
            <h3>Your cart is empty</h3>
            <p>Fresh fruits, dairy and daily essentials are just a click away.</p>
            <a href="#groceries" className="btn btn--primary" onClick={onClose}>
              Browse groceries
            </a>
          </div>
        ) : (
          <>
            <div className="cart__progress">
              {toFreeDelivery > 0 ? (
                <p>
                  Add <strong>{formatPrice(toFreeDelivery)}</strong> more for free demo delivery
                </p>
              ) : (
                <p>
                  <strong>You've unlocked free demo delivery</strong>
                </p>
              )}
              <div className="cart__bar">
                <span style={{ width: `${Math.min((subtotal / FREE_DELIVERY_FROM) * 100, 100)}%` }} />
              </div>
            </div>

            <ul className="cart__items">
              {items.map((item) => (
                <li key={item.id} className="cart-item">
                  <SafeImage src={item.image} alt={item.name} className="cart-item__img" />
                  <div className="cart-item__info">
                    <div className="cart-item__top">
                      <div>
                        <h3>{item.name}</h3>
                        <span>
                          {item.unit} · {formatPrice(item.price)}
                        </span>
                      </div>
                      <button
                        className="cart-item__remove"
                        onClick={() => onRemove(item.id)}
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 />
                      </button>
                    </div>
                    <div className="cart-item__bottom">
                      <div className="stepper stepper--light">
                        <button onClick={() => onDecrease(item.id)} aria-label={`Decrease ${item.name}`}>
                          <Minus />
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => onIncrease(item.id)} aria-label={`Increase ${item.name}`}>
                          <Plus />
                        </button>
                      </div>
                      <strong>{formatPrice(item.price * item.quantity)}</strong>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="cart__footer">
              <dl className="cart__summary">
                <div>
                  <dt>Subtotal</dt>
                  <dd>{formatPrice(subtotal)}</dd>
                </div>
                <div>
                  <dt>Delivery (demo)</dt>
                  <dd>{delivery === 0 ? 'Free' : formatPrice(delivery)}</dd>
                </div>
                <div className="cart__total">
                  <dt>Total</dt>
                  <dd>{formatPrice(total)}</dd>
                </div>
              </dl>
              <button className="btn btn--primary btn--block" onClick={onCheckout}>
                Checkout (demo)
              </button>
              <button className="cart__clear" onClick={onClear}>
                Clear cart
              </button>
              <p className="cart__note">
                <Info aria-hidden="true" /> Illustrative prices. No payment is processed.
              </p>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}

export default Cart;
