import { useEffect, useState } from 'react';
import { CalendarCheck, CheckCircle2, Info } from 'lucide-react';
import Modal from './Modal';
import { services } from '../data/services';
import { isValidPhone, todayISO } from '../utils/validation';

const emptyForm = { service: '', name: '', phone: '', date: '' };

// Checks every field and returns an object of error messages.
// An empty object means the form is valid.
function validate(form) {
  const errors = {};
  if (!form.service) errors.service = 'Please choose a service.';
  if (!form.name.trim()) errors.name = 'Please enter your name.';
  else if (form.name.trim().length < 2) errors.name = 'Name looks too short.';
  if (!form.phone.trim()) errors.phone = 'Please enter your phone number.';
  else if (!isValidPhone(form.phone)) errors.phone = 'Enter a valid 10-digit mobile number.';
  if (!form.date) errors.date = 'Please pick a preferred date.';
  else if (form.date < todayISO()) errors.date = 'Please choose today or a future date.';
  return errors;
}

function BookingModal({ isOpen, initialService, onClose, onBooked }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Reset the form each time the modal opens, pre-selecting the clicked service.
  useEffect(() => {
    if (isOpen) {
      setForm({ ...emptyForm, service: initialService || '' });
      setErrors({});
      setSubmitted(false);
    }
  }, [isOpen, initialService]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear the error for a field as soon as the user edits it.
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
      onBooked(form);
    }
  };

  const formattedDate = form.date
    ? new Date(`${form.date}T00:00:00`).toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '';

  return (
    <Modal isOpen={isOpen} onClose={onClose} labelledBy="booking-title">
      {submitted ? (
        <div className="success-state">
          <div className="success-state__icon">
            <CheckCircle2 aria-hidden="true" />
          </div>
          <h3 id="booking-title">Demo booking confirmed</h3>
          <p>
            Thanks, {form.name.trim().split(' ')[0]}! Your <strong>{form.service}</strong> request for{' '}
            <strong>{formattedDate}</strong> was recorded in this demo only. No real booking has been created.
          </p>
          <button className="btn btn--primary" onClick={onClose}>
            Done
          </button>
        </div>
      ) : (
        <>
          <div className="modal__header">
            <span className="demo-badge">
              <Info size={13} aria-hidden="true" /> Frontend demo
            </span>
            <h2 id="booking-title">Book a home service</h2>
            <p>Tell us what you need and when. Nothing is sent to a server.</p>
          </div>

          <form className="form-grid" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="booking-service">Service</label>
              <select
                id="booking-service"
                name="service"
                className="input"
                value={form.service}
                onChange={handleChange}
                aria-invalid={Boolean(errors.service)}
                aria-describedby={errors.service ? 'booking-service-error' : undefined}
              >
                <option value="">Select a service</option>
                {services.map((service) => (
                  <option key={service.id} value={service.name}>
                    {service.name}
                  </option>
                ))}
              </select>
              {errors.service && (
                <span id="booking-service-error" className="field-error">
                  {errors.service}
                </span>
              )}
            </div>

            <div className="field">
              <label htmlFor="booking-name">Full name</label>
              <input
                id="booking-name"
                name="name"
                className="input"
                placeholder="e.g. Priya Sharma"
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'booking-name-error' : undefined}
              />
              {errors.name && (
                <span id="booking-name-error" className="field-error">
                  {errors.name}
                </span>
              )}
            </div>

            <div className="form-row">
              <div className="field">
                <label htmlFor="booking-phone">Phone number</label>
                <input
                  id="booking-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  className="input"
                  placeholder="98765 43210"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'booking-phone-error' : undefined}
                />
                {errors.phone && (
                  <span id="booking-phone-error" className="field-error">
                    {errors.phone}
                  </span>
                )}
              </div>

              <div className="field">
                <label htmlFor="booking-date">Preferred date</label>
                <input
                  id="booking-date"
                  name="date"
                  type="date"
                  className="input"
                  min={todayISO()}
                  value={form.date}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.date)}
                  aria-describedby={errors.date ? 'booking-date-error' : undefined}
                />
                {errors.date && (
                  <span id="booking-date-error" className="field-error">
                    {errors.date}
                  </span>
                )}
              </div>
            </div>

            <p className="form-note">
              <Info aria-hidden="true" />
              This is a frontend demonstration. Submitting will not create a real booking or contact any provider.
            </p>

            <button type="submit" className="btn btn--primary btn--block">
              <CalendarCheck aria-hidden="true" /> Confirm demo booking
            </button>
          </form>
        </>
      )}
    </Modal>
  );
}

export default BookingModal;
