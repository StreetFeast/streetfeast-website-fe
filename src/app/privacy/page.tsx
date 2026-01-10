import Link from 'next/link';
import styles from './page.module.css';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how StreetFeast protects your privacy and handles your personal information. We are committed to safeguarding your data.',
  openGraph: {
    title: 'Privacy Policy | StreetFeast',
    description: 'Learn how StreetFeast protects your privacy and handles your personal information.',
    url: 'https://streetfeast.com/privacy',
  },
};

export default function Privacy() {
  const lastUpdated = "January 9, 2026";
  
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.backLink}>
          ← Back to Home
        </Link>
      </nav>
      
      <main className={styles.main}>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.lastUpdated}>Effective Date: {lastUpdated}</p>
        
        <section className={styles.section}>
          <p className={styles.intro}>
            StreetFeast, Inc. (&ldquo;StreetFeast,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting your privacy. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
            use our mobile application (the &ldquo;App&rdquo;) and related services (collectively, the &ldquo;Services&rdquo;). By using 
            our Services, you agree to the collection and use of information in accordance with this policy.
          </p>
        </section>

        <section className={styles.section}>
          <h2>1. Information We Collect</h2>
          
          <h3>1.1 Personal Information You Provide</h3>
          <p>When you create an account or use our Services, we collect:</p>
          <ul>
            <li><strong>Account Information:</strong> First name, last name, phone number, and email address (if provided)</li>
            <li><strong>Profile Information:</strong> Profile photo, food preferences, dietary restrictions</li>
            <li><strong>Communication Data:</strong> Information you provide when contacting us for support</li>
          </ul>

          <h3>1.2 Information Collected Automatically</h3>
          <p>When you use our App, we automatically collect:</p>
          <ul>
            <li><strong>Location Data:</strong> Precise GPS location to show nearby food vendors and provide location-based services</li>
            <li><strong>Device Information:</strong> Device type, operating system, unique device identifiers, mobile network information</li>
            <li><strong>Usage Data:</strong> Search queries, vendor interactions, favorites, reviews, in-app activities, and feature usage</li>
            <li><strong>Log Data:</strong> IP address, browser type, pages visited, time spent, and other diagnostic data</li>
          </ul>

          <h3>1.3 Information from Third Parties</h3>
          <ul>
            <li><strong>Analytics Data:</strong> We use PostHog for analytics and product insights</li>
            <li><strong>Social Media:</strong> If you connect social media accounts, we may receive profile information</li>
            <li><strong>Payment Processors:</strong> Transaction data when you make purchases through the App</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>2. How We Use Your Information</h2>
          <p>We use the collected information for the following purposes:</p>
          
          <h3>2.1 Service Provision and Improvement</h3>
          <ul>
            <li>Provide location-based food vendor recommendations</li>
            <li>Process and facilitate orders with food vendors</li>
            <li>Personalize your experience and provide customized content</li>
            <li>Maintain and improve our Services</li>
            <li>Develop new features and functionality</li>
          </ul>

          <h3>2.2 Communication</h3>
          <ul>
            <li>Send notifications about vendors you follow or nearby deals</li>
            <li>Provide customer support and respond to inquiries</li>
            <li>Send service-related announcements and updates</li>
            <li>Send marketing communications (with your consent)</li>
          </ul>

          <h3>2.3 Analytics and Business Operations</h3>
          <ul>
            <li>Analyze usage patterns and trends</li>
            <li>Monitor and analyze the effectiveness of our Services</li>
            <li>Conduct research and analysis for business planning</li>
            <li>Detect, prevent, and address technical issues</li>
          </ul>

          <h3>2.4 Legal and Safety</h3>
          <ul>
            <li>Comply with legal obligations and regulatory requirements</li>
            <li>Protect our rights, property, and safety</li>
            <li>Prevent fraud and enhance security</li>
            <li>Enforce our Terms of Service</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>3. How We Share Your Information</h2>
          <p>We do not sell, trade, or rent your personal information. We may share your information in the following circumstances:</p>
          
          <h3>3.1 With Food Vendors</h3>
          <p>When you interact with vendors (place orders, leave reviews, save as favorites), we share relevant information to facilitate the service.</p>

          <h3>3.2 With Service Providers</h3>
          <p>We share information with third-party service providers who help us operate our Services:</p>
          <ul>
            <li><strong>Analytics Services:</strong> PostHog for product analytics and user insights</li>
            <li><strong>Cloud Services:</strong> For data storage and processing</li>
            <li><strong>Payment Processors:</strong> To facilitate transactions</li>
            <li><strong>Communication Services:</strong> For SMS and email delivery</li>
            <li><strong>Customer Support:</strong> To provide assistance</li>
          </ul>

          <h3>3.3 For Legal Reasons</h3>
          <p>We may disclose information when required to:</p>
          <ul>
            <li>Comply with applicable laws, regulations, or legal processes</li>
            <li>Respond to government requests or court orders</li>
            <li>Protect our rights, privacy, safety, or property</li>
            <li>Investigate potential violations of our Terms of Service</li>
          </ul>

          <h3>3.4 Business Transfers</h3>
          <p>In the event of a merger, acquisition, reorganization, or sale of assets, your information may be transferred as part of that transaction.</p>

          <h3>3.5 With Your Consent</h3>
          <p>We may share your information for other purposes with your explicit consent.</p>
        </section>

        <section className={styles.section}>
          <h2>4. Data Retention</h2>
          <p>
            We retain your personal information for as long as necessary to provide our Services and fulfill the 
            purposes outlined in this Privacy Policy. Retention periods are determined based on:
          </p>
          <ul>
            <li>The duration of our relationship with you</li>
            <li>Legal obligations requiring data retention</li>
            <li>Our legitimate business interests</li>
            <li>Resolution of disputes and enforcement of agreements</li>
          </ul>
          <p>
            When you delete your account, we will delete or anonymize your personal information within 30 days, 
            except where retention is required for legal or legitimate business purposes.
          </p>
        </section>

        <section className={styles.section}>
          <h2>5. Data Security</h2>
          <p>
            We implement industry-standard administrative, technical, and physical security measures to protect 
            your information from unauthorized access, use, alteration, and disclosure. These measures include:
          </p>
          <ul>
            <li>Encryption of data in transit and at rest</li>
            <li>Regular security assessments and audits</li>
            <li>Access controls and authentication mechanisms</li>
            <li>Employee training on data protection</li>
            <li>Incident response procedures</li>
          </ul>
          <p>
            However, no method of transmission over the internet or electronic storage is 100% secure. While we 
            strive to protect your information, we cannot guarantee absolute security.
          </p>
        </section>

        <section className={styles.section}>
          <h2>6. Your Rights and Choices</h2>
          
          <h3>6.1 Access and Update</h3>
          <p>You can access and update your personal information through your account settings in the App.</p>

          <h3>6.2 Data Portability</h3>
          <p>You have the right to request a copy of your personal information in a structured, commonly used format.</p>

          <h3>6.3 Deletion</h3>
          <p>You can request deletion of your account and personal information through the app or by contacting us. For detailed instructions on how to delete your data, please visit our <Link href="/delete-my-data">Delete My Data</Link> page. Note that we may retain certain information as required by law or for legitimate business purposes.</p>

          <h3>6.4 Marketing Communications</h3>
          <p>You can opt-out of marketing communications through:</p>
          <ul>
            <li>App notification settings</li>
            <li>Unsubscribe links in emails</li>
            <li>Texting STOP to opt-out of SMS messages</li>
          </ul>

          <h3>6.5 Location Services</h3>
          <p>You can disable location services through your device settings. Note that this may limit certain features of the App.</p>

          <h3>6.6 Do Not Track</h3>
          <p>Our App does not currently respond to Do Not Track signals.</p>
        </section>

        <section className={styles.section}>
          <h2>7. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies, web beacons, and similar tracking technologies to collect information about your 
            interactions with our Services. These technologies help us:
          </p>
          <ul>
            <li>Remember your preferences and settings</li>
            <li>Analyze usage patterns and trends</li>
            <li>Provide personalized content</li>
            <li>Measure the effectiveness of our services</li>
          </ul>
          <p>
            You can manage cookie preferences through your browser settings. Disabling cookies may limit some 
            features of our Services.
          </p>
        </section>

        <section className={styles.section}>
          <h2>8. Third-Party Analytics</h2>
          <p>
            We use PostHog as our product analytics platform. PostHog collects and processes data on
            our behalf to help us understand user behavior and improve our Services. For information about how
            PostHog handles data, please review their privacy policy at:{' '}
            <a href="https://posthog.com/privacy" target="_blank" rel="noopener noreferrer">
              https://posthog.com/privacy
            </a>
            {' '}and their terms of service at:{' '}
            <a href="https://posthog.com/terms" target="_blank" rel="noopener noreferrer">
              https://posthog.com/terms
            </a>
          </p>
          <p>
            PostHog may collect information including but not limited to:
          </p>
          <ul>
            <li>Device identifiers and information</li>
            <li>App usage data and events</li>
            <li>User session recordings and interactions</li>
            <li>Feature flag and experiment data</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>9. Children&apos;s Privacy</h2>
          <p>
            Our Services are not directed to individuals under the age of 13. We do not knowingly collect personal 
            information from children under 13. If you are a parent or guardian and believe we have collected 
            information from a child under 13, please contact us immediately, and we will take steps to delete 
            such information.
          </p>
        </section>

        <section className={styles.section}>
          <h2>10. International Data Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries other than your country of residence. 
            These countries may have data protection laws different from those in your country. By using our Services, 
            you consent to the transfer of your information to these countries.
          </p>
          <p>
            We take appropriate safeguards to ensure that your personal information remains protected in accordance 
            with this Privacy Policy when transferred internationally.
          </p>
        </section>

        <section className={styles.section}>
          <h2>11. California Privacy Rights</h2>
          <p>
            If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):
          </p>
          <ul>
            <li><strong>Right to Know:</strong> You can request information about the categories and specific pieces of personal information we collect</li>
            <li><strong>Right to Delete:</strong> You can request deletion of your personal information</li>
            <li><strong>Right to Opt-Out:</strong> You can opt-out of the sale of personal information (we do not sell personal information)</li>
            <li><strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising your privacy rights</li>
          </ul>
          <p>
            To exercise these rights, please contact us using the information provided below. We may need to verify 
            your identity before processing your request.
          </p>
        </section>

        <section className={styles.section}>
          <h2>12. Updates to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, 
            operational, or regulatory reasons. We will notify you of material changes by:
          </p>
          <ul>
            <li>Posting the updated policy in the App</li>
            <li>Updating the &ldquo;Effective Date&rdquo; at the top of this policy</li>
            <li>Sending you a notification through the App or via email</li>
          </ul>
          <p>
            Your continued use of our Services after changes indicates your acceptance of the updated Privacy Policy.
          </p>
        </section>

        <section className={styles.section}>
          <h2>13. Contact Us</h2>
          <p>
            If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, 
            please contact us at:
          </p>
          <div className={styles.contactInfo}>
            <p><strong>StreetFeast LLC</strong></p>
            <a href="mailto:customer-support@streetfeast.com">
              <p>Email: customer-support@streetfeast.com</p>
            </a>
          </div>
          <p>
            For data protection inquiries or to exercise your privacy rights, please email us at privacy@streetfeast.com 
            with &ldquo;Privacy Request&rdquo; in the subject line.
          </p>
        </section>

        <section className={styles.section}>
          <h2>14. Dispute Resolution</h2>
          <p>
            Any disputes arising from this Privacy Policy will be resolved through binding arbitration in accordance 
            with our Terms of Service. By using our Services, you agree to this dispute resolution process.
          </p>
        </section>
      </main>
    </div>
  );
}