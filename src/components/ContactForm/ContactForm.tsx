'use client';

import styles from './ContactForm.module.css';
import { useContactForm } from '@/hooks/useContactForm';

export default function ContactForm() {
  const { formData, status, handleChange, handleSubmit } = useContactForm();

  return (
    <section className={styles.contactSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Contact Us</h2>
        <p className={styles.subtitle}>
          Have questions? Want to partner with us? We&apos;d love to hear from you!
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={styles.input}
              placeholder="Your name"
              disabled={status === 'loading'}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.input}
              placeholder="your@email.com"
              disabled={status === 'loading'}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.label}>Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className={styles.textarea}
              placeholder="Tell us what's on your mind..."
              rows={5}
              disabled={status === 'loading'}
            />
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'success' && (
            <p className={styles.successMessage}>
              Thank you for your message! We&apos;ll get back to you soon.
            </p>
          )}

          {status === 'error' && (
            <p className={styles.errorMessage}>
              Something went wrong. Please try again later.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}