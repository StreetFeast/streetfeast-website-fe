import Link from 'next/link';
import styles from './page.module.css';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read the StreetFeast Terms of Service. Understand your rights and responsibilities when using our food discovery platform.',
  openGraph: {
    title: 'Terms of Service | StreetFeast',
    description: 'Read the StreetFeast Terms of Service. Understand your rights and responsibilities when using our platform.',
    url: 'https://streetfeast.com/terms',
  },
};

export default function Terms() {
  const lastUpdated = "January 9, 2026";

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.backLink}>
          ← Back to Home
        </Link>
      </nav>
      
      <main className={styles.main}>
        <h1 className={styles.title}>Terms of Service</h1>
        <p className={styles.lastUpdated}>Last updated: {lastUpdated}</p>
        
        <section className={styles.section}>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By downloading, accessing, or using the StreetFeast mobile application (&quot;App&quot;), 
            you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree 
            to these Terms, do not use the App.
          </p>
        </section>
        
        <section className={styles.section}>
          <h2>2. Description of Service</h2>
          <p>
            StreetFeast is a mobile platform that helps users discover and locate street food 
            vendors, food trucks, and pop-up restaurants in their area. The App provides 
            location-based information, user reviews, and vendor details.
          </p>
        </section>
        
        <section className={styles.section}>
          <h2>3. User Accounts</h2>
          <p>
            You may be required to create an account to access certain features of the App. 
            You are responsible for maintaining the confidentiality of your account information 
            and for all activities that occur under your account.
          </p>
        </section>
        
        <section className={styles.section}>
          <h2>4. User Content</h2>
          <p>
            Users may submit reviews, photos, and other content to the App. By submitting content, 
            you grant StreetFeast a worldwide, non-exclusive, royalty-free license to use, 
            reproduce, and display your content in connection with the App.
          </p>
        </section>
        
        <section className={styles.section}>
          <h2>5. Privacy</h2>
          <p>
            Your use of the App is also governed by our Privacy Policy. Please review our 
            Privacy Policy to understand our practices regarding your personal information.
          </p>
        </section>
        
        <section className={styles.section}>
          <h2>6. Prohibited Uses</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the App for any illegal purpose or in violation of any laws</li>
            <li>Submit false or misleading information</li>
            <li>Harass, abuse, or harm other users or vendors</li>
            <li>Attempt to gain unauthorized access to the App or its systems</li>
            <li>Use the App for commercial purposes without our written consent</li>
          </ul>
        </section>
        
        <section className={styles.section}>
          <h2>7. Disclaimers</h2>
          <p>
            The App is provided &quot;as is&quot; without warranties of any kind. StreetFeast does not 
            guarantee the accuracy, completeness, or reliability of vendor information or user content.
          </p>
        </section>
        
        <section className={styles.section}>
          <h2>8. Limitation of Liability</h2>
          <p>
            StreetFeast shall not be liable for any indirect, incidental, special, or consequential 
            damages arising from your use of the App or inability to use the App.
          </p>
        </section>
        
        <section className={styles.section}>
          <h2>9. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will notify users of any 
            material changes through the App or by email.
          </p>
        </section>
        
        <section className={styles.section}>
          <h2>10. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us through the contact 
            form on our website.
          </p>
        </section>
      </main>
    </div>
  );
}