import { useEffect, useState } from 'react';
import { CheckCircle2, Info, Rocket } from 'lucide-react';
import Modal from './Modal';
import { pricingPlans } from '../data/content';
import { isValidEmail } from '../utils/validation';

// "Get Started" sign-up form. Opened from the navbar and from the pricing cards
// (in which case the chosen plan is pre-selected).
function SignupModal({ isOpen, onClose, initialPlan, billing, onSignedUp }) {
  const [form, setForm] = useState({ name: '', email: '', plan: 'Basic' });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setForm({ name: '', email: '', plan: initialPlan || 'Basic' });
      setErrors({});
      setDone(false);
    }
  }, [isOpen, initialPlan]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Please enter your name.';
    if (!form.email.trim()) nextErrors.email = 'Please enter your email address.';
    else if (!isValidEmail(form.email)) nextErrors.email = 'Please enter a valid email address.';
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setDone(true);
      onSignedUp(form.plan);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} labelledBy="signup-title">
      {done ? (
        <div className="success-state">
          <div className="success-state__icon">
            <CheckCircle2 aria-hidden="true" />
          </div>
          <h3 id="signup-title">You're on the list, {form.name.trim().split(' ')[0]}!</h3>
          <p>
            You selected the <strong>{form.plan}</strong> plan
            {form.plan !== 'Basic' && billing ? ` (${billing})` : ''}. This is a demo — no account was created and
            nothing was charged.
          </p>
          <button className="btn btn--primary" onClick={onClose}>
            Continue exploring
          </button>
        </div>
      ) : (
        <>
          <div className="modal__header">
            <span className="demo-badge">
              <Info size={13} aria-hidden="true" /> Frontend demo
            </span>
            <h2 id="signup-title">Get started with Easy Nest</h2>
            <p>Join the early-access list. No password, no payment — just a quick demo sign-up.</p>
          </div>

          <form className="form-grid" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="signup-name">Full name</label>
              <input
                id="signup-name"
                name="name"
                className="input"
                placeholder="Priya Sharma"
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'signup-name-error' : undefined}
              />
              {errors.name && (
                <span id="signup-name-error" className="field-error">
                  {errors.name}
                </span>
              )}
            </div>

            <div className="field">
              <label htmlFor="signup-email">Email address</label>
              <input
                id="signup-email"
                name="email"
                type="email"
                className="input"
                placeholder="you@example.com"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'signup-email-error' : undefined}
              />
              {errors.email && (
                <span id="signup-email-error" className="field-error">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="field">
              <label htmlFor="signup-plan">Plan</label>
              <select id="signup-plan" name="plan" className="input" value={form.plan} onChange={handleChange}>
                {pricingPlans.map((plan) => (
                  <option key={plan.id} value={plan.name}>
                    {plan.name}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn--primary btn--block">
              <Rocket aria-hidden="true" /> Get early access
            </button>
          </form>
        </>
      )}
    </Modal>
  );
}

export default SignupModal;
