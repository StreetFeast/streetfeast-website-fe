import Link from 'next/link';
import styles from './page.module.css';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Delete My Data',
  description: 'Learn how to request deletion of your personal data from StreetFeast. We respect your privacy and make it easy to manage your information.',
  openGraph: {
    title: 'Delete My Data | StreetFeast',
    description: 'Learn how to request deletion of your personal data from StreetFeast.',
    url: 'https://streetfeast.com/delete-my-data',
  },
};

export default function DeleteMyData() {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.backLink}>
          ← Back to Home
        </Link>
      </nav>
      
      <main className={styles.main}>
        <h1 className={styles.title}>Delete My Data</h1>
        <p className={styles.subtitle}>We respect your right to control your personal information</p>
        
        <section className={styles.section}>
          <h2>How to Delete Your Account & Data</h2>
          <p>
            To request deletion of your account and all associated data, please follow these steps 
            within the StreetFeast app:
          </p>
          
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h3>Open the App</h3>
                <p>Launch the StreetFeast app on your device</p>
              </div>
            </div>
            
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h3>Navigate to Your Profile</h3>
                <p>Tap on the profile icon in the bottom navigation bar</p>
              </div>
            </div>
            
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <h3>Delete Your Account</h3>
                <p>Press the &ldquo;Delete My Account&rdquo; button and confirm your request</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2>What Happens When You Delete Your Data</h2>
          <p>
            When you request account deletion, we will permanently remove the following information 
            within 30 days:
          </p>
          <ul>
            <li>Your account information (name, email, phone number)</li>
            <li>Profile photo and preferences</li>
            <li>Saved favorites and search history</li>
            <li>Reviews and ratings you&apos;ve submitted</li>
            <li>All other personal data associated with your account</li>
          </ul>
          <p>
            Please note that some information may be retained as required by law or for legitimate 
            business purposes such as fraud prevention and legal compliance.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Need Help?</h2>
          <p>
            If you&apos;re unable to access the app or need further assistance with your data deletion 
            request, our support team is here to help.
          </p>
          <div className={styles.contactInfo}>
            <p><strong>Contact Us</strong></p>
            <p>
              Email:{' '}
              <a href="mailto:customer-support@streetfeastapp.com">
                customer-support@streetfeastapp.com
              </a>
            </p>
            <p className={styles.responseTime}>
              We typically respond within 24-48 business hours
            </p>
          </div>
          <p>
            When contacting support, please include the email address or phone number associated 
            with your account so we can locate and process your request.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Related Policies</h2>
          <p>
            For more information about how we handle your data, please review our:
          </p>
          <ul>
            <li>
              <Link href="/privacy">Privacy Policy</Link> – Learn how we collect, use, and protect your information
            </li>
            <li>
              <Link href="/terms">Terms of Service</Link> – Understand your rights and responsibilities
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}

