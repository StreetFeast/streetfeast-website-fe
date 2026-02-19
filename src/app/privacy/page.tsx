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
  const lastUpdated = "February 18, 2026";

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

        {/* SECTION 1: INTRODUCTION */}
        <section className={styles.section}>
          <h2>1. Introduction</h2>
          <p className={styles.intro}>
            StreetFeast, LLC (&ldquo;StreetFeast,&rdquo; &ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates the StreetFeast mobile application (the &ldquo;App&rdquo;), the website located at streetfeastapp.com (the &ldquo;Website&rdquo;), and all related services, features, and content (collectively, the &ldquo;Services&rdquo;). This Privacy Policy describes how we collect, use, disclose, and protect your information.
          </p>
          <p>
            <strong>BY ACCESSING, DOWNLOADING, INSTALLING, OR USING THE SERVICES IN ANY MANNER, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THE TERMS OF THIS PRIVACY POLICY. IF YOU DO NOT AGREE TO THIS POLICY, YOU MUST IMMEDIATELY CEASE ALL USE OF THE SERVICES. YOUR CONTINUED USE OF THE SERVICES FOLLOWING THE POSTING OF ANY AMENDMENTS TO THIS POLICY SHALL CONSTITUTE YOUR ACCEPTANCE OF SUCH AMENDMENTS.</strong>
          </p>
          <p>
            This Policy applies to all information collected through our Services, regardless of the device or method used to access them. It does not apply to information collected by third parties, including through any application or content that may link to or be accessible from the Services.
          </p>
        </section>

        {/* SECTION 2: DEFINITIONS */}
        <section className={styles.section}>
          <h2>2. Definitions</h2>
          <ul>
            <li><strong>&ldquo;Personal Information&rdquo;</strong> means any information that identifies, relates to, describes, is reasonably capable of being associated with, or could reasonably be linked, directly or indirectly, with a particular individual or household.</li>
            <li><strong>&ldquo;Processing&rdquo;</strong> means any operation or set of operations performed on Personal Information, including collection, recording, organization, structuring, storage, adaptation, alteration, retrieval, consultation, use, disclosure, dissemination, alignment, combination, restriction, erasure, or destruction.</li>
            <li><strong>&ldquo;Service Provider&rdquo;</strong> means a legal entity that processes Personal Information on behalf of StreetFeast pursuant to a written contract.</li>
            <li><strong>&ldquo;Vendor&rdquo;</strong> means any food truck operator, street food vendor, or pop-up restaurant that utilizes the Services to list, promote, or manage their business.</li>
            <li><strong>&ldquo;Device Identifier&rdquo;</strong> means a unique string of characters assigned to or derived from your device, including but not limited to device fingerprints, advertising identifiers, and hardware identifiers.</li>
          </ul>
        </section>

        {/* SECTION 3: INFORMATION WE COLLECT */}
        <section className={styles.section}>
          <h2>3. Information We Collect</h2>

          <h3>3.1 Personal Information You Provide Directly</h3>
          <p>When you create an account, register a food truck, or otherwise interact with the Services, we may collect:</p>
          <ul>
            <li><strong>Account Registration Information:</strong> first name, last name, email address, phone number, and password (stored in hashed form)</li>
            <li><strong>Vendor Registration Information:</strong> truck/business name, ZIP code, and geographic coordinates derived therefrom (latitude and longitude)</li>
            <li><strong>Profile Information:</strong> profile photographs, food preferences, dietary restrictions, and cuisine types</li>
            <li><strong>Communication Data:</strong> name, email address, and message content submitted through our contact forms, as well as any correspondence you direct to our customer support channels</li>
            <li><strong>Payment Information:</strong> subscription selections and billing preferences (note: payment card details are processed directly by our third-party payment processor and are not stored on our servers)</li>
          </ul>

          <h3>3.2 Information Collected Automatically</h3>
          <p>When you access or use the Services, we automatically collect:</p>
          <ul>
            <li><strong>Location Data:</strong> precise GPS coordinates (with your consent) to identify nearby food vendors and provide location-based recommendations; ZIP code-derived geographic coordinates for vendor registration. You may withdraw your consent to these location-based features of the Service by disabling the geolocation function on your mobile device. Please note that withdrawing consent may limit or eliminate certain functionality of the Services, including the ability to discover nearby vendors</li>
            <li><strong>Device Information:</strong> device type, operating system, operating system version, unique device identifiers, mobile network information, and user-agent strings</li>
            <li><strong>Device Fingerprint:</strong> we utilize device fingerprinting technology to generate a unique device identifier based on your browser and device attributes (including browser type, installed plugins, screen resolution, and hardware characteristics) for fraud prevention and security purposes</li>
            <li><strong>Usage Data:</strong> search queries, vendor interactions, pages and screens visited, features utilized, favorites saved, in-app activities, and navigation patterns</li>
            <li><strong>Log Data:</strong> Internet Protocol (IP) address, browser type and version, referring/exit pages, date/time stamps, clickstream data, and diagnostic information</li>
            <li><strong>Local Storage Data:</strong> authentication tokens and session identifiers stored on your device via browser local storage mechanisms</li>
            <li><strong>Push Notification Tokens:</strong> unique device tokens required for the delivery of push notifications to your device</li>
          </ul>

          <h3>3.3 Information from Third-Party Sources</h3>
          <p>We may receive information about you from third-party sources, including:</p>
          <ul>
            <li><strong>Authentication Providers:</strong> account verification data from Supabase, our authentication infrastructure provider</li>
            <li><strong>Analytics Platforms:</strong> aggregated and individual usage metrics from PostHog, our product analytics platform</li>
            <li><strong>Payment Processors:</strong> transaction confirmation data, subscription status, and billing events from Apple App Store and Google Play in-app purchase systems</li>
            <li><strong>Bot Detection Services:</strong> risk assessment scores and verification tokens from Google reCAPTCHA v3</li>
            <li><strong>Mapping Services:</strong> geocoding data and location services from the Google Maps Platform</li>
          </ul>
        </section>

        {/* SECTION 4: LEGAL BASES FOR PROCESSING */}
        <section className={styles.section}>
          <h2>4. Legal Bases for Processing (Applicable Jurisdictions)</h2>
          <p>Where required by applicable law, we process your Personal Information on the following legal bases:</p>
          <ul>
            <li><strong>Contractual Necessity:</strong> Processing necessary for the performance of our contract with you, including account creation, service delivery, vendor-user interactions, and subscription management</li>
            <li><strong>Consent:</strong> Where you have provided explicit, informed, and freely given consent, including for precise location data collection, push notification delivery, and marketing communications. You may withdraw consent at any time as described in Section 9</li>
            <li><strong>Legitimate Interests:</strong> Processing necessary for our legitimate business interests, provided such interests are not overridden by your fundamental rights and freedoms. Our legitimate interests include fraud prevention, service improvement, analytics, security, and enforcement of our terms</li>
            <li><strong>Legal Obligation:</strong> Processing necessary for compliance with applicable legal requirements, including tax obligations, regulatory mandates, law enforcement requests, and litigation preservation duties</li>
          </ul>
        </section>

        {/* SECTION 5: HOW WE USE YOUR INFORMATION */}
        <section className={styles.section}>
          <h2>5. How We Use Your Information</h2>

          <h3>5.1 Service Provision and Operations</h3>
          <ul>
            <li>Create, maintain, and administer your account</li>
            <li>Facilitate connections between users and food vendors</li>
            <li>Process and manage subscriptions through Apple App Store and Google Play in-app purchases</li>
            <li>Provide location-based food vendor discovery and recommendations</li>
            <li>Display vendor locations via Google Maps integration</li>
            <li>Deliver push notifications regarding vendors, events, and service updates</li>
            <li>Enable contact form submissions and customer support communications</li>
            <li>Authenticate your identity and manage session security</li>
          </ul>

          <h3>5.2 Security and Fraud Prevention</h3>
          <ul>
            <li>Verify human interaction and prevent automated abuse via Google reCAPTCHA v3</li>
            <li>Detect and prevent fraudulent activity, unauthorized access, and other illegal activities through device fingerprinting</li>
            <li>Monitor and analyze patterns of suspicious behavior</li>
            <li>Protect the integrity, security, and availability of the Services</li>
          </ul>

          <h3>5.3 Analytics and Improvement</h3>
          <ul>
            <li>Analyze usage patterns, trends, and user behavior through PostHog analytics</li>
            <li>Conduct session recording and replay analysis to identify usability issues</li>
            <li>Evaluate feature adoption and the effectiveness of service improvements</li>
            <li>Conduct A/B testing and feature flag experimentation</li>
            <li>Perform research and analysis for product development and business planning</li>
          </ul>

          <h3>5.4 Communications</h3>
          <ul>
            <li>Send service-related notices, including account verification emails, password reset communications, and subscription confirmations</li>
            <li>Deliver push notifications about nearby vendors, events, promotions, and service updates</li>
            <li>Provide customer support and respond to inquiries submitted through our contact form or support email</li>
            <li>Send marketing and promotional communications (with your prior consent, where required by law)</li>
          </ul>

          <h3>5.5 Legal Compliance and Protection</h3>
          <ul>
            <li>Comply with applicable laws, regulations, legal processes, and governmental requests</li>
            <li>Enforce our Terms of Service, this Privacy Policy, and other agreements</li>
            <li>Protect the rights, property, and safety of StreetFeast, our users, vendors, and the public</li>
            <li>Investigate and address potential violations of our policies or applicable law</li>
          </ul>
        </section>

        {/* SECTION 6: HOW WE SHARE YOUR INFORMATION */}
        <section className={styles.section}>
          <h2>6. How We Share Your Information</h2>
          <p>StreetFeast does not sell, rent, or trade your Personal Information to third parties for their own marketing purposes. We may disclose your information in the following circumstances:</p>

          <h3>6.1 Service Providers and Processors</h3>
          <p>We engage third-party service providers to perform functions on our behalf, subject to contractual obligations of confidentiality and data protection:</p>
          <ul>
            <li><strong>Supabase</strong> — authentication, database hosting, and backend infrastructure</li>
            <li><strong>Apple App Store</strong> — in-app purchase processing and subscription management for iOS devices (Apple&apos;s processing of payment data is governed by Apple&apos;s Privacy Policy at <a href="https://www.apple.com/legal/privacy/" target="_blank" rel="noopener noreferrer">https://www.apple.com/legal/privacy/</a>)</li>
            <li><strong>Google Play</strong> — in-app purchase processing and subscription management for Android devices (Google&apos;s processing of payment data is governed by Google&apos;s Privacy Policy at <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a>)</li>
            <li><strong>PostHog</strong> — product analytics, session recording, and user behavior analysis (PostHog&apos;s data processing is governed by the PostHog Privacy Policy at <a href="https://posthog.com/privacy" target="_blank" rel="noopener noreferrer">https://posthog.com/privacy</a>)</li>
            <li><strong>Google (Maps Platform)</strong> — geocoding, mapping, and location-based services (subject to Google&apos;s Privacy Policy at <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a>)</li>
            <li><strong>Google (reCAPTCHA v3)</strong> — bot detection and abuse prevention (subject to Google&apos;s Privacy Policy and Terms of Service)</li>
            <li><strong>Push Notification Services</strong> — device token management and push notification delivery infrastructure</li>
            <li><strong>Fraud Prevention Services</strong> — device fingerprinting for security and abuse prevention</li>
          </ul>

          <h3>6.2 Food Vendors</h3>
          <p>When you interact with vendors on the platform (e.g., saving favorites, viewing vendor profiles, or engaging with vendor content), certain information may be shared with those vendors to facilitate the service. We do not share your precise location, contact information, or payment details with vendors without your explicit consent.</p>

          <h3>6.3 Legal and Regulatory Disclosures</h3>
          <p>We may disclose your information without your consent where we have a good-faith belief that disclosure is necessary to:</p>
          <ul>
            <li>Comply with applicable laws, regulations, or legal processes, including subpoenas, court orders, or governmental requests</li>
            <li>Enforce our Terms of Service, this Privacy Policy, or other contractual obligations</li>
            <li>Protect the rights, property, or safety of StreetFeast, our users, or the public</li>
            <li>Detect, investigate, prevent, or address fraud, security, or technical issues</li>
          </ul>

          <h3>6.4 Business Transfers</h3>
          <p>In the event of a merger, acquisition, reorganization, bankruptcy, dissolution, asset sale, or similar corporate transaction, your Personal Information may be transferred, sold, or otherwise disclosed to the successor entity. We will use reasonable efforts to direct the transferee to use your Personal Information in a manner consistent with this Policy. In such event, you will be notified via email and/or a prominent notice on our Services of any change in ownership or uses of your Personal Information, as well as any choices you may have regarding your Personal Information.</p>

          <h3>6.5 With Your Consent</h3>
          <p>We may share your Personal Information for purposes not described in this Policy with your express, informed consent.</p>

          <h3>6.6 Aggregated and De-Identified Data</h3>
          <p>We may share aggregated or de-identified information that cannot reasonably be used to identify you with third parties for research, marketing, analytics, and other purposes.</p>
        </section>

        {/* SECTION 7: DATA RETENTION */}
        <section className={styles.section}>
          <h2>7. Data Retention</h2>
          <p>We retain your Personal Information for as long as reasonably necessary to fulfill the purposes for which it was collected, including:</p>
          <ul>
            <li><strong>Active Account Data:</strong> retained for the duration of your account&apos;s existence and active use of the Services</li>
            <li><strong>Transaction and Subscription Records:</strong> retained for a minimum of seven (7) years following the transaction date, as required by applicable tax and financial regulations</li>
            <li><strong>Communication Records:</strong> contact form submissions and customer support correspondence retained for three (3) years from the date of submission</li>
            <li><strong>Usage and Analytics Data:</strong> retained in identifiable form for up to twenty-four (24) months, after which it is aggregated or anonymized</li>
            <li><strong>Security and Fraud Prevention Data:</strong> device fingerprints and security logs retained for up to thirty-six (36) months</li>
            <li><strong>Authentication Logs:</strong> retained for twelve (12) months from the date of the session</li>
          </ul>
          <p>
            Upon account deletion, we will delete or anonymize your Personal Information within thirty (30) calendar days, except where retention is required by applicable law, necessary for the establishment, exercise, or defense of legal claims, or required for our legitimate business interests (e.g., fraud prevention). Cached or archived copies of your information may persist in non-public backup systems for up to ninety (90) days following deletion.
          </p>
        </section>

        {/* SECTION 8: DATA SECURITY */}
        <section className={styles.section}>
          <h2>8. Data Security</h2>
          <p>
            We implement and maintain commercially reasonable administrative, technical, and physical security measures designed to protect your Personal Information from unauthorized access, use, alteration, disclosure, and destruction. These measures include, without limitation:
          </p>
          <ul>
            <li>Encryption of data in transit using TLS/SSL protocols and encryption of data at rest</li>
            <li>Secure password hashing algorithms for credential storage</li>
            <li>Role-based access controls and principle of least privilege</li>
            <li>Regular security assessments, vulnerability scanning, and penetration testing</li>
            <li>Incident response and data breach notification procedures</li>
            <li>Employee and contractor confidentiality obligations and security training</li>
          </ul>
          <p>
            <strong>NOTWITHSTANDING THE FOREGOING, NO METHOD OF ELECTRONIC TRANSMISSION OR STORAGE IS COMPLETELY SECURE, AND WE CANNOT AND DO NOT GUARANTEE THE ABSOLUTE SECURITY OF YOUR PERSONAL INFORMATION. ANY TRANSMISSION OF PERSONAL INFORMATION IS AT YOUR OWN RISK. YOU ARE RESPONSIBLE FOR MAINTAINING THE CONFIDENTIALITY OF YOUR ACCOUNT CREDENTIALS AND FOR ALL ACTIVITIES THAT OCCUR UNDER YOUR ACCOUNT. YOU AGREE TO NOTIFY US IMMEDIATELY OF ANY UNAUTHORIZED USE OF YOUR ACCOUNT OR ANY OTHER BREACH OF SECURITY.</strong>
          </p>
        </section>

        {/* SECTION 9: YOUR RIGHTS AND CHOICES */}
        <section className={styles.section}>
          <h2>9. Your Rights and Choices</h2>

          <h3>9.1 Access and Correction</h3>
          <p>You may access and update your Personal Information through your account settings within the App. You may also submit a verifiable request to access the specific pieces of Personal Information we hold about you by contacting us as described in Section 16.</p>

          <h3>9.2 Data Portability</h3>
          <p>You have the right to request a copy of your Personal Information in a structured, commonly used, and machine-readable format (e.g., JSON or CSV).</p>

          <h3>9.3 Deletion</h3>
          <p>You may request deletion of your account and Personal Information through the App or by visiting our <Link href="/delete-my-data">Delete My Data</Link> page. You may also submit a deletion request by contacting us as described in Section 16. Note that we may retain certain information as required by law or as described in Section 7.</p>

          <h3>9.4 Restriction and Objection</h3>
          <p>Where permitted by applicable law, you have the right to request restriction of processing of your Personal Information and to object to processing based on our legitimate interests. Where required by applicable law, we will review and respond to such requests.</p>

          <h3>9.5 Consent Withdrawal</h3>
          <p>Where processing is based on your consent, you may withdraw consent at any time without affecting the lawfulness of processing based on consent before its withdrawal. Withdrawal of consent may limit the functionality of the Services available to you.</p>

          <h3>9.6 Marketing and Push Notification Opt-Out</h3>
          <p>You may opt out of marketing communications by:</p>
          <ul>
            <li>Adjusting notification preferences in the App&apos;s settings</li>
            <li>Using the unsubscribe mechanism included in marketing emails</li>
            <li>Texting STOP in response to SMS marketing messages</li>
            <li>Disabling push notifications through your device&apos;s operating system settings</li>
          </ul>

          <h3>9.7 Location Services</h3>
          <p>You may disable precise location services at any time through your device&apos;s operating system settings. Disabling location services may limit the functionality of the Services, including the ability to discover nearby vendors.</p>

          <h3>9.8 Do Not Track Signals</h3>
          <p>The Services do not currently respond to &ldquo;Do Not Track&rdquo; (DNT) browser signals or similar mechanisms, as there is no industry-accepted standard for DNT signal interpretation.</p>

          <h3>9.9 Exercising Your Rights</h3>
          <p>To exercise any of the rights described in this Section, please contact us as described in Section 16. We may require you to verify your identity before processing your request. We will respond to verifiable requests within the timeframes required by applicable law (generally within thirty (30) days for CCPA requests). We will not charge a fee for processing your request unless it is manifestly unfounded or excessive.</p>
        </section>

        {/* SECTION 10: COOKIES, LOCAL STORAGE, AND TRACKING TECHNOLOGIES */}
        <section className={styles.section}>
          <h2>10. Cookies, Local Storage, and Tracking Technologies</h2>
          <p>We and our third-party service providers use the following technologies to collect information:</p>
          <ul>
            <li><strong>Cookies:</strong> small data files placed on your device to remember preferences, authenticate sessions, and analyze usage patterns. We use both session cookies (which expire when you close your browser) and persistent cookies (which remain until deleted or expired)</li>
            <li><strong>Local Storage:</strong> the Services use browser local storage to persist authentication tokens (access tokens and refresh tokens) and session data on your device. This data is essential for maintaining your authenticated session and is not transmitted to third parties</li>
            <li><strong>Web Beacons and Pixels:</strong> small electronic images used to monitor user engagement and deliver analytics data</li>
            <li><strong>Device Fingerprinting:</strong> we generate a unique identifier from your browser and device attributes (including browser type, installed plugins, screen resolution, and hardware characteristics) for fraud detection purposes</li>
            <li><strong>reCAPTCHA Tokens:</strong> Google reCAPTCHA v3 operates in the background to assess the risk of interactions and may collect hardware and software information, browser data, and interaction patterns</li>
          </ul>
          <p>
            You may manage cookie preferences through your browser settings. Clearing cookies and local storage will terminate your authenticated session and require you to log in again. Certain tracking technologies are essential for the Services to function and cannot be disabled without impairing core functionality.
          </p>
        </section>

        {/* SECTION 11: THIRD-PARTY ANALYTICS AND SERVICES */}
        <section className={styles.section}>
          <h2>11. Third-Party Analytics and Services</h2>
          <p>
            We use PostHog as our primary product analytics platform. PostHog collects and processes data on our behalf to help us understand user behavior, improve the Services, and optimize user experience. PostHog may collect:
          </p>
          <ul>
            <li>Device identifiers and technical information</li>
            <li>App usage data, screen views, and interaction events</li>
            <li>User session recordings and interaction replays</li>
            <li>Feature flag assignments and experiment participation data</li>
          </ul>
          <p>
            For information about how PostHog processes data, please review their privacy policy at{' '}
            <a href="https://posthog.com/privacy" target="_blank" rel="noopener noreferrer">https://posthog.com/privacy</a>
            {' '}and their terms of service at{' '}
            <a href="https://posthog.com/terms" target="_blank" rel="noopener noreferrer">https://posthog.com/terms</a>.
          </p>
          <p>
            We also utilize Google services (Maps Platform and reCAPTCHA v3), which are governed by Google&apos;s Privacy Policy at{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a>
            {' '}and Google&apos;s Terms of Service at{' '}
            <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">https://policies.google.com/terms</a>.
            {' '}Google reCAPTCHA v3 may collect hardware and software information (including device and application data), and this data is used for improving reCAPTCHA and general security purposes.
          </p>
          <p>
            Our payment processing is handled through Apple App Store and Google Play in-app purchase systems. When you subscribe to paid services, your payment information is collected and processed directly by Apple or Google, depending on your device platform, pursuant to their respective privacy policies. StreetFeast does not store, process, or have access to your payment card numbers or billing details. Apple&apos;s privacy policy is available at{' '}
            <a href="https://www.apple.com/legal/privacy/" target="_blank" rel="noopener noreferrer">https://www.apple.com/legal/privacy/</a>
            {' '}and Google&apos;s privacy policy is available at{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a>.
          </p>
        </section>

        {/* SECTION 12: CHILDREN'S PRIVACY */}
        <section className={styles.section}>
          <h2>12. Children&apos;s Privacy</h2>
          <p>
            The Services are not directed to, and we do not knowingly collect Personal Information from, individuals under the age of sixteen (16). If you are under the age of sixteen (16), you may not use the Services or provide any Personal Information to us. If you are a parent or legal guardian and believe that your child under sixteen (16) has provided us with Personal Information, please contact us immediately at{' '}
            <a href="mailto:customer-support@streetfeastapp.com">customer-support@streetfeastapp.com</a>.
            {' '}Upon verification, we will take prompt steps to delete such information from our systems. If we become aware that we have collected Personal Information from a child under sixteen (16) without verification of parental consent, we will take commercially reasonable steps to delete that information.
          </p>
        </section>

        {/* SECTION 13: GEOGRAPHIC SCOPE */}
        <section className={styles.section}>
          <h2>13. Geographic Scope</h2>
          <p>
            StreetFeast is operated in the United States and is intended for users located within the United States. We do not knowingly offer services to individuals in the European Union or other jurisdictions outside the U.S. Your Personal Information is stored and processed in the United States, and by using the Services, you consent to the storage and processing of your information within the United States.
          </p>
        </section>

        {/* SECTION 14: CALIFORNIA PRIVACY RIGHTS (CCPA/CPRA) */}
        <section className={styles.section}>
          <h2>14. California Privacy Rights (CCPA/CPRA)</h2>
          <p>If you are a California resident, you have the following rights under the California Consumer Privacy Act, as amended by the California Privacy Rights Act (collectively, &ldquo;CCPA&rdquo;):</p>

          <h3>14.1 Right to Know</h3>
          <p>You have the right to request that we disclose the categories and specific pieces of Personal Information we have collected about you, the categories of sources from which the information was collected, the business or commercial purpose for collecting the information, and the categories of third parties with whom we share the information.</p>

          <h3>14.2 Right to Delete</h3>
          <p>You have the right to request deletion of your Personal Information, subject to certain exceptions provided by law.</p>

          <h3>14.3 Right to Correct</h3>
          <p>You have the right to request correction of inaccurate Personal Information that we maintain about you.</p>

          <h3>14.4 Right to Opt-Out of Sale or Sharing</h3>
          <p>StreetFeast does not sell your Personal Information as defined under the CCPA. We do not share your Personal Information for cross-context behavioral advertising purposes.</p>

          <h3>14.5 Right to Limit Use of Sensitive Personal Information</h3>
          <p>To the extent we process sensitive Personal Information (such as precise geolocation), we do so only for purposes authorized under the CCPA, including providing the Services you request.</p>

          <h3>14.6 Right to Non-Discrimination</h3>
          <p>We shall not discriminate against you for exercising any of your CCPA rights, including by denying goods or services, charging different prices, providing a different level or quality of goods or services, or suggesting that you will receive a different price or rate.</p>

          <h3>14.7 Categories of Information Collected</h3>
          <p>In the preceding twelve (12) months, we have collected the following categories of Personal Information as defined by the CCPA: Identifiers (name, email, phone number, IP address, device identifiers); Personal information categories listed in Cal. Civ. Code 1798.80(e) (name, telephone number); Commercial information (subscription records, purchasing history); Internet or electronic network activity (browsing history, interaction with Services); Geolocation data (precise and approximate location); and Inferences drawn from the above to create a profile.</p>

          <h3>14.8 Exercising Your Rights</h3>
          <p>
            To exercise your CCPA rights, please contact us at{' '}
            <a href="mailto:customer-support@streetfeastapp.com">customer-support@streetfeastapp.com</a>
            {' '}with the subject line &ldquo;California Privacy Rights.&rdquo; You may also designate an authorized agent to submit a request on your behalf by providing written authorization. We will verify your identity before fulfilling any request. We will respond to verifiable requests within forty-five (45) calendar days.
          </p>
        </section>

        {/* SECTION 15: DATA BREACH NOTIFICATION */}
        <section className={styles.section}>
          <h2>15. Data Breach Notification</h2>
          <p>In the event of a security breach that results in the unauthorized access, acquisition, or disclosure of your Personal Information, we will:</p>
          <ul>
            <li>Investigate the nature and scope of the breach promptly</li>
            <li>Take reasonable steps to contain and remediate the breach</li>
            <li>Notify affected individuals without unreasonable delay, and in no event later than the timeframes required by applicable state breach notification laws in the United States</li>
            <li>Provide notification to applicable regulatory authorities as required by law</li>
            <li>Include in such notification a description of the nature of the breach, the categories and approximate number of individuals concerned, the likely consequences, and the measures taken or proposed to address the breach</li>
          </ul>
        </section>

        {/* SECTION 16: CONTACT US */}
        <section className={styles.section}>
          <h2>16. Contact Us</h2>
          <p>
            If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
          </p>
          <div className={styles.contactInfo}>
            <p><strong>StreetFeast LLC</strong></p>
            <a href="mailto:customer-support@streetfeastapp.com">
              <p>Email: customer-support@streetfeastapp.com</p>
            </a>
          </div>
          <p>
            For data protection inquiries, privacy rights requests, or to exercise any rights described in this Policy, please email us at{' '}
            <a href="mailto:customer-support@streetfeastapp.com">customer-support@streetfeastapp.com</a>
            {' '}with &ldquo;Privacy Request&rdquo; in the subject line. We endeavor to respond to all legitimate requests within thirty (30) calendar days. In certain circumstances, we may require additional time, in which case we will notify you of the extension and the reasons therefor.
          </p>
        </section>

        {/* SECTION 17: UPDATES TO THIS PRIVACY POLICY */}
        <section className={styles.section}>
          <h2>17. Updates to This Privacy Policy</h2>
          <p>
            We reserve the right to modify this Privacy Policy at any time in our sole discretion. Amendments shall apply to information already collected as well as information collected after the effective date of the amendment. We will notify you of material changes by:
          </p>
          <ul>
            <li>Posting the updated Policy on the App and Website</li>
            <li>Updating the &ldquo;Effective Date&rdquo; at the top of this Policy</li>
            <li>Sending notification through the App or via email for material changes</li>
          </ul>
          <p>
            Your continued use of the Services following the posting of any amendments constitutes your acceptance of such amendments. If you do not agree to the amended Policy, you must discontinue use of the Services and request deletion of your account.
          </p>
        </section>

        {/* SECTION 18: SEVERABILITY */}
        <section className={styles.section}>
          <h2>18. Severability</h2>
          <p>
            If any provision of this Privacy Policy is held to be invalid, illegal, or unenforceable by a court of competent jurisdiction, such invalidity, illegality, or unenforceability shall not affect any other provision of this Policy, and this Policy shall be construed as if such invalid, illegal, or unenforceable provision had never been contained herein. The remaining provisions shall continue in full force and effect.
          </p>
        </section>

        {/* SECTION 19: ENTIRE AGREEMENT */}
        <section className={styles.section}>
          <h2>19. Entire Agreement</h2>
          <p>
            This Privacy Policy, together with our Terms of Service and any other agreements expressly incorporated by reference herein, constitutes the entire agreement between you and StreetFeast with respect to the subject matter hereof and supersedes all prior or contemporaneous communications, representations, or agreements, whether oral or written, with respect to such subject matter.
          </p>
        </section>
      </main>
    </div>
  );
}
