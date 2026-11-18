// Small, reusable validation helpers shared by every form on the site.

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const isValidEmail = (value) => EMAIL_PATTERN.test(value.trim());

// Accepts 10-digit Indian mobile numbers, optionally starting with +91 / 0,
// and ignores spaces or dashes the user may type.
export const isValidPhone = (value) => {
  const digits = value.replace(/[\s-]/g, '').replace(/^(\+91|0)/, '');
  return /^[6-9]\d{9}$/.test(digits);
};

export const formatPrice = (amount) => `₹${amount.toLocaleString('en-IN')}`;

// Today's date as YYYY-MM-DD — used as the minimum for date pickers.
export const todayISO = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().split('T')[0];
};
