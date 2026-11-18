import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Info } from 'lucide-react';
import Reveal from './Reveal';
import { isValidEmail, isValidPhone } from '../utils/validation';
import './Contact.css';

const emptyForm = { name: '', email: '', phone: '', message: '' };

const contactDetails = [
  { icon: Mail, label: 'Email', value: 'hello@easynest.example' },
  { icon: Phone, label: 'Phone', value: '+91 00000 00000' },
  { icon: MapPin, label: 'Office', value: 'Placeholder address, India' },
];

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Please enter your full name.';
  if (!form.email.trim()) errors.email = 'Please enter your email address.';
  else if (!isValidEmail(form.email)) errors.email = 'Please enter a valid email, e.g. name@example.com.';
  // Phone is optional, but if typed it must be valid.
  if (form.phone.trim() && !isValidPhone(form.phone)) errors.phone = 'Enter a valid 10-digit mobile number.';
  if (!form.message.trim()) errors.message = 'Please write a short message.';
  else if (form.message.trim().length < 10) errors.message = 'Message should be at least 10 characters.';
  return errors;
}

function Contact({ onToast }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [sentTo, setSentTo] = useState(null); // first name after a successful submit

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      // Move focus to the first invalid field so the user sees what to fix.
      const firstInvalid = Object.keys(nextErrors)[0];
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }

    setSentTo(form.name.trim().split(' ')[0]);
    setForm(emptyForm);
    onToast('Message submitted (demo only)', 'success');
  };

  // Small helper so each field doesn't repeat the same error markup.
  const fieldProps = (name) => ({
    id: `contact-${name}`,
    name,
    value: form[name],
    onChange: handleChange,
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `contact-${name}-error` : undefined,
  });

  const errorText = (name) =>
    errors[name] && (
      <span id={`contact-${name}-error`} className="field-error">
        {errors[name]}
      </span>
    );

  return (
    <section id="contact" className="section contact">
      <div className="container contact__grid">
        <Reveal className="contact__info">
          <span className="eyebrow">Contact</span>
          <h2 className="section-title">Let's make your home easier</h2>
          <p className="section-subtitle">
            Questions, ideas or partnership enquiries — send us a note and we'll get back to you.
          </p>

          <ul className="contact__details">
            {contactDetails.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label}>
                  <span className="contact__icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <div>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="contact__placeholder">Contact details above are illustrative placeholders.</p>
        </Reveal>

        <Reveal className="contact__card" delay={100}>
          {sentTo ? (
            <div className="success-state">
              <div className="success-state__icon">
                <CheckCircle2 aria-hidden="true" />
              </div>
              <h3>Thanks, {sentTo}!</h3>
              <p>
                Your message passed validation. Because this is a frontend demo, it was not sent to a server.
              </p>
              <button className="btn btn--secondary" onClick={() => setSentTo(null)}>
                Send another message
              </button>
            </div>
          ) : (
            <form className="form-grid" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="contact-name">Full name</label>
                  <input className="input" placeholder="Priya Sharma" autoComplete="name" {...fieldProps('name')} />
                  {errorText('name')}
                </div>
                <div className="field">
                  <label htmlFor="contact-email">Email address</label>
                  <input
                    className="input"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    {...fieldProps('email')}
                  />
                  {errorText('email')}
                </div>
              </div>

              <div className="field">
                <label htmlFor="contact-phone">
                  Phone number <span className="optional">(optional)</span>
                </label>
                <input
                  className="input"
                  type="tel"
                  inputMode="tel"
                  placeholder="98765 43210"
                  autoComplete="tel"
                  {...fieldProps('phone')}
                />
                {errorText('phone')}
              </div>

              <div className="field">
                <label htmlFor="contact-message">Message</label>
                <textarea className="input" placeholder="How can we help?" rows={5} {...fieldProps('message')} />
                {errorText('message')}
              </div>

              <p className="form-note">
                <Info aria-hidden="true" />
                Frontend demo: your information is validated in the browser and is not sent to any server.
              </p>

              <button type="submit" className="btn btn--primary btn--block">
                <Send aria-hidden="true" /> Send message
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

export default Contact;
