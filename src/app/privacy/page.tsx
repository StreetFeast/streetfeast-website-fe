import Link from 'next/link';
import styles from './page.module.css';

export default function Privacy() {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.backLink}>
          ← Back to Home
        </Link>
      </nav>
      
      <main className={styles.main}>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.lastUpdated}>Last updated: {new Date().toLocaleDateString()}</p>
        
        <section className={styles.section}>
          <h2>1. Information We Collect</h2>
          <p>
            StreetFeast collects information to provide and improve our services. The types of 
            information we collect include:
          </p>
          <ul>
            <li><strong>Personal Information:</strong> Name, email address, phone number, and profile information</li>
            <li><strong>Location Data:</strong> GPS location to show nearby food vendors</li>
            <li><strong>Usage Data:</strong> How you interact with our app, including search history and favorites</li>
            <li><strong>Device Information:</strong> Device type, operating system, and unique device identifiers</li>
          </ul>
        </section>
        
        <section className={styles.section}>
          <h2>2. How We Use Your Information</h2>
          <p>We use the collected information to:</p>
          <ul>
            <li>Provide location-based food vendor recommendations</li>
            <li>Personalize your experience within the app</li>
            <li>Send notifications about vendors you follow</li>
            <li>Improve our services and develop new features</li>
            <li>Communicate with you about updates and promotions</li>
          </ul>
        </section>
        
        <section className={styles.section}>
          <h2>3. Information Sharing</h2>
          <p>
            We do not sell your personal information. We may share your information in the 
            following circumstances:
          </p>
          <ul>
            <li>With vendors when you leave reviews or interact with their profiles</li>
            <li>With service providers who help us operate our app</li>
            <li>When required by law or to protect our rights</li>
            <li>With your consent for specific purposes</li>
          </ul>
        </section>
        
        <section className={styles.section}>
          <h2>4. Location Services</h2>
          <p>
            StreetFeast uses your location to show nearby food vendors. You can control location 
            permissions through your device settings. Without location access, some features may 
            be limited.
          </p>
        </section>
        
        <section className={styles.section}>
          <h2>5. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your information from 
            unauthorized access, alteration, or disclosure. However, no method of transmission 
            over the internet is 100% secure.
          </p>
        </section>
        
        <section className={styles.section}>
          <h2>6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access and update your personal information</li>
            <li>Delete your account and associated data</li>
            <li>Opt-out of marketing communications</li>
            <li>Request a copy of your data</li>
            <li>Withdraw consent for data processing</li>
          </ul>
        </section>
        
        <section className={styles.section}>
          <h2>7. Children&apos;s Privacy</h2>
          <p>
            StreetFeast is not intended for children under 13. We do not knowingly collect 
            personal information from children under 13. If you believe we have collected 
            such information, please contact us immediately.
          </p>
        </section>
        
        <section className={styles.section}>
          <h2>8. Cookies and Tracking</h2>
          <p>
            We use cookies and similar technologies to analyze usage patterns and improve our 
            services. You can manage cookie preferences through your browser settings.
          </p>
        </section>
        
        <section className={styles.section}>
          <h2>9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of significant 
            changes through the app or via email.
          </p>
        </section>
        
        <section className={styles.section}>
          <h2>10. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or our data practices, please contact 
            us through the contact form on our website or email us at privacy@streetfeast.com.
          </p>
        </section>
      </main>
    </div>
  );
}