import { Plus, Minus, Check } from 'lucide-react';
import SafeImage from './SafeImage';
import { formatPrice } from '../utils/validation';

// One grocery product. `quantity` comes from the cart so the card can show
// a stepper once the product has been added.
function ProductCard({ product, quantity, onAdd, onIncrease, onDecrease }) {
  return (
    <article className="product-card">
      <div className="product-card__media">
        <SafeImage src={product.image} alt={product.name} loading="lazy" />
        {quantity > 0 && (
          <span className="product-card__in-cart">
            <Check aria-hidden="true" /> In cart
          </span>
        )}
      </div>

      <div className="product-card__body">
        <span className="product-card__category">{product.category}</span>
        <h3>{product.name}</h3>
        <span className="product-card__unit">{product.unit}</span>

        <div className="product-card__footer">
          <span className="product-card__price">{formatPrice(product.price)}</span>

          {quantity > 0 ? (
            <div className="stepper" aria-label={`${product.name} quantity`}>
              <button onClick={() => onDecrease(product.id)} aria-label={`Decrease ${product.name}`}>
                <Minus />
              </button>
              <span aria-live="polite">{quantity}</span>
              <button onClick={() => onIncrease(product.id)} aria-label={`Increase ${product.name}`}>
                <Plus />
              </button>
            </div>
          ) : (
            <button className="product-card__add" onClick={() => onAdd(product)}>
              <Plus aria-hidden="true" /> Add to Cart
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
