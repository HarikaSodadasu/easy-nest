import { useMemo, useState } from 'react';
import { Search, X, PackageSearch, ShoppingBag } from 'lucide-react';
import ProductCard from './ProductCard';
import SectionHeader from './SectionHeader';
import { products, groceryCategories } from '../data/products';
import './Groceries.css';

const ALL = 'All';
const INITIAL_VISIBLE = 8; // keep the grid calm; the rest is one click away

function Groceries({ cart, onAdd, onIncrease, onDecrease, onCartOpen }) {
  const [activeCategory, setActiveCategory] = useState(ALL);
  const [query, setQuery] = useState('');
  const [showAll, setShowAll] = useState(false);

  // Filter by category first, then by the search text.
  // useMemo avoids recalculating unless the inputs change.
  const visibleProducts = useMemo(() => {
    const text = query.trim().toLowerCase();
    return products
      .filter((p) => activeCategory === ALL || p.category === activeCategory)
      .filter((p) => !text || p.name.toLowerCase().includes(text) || p.category.toLowerCase().includes(text));
  }, [activeCategory, query]);

  // Quick lookup: product id -> quantity in the cart.
  const quantities = useMemo(
    () => Object.fromEntries(cart.map((item) => [item.id, item.quantity])),
    [cart]
  );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // When a filter or search is active, show every match. Otherwise show the
  // first few products until the user asks for more.
  const isFiltering = activeCategory !== ALL || query.trim() !== '';
  const shownProducts = isFiltering || showAll ? visibleProducts : visibleProducts.slice(0, INITIAL_VISIBLE);
  const hiddenCount = visibleProducts.length - shownProducts.length;

  const resetFilters = () => {
    setQuery('');
    setActiveCategory(ALL);
  };

  return (
    <section id="groceries" className="section groceries">
      <div className="container">
        <SectionHeader
          eyebrow="Groceries & essentials"
          title="Fresh picks for your weekly basket"
          subtitle="Browse by category, search for what you need and build your cart. Prices are illustrative demo prices."
        />

        <div className="groceries__toolbar">
          <div className="search-field">
            <Search className="search-field__icon" aria-hidden="true" />
            <label htmlFor="grocery-search" className="sr-only">
              Search groceries
            </label>
            <input
              id="grocery-search"
              type="search"
              className="input"
              placeholder="Search apples, milk, rice…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button className="search-field__clear" onClick={() => setQuery('')} aria-label="Clear search">
                <X />
              </button>
            )}
          </div>

          <button className="btn btn--secondary groceries__cart-btn" onClick={onCartOpen}>
            <ShoppingBag aria-hidden="true" /> View cart{cartCount > 0 && ` (${cartCount})`}
          </button>
        </div>

        <div className="chips" role="tablist" aria-label="Grocery categories">
          {[ALL, ...groceryCategories].map((category) => (
            <button
              key={category}
              role="tab"
              aria-selected={activeCategory === category}
              className={`chip ${activeCategory === category ? 'is-active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <p className="groceries__count" aria-live="polite">
          Showing {shownProducts.length} of {visibleProducts.length}{' '}
          {visibleProducts.length === 1 ? 'product' : 'products'}
          {activeCategory !== ALL && <> in <strong>{activeCategory}</strong></>}
          {query.trim() && <> for “{query.trim()}”</>}
        </p>

        {visibleProducts.length > 0 ? (
          <>
            <div className="products__grid">
              {shownProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  quantity={quantities[product.id] || 0}
                  onAdd={onAdd}
                  onIncrease={onIncrease}
                  onDecrease={onDecrease}
                />
              ))}
            </div>
            {!isFiltering && (hiddenCount > 0 || showAll) && (
              <div className="groceries__more">
                <button className="btn btn--secondary" onClick={() => setShowAll((v) => !v)}>
                  {showAll ? 'Show fewer products' : `Show all ${visibleProducts.length} products`}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="empty-state">
            <span className="empty-state__icon">
              <PackageSearch aria-hidden="true" />
            </span>
            <h3>No products found</h3>
            <p>Try a different search term or browse another category.</p>
            <button className="btn btn--soft btn--sm" onClick={resetFilters}>
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Groceries;
