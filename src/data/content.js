// Static text content: navigation links and pricing plans.
// Keeping copy here keeps the components focused on layout and behaviour.

export const navLinks = [
  { id: 'services', label: 'Services' },
  { id: 'groceries', label: 'Groceries' },
  { id: 'premium', label: 'Premium' },
  { id: 'about', label: 'About' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'contact', label: 'Contact' },
];

export const pricingPlans = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'Explore home services and shop for groceries.',
    monthly: 0,
    yearly: 0,
    features: [
      'Home service discovery',
      'Demo service booking',
      'Grocery browsing and cart',
      'Product search and filters',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Adds family sharing and scheduled orders.',
    monthly: 199,
    yearly: 1990,
    highlighted: true,
    features: [
      'All Basic features',
      'Add family members to your account',
      'Shared shopping lists',
      'Scheduled and weekly repeat orders',
    ],
  },
];
