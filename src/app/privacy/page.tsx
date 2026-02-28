import Link from 'next/link';
import styles from './page.module.css';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how StreetFeast protects your privacy and handles your personal information. We are committed to safeguarding your data.',
  openGraph: {
    title: 'Privacy Policy | StreetFeast',
    description: 'Learn how StreetFeast protects your privacy and handles your personal information.',
    url: 'https://streetfeastapp.com/privacy',
  },
};

export default function Privacy() {
  const lastUpdated = "February 26, 2026";

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
            StreetFeast, LLC (&ldquo;StreetFeast,&rdquo; &ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates the StreetFeast mobile application (the &ldquo;App&rdquo;), the website located at streetfeastapp.com (the &ldquo;Site&rdquo;), and any and all related services, features, and content (collectively, the App, Site or any and all related services, features, content, or functionality are referred to herein as the &ldquo;Services&rdquo;). This Privacy Policy (the &ldquo;Privacy Policy&rdquo;) describes how we collect, use, disclose, and protect your information.
          </p>
          <p>
            This Privacy Policy constitutes a legally binding agreement between you (&ldquo;you,&rdquo; &ldquo;your,&rdquo; or &ldquo;User&rdquo;) and StreetFeast, LLC (&ldquo;StreetFeast,&rdquo; &ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). If you are accessing and/or using our Services for an entity, such as the company you work for, you represent that you have authority to bind that entity to this Privacy Policy, and you agree that &ldquo;you,&rdquo; and &ldquo;your,&rdquo; and &ldquo;User&rdquo; as used in this Privacy Policy includes both you personally and the entity you represent. If you are accessing our Services on behalf of only yourself as an individual, then you agree that &ldquo;you,&rdquo; and &ldquo;your,&rdquo; and &ldquo;User&rdquo; as used in this Privacy Policy includes only you personally as an individual.
          </p>
          <p>
            <strong>BY ACCESSING, DOWNLOADING, INSTALLING, OR USING THE SERVICES IN ANY MANNER, YOU ACKNOWLEDGE THAT YOU HAVE READ, FAMILIARIZED, UNDERSTOOD, AND AGREE TO BE BOUND BY THE TERMS OF THIS PRIVACY POLICY. IF YOU DO NOT AGREE TO THIS PRIVACY POLICY, YOU MUST IMMEDIATELY CEASE ALL USE OF THE SERVICES. YOUR CONTINUED USE OF THE SERVICES FOLLOWING THE POSTING OF ANY AMENDMENTS TO THIS PRIVACY POLICY SHALL CONSTITUTE YOUR ACCEPTANCE OF SUCH AMENDMENTS.</strong>
          </p>
          <p>
            This Privacy Policy applies to all information collected through our Services, regardless of the device or method used to access them. This Privacy Policy does not apply to information collected by third parties, including but not limited to information collected by third parties through any application or content that may link to or be accessible from the Services.
          </p>
        </section>

        {/* SECTION 2: DEFINITIONS */}
        <section className={styles.section}>
          <h2>2. Definitions</h2>
          <ul>
            <li><strong>&ldquo;Personal Information&rdquo;</strong> means any information that identifies, relates to, describes, is reasonably capable of being associated with, or could reasonably be linked, directly or indirectly, with a particular individual or household.</li>
            <li><strong>&ldquo;Processing&rdquo;</strong> means any operation or set of operations performed on Personal Information, including but not limited to collection, recording, organization, structuring, storage, adaptation, alteration, retrieval, consultation, use, disclosure, dissemination, alignment, combination, restriction, erasure, or destruction.</li>
            <li><strong>&ldquo;Service Provider&rdquo;</strong> means a legal entity that processes Personal Information on behalf of StreetFeast pursuant to a written contract.</li>
            <li><strong>&ldquo;Vendor&rdquo;</strong> means any food truck operator, street food vendor, or pop-up restaurant that utilizes the Services including, but not limited to listing, promoting, and/or managing their business.</li>
            <li><strong>&ldquo;Device Identifier&rdquo;</strong> means a unique string of characters assigned to or derived from your device, including but not limited to device fingerprints, advertising identifiers, and hardware identifiers.</li>
          </ul>
        </section>

        {/* SECTION 3: INFORMATION WE COLLECT */}
        <section className={styles.section}>
          <h2>3. Information We Collect</h2>

          <h3>3.1 Personal Information You Provide Directly</h3>
          <p>When you create an account, register a food truck, or otherwise interact with the Services, we may collect:</p>
          <ul>
            <li><strong>Information You Provide.</strong> Information you voluntarily provide to us</li>
            <li><strong>Account Registration Information:</strong> first name, last name, email address, phone number, OTP code, password (stored in encrypted form), and ZIP code.</li>
            <li><strong>Vendor Registration Information:</strong> truck/business name, ZIP code, and geographic coordinates derived therefrom (latitude and longitude)</li>
            <li><strong>Profile Information:</strong> profile photographs, photographs, images, food preferences, favorites, dietary restrictions, and cuisine types</li>
            <li><strong>Communication Data:</strong> name, email address, and message content submitted through our contact forms, as well as any correspondence you direct to our customer support channels</li>
            <li><strong>Payment Information:</strong> subscription selections, payment data and billing preferences (note: payment card details are processed directly by our third-party payment processor and are not stored on our servers)</li>
          </ul>

          <h3>3.2 Information Collected Automatically</h3>
          <p>When you access or use the Services, we automatically collect:</p>
          <ul>
            <li><strong>Location Data:</strong> precise GPS coordinates (with your consent); ZIP code-derived geographic coordinates. You may withdraw your consent to these location-based features of the Services by disabling the geolocation function on your mobile device. Please note that withdrawing consent may limit or eliminate certain functionality of the Services, including but not limited to the ability to discover nearby Vendors</li>
            <li><strong>Device Information:</strong> device type, operating system, operating system version, unique Device Identifiers, platform, App version, mobile network information, system timezone, firebase installation ID, Android ID, and user-agent strings</li>
            <li><strong>Device Fingerprint:</strong> we utilize device fingerprinting technology to generate a unique Device Identifier based on your browser and device attributes (including but not limited to browser type, installed plugins, screen resolution, and hardware characteristics) for fraud prevention and security purposes</li>
            <li><strong>Usage Data:</strong> search queries, Vendor interactions, pages and screens visited, features utilized, favorites saved, in-app activities, and navigation patterns</li>
            <li><strong>Log Data:</strong> Internet Protocol (IP) address, browser type and version, referring/exit pages, date/time stamps, clickstream data, and diagnostic information</li>
            <li><strong>Local Storage Data:</strong> authentication tokens and session identifiers stored on your device via browser local storage mechanisms</li>
            <li><strong>Push Notification Tokens:</strong> unique device tokens required for the delivery of push notifications to your device</li>
          </ul>

          <h3>3.3 Information from Third-Party Sources</h3>
          <p>We may receive information about you from third-party sources, including but not limited to:</p>
          <ul>
            <li><strong>Authentication Providers:</strong> account verification data from Supabase, our authentication infrastructure provider</li>
            <li><strong>Analytics Platforms:</strong> aggregated and individual usage metrics from PostHog, our product analytics platform</li>
            <li><strong>Payment Processors:</strong> transaction confirmation data, subscription status, and billing events from Apple App Store and/or Google Play in-app purchase systems</li>
            <li><strong>Bot Detection Services:</strong> risk assessment scores and verification tokens from Google reCAPTCHA v3</li>
            <li><strong>Mapping Services:</strong> geocoding data and location services from the Google Maps Platform and/or Apple Maps Platform</li>
          </ul>
        </section>

        {/* SECTION 4: LEGAL BASES FOR PROCESSING */}
        <section className={styles.section}>
          <h2>4. Legal Bases for Processing (Applicable Jurisdictions)</h2>
          <p>Where required by applicable law, we process your Personal Information on the following legal bases:</p>
          <ul>
            <li><strong>Contractual Necessity:</strong> Processing necessary for the performance of our contract with you, including but not limited to account creation, service delivery, Vendor-user interactions, and subscription management.</li>
            <li><strong>Consent:</strong> Where you have provided explicit, informed, and freely given consent, including but not limited to for precise location data collection, push notification delivery, and marketing communications. You may withdraw consent at any time as described in Section 9.</li>
            <li><strong>Legitimate Interests:</strong> Processing necessary for our legitimate business interests, provided such interests are not overridden by your fundamental rights and freedoms. Our legitimate interests include but are not limited to fraud prevention, Services improvement, analytics, security, and enforcement of our terms.</li>
            <li><strong>Legal Obligation:</strong> Processing necessary for compliance with applicable legal requirements, including but not limited to tax obligations, regulatory mandates, law enforcement requests, and litigation preservation duties.</li>
          </ul>
        </section>

        {/* SECTION 5: HOW WE USE YOUR INFORMATION */}
        <section className={styles.section}>
          <h2>5. How We Use Your Information</h2>

          <h3>5.1 Services Provision and Operations</h3>
          <ul>
            <li>Create, maintain, and administer your account</li>
            <li>Facilitate connections between users and Vendors</li>
            <li>Process and manage subscriptions through Apple App Store and Google Play in-app purchases</li>
            <li>Provide location-based Vendor discovery and recommendations</li>
            <li>Display Vendor locations via Google Maps integration and/or Apple Maps integration</li>
            <li>Deliver push notifications regarding Vendors, events, and Services updates</li>
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
            <li>Analyze usage patterns, trends, and user behavior including, but not limited to through PostHog analytics</li>
            <li>Conduct session recording and replay analysis to identify usability issues</li>
            <li>Evaluate feature adoption and the effectiveness of Services improvements</li>
            <li>Conduct A/B testing and feature flag experimentation</li>
            <li>Perform research and analysis for product development and business planning</li>
          </ul>

          <h3>5.4 Communications</h3>
          <ul>
            <li>Send Services-related notices, including but not limited to account verification emails, password reset communications, and subscription confirmations</li>
            <li>Deliver push notifications about nearby Vendors, events, promotions, and Services updates</li>
            <li>Provide customer support and respond to inquiries submitted through our contact form or support email</li>
            <li>Send marketing and promotional communications (with your prior consent, where required by law)</li>
          </ul>

          <h3>5.5 Legal Compliance and Protection</h3>
          <ul>
            <li>Comply with applicable laws, regulations, legal processes, and governmental requests</li>
            <li>Enforce our Terms of Service, this Privacy Policy, and other agreements</li>
            <li>Protect the rights, property, and safety of StreetFeast, the Services, our users, Vendors, and the public</li>
            <li>Investigate and address potential violations of our policies or applicable law</li>
          </ul>
        </section>

        {/* SECTION 6: HOW WE SHARE YOUR INFORMATION */}
        <section className={styles.section}>
          <h2>6. How We Share Your Information</h2>
          <p>StreetFeast does not sell, rent, or trade your Personal Information to third parties for their own marketing purposes. We may disclose your information in the following circumstances:</p>

          <h3>6.1 Service Providers and Processors</h3>
          <p>We engage third-party Service Providers to perform functions on our behalf, subject to contractual obligations of confidentiality and data protection:</p>
          <ul>
            <li><strong>Supabase</strong> — authentication, database hosting, and backend infrastructure</li>
            <li><strong>Apple App Store</strong> — in-app purchase processing and subscription management for iOS devices (Apple&apos;s processing of payment data is governed by Apple&apos;s Privacy Policy at <a href="https://www.apple.com/legal/privacy/" target="_blank" rel="noopener noreferrer">https://www.apple.com/legal/privacy/</a>)</li>
            <li><strong>Google Play</strong> — in-app purchase processing and subscription management for Android devices (Google&apos;s processing of payment data is governed by Google&apos;s Privacy Policy at <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a>)</li>
            <li><strong>PostHog</strong> — product analytics, session recording, and user behavior analysis (PostHog&apos;s data processing is governed by the PostHog Privacy Policy at <a href="https://posthog.com/privacy" target="_blank" rel="noopener noreferrer">https://posthog.com/privacy</a>)</li>
            <li><strong>Google (Maps Platform)</strong> — geocoding, mapping, and location-based services (subject to Google&apos;s Privacy Policy at <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a>)</li>
            <li><strong>Google (reCAPTCHA v3)</strong> — bot detection and abuse prevention (subject to Google&apos;s Privacy Policy and Terms of Service)</li>
            <li><strong>Apple (Maps Platform)</strong> — geocoding, mapping, and location-based services subject to Apple&apos;s Privacy Policy at <a href="https://www.apple.com/legal/privacy/" target="_blank" rel="noopener noreferrer">https://www.apple.com/legal/privacy/</a>)</li>
            <li><strong>Push Notification Services</strong> — device token management and push notification delivery infrastructure</li>
            <li><strong>Fraud Prevention Services</strong> — device fingerprinting for security and abuse prevention</li>
          </ul>

          <h3>6.2 Data Processing Inventory</h3>

          <div className={styles.dataProcessingEntry}>
            <h4>Supabase</h4>
            <div className={styles.dataProcessingDetails}>
              <p><strong>Service Category:</strong> Authentication &amp; Database</p>
              <p><strong>Purpose of Processing:</strong> User authentication (phone OTP), user profile storage, vendor operator registration, session management</p>
              <p><strong>Data Actively Sent by App:</strong> Phone number, OTP code, first name, last name, email, encrypted password, user metadata, vendor registration data (name, vendor name, ZIP), timezone</p>
              <p><strong>Data Auto-Collected by Vendor:</strong> User UUID, IP address (logged per auth event in auth.audit_log_entries — no automatic TTL), login timestamps, session tokens</p>
              <p><strong>Categories of Data Subjects:</strong> Registered users, vendor operators, guest sessions (anonymous ID)</p>
              <p><strong>Data Storage Location:</strong> AWS (US); logs in Google BigQuery; edge via Cloudflare</p>
              <p><strong>Retention Period:</strong> Duration of account + 30 days post-deletion.</p>
              <p><strong>Sub-Processors:</strong> AWS, Google BigQuery (logs), Cloudflare (edge)</p>
              <p><strong>Notes:</strong> DPA at supabase.com/legal/dpa. Also stores anonymous guest IDs.</p>
            </div>
          </div>

          <div className={styles.dataProcessingEntry}>
            <h4>Sentry</h4>
            <div className={styles.dataProcessingDetails}>
              <p><strong>Service Category:</strong> Error Monitoring</p>
              <p><strong>Purpose of Processing:</strong> Application error tracking, crash reporting, performance monitoring, error session replay</p>
              <p><strong>Data Actively Sent by App:</strong> User ID, all console.log output (enableLogs: true)</p>
              <p><strong>Data Auto-Collected by Vendor:</strong> device model, OS, RAM, battery, screen size, jailbreak status, stack traces, breadcrumbs of all HTTP requests (including URLs with query params)</p>
              <p><strong>Categories of Data Subjects:</strong> All App users</p>
              <p><strong>Data Storage Location:</strong> Google Cloud Platform (US)</p>
              <p><strong>Retention Period:</strong> 90 days</p>
              <p><strong>Sub-Processors:</strong> GCP</p>
              <p><strong>Notes:</strong> Session replay enabled with text/images masked by default. DPA at sentry.io/legal/dpa.</p>
            </div>
          </div>

          <div className={styles.dataProcessingEntry}>
            <h4>PostHog</h4>
            <div className={styles.dataProcessingDetails}>
              <p><strong>Service Category:</strong> Product Analytics</p>
              <p><strong>Purpose of Processing:</strong> Product analytics, feature usage tracking, funnel analysis, event tracking (notification presses, vendor searches, marker presses, phone/directions presses, favorites)</p>
              <p><strong>Data Actively Sent by App:</strong> User ID, email, first name, last name (via posthog.identify())</p>
              <p><strong>Data Auto-Collected by Vendor:</strong> Anonymous UUID (persistent), device model, OS, app version, locale, timezone, screen size, session ID, screen names, IP-derived geolocation — city, country, lat/lon (GeoIP enabled by default, disableGeoip not set)</p>
              <p><strong>Categories of Data Subjects:</strong> All App users</p>
              <p><strong>Data Storage Location:</strong> AWS US-East-1 (Virginia)</p>
              <p><strong>Retention Period:</strong> Configurable</p>
              <p><strong>Sub-Processors:</strong> AWS</p>
              <p><strong>Notes:</strong> GeoIP is active. IP-derived city/country/coordinates collected on every event. PII (name, email) sent via identify(). DPA via PostHog settings.</p>
            </div>
          </div>

          <div className={styles.dataProcessingEntry}>
            <h4>Firebase Cloud Messaging (Google)</h4>
            <div className={styles.dataProcessingDetails}>
              <p><strong>Service Category:</strong> Push Notifications</p>
              <p><strong>Purpose of Processing:</strong> Delivering push notifications to user devices, Firebase Installation ID management</p>
              <p><strong>Data Actively Sent by App:</strong> FCM push token, notification payloads</p>
              <p><strong>Data Auto-Collected by Vendor:</strong> Firebase Installation ID (FID) — created on first launch, API key, app ID, device model, OS, locale, timezone, IP address (on every Firebase request, no anonymization option), daily heartbeat (SDK version, platform info)</p>
              <p><strong>Categories of Data Subjects:</strong> All App users</p>
              <p><strong>Data Storage Location:</strong> Google global infrastructure (no region lock for FCM)</p>
              <p><strong>Retention Period:</strong> Tokens valid until app uninstall or token refresh; message logs per Google/Firebase policy</p>
              <p><strong>Sub-Processors:</strong> Google ecosystem</p>
              <p><strong>Notes:</strong> DPA via firebase.google.com/terms/data-processing-terms.</p>
            </div>
          </div>

          <div className={styles.dataProcessingEntry}>
            <h4>Apple (StoreKit / App Store)</h4>
            <div className={styles.dataProcessingDetails}>
              <p><strong>Service Category:</strong> Payment Processing</p>
              <p><strong>Purpose of Processing:</strong> In-app subscription purchase processing and receipt validation</p>
              <p><strong>Data Actively Sent by App:</strong> Apple ID (anonymized), transaction ID, subscription status</p>
              <p><strong>Data Auto-Collected by Vendor:</strong> Purchase history, device identifiers</p>
              <p><strong>Categories of Data Subjects:</strong> iOS subscribers</p>
              <p><strong>Data Storage Location:</strong> US / Global (Apple infrastructure)</p>
              <p><strong>Retention Period:</strong> Per Apple retention policies</p>
              <p><strong>DPA Status:</strong> Independent controller</p>
              <p><strong>Sub-Processors:</strong> Apple ecosystem</p>
              <p><strong>Notes:</strong> Apple acts as merchant of record. StreetFeast has no direct access to payment instruments.</p>
            </div>
          </div>

          <div className={styles.dataProcessingEntry}>
            <h4>Google (Google Play Billing)</h4>
            <div className={styles.dataProcessingDetails}>
              <p><strong>Service Category:</strong> Payment Processing</p>
              <p><strong>Purpose of Processing:</strong> In-app subscription purchase processing and receipt validation</p>
              <p><strong>Data Actively Sent by App:</strong> Google account ID (anonymized), transaction ID, subscription status</p>
              <p><strong>Data Auto-Collected by Vendor:</strong> Purchase history, device identifiers</p>
              <p><strong>Categories of Data Subjects:</strong> Android subscribers</p>
              <p><strong>Data Storage Location:</strong> US / Global (Google infrastructure)</p>
              <p><strong>Retention Period:</strong> Per Google retention policies</p>
              <p><strong>DPA Status:</strong> Independent controller</p>
              <p><strong>Sub-Processors:</strong> Google ecosystem</p>
              <p><strong>Notes:</strong> Google acts as merchant of record. StreetFeast has no direct access to payment instruments.</p>
            </div>
          </div>

          <div className={styles.dataProcessingEntry}>
            <h4>RevenueCat</h4>
            <div className={styles.dataProcessingDetails}>
              <p><strong>Service Category:</strong> Subscription Management</p>
              <p><strong>Purpose of Processing:</strong> Cross-platform subscription management, entitlement tracking, receipt validation</p>
              <p><strong>Data Actively Sent by App:</strong> App user ID (passed via Purchases.logIn(userId))</p>
              <p><strong>Data Auto-Collected by Vendor:</strong> Anonymous ID (if no user ID), device model, OS, app version, ATT consent status (iOS), product IDs, transaction IDs, purchase dates, expiry dates, prices, currencies, country code (derived from IP, then IP discarded)</p>
              <p><strong>Categories of Data Subjects:</strong> All subscribers (iOS &amp; Android)</p>
              <p><strong>Data Storage Location:</strong> AWS US</p>
              <p><strong>Retention Period:</strong> Duration of account + per RevenueCat policy</p>
              <p><strong>Sub-Processors:</strong> AWS, Apple, Google</p>
              <p><strong>Notes:</strong> IP processed to derive country code then discarded. DPA at revenuecat.com/dpa.</p>
            </div>
          </div>

          <div className={styles.dataProcessingEntry}>
            <h4>Twilio</h4>
            <div className={styles.dataProcessingDetails}>
              <p><strong>Service Category:</strong> SMS / Messaging</p>
              <p><strong>Purpose of Processing:</strong> Sending transactional SMS (verification codes, notifications)</p>
              <p><strong>Data Actively Sent by App:</strong> Phone number, message content, delivery status, timestamps</p>
              <p><strong>Data Auto-Collected by Vendor:</strong> IP address (server-side), carrier metadata</p>
              <p><strong>Categories of Data Subjects:</strong> Registered users receiving SMS</p>
              <p><strong>Data Storage Location:</strong> USA</p>
              <p><strong>Retention Period:</strong> Message content: ~30 days; logs: per Twilio policy</p>
              <p><strong>Sub-Processors:</strong> Carrier networks</p>
              <p><strong>Notes:</strong> DPA at twilio.com/legal/data-protection-addendum</p>
            </div>
          </div>

          <div className={styles.dataProcessingEntry}>
            <h4>Resend</h4>
            <div className={styles.dataProcessingDetails}>
              <p><strong>Service Category:</strong> Email Delivery</p>
              <p><strong>Purpose of Processing:</strong> Sending transactional emails (welcome, password resets, notifications)</p>
              <p><strong>Data Actively Sent by App:</strong> Email address, first name (for personalization), email content</p>
              <p><strong>Data Auto-Collected by Vendor:</strong> Delivery/open/click status, IP (server-side)</p>
              <p><strong>Categories of Data Subjects:</strong> Registered users receiving emails</p>
              <p><strong>Data Storage Location:</strong> US (AWS)</p>
              <p><strong>Retention Period:</strong> Email logs per Resend policy</p>
              <p><strong>Sub-Processors:</strong> AWS SES</p>
              <p><strong>Notes:</strong> DPA at <a href="https://resend.com/legal/dpa" target="_blank" rel="noopener noreferrer">https://resend.com/legal/dpa</a></p>
            </div>
          </div>

          <div className={styles.dataProcessingEntry}>
            <h4>Google Maps Platform</h4>
            <div className={styles.dataProcessingDetails}>
              <p><strong>Service Category:</strong> Mapping / Geolocation</p>
              <p><strong>Purpose of Processing:</strong> Map rendering, geocoding, location-based search results, displaying user location on map</p>
              <p><strong>Data Actively Sent by App:</strong> User location (lat/lon), search queries</p>
              <p><strong>Data Auto-Collected by Vendor:</strong> IP address, device identifiers (per Google policy)</p>
              <p><strong>Categories of Data Subjects:</strong> All App users using map features</p>
              <p><strong>Data Storage Location:</strong> US / Global (Google infrastructure)</p>
              <p><strong>Retention Period:</strong> Per Google Maps Platform ToS</p>
              <p><strong>DPA Status:</strong> Google Cloud DPA</p>
              <p><strong>Sub-Processors:</strong> Google ecosystem</p>
              <p><strong>Notes:</strong> Location data sent to Google for map rendering.</p>
            </div>
          </div>

          <div className={styles.dataProcessingEntry}>
            <h4>Mapbox</h4>
            <div className={styles.dataProcessingDetails}>
              <p><strong>Service Category:</strong> Mapping / Geolocation</p>
              <p><strong>Purpose of Processing:</strong> Map rendering, location display, geospatial features</p>
              <p><strong>Data Actively Sent by App:</strong> User location (lat/lon), map tile coordinates</p>
              <p><strong>Data Auto-Collected by Vendor:</strong> Daily &ldquo;turnstile&rdquo; event (device model, OS, SDK version) — collected even with telemetry off. IP address on every tile request (retained 30 days at load balancer). Map tile coordinates reveal area user is viewing.</p>
              <p><strong>Categories of Data Subjects:</strong> All App users using map features</p>
              <p><strong>Data Storage Location:</strong> AWS US, CloudFront CDN globally</p>
              <p><strong>Retention Period:</strong> IP: 30 days at load balancer; per Mapbox policy otherwise</p>
              <p><strong>Sub-Processors:</strong> AWS, CloudFront</p>
              <p><strong>Notes:</strong> Turnstile events and IP collection still occur. Independent data controller for mobile SDK telemetry data. DPA at mapbox.com/legal/dpa.</p>
            </div>
          </div>

          <div className={styles.dataProcessingEntry}>
            <h4>Azure Blob Storage (Microsoft)</h4>
            <div className={styles.dataProcessingDetails}>
              <p><strong>Service Category:</strong> File Storage</p>
              <p><strong>Purpose of Processing:</strong> Storage of user-uploaded images (truck profile photos) via SAS tokens</p>
              <p><strong>Data Actively Sent by App:</strong> Photos (may contain EXIF/GPS metadata), base64 image data</p>
              <p><strong>Data Auto-Collected by Vendor:</strong> IP address, access timestamps (storage analytics)</p>
              <p><strong>Categories of Data Subjects:</strong> Vendor operators uploading profile images</p>
              <p><strong>Data Storage Location:</strong> Azure (US)</p>
              <p><strong>Retention Period:</strong> Until deleted by App logic</p>
              <p><strong>Sub-Processors:</strong> Microsoft Azure infrastructure</p>
              <p><strong>Notes:</strong> DPA at microsoft.com/licensing/docs/view/Microsoft-Products-and-Services-Data-Protection-Addendum-DPA.</p>
            </div>
          </div>

          <div className={styles.dataProcessingEntry}>
            <h4>Expo Services (EAS Update, Push)</h4>
            <div className={styles.dataProcessingDetails}>
              <p><strong>Service Category:</strong> App Updates &amp; Push Infrastructure</p>
              <p><strong>Purpose of Processing:</strong> Over-the-air app updates (EAS Update), push notification infrastructure</p>
              <p><strong>Data Actively Sent by App:</strong> Device push tokens (for Expo push service)</p>
              <p><strong>Data Auto-Collected by Vendor:</strong> OS type, runtime version, random install token (not linked to identity). expo-constants reads ANDROID_ID at module load time before consent possible. Notification contents held transiently, not persisted.</p>
              <p><strong>Categories of Data Subjects:</strong> All App users</p>
              <p><strong>Retention Period:</strong> Push tokens: duration of registration; update metadata: per Expo policy</p>
              <p><strong>Sub-Processors:</strong> Expo infrastructure</p>
              <p><strong>Notes:</strong> DPA at expo.dev/security.</p>
            </div>
          </div>

          <h3>6.3 Vendors</h3>
          <p>When you interact with Vendors on the platform (e.g., saving favorites, viewing Vendor profiles, or engaging with Vendor content), certain information may be shared with those Vendors to facilitate the Services. We do not share your precise location, contact information, or payment details with Vendors without your explicit consent.</p>

          <h3>6.4 Legal and Regulatory Disclosures</h3>
          <p>We may disclose your information without your consent where we have a good-faith belief that disclosure is necessary to:</p>
          <ul>
            <li>Comply with applicable laws, regulations, or legal processes, including subpoenas, court orders, or governmental requests</li>
            <li>Enforce our Terms of Service, this Privacy Policy, or other contractual obligations</li>
            <li>Protect the rights, property, or safety of StreetFeast, our users, or the public</li>
            <li>Detect, investigate, prevent, or address fraud, security, or technical issues</li>
          </ul>

          <h3>6.5 Business Transfers</h3>
          <p>In the event of a merger, acquisition, reorganization, bankruptcy, dissolution, asset sale, financing or similar corporate transaction, your Personal Information may be transferred, sold, or otherwise disclosed to the successor entity. We will use reasonable efforts to direct the transferee to use your Personal Information in a manner consistent with this Policy. In such event, you will be notified via email and/or a prominent notice on our Services of any change in ownership or uses of your Personal Information, as well as any choices you may have regarding your Personal Information.</p>

          <h3>6.6 With Your Consent</h3>
          <p>We may share your Personal Information for purposes not described in this Policy with your express, informed consent, including but not limited to fulfill requests from you.</p>

          <h3>6.7 Aggregated and De-Identified Data</h3>
          <p>We may share aggregated or de-identified information that cannot reasonably be used to identify you with third parties for research, marketing, analytics, and other purposes.</p>
        </section>

        {/* SECTION 7: DATA RETENTION */}
        <section className={styles.section}>
          <h2>7. Data Retention</h2>
          <p>We retain your Personal Information for as long as reasonably necessary to fulfill the purposes for which it was collected, including but not limited to:</p>
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
            We implement and maintain commercially reasonable administrative, technical, organizational, and physical security measures designed to protect your Personal Information from unauthorized access, use, alteration, disclosure, and destruction. These measures include, without limitation:
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
            <strong>NOTWITHSTANDING THE FOREGOING, NO METHOD OF ELECTRONIC TRANSMISSION OR STORAGE IS COMPLETELY SECURE, PERFECT OR IMPENETRABLE AND WE CANNOT AND DO NOT PROMISE OR GUARANTEE THE ABSOLUTE SECURITY OF YOUR PERSONAL INFORMATION. ANY TRANSMISSION OF PERSONAL INFORMATION IS AT YOUR OWN RISK. YOU ARE RESPONSIBLE FOR MAINTAINING THE CONFIDENTIALITY OF YOUR ACCOUNT CREDENTIALS AND FOR ALL ACTIVITIES THAT OCCUR UNDER YOUR ACCOUNT. YOU SHOULD ONLY ACCESS THE SERVICES WITHIN A SECURE ENVIRONMENT. YOU AGREE TO IMMEDIATELY NOTIFY US IMMEDIATELY OF ANY UNAUTHORIZED USE OF YOUR ACCOUNT OR ANY OTHER BREACH OF SECURITY.</strong>
          </p>
        </section>

        {/* SECTION 9: YOUR RIGHTS AND CHOICES */}
        <section className={styles.section}>
          <h2>9. Your Rights and Choices</h2>

          <h3>9.1 Access and Correction</h3>
          <p>You may access and update your Personal Information through your account settings within the App. You may also submit a verifiable request to access the specific pieces of Personal Information we hold about you by contacting us as described in Section 21.</p>

          <h3>9.2 Data Portability</h3>
          <p>You have the right to request a copy of your Personal Information in a structured, commonly used, and machine-readable format (e.g., JSON or CSV).</p>

          <h3>9.3 Deletion</h3>
          <p>You may request deletion of your account and Personal Information through the App or by visiting our <Link href="/delete-my-data">Delete My Data</Link> page. You may also submit a deletion request by contacting us as described in Section 21. Note that we may retain certain information as required by law or as described in Section 7.</p>

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
          <p>You may disable precise location services at any time through your device&apos;s operating system settings. Disabling location services may limit the functionality of the Services, including but not limited to the ability to discover nearby Vendors.</p>

          <h3>9.8 Do Not Track Signals</h3>
          <p>The Services do not currently respond to &ldquo;Do Not Track&rdquo; (DNT) browser signals or similar mechanisms, as there is no industry-accepted standard for DNT signal interpretation.</p>

          <h3>9.9 Exercising Your Rights</h3>
          <p>To exercise any of the rights described in this Section, please contact us as described in Section 21. We may require you to verify your identity before processing your request. We will respond to verifiable requests within the timeframes required by applicable law. We will not charge you a fee to process or respond to your verifiable consumer request unless your request is excessive, repetitive or manifestly unfounded. Should we determine that your request warrants that we charge a fee, we will communicate why it made that decision along with the estimated costs associated with your request prior to completing your request.</p>
          <p>You can also designate an authorized agent to make a request on your behalf. If you use an authorized agent, please include written permission that you have designated that agent to make the request, or proof of the agent&apos;s power of attorney. We may follow up with you to verify your identity before processing your authorized agent&apos;s request.</p>
          <p>If you are a resident of certain jurisdictions, then please see your additional rights listed in Section 14.</p>
        </section>

        {/* SECTION 10: COOKIES, LOCAL STORAGE, AND TRACKING TECHNOLOGIES */}
        <section className={styles.section}>
          <h2>10. Cookies Policy, Local Storage, and Tracking Technologies</h2>

          <h3>10.1 Overview</h3>
          <p>We and our third-party Service Providers use the following technologies to collect information:</p>
          <ul>
            <li><strong>Cookies:</strong> small data files placed on your device to remember preferences, authenticate sessions, and analyze usage patterns. We use both session cookies (which expire when you close your browser) and persistent cookies (which remain until deleted or expired)</li>
            <li><strong>Local Storage:</strong> the Services use browser local storage to persist authentication tokens (access tokens and refresh tokens) and session data on your device. This data is essential for maintaining your authenticated session and is not transmitted to third parties</li>
            <li><strong>Web Beacons and Pixels:</strong> small electronic images used to monitor user engagement and deliver analytics data</li>
            <li><strong>Device Fingerprinting:</strong> we generate a unique identifier from your browser and device attributes (including browser type, installed plugins, screen resolution, and hardware characteristics) for fraud detection purposes</li>
            <li><strong>reCAPTCHA Tokens:</strong> Google reCAPTCHA v3 operates in the background to assess the risk of interactions and may collect hardware and software information, browser data, and interaction patterns</li>
          </ul>

          <h3>10.2 Cookies Policy</h3>
          <p>By continuing to use the Services you are agreeing to the use of cookies and other similar technologies for the purposes we describe in this Cookies Policy.</p>
          <p>The Services uses both first party cookies which are set directly by us and third party cookies which are set by third parties. We use first party and third party cookies for several reasons. Some cookies are required for technical reasons in order for the Services to operate, and we refer to these as &ldquo;Strictly Necessary&rdquo; cookies. Some cookies allow us to measure and improve the performance of the Services, such as by counting visits and traffic sources, and we refer to these as &ldquo;Performance&rdquo; cookies. Some cookies enable us to provide enhanced functionality and personalization of the Services, and we refer to these as &ldquo;Functional&rdquo; cookies. The specific types of cookies served through the Services and the purposes they perform are described below:</p>
          <ul>
            <li><strong>Strictly Necessary Cookies:</strong> These cookies enable you to navigate the Services and to use their services and features. These cookies are necessary for the Services to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, authenticating users, or logging in or filling in forms. You can set your browser to block or alert you about these cookies, but some parts of the Services will not work.</li>
            <li><strong>Performance Cookies:</strong> These cookies and other technologies improve your experience by enabling personalization (for example, remembering if you have logged into the Services before), as well as enabling certain features. Performance cookies may also help you fill out forms in the Services more easily.</li>
            <li><strong>Functional Cookies:</strong> These cookies and other technologies help us learn how well the Services are performing. We use these cookies to understand, improve, and research the Services.</li>
            <li><strong>Unclassified:</strong> Unclassified cookies are cookies that we are in the process of classifying, together with the providers of individual cookies.</li>
          </ul>
          <p>
            You may manage cookie preferences through your browser settings. Clearing cookies and local storage will terminate your authenticated session and require you to log in again. Certain tracking technologies are essential for the Services to function and cannot be disabled without impairing core functionality. In addition, you may: (1) delete your cookies (see below for information on deleting cookies); and then (2) refresh the web page. If you do not agree to the use of cookies, you also may disable or delete the cookies by following the instructions for your browser(s) set out at{' '}
            <a href="http://www.allaboutcookies.org/manage-cookies/index.html" target="_blank" rel="noopener noreferrer">http://www.allaboutcookies.org/manage-cookies/index.html</a>. Please note that the Services will not function well if cookies are disabled. It may also stop you from saving customized settings, like login information or a multitude of other critical functions. You may download a browser extension that will help preserve the opt-out preferences you set by visiting{' '}
            <a href="https://www.aboutads.info/PMC" target="_blank" rel="noopener noreferrer">www.aboutads.info/PMC</a>.
          </p>
        </section>

        {/* SECTION 11: THIRD-PARTY ANALYTICS AND SERVICES */}
        <section className={styles.section}>
          <h2>11. Third-Party Analytics and Services</h2>
          <p>
            We use PostHog as our primary product analytics platform. PostHog collects and processes data on our behalf to help us understand user behavior, improve the Services, and optimize user experience. PostHog may collect:
          </p>
          <ul>
            <li>Device Identifiers and technical information</li>
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
            We also utilize Google services (Maps Platform and reCAPTCHA v3), which are governed by Google&apos;s Privacy Policy at <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a> and Google&apos;s Terms of Service at <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">https://policies.google.com/terms</a>. Google reCAPTCHA v3 may collect hardware and software information (including but not limited to device and application data), and this data is used for improving reCAPTCHA and general security purposes. We also utilize Apple services (Maps Platform), which is governed by Apple&apos;s privacy policy is available at <a href="https://www.apple.com/legal/privacy/" target="_blank" rel="noopener noreferrer">https://www.apple.com/legal/privacy/</a>.
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
            The Services are not directed to, and we do not knowingly collect Personal Information from, solicit Personal Information from or market to individuals under the age of thirteen (13). If you are under the age of thirteen (13), you may not use the Services or provide any Personal Information to us. If you are a parent or legal guardian and believe that your child under the age of thirteen (13) has provided us with Personal Information, please contact us immediately at{' '}
            <a href="mailto:customer-support@streetfeastapp.com">customer-support@streetfeastapp.com</a>.
            {' '}Upon verification, we will take prompt steps to deactivate the account and delete such information from our systems. If we become aware that we have collected Personal Information from a child under the age of thirteen (13) without verification of parental consent, we will take commercially reasonable steps to delete that information.
          </p>
        </section>

        {/* SECTION 13: GEOGRAPHIC SCOPE */}
        <section className={styles.section}>
          <h2>13. Geographic Scope</h2>
          <p>
            The Services are operated in the United States of America and is intended for users located within the United States of America. We do not knowingly offer Services to individuals in the European Union or other jurisdictions outside the United States of America. As such, we make no representation that the Services are appropriate or available for use beyond the United States of America. If you use the Services outside of the United States of America, you are doing so on your own initiative and you are solely responsible for compliance with applicable local laws regarding your online conduct and acceptable content, if and to the extent local laws apply. Your Personal Information is stored and processed in the United States of America, and by using the Services, you consent to the storage and processing of your information within the United States of America.
          </p>
        </section>

        {/* SECTION 14: STATE SPECIFIC PRIVACY RIGHTS */}
        <section className={styles.section}>
          <h2>14. State Specific Privacy Rights</h2>

          <h3>14.1 California Privacy Rights</h3>
          <p>If you are a California resident, you have the following rights under the California Consumer Privacy Act, as amended by the California Privacy Rights Act (collectively, &ldquo;CCPA&rdquo;). This information supplements our Privacy Policy for California residents only. The following rights do not apply to individuals who reside outside of California.</p>

          <h4>14.1.1 Right to Know</h4>
          <p>You have the right to request that we disclose the categories and specific pieces of Personal Information we have collected about you, the categories of sources from which the information was collected, the business or commercial purpose for collecting the information, and the categories of third parties with whom we share the information.</p>

          <h4>14.1.2 Right to Delete</h4>
          <p>You have the right to request deletion of your Personal Information, subject to certain exceptions provided by law. For example, we are not required to delete Personal Information if it is necessary for us to complete your transaction. We are also not required to delete your Personal Information if it is for an ongoing business relationship. Upon receipt and verification of a consumer request to delete Personal Information, we will delete (and direct third-party service providers to delete) your Personal Information from our records, unless an exclusion applies.</p>

          <h4>14.1.3 Right to Correct</h4>
          <p>You have the right to request correction of inaccurate Personal Information that we maintain about you.</p>

          <h4>14.1.4 Right to Opt-Out of Sale or Sharing</h4>
          <p>StreetFeast does not sell your Personal Information as defined under the CCPA. We do not share your Personal Information for cross-context behavioral advertising purposes.</p>

          <h4>14.1.5 Right to Limit Use of Sensitive Personal Information</h4>
          <p>To the extent we process sensitive Personal Information (such as precise geolocation), we do so only for purposes authorized under the CCPA, including providing the Services you request.</p>

          <h4>14.1.6 Right to Non-Discrimination</h4>
          <p>We shall not discriminate against you for exercising any of your CCPA rights, including by denying goods or services, charging different prices, providing a different level or quality of goods or services, or suggesting that you will receive a different price or rate.</p>

          <h4>14.1.7 Categories of Information Collected</h4>
          <p>In the preceding twelve (12) months, we have collected the following categories of Personal Information as defined by the CCPA: Identifiers (name, email, phone number, IP address, Device Identifiers); Personal information categories listed in Cal. Civ. Code 1798.80(e) (name, telephone number); Commercial information (subscription records, purchasing history); Internet or electronic network activity (browsing history, interaction with Services); Geolocation data (precise and approximate location); and Inferences drawn from the above to create a profile.</p>

          <h4>14.1.8 Exercising Your Rights</h4>
          <p>
            To exercise your CCPA rights, please contact us at{' '}
            <a href="mailto:customer-support@streetfeastapp.com">customer-support@streetfeastapp.com</a>
            {' '}with the subject line &ldquo;California Privacy Rights.&rdquo; You may also designate an authorized agent to submit a request on your behalf by providing written authorization. We will verify your identity before fulfilling any request. We may follow up with you to verify your identity before processing your authorized agent&apos;s request. We will respond to verifiable requests within forty-five (45) calendar days. In the event that we need additional time to respond, we will notify you in writing of the reason why additional time is necessary and the extension period for response which shall comply with current law. In order to be able to provide such writing, we will need your email address or U.S. mailing address. The response to a verifiable consumer request will cover the twelve (12) month period preceding our receipt of the request or the amount required by law, whichever is greater. If for any reason we cannot comply with all or part of your request, we will explain the reasons why. For data portability requests, we will select a format to provide your personal information that is readily usable and should allow you to transmit information easily from one entity to another entity. We will not charge you a fee to process or respond to your verifiable consumer request unless your request is excessive, repetitive or manifestly unfounded. Should we determine that your request warrants that we charge a fee, we will communicate why it made that decision along with the estimated costs associated with your request prior to completing your request.
          </p>
          <p>
            In addition, you may report a complaint to the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs by telephone at (800) 952-5210 or by mail at California Department of Consumer Affairs, 400 R Street, Sacramento, CA 95814.
          </p>

          <h3>14.2 Colorado Privacy Rights</h3>
          <p>If you are a Colorado resident, you have the following rights under the Colorado Privacy Act (&ldquo;CPA&rdquo;). This information supplements our Privacy Policy for Colorado residents only. The following rights do not apply to individuals who reside outside of Colorado.</p>
          <p>Under the CPA, you have the rights listed below which are not absolute, and in certain cases, we may decline your request as permitted by law:</p>
          <ul>
            <li>Right to be informed whether or not we are processing your personal data.</li>
            <li>Right to access your personal data.</li>
            <li>Right to correct inaccuracies in your personal data.</li>
            <li>Right to request deletion of your personal data.</li>
            <li>Right to obtain a copy of the personal data you previously shared with us.</li>
            <li>Right to opt out of the processing of your personal data if it is used for targeted advertising, the sale of personal data, or profiling in furtherance of decisions that produce legal or similarly significant effects (&ldquo;profiling&rdquo;).</li>
          </ul>
          <p>We do not sell or share your personal information, as those terms are defined under the CPA. We do not share your Personal Information for cross-context behavioral advertising purposes.</p>
          <p>To exercise your CPA rights, please contact us at <a href="mailto:customer-support@streetfeastapp.com">customer-support@streetfeastapp.com</a> with the subject line &ldquo;Colorado Privacy Rights.&rdquo; You may also designate an authorized agent to submit a request on your behalf by providing written authorization. We will verify your identity before fulfilling any request. We may follow up with you to verify your identity before processing your authorized agent&apos;s request. We will respond to verifiable requests within forty-five (45) calendar days. In the event that we need additional time to respond, we will notify you in writing of the reason why additional time is necessary and the extension period for response which shall comply with current law. In order to be able to provide such writing, we will need your email address or U.S. mailing address. The response to a verifiable consumer request will cover the twelve (12) month period preceding our receipt of the request or the amount required by law, whichever is greater. If for any reason we cannot comply with all or part of your request, we will explain the reasons why. For data portability requests, we will select a format to provide your personal information that is readily usable and should allow you to transmit information easily from one entity to another entity. We will not charge you a fee to process or respond to your verifiable consumer request unless your request is excessive, repetitive or manifestly unfounded. Should we determine that your request warrants that we charge a fee, we will communicate why it made that decision along with the estimated costs associated with your request prior to completing your request.</p>

          <h3>14.3 Connecticut Privacy Rights</h3>
          <p>If you are a Connecticut resident, you have the following rights under the Connecticut Data Privacy Act (&ldquo;CTDPA&rdquo;). This information supplements our Privacy Policy for Connecticut residents only. The following rights do not apply to individuals who reside outside of Connecticut.</p>
          <p>Under the CTDPA, you have the rights listed below which are not absolute, and in certain cases, we may decline your request as permitted by law:</p>
          <ul>
            <li>Right to be informed whether or not we are processing your personal data.</li>
            <li>Right to access your personal data.</li>
            <li>Right to correct inaccuracies in your personal data.</li>
            <li>Right to request deletion of your personal data.</li>
            <li>Right to obtain a copy of the personal data you previously shared with us.</li>
            <li>Right to opt out of the processing of your personal data if it is used for targeted advertising, the sale of personal data, or profiling in furtherance of decisions that produce legal or similarly significant effects (&ldquo;profiling&rdquo;).</li>
          </ul>
          <p>We do not sell or share your personal information, as those terms are defined under the CTDPA. We do not share your Personal Information for cross-context behavioral advertising purposes.</p>
          <p>To exercise your CTDPA rights, please contact us at <a href="mailto:customer-support@streetfeastapp.com">customer-support@streetfeastapp.com</a> with the subject line &ldquo;Connecticut Privacy Rights.&rdquo; You may also designate an authorized agent to submit a request on your behalf by providing written authorization. We will verify your identity before fulfilling any request. We may follow up with you to verify your identity before processing your authorized agent&apos;s request. We will respond to verifiable requests within forty-five (45) calendar days. In the event that we need additional time to respond, we will notify you in writing of the reason why additional time is necessary and the extension period for response which shall comply with current law. In order to be able to provide such writing, we will need your email address or U.S. mailing address. The response to a verifiable consumer request will cover the twelve (12) month period preceding our receipt of the request or the amount required by law, whichever is greater. If for any reason we cannot comply with all or part of your request, we will explain the reasons why. For data portability requests, we will select a format to provide your personal information that is readily usable and should allow you to transmit information easily from one entity to another entity. We will not charge you a fee to process or respond to your verifiable consumer request unless your request is excessive, repetitive or manifestly unfounded. Should we determine that your request warrants that we charge a fee, we will communicate why it made that decision along with the estimated costs associated with your request prior to completing your request.</p>

          <h3>14.4 Delaware Privacy Rights</h3>
          <p>If you are a Delaware resident, you have the following rights under the Delaware Personal Data Privacy Act (&ldquo;DPDPA&rdquo;). This information supplements our Privacy Policy for Delaware residents only. The following rights do not apply to individuals who reside outside of Delaware.</p>
          <p>Under the DPDPA, you have the rights listed below which are not absolute, and in certain cases, we may decline your request as permitted by law:</p>
          <ul>
            <li>Right to be informed whether or not we are processing your personal data.</li>
            <li>Right to access your personal data.</li>
            <li>Right to correct inaccuracies in your personal data.</li>
            <li>Right to request deletion of your personal data.</li>
            <li>Right to obtain a copy of the personal data you previously shared with us.</li>
            <li>Right to opt out of the processing of your personal data if it is used for targeted advertising, the sale of personal data, or profiling in furtherance of decisions that produce legal or similarly significant effects (&ldquo;profiling&rdquo;).</li>
          </ul>
          <p>We do not sell or share your personal information, as those terms are defined under the DPDPA. We do not share your Personal Information for cross-context behavioral advertising purposes.</p>
          <p>To exercise your DPDPA rights, please contact us at <a href="mailto:customer-support@streetfeastapp.com">customer-support@streetfeastapp.com</a> with the subject line &ldquo;Delaware Privacy Rights.&rdquo; You may also designate an authorized agent to submit a request on your behalf by providing written authorization. We will verify your identity before fulfilling any request. We may follow up with you to verify your identity before processing your authorized agent&apos;s request. We will respond to verifiable requests within forty-five (45) calendar days. In the event that we need additional time to respond, we will notify you in writing of the reason why additional time is necessary and the extension period for response which shall comply with current law. In order to be able to provide such writing, we will need your email address or U.S. mailing address. The response to a verifiable consumer request will cover the twelve (12) month period preceding our receipt of the request or the amount required by law, whichever is greater. If for any reason we cannot comply with all or part of your request, we will explain the reasons why. For data portability requests, we will select a format to provide your personal information that is readily usable and should allow you to transmit information easily from one entity to another entity. We will not charge you a fee to process or respond to your verifiable consumer request unless your request is excessive, repetitive or manifestly unfounded. Should we determine that your request warrants that we charge a fee, we will communicate why it made that decision along with the estimated costs associated with your request prior to completing your request.</p>

          <h3>14.5 Florida Privacy Rights</h3>
          <p>If you are a Florida resident, you have the following rights under the Florida Digital Bill of Rights (&ldquo;FDBR&rdquo;). This information supplements our Privacy Policy for Florida residents only. The following rights do not apply to individuals who reside outside of Florida.</p>
          <p>Under the FDBR, you have the rights listed below which are not absolute, and in certain cases, we may decline your request as permitted by law:</p>
          <ul>
            <li>Right to be informed whether or not we are processing your personal data.</li>
            <li>Right to access your personal data.</li>
            <li>Right to correct inaccuracies in your personal data.</li>
            <li>Right to request deletion of your personal data.</li>
            <li>Right to obtain a copy of the personal data you previously shared with us.</li>
            <li>Right to opt out of the processing of your personal data if it is used for targeted advertising, the sale of personal data, or profiling in furtherance of decisions that produce legal or similarly significant effects (&ldquo;profiling&rdquo;).</li>
          </ul>
          <p>We do not sell or share your personal information, as those terms are defined under the FDBR. We do not share your Personal Information for cross-context behavioral advertising purposes.</p>
          <p>To exercise your FDBR rights, please contact us at <a href="mailto:customer-support@streetfeastapp.com">customer-support@streetfeastapp.com</a> with the subject line &ldquo;Florida Privacy Rights.&rdquo; You may also designate an authorized agent to submit a request on your behalf by providing written authorization. We will verify your identity before fulfilling any request. We may follow up with you to verify your identity before processing your authorized agent&apos;s request. We will respond to verifiable requests within forty-five (45) calendar days. In the event that we need additional time to respond, we will notify you in writing of the reason why additional time is necessary and the extension period for response which shall comply with current law. In order to be able to provide such writing, we will need your email address or U.S. mailing address. The response to a verifiable consumer request will cover the twelve (12) month period preceding our receipt of the request or the amount required by law, whichever is greater. If for any reason we cannot comply with all or part of your request, we will explain the reasons why. For data portability requests, we will select a format to provide your personal information that is readily usable and should allow you to transmit information easily from one entity to another entity. We will not charge you a fee to process or respond to your verifiable consumer request unless your request is excessive, repetitive or manifestly unfounded. Should we determine that your request warrants that we charge a fee, we will communicate why it made that decision along with the estimated costs associated with your request prior to completing your request.</p>

          <h3>14.6 Indiana Privacy Rights</h3>
          <p>If you are an Indiana resident, you have the following rights under the Indiana Consumer Data Protection Act (&ldquo;INCDPA&rdquo;). This information supplements our Privacy Policy for Indiana residents only. The following rights do not apply to individuals who reside outside of Indiana.</p>
          <p>Under the INCDPA, you have the rights listed below which are not absolute, and in certain cases, we may decline your request as permitted by law:</p>
          <ul>
            <li>Right to be informed whether or not we are processing your personal data.</li>
            <li>Right to access your personal data.</li>
            <li>Right to correct inaccuracies in your personal data.</li>
            <li>Right to request deletion of your personal data.</li>
            <li>Right to obtain a copy of the personal data you previously shared with us.</li>
            <li>Right to opt out of the processing of your personal data if it is used for targeted advertising, the sale of personal data, or profiling in furtherance of decisions that produce legal or similarly significant effects (&ldquo;profiling&rdquo;).</li>
          </ul>
          <p>We do not sell or share your personal information, as those terms are defined under the INCDPA. We do not share your Personal Information for cross-context behavioral advertising purposes.</p>
          <p>To exercise your INCDPA rights, please contact us at <a href="mailto:customer-support@streetfeastapp.com">customer-support@streetfeastapp.com</a> with the subject line &ldquo;Indiana Privacy Rights.&rdquo; You may also designate an authorized agent to submit a request on your behalf by providing written authorization. We will verify your identity before fulfilling any request. We may follow up with you to verify your identity before processing your authorized agent&apos;s request. We will respond to verifiable requests within forty-five (45) calendar days. In the event that we need additional time to respond, we will notify you in writing of the reason why additional time is necessary and the extension period for response which shall comply with current law. In order to be able to provide such writing, we will need your email address or U.S. mailing address. The response to a verifiable consumer request will cover the twelve (12) month period preceding our receipt of the request or the amount required by law, whichever is greater. If for any reason we cannot comply with all or part of your request, we will explain the reasons why. For data portability requests, we will select a format to provide your personal information that is readily usable and should allow you to transmit information easily from one entity to another entity. We will not charge you a fee to process or respond to your verifiable consumer request unless your request is excessive, repetitive or manifestly unfounded. Should we determine that your request warrants that we charge a fee, we will communicate why it made that decision along with the estimated costs associated with your request prior to completing your request.</p>

          <h3>14.7 Iowa Privacy Rights</h3>
          <p>If you are an Iowa resident, you have the following rights under the Iowa Consumer Data Protection Act (&ldquo;ICDPA&rdquo;). This information supplements our Privacy Policy for Iowa residents only. The following rights do not apply to individuals who reside outside of Iowa.</p>
          <p>Under the ICDPA, you have the rights listed below which are not absolute, and in certain cases, we may decline your request as permitted by law:</p>
          <ul>
            <li>Right to be informed whether or not we are processing your personal data.</li>
            <li>Right to access your personal data.</li>
            <li>Right to correct inaccuracies in your personal data.</li>
            <li>Right to request deletion of your personal data.</li>
            <li>Right to obtain a copy of the personal data you previously shared with us.</li>
            <li>Right to opt out of the processing of your personal data if it is used for targeted advertising, the sale of personal data, or profiling in furtherance of decisions that produce legal or similarly significant effects (&ldquo;profiling&rdquo;).</li>
          </ul>
          <p>We do not sell or share your personal information, as those terms are defined under the ICDPA. We do not share your Personal Information for cross-context behavioral advertising purposes.</p>
          <p>To exercise your ICDPA rights, please contact us at <a href="mailto:customer-support@streetfeastapp.com">customer-support@streetfeastapp.com</a> with the subject line &ldquo;Iowa Privacy Rights.&rdquo; You may also designate an authorized agent to submit a request on your behalf by providing written authorization. We will verify your identity before fulfilling any request. We may follow up with you to verify your identity before processing your authorized agent&apos;s request. We will respond to verifiable requests within forty-five (45) calendar days. In the event that we need additional time to respond, we will notify you in writing of the reason why additional time is necessary and the extension period for response which shall comply with current law. In order to be able to provide such writing, we will need your email address or U.S. mailing address. The response to a verifiable consumer request will cover the twelve (12) month period preceding our receipt of the request or the amount required by law, whichever is greater. If for any reason we cannot comply with all or part of your request, we will explain the reasons why. For data portability requests, we will select a format to provide your personal information that is readily usable and should allow you to transmit information easily from one entity to another entity. We will not charge you a fee to process or respond to your verifiable consumer request unless your request is excessive, repetitive or manifestly unfounded. Should we determine that your request warrants that we charge a fee, we will communicate why it made that decision along with the estimated costs associated with your request prior to completing your request.</p>

          <h3>14.8 Kentucky Privacy Rights</h3>
          <p>If you are a Kentucky resident, you have the following rights under the Kentucky Consumer Data Protection Act (&ldquo;KCDPA&rdquo;). This information supplements our Privacy Policy for Kentucky residents only. The following rights do not apply to individuals who reside outside of Kentucky.</p>
          <p>Under the KCDPA, you have the rights listed below which are not absolute, and in certain cases, we may decline your request as permitted by law:</p>
          <ul>
            <li>Right to be informed whether or not we are processing your personal data.</li>
            <li>Right to access your personal data.</li>
            <li>Right to correct inaccuracies in your personal data.</li>
            <li>Right to request deletion of your personal data.</li>
            <li>Right to obtain a copy of the personal data you previously shared with us.</li>
            <li>Right to opt out of the processing of your personal data if it is used for targeted advertising, the sale of personal data, or profiling in furtherance of decisions that produce legal or similarly significant effects (&ldquo;profiling&rdquo;).</li>
          </ul>
          <p>We do not sell or share your personal information, as those terms are defined under the KCDPA. We do not share your Personal Information for cross-context behavioral advertising purposes.</p>
          <p>To exercise your KCDPA rights, please contact us at <a href="mailto:customer-support@streetfeastapp.com">customer-support@streetfeastapp.com</a> with the subject line &ldquo;Kentucky Privacy Rights.&rdquo; You may also designate an authorized agent to submit a request on your behalf by providing written authorization. We will verify your identity before fulfilling any request. We may follow up with you to verify your identity before processing your authorized agent&apos;s request. We will respond to verifiable requests within forty-five (45) calendar days. In the event that we need additional time to respond, we will notify you in writing of the reason why additional time is necessary and the extension period for response which shall comply with current law. In order to be able to provide such writing, we will need your email address or U.S. mailing address. The response to a verifiable consumer request will cover the twelve (12) month period preceding our receipt of the request or the amount required by law, whichever is greater. If for any reason we cannot comply with all or part of your request, we will explain the reasons why. For data portability requests, we will select a format to provide your personal information that is readily usable and should allow you to transmit information easily from one entity to another entity. We will not charge you a fee to process or respond to your verifiable consumer request unless your request is excessive, repetitive or manifestly unfounded. Should we determine that your request warrants that we charge a fee, we will communicate why it made that decision along with the estimated costs associated with your request prior to completing your request.</p>

          <h3>14.9 Maryland Privacy Rights</h3>
          <p>If you are a Maryland resident, you have the following rights under the Maryland Online Data Privacy Act (&ldquo;MODPA&rdquo;). This information supplements our Privacy Policy for Maryland residents only. The following rights do not apply to individuals who reside outside of Maryland.</p>
          <p>Under the MODPA, you have the rights listed below which are not absolute, and in certain cases, we may decline your request as permitted by law:</p>
          <ul>
            <li>Right to be informed whether or not we are processing your personal data.</li>
            <li>Right to access your personal data.</li>
            <li>Right to correct inaccuracies in your personal data.</li>
            <li>Right to request deletion of your personal data.</li>
            <li>Right to obtain a copy of the personal data you previously shared with us.</li>
            <li>Right to opt out of the processing of your personal data if it is used for targeted advertising, the sale of personal data, or profiling in furtherance of decisions that produce legal or similarly significant effects (&ldquo;profiling&rdquo;).</li>
          </ul>
          <p>We do not sell or share your personal information, as those terms are defined under the MODPA. We do not share your Personal Information for cross-context behavioral advertising purposes.</p>
          <p>To exercise your MODPA rights, please contact us at <a href="mailto:customer-support@streetfeastapp.com">customer-support@streetfeastapp.com</a> with the subject line &ldquo;Maryland Privacy Rights.&rdquo; You may also designate an authorized agent to submit a request on your behalf by providing written authorization. We will verify your identity before fulfilling any request. We may follow up with you to verify your identity before processing your authorized agent&apos;s request. We will respond to verifiable requests within forty-five (45) calendar days. In the event that we need additional time to respond, we will notify you in writing of the reason why additional time is necessary and the extension period for response which shall comply with current law. In order to be able to provide such writing, we will need your email address or U.S. mailing address. The response to a verifiable consumer request will cover the twelve (12) month period preceding our receipt of the request or the amount required by law, whichever is greater. If for any reason we cannot comply with all or part of your request, we will explain the reasons why. For data portability requests, we will select a format to provide your personal information that is readily usable and should allow you to transmit information easily from one entity to another entity. We will not charge you a fee to process or respond to your verifiable consumer request unless your request is excessive, repetitive or manifestly unfounded. Should we determine that your request warrants that we charge a fee, we will communicate why it made that decision along with the estimated costs associated with your request prior to completing your request.</p>

          <h3>14.10 Minnesota Privacy Rights</h3>
          <p>If you are a Minnesota resident, you have the following rights under the Minnesota Consumer Data Privacy Act (&ldquo;MCDPA&rdquo;). This information supplements our Privacy Policy for Minnesota residents only. The following rights do not apply to individuals who reside outside of Minnesota.</p>
          <p>Under the MCDPA, you have the rights listed below which are not absolute, and in certain cases, we may decline your request as permitted by law:</p>
          <ul>
            <li>Right to be informed whether or not we are processing your personal data.</li>
            <li>Right to access your personal data.</li>
            <li>Right to correct inaccuracies in your personal data.</li>
            <li>Right to request deletion of your personal data.</li>
            <li>Right to obtain a copy of the personal data you previously shared with us.</li>
            <li>Right to opt out of the processing of your personal data if it is used for targeted advertising, the sale of personal data, or profiling in furtherance of decisions that produce legal or similarly significant effects (&ldquo;profiling&rdquo;).</li>
          </ul>
          <p>We do not sell or share your personal information, as those terms are defined under the MCDPA. We do not share your Personal Information for cross-context behavioral advertising purposes.</p>
          <p>To exercise your MCDPA rights, please contact us at <a href="mailto:customer-support@streetfeastapp.com">customer-support@streetfeastapp.com</a> with the subject line &ldquo;Minnesota Privacy Rights.&rdquo; You may also designate an authorized agent to submit a request on your behalf by providing written authorization. We will verify your identity before fulfilling any request. We may follow up with you to verify your identity before processing your authorized agent&apos;s request. We will respond to verifiable requests within forty-five (45) calendar days. In the event that we need additional time to respond, we will notify you in writing of the reason why additional time is necessary and the extension period for response which shall comply with current law. In order to be able to provide such writing, we will need your email address or U.S. mailing address. The response to a verifiable consumer request will cover the twelve (12) month period preceding our receipt of the request or the amount required by law, whichever is greater. If for any reason we cannot comply with all or part of your request, we will explain the reasons why. For data portability requests, we will select a format to provide your personal information that is readily usable and should allow you to transmit information easily from one entity to another entity. We will not charge you a fee to process or respond to your verifiable consumer request unless your request is excessive, repetitive or manifestly unfounded. Should we determine that your request warrants that we charge a fee, we will communicate why it made that decision along with the estimated costs associated with your request prior to completing your request.</p>

          <h3>14.11 Montana Privacy Rights</h3>
          <p>If you are a Montana resident, you have the following rights under the Montana Consumer Data Privacy Act (&ldquo;MTCDPA&rdquo;). This information supplements our Privacy Policy for Montana residents only. The following rights do not apply to individuals who reside outside of Montana.</p>
          <p>Under the MTCDPA, you have the rights listed below which are not absolute, and in certain cases, we may decline your request as permitted by law:</p>
          <ul>
            <li>Right to be informed whether or not we are processing your personal data.</li>
            <li>Right to access your personal data.</li>
            <li>Right to correct inaccuracies in your personal data.</li>
            <li>Right to request deletion of your personal data.</li>
            <li>Right to obtain a copy of the personal data you previously shared with us.</li>
            <li>Right to opt out of the processing of your personal data if it is used for targeted advertising, the sale of personal data, or profiling in furtherance of decisions that produce legal or similarly significant effects (&ldquo;profiling&rdquo;).</li>
          </ul>
          <p>We do not sell or share your personal information, as those terms are defined under the MTCDPA. We do not share your Personal Information for cross-context behavioral advertising purposes.</p>
          <p>To exercise your MTCDPA rights, please contact us at <a href="mailto:customer-support@streetfeastapp.com">customer-support@streetfeastapp.com</a> with the subject line &ldquo;Montana Privacy Rights.&rdquo; You may also designate an authorized agent to submit a request on your behalf by providing written authorization. We will verify your identity before fulfilling any request. We may follow up with you to verify your identity before processing your authorized agent&apos;s request. We will respond to verifiable requests within forty-five (45) calendar days. In the event that we need additional time to respond, we will notify you in writing of the reason why additional time is necessary and the extension period for response which shall comply with current law. In order to be able to provide such writing, we will need your email address or U.S. mailing address. The response to a verifiable consumer request will cover the twelve (12) month period preceding our receipt of the request or the amount required by law, whichever is greater. If for any reason we cannot comply with all or part of your request, we will explain the reasons why. For data portability requests, we will select a format to provide your personal information that is readily usable and should allow you to transmit information easily from one entity to another entity. We will not charge you a fee to process or respond to your verifiable consumer request unless your request is excessive, repetitive or manifestly unfounded. Should we determine that your request warrants that we charge a fee, we will communicate why it made that decision along with the estimated costs associated with your request prior to completing your request.</p>

          <h3>14.12 Nebraska Privacy Rights</h3>
          <p>If you are a Nebraska resident, you have the following rights under the Nebraska Data Privacy Act (&ldquo;NDPA&rdquo;). This information supplements our Privacy Policy for Nebraska residents only. The following rights do not apply to individuals who reside outside of Nebraska.</p>
          <p>Under the NDPA, you have the rights listed below which are not absolute, and in certain cases, we may decline your request as permitted by law:</p>
          <ul>
            <li>Right to be informed whether or not we are processing your personal data.</li>
            <li>Right to access your personal data.</li>
            <li>Right to correct inaccuracies in your personal data.</li>
            <li>Right to request deletion of your personal data.</li>
            <li>Right to obtain a copy of the personal data you previously shared with us.</li>
            <li>Right to opt out of the processing of your personal data if it is used for targeted advertising, the sale of personal data, or profiling in furtherance of decisions that produce legal or similarly significant effects (&ldquo;profiling&rdquo;).</li>
          </ul>
          <p>We do not sell or share your personal information, as those terms are defined under the NDPA. We do not share your Personal Information for cross-context behavioral advertising purposes.</p>
          <p>To exercise your NDPA rights, please contact us at <a href="mailto:customer-support@streetfeastapp.com">customer-support@streetfeastapp.com</a> with the subject line &ldquo;Nebraska Privacy Rights.&rdquo; You may also designate an authorized agent to submit a request on your behalf by providing written authorization. We will verify your identity before fulfilling any request. We may follow up with you to verify your identity before processing your authorized agent&apos;s request. We will respond to verifiable requests within forty-five (45) calendar days. In the event that we need additional time to respond, we will notify you in writing of the reason why additional time is necessary and the extension period for response which shall comply with current law. In order to be able to provide such writing, we will need your email address or U.S. mailing address. The response to a verifiable consumer request will cover the twelve (12) month period preceding our receipt of the request or the amount required by law, whichever is greater. If for any reason we cannot comply with all or part of your request, we will explain the reasons why. For data portability requests, we will select a format to provide your personal information that is readily usable and should allow you to transmit information easily from one entity to another entity. We will not charge you a fee to process or respond to your verifiable consumer request unless your request is excessive, repetitive or manifestly unfounded. Should we determine that your request warrants that we charge a fee, we will communicate why it made that decision along with the estimated costs associated with your request prior to completing your request.</p>

          <h3>14.13 Nevada Privacy Rights</h3>
          <p>If you reside in the State of Nevada, you have the right to request that we do not sell your personal information. Please contact us at <a href="mailto:customer-support@streetfeastapp.com">customer-support@streetfeastapp.com</a> with the subject line &ldquo;Nevada Privacy Rights.&rdquo; You may also designate an authorized agent to submit a request on your behalf by providing written authorization. We will verify your identity before fulfilling any request. We may follow up with you to verify your identity before processing your authorized agent&apos;s request. We will respond to verifiable requests within forty-five (45) calendar days. In the event that we need additional time to respond, we will notify you in writing of the reason why additional time is necessary and the extension period for response which shall comply with current law. In order to be able to provide such writing, we will need your email address or U.S. mailing address. The response to a verifiable consumer request will cover the twelve (12) month period preceding our receipt of the request or the amount required by law, whichever is greater. If for any reason we cannot comply with all or part of your request, we will explain the reasons why. For data portability requests, we will select a format to provide your personal information that is readily usable and should allow you to transmit information easily from one entity to another entity. We will not charge you a fee to process or respond to your verifiable consumer request unless your request is excessive, repetitive or manifestly unfounded. Should we determine that your request warrants that we charge a fee, we will communicate why it made that decision along with the estimated costs associated with your request prior to completing your request. This information supplements our Privacy Policy for Nevada residents only. The above rights do not apply to individuals who reside outside of Nevada.</p>

          <h3>14.14 New Hampshire Privacy Rights</h3>
          <p>If you are a New Hampshire resident, you have the following rights under the New Hampshire Privacy Act (&ldquo;NHPA&rdquo;). This information supplements our Privacy Policy for New Hampshire residents only. The following rights do not apply to individuals who reside outside of New Hampshire.</p>
          <p>Under the NHPA, you have the rights listed below which are not absolute, and in certain cases, we may decline your request as permitted by law:</p>
          <ul>
            <li>Right to be informed whether or not we are processing your personal data.</li>
            <li>Right to access your personal data.</li>
            <li>Right to correct inaccuracies in your personal data.</li>
            <li>Right to request deletion of your personal data.</li>
            <li>Right to obtain a copy of the personal data you previously shared with us.</li>
            <li>Right to opt out of the processing of your personal data if it is used for targeted advertising, the sale of personal data, or profiling in furtherance of decisions that produce legal or similarly significant effects (&ldquo;profiling&rdquo;).</li>
          </ul>
          <p>We do not sell or share your personal information, as those terms are defined under the NHPA. We do not share your Personal Information for cross-context behavioral advertising purposes.</p>
          <p>To exercise your NHPA rights, please contact us at <a href="mailto:customer-support@streetfeastapp.com">customer-support@streetfeastapp.com</a> with the subject line &ldquo;New Hampshire Privacy Rights.&rdquo; You may also designate an authorized agent to submit a request on your behalf by providing written authorization. We will verify your identity before fulfilling any request. We may follow up with you to verify your identity before processing your authorized agent&apos;s request. We will respond to verifiable requests within forty-five (45) calendar days. In the event that we need additional time to respond, we will notify you in writing of the reason why additional time is necessary and the extension period for response which shall comply with current law. In order to be able to provide such writing, we will need your email address or U.S. mailing address. The response to a verifiable consumer request will cover the twelve (12) month period preceding our receipt of the request or the amount required by law, whichever is greater. If for any reason we cannot comply with all or part of your request, we will explain the reasons why. For data portability requests, we will select a format to provide your personal information that is readily usable and should allow you to transmit information easily from one entity to another entity. We will not charge you a fee to process or respond to your verifiable consumer request unless your request is excessive, repetitive or manifestly unfounded. Should we determine that your request warrants that we charge a fee, we will communicate why it made that decision along with the estimated costs associated with your request prior to completing your request.</p>

          <h3>14.15 New Jersey Privacy Rights</h3>
          <p>If you are a New Jersey resident, you have the following rights under the New Jersey Data Privacy Act (&ldquo;NJDPA&rdquo;). This information supplements our Privacy Policy for New Jersey residents only. The following rights do not apply to individuals who reside outside of New Jersey.</p>
          <p>Under the NJDPA, you have the rights listed below which are not absolute, and in certain cases, we may decline your request as permitted by law:</p>
          <ul>
            <li>Right to be informed whether or not we are processing your personal data.</li>
            <li>Right to access your personal data.</li>
            <li>Right to correct inaccuracies in your personal data.</li>
            <li>Right to request deletion of your personal data.</li>
            <li>Right to obtain a copy of the personal data you previously shared with us.</li>
            <li>Right to opt out of the processing of your personal data if it is used for targeted advertising, the sale of personal data, or profiling in furtherance of decisions that produce legal or similarly significant effects (&ldquo;profiling&rdquo;).</li>
          </ul>
          <p>We do not sell or share your personal information, as those terms are defined under the NJDPA. We do not share your Personal Information for cross-context behavioral advertising purposes.</p>
          <p>To exercise your NJDPA rights, please contact us at <a href="mailto:customer-support@streetfeastapp.com">customer-support@streetfeastapp.com</a> with the subject line &ldquo;New Jersey Privacy Rights.&rdquo; You may also designate an authorized agent to submit a request on your behalf by providing written authorization. We will verify your identity before fulfilling any request. We may follow up with you to verify your identity before processing your authorized agent&apos;s request. We will respond to verifiable requests within forty-five (45) calendar days. In the event that we need additional time to respond, we will notify you in writing of the reason why additional time is necessary and the extension period for response which shall comply with current law. In order to be able to provide such writing, we will need your email address or U.S. mailing address. The response to a verifiable consumer request will cover the twelve (12) month period preceding our receipt of the request or the amount required by law, whichever is greater. If for any reason we cannot comply with all or part of your request, we will explain the reasons why. For data portability requests, we will select a format to provide your personal information that is readily usable and should allow you to transmit information easily from one entity to another entity. We will not charge you a fee to process or respond to your verifiable consumer request unless your request is excessive, repetitive or manifestly unfounded. Should we determine that your request warrants that we charge a fee, we will communicate why it made that decision along with the estimated costs associated with your request prior to completing your request.</p>

          <h3>14.16 Oregon Privacy Rights</h3>
          <p>If you are an Oregon resident, you have the following rights under the Oregon Consumer Privacy Act (&ldquo;OCPA&rdquo;). This information supplements our Privacy Policy for Oregon residents only. The following rights do not apply to individuals who reside outside of Oregon.</p>
          <p>Under the OCPA, you have the rights listed below which are not absolute, and in certain cases, we may decline your request as permitted by law:</p>
          <ul>
            <li>Right to be informed whether or not we are processing your personal data.</li>
            <li>Right to access your personal data.</li>
            <li>Right to correct inaccuracies in your personal data.</li>
            <li>Right to request deletion of your personal data.</li>
            <li>Right to obtain a copy of the personal data you previously shared with us.</li>
            <li>Right to opt out of the processing of your personal data if it is used for targeted advertising, the sale of personal data, or profiling in furtherance of decisions that produce legal or similarly significant effects (&ldquo;profiling&rdquo;).</li>
          </ul>
          <p>We do not sell or share your personal information, as those terms are defined under the OCPA. We do not share your Personal Information for cross-context behavioral advertising purposes.</p>
          <p>To exercise your OCPA rights, please contact us at <a href="mailto:customer-support@streetfeastapp.com">customer-support@streetfeastapp.com</a> with the subject line &ldquo;Oregon Privacy Rights.&rdquo; You may also designate an authorized agent to submit a request on your behalf by providing written authorization. We will verify your identity before fulfilling any request. We may follow up with you to verify your identity before processing your authorized agent&apos;s request. We will respond to verifiable requests within forty-five (45) calendar days. In the event that we need additional time to respond, we will notify you in writing of the reason why additional time is necessary and the extension period for response which shall comply with current law. In order to be able to provide such writing, we will need your email address or U.S. mailing address. The response to a verifiable consumer request will cover the twelve (12) month period preceding our receipt of the request or the amount required by law, whichever is greater. If for any reason we cannot comply with all or part of your request, we will explain the reasons why. For data portability requests, we will select a format to provide your personal information that is readily usable and should allow you to transmit information easily from one entity to another entity. We will not charge you a fee to process or respond to your verifiable consumer request unless your request is excessive, repetitive or manifestly unfounded. Should we determine that your request warrants that we charge a fee, we will communicate why it made that decision along with the estimated costs associated with your request prior to completing your request.</p>

          <h3>14.17 Rhode Island Privacy Rights</h3>
          <p>If you are a Rhode Island resident, you have the following rights under the Rhode Island Data Transparency and Privacy Protection Act (&ldquo;RIDTPPA&rdquo;). This information supplements our Privacy Policy for Rhode Island residents only. The following rights do not apply to individuals who reside outside of Rhode Island.</p>
          <p>Under the RIDTPPA, you have the rights listed below which are not absolute, and in certain cases, we may decline your request as permitted by law:</p>
          <ul>
            <li>Right to be informed whether or not we are processing your personal data.</li>
            <li>Right to access your personal data.</li>
            <li>Right to correct inaccuracies in your personal data.</li>
            <li>Right to request deletion of your personal data.</li>
            <li>Right to obtain a copy of the personal data you previously shared with us.</li>
            <li>Right to opt out of the processing of your personal data if it is used for targeted advertising, the sale of personal data, or profiling in furtherance of decisions that produce legal or similarly significant effects (&ldquo;profiling&rdquo;).</li>
          </ul>
          <p>We do not sell or share your personal information, as those terms are defined under the RIDTPPA. We do not share your Personal Information for cross-context behavioral advertising purposes.</p>
          <p>To exercise your RIDTPPA rights, please contact us at <a href="mailto:customer-support@streetfeastapp.com">customer-support@streetfeastapp.com</a> with the subject line &ldquo;Rhode Island Privacy Rights.&rdquo; You may also designate an authorized agent to submit a request on your behalf by providing written authorization. We will verify your identity before fulfilling any request. We may follow up with you to verify your identity before processing your authorized agent&apos;s request. We will respond to verifiable requests within forty-five (45) calendar days. In the event that we need additional time to respond, we will notify you in writing of the reason why additional time is necessary and the extension period for response which shall comply with current law. In order to be able to provide such writing, we will need your email address or U.S. mailing address. The response to a verifiable consumer request will cover the twelve (12) month period preceding our receipt of the request or the amount required by law, whichever is greater. If for any reason we cannot comply with all or part of your request, we will explain the reasons why. For data portability requests, we will select a format to provide your personal information that is readily usable and should allow you to transmit information easily from one entity to another entity. We will not charge you a fee to process or respond to your verifiable consumer request unless your request is excessive, repetitive or manifestly unfounded. Should we determine that your request warrants that we charge a fee, we will communicate why it made that decision along with the estimated costs associated with your request prior to completing your request.</p>

          <h3>14.18 Tennessee Privacy Rights</h3>
          <p>If you are a Tennessee resident, you have the following rights under the Tennessee Information Protection Act (&ldquo;TIPA&rdquo;). This information supplements our Privacy Policy for Tennessee residents only. The following rights do not apply to individuals who reside outside of Tennessee.</p>
          <p>Under the TIPA, you have the rights listed below which are not absolute, and in certain cases, we may decline your request as permitted by law:</p>
          <ul>
            <li>Right to be informed whether or not we are processing your personal data.</li>
            <li>Right to access your personal data.</li>
            <li>Right to correct inaccuracies in your personal data.</li>
            <li>Right to request deletion of your personal data.</li>
            <li>Right to obtain a copy of the personal data you previously shared with us.</li>
            <li>Right to opt out of the processing of your personal data if it is used for targeted advertising, the sale of personal data, or profiling in furtherance of decisions that produce legal or similarly significant effects (&ldquo;profiling&rdquo;).</li>
          </ul>
          <p>We do not sell or share your personal information, as those terms are defined under the TIPA. We do not share your Personal Information for cross-context behavioral advertising purposes.</p>
          <p>To exercise your TIPA rights, please contact us at <a href="mailto:customer-support@streetfeastapp.com">customer-support@streetfeastapp.com</a> with the subject line &ldquo;Tennessee Privacy Rights.&rdquo; You may also designate an authorized agent to submit a request on your behalf by providing written authorization. We will verify your identity before fulfilling any request. We may follow up with you to verify your identity before processing your authorized agent&apos;s request. We will respond to verifiable requests within forty-five (45) calendar days. In the event that we need additional time to respond, we will notify you in writing of the reason why additional time is necessary and the extension period for response which shall comply with current law. In order to be able to provide such writing, we will need your email address or U.S. mailing address. The response to a verifiable consumer request will cover the twelve (12) month period preceding our receipt of the request or the amount required by law, whichever is greater. If for any reason we cannot comply with all or part of your request, we will explain the reasons why. For data portability requests, we will select a format to provide your personal information that is readily usable and should allow you to transmit information easily from one entity to another entity. We will not charge you a fee to process or respond to your verifiable consumer request unless your request is excessive, repetitive or manifestly unfounded. Should we determine that your request warrants that we charge a fee, we will communicate why it made that decision along with the estimated costs associated with your request prior to completing your request.</p>

          <h3>14.19 Texas Privacy Rights</h3>
          <p>If you are a Texas resident, you have the following rights under the Texas Data Privacy and Security Act (&ldquo;TDPSA&rdquo;). This information supplements our Privacy Policy for Texas residents only. The following rights do not apply to individuals who reside outside of Texas.</p>
          <p>Under the TDPSA, you have the rights listed below which are not absolute, and in certain cases, we may decline your request as permitted by law:</p>
          <ul>
            <li>Right to be informed whether or not we are processing your personal data.</li>
            <li>Right to access your personal data.</li>
            <li>Right to correct inaccuracies in your personal data.</li>
            <li>Right to request deletion of your personal data.</li>
            <li>Right to obtain a copy of the personal data you previously shared with us.</li>
            <li>Right to opt out of the processing of your personal data if it is used for targeted advertising, the sale of personal data, or profiling in furtherance of decisions that produce legal or similarly significant effects (&ldquo;profiling&rdquo;).</li>
          </ul>
          <p>We do not sell or share your personal information, as those terms are defined under the TDPSA. We do not share your Personal Information for cross-context behavioral advertising purposes.</p>
          <p>To exercise your TDPSA rights, please contact us at <a href="mailto:customer-support@streetfeastapp.com">customer-support@streetfeastapp.com</a> with the subject line &ldquo;Texas Privacy Rights.&rdquo; You may also designate an authorized agent to submit a request on your behalf by providing written authorization. We will verify your identity before fulfilling any request. We may follow up with you to verify your identity before processing your authorized agent&apos;s request. We will respond to verifiable requests within forty-five (45) calendar days. In the event that we need additional time to respond, we will notify you in writing of the reason why additional time is necessary and the extension period for response which shall comply with current law. In order to be able to provide such writing, we will need your email address or U.S. mailing address. The response to a verifiable consumer request will cover the twelve (12) month period preceding our receipt of the request or the amount required by law, whichever is greater. If for any reason we cannot comply with all or part of your request, we will explain the reasons why. For data portability requests, we will select a format to provide your personal information that is readily usable and should allow you to transmit information easily from one entity to another entity. We will not charge you a fee to process or respond to your verifiable consumer request unless your request is excessive, repetitive or manifestly unfounded. Should we determine that your request warrants that we charge a fee, we will communicate why it made that decision along with the estimated costs associated with your request prior to completing your request.</p>

          <h3>14.20 Utah Privacy Rights</h3>
          <p>If you are a Utah resident, you have the following rights under the Utah Consumer Privacy Act (&ldquo;UCPA&rdquo;). This information supplements our Privacy Policy for Utah residents only. The following rights do not apply to individuals who reside outside of Utah.</p>
          <p>Under the UCPA, you have the rights listed below which are not absolute, and in certain cases, we may decline your request as permitted by law:</p>
          <ul>
            <li>Right to be informed whether or not we are processing your personal data.</li>
            <li>Right to access your personal data.</li>
            <li>Right to request deletion of your personal data.</li>
            <li>Right to obtain a copy of the personal data you previously shared with us.</li>
            <li>Right to opt out of the processing of your personal data if it is used for targeted advertising or the sale of personal data.</li>
          </ul>
          <p>We do not sell or share your personal information, as those terms are defined under the UCPA. We do not share your Personal Information for cross-context behavioral advertising purposes.</p>
          <p>To exercise your UCPA rights, please contact us at <a href="mailto:customer-support@streetfeastapp.com">customer-support@streetfeastapp.com</a> with the subject line &ldquo;Utah Privacy Rights.&rdquo; You may also designate an authorized agent to submit a request on your behalf by providing written authorization. We will verify your identity before fulfilling any request. We may follow up with you to verify your identity before processing your authorized agent&apos;s request. We will respond to verifiable requests within forty-five (45) calendar days. In the event that we need additional time to respond, we will notify you in writing of the reason why additional time is necessary and the extension period for response which shall comply with current law. In order to be able to provide such writing, we will need your email address or U.S. mailing address. The response to a verifiable consumer request will cover the twelve (12) month period preceding our receipt of the request or the amount required by law, whichever is greater. If for any reason we cannot comply with all or part of your request, we will explain the reasons why. For data portability requests, we will select a format to provide your personal information that is readily usable and should allow you to transmit information easily from one entity to another entity. We will not charge you a fee to process or respond to your verifiable consumer request unless your request is excessive, repetitive or manifestly unfounded. Should we determine that your request warrants that we charge a fee, we will communicate why it made that decision along with the estimated costs associated with your request prior to completing your request.</p>

          <h3>14.21 Virginia Privacy Rights</h3>
          <p>If you are a Virginia resident, you have the following rights under the Virginia Consumer Data Protection Act (&ldquo;VCDPA&rdquo;). This information supplements our Privacy Policy for Virginia residents only. The following rights do not apply to individuals who reside outside of Virginia.</p>
          <p>Under the VCDPA:</p>
          <ul>
            <li>&ldquo;Consumer&rdquo; means a natural person who is a resident of the Commonwealth acting only in an individual or household context. It does not include a natural person acting in a commercial or employment context.</li>
            <li>&ldquo;Personal data&rdquo; means any information that is linked or reasonably linkable to an identified or identifiable natural person. &ldquo;Personal data&rdquo; does not include de-identified data or publicly available information.</li>
            <li>&ldquo;Sale of personal data&rdquo; means the exchange of personal data for monetary consideration. If this definition of &ldquo;consumer&rdquo; applies to you, we must adhere to certain rights and obligations regarding your personal data. Your rights with respect to your personal data are the:</li>
            <li>Right to be informed whether or not we are processing your personal data.</li>
            <li>Right to access your personal data.</li>
            <li>Right to correct inaccuracies in your personal data.</li>
            <li>Right to request deletion of your personal data.</li>
            <li>Right to obtain a copy of the personal data you previously shared with us.</li>
            <li>Right to opt out of the processing of your personal data if it is used for targeted advertising, the sale of personal data, or profiling in furtherance of decisions that produce legal or similarly significant effects (&ldquo;profiling&rdquo;).</li>
          </ul>
          <p>We do not sell or share your personal information, as those terms are defined under the VCDPA. We do not share your Personal Information for cross-context behavioral advertising purposes.</p>
          <p>To exercise your VCDPA rights, please contact us at <a href="mailto:customer-support@streetfeastapp.com">customer-support@streetfeastapp.com</a> with the subject line &ldquo;Virginia Privacy Rights.&rdquo; You may also designate an authorized agent to submit a request on your behalf by providing written authorization. We will verify your identity before fulfilling any request. We may follow up with you to verify your identity before processing your authorized agent&apos;s request. We will respond to verifiable requests within forty-five (45) calendar days. In the event that we need additional time to respond, we will notify you in writing of the reason why additional time is necessary and the extension period for response which shall comply with current law. In order to be able to provide such writing, we will need your email address or U.S. mailing address. The response to a verifiable consumer request will cover the twelve (12) month period preceding our receipt of the request or the amount required by law, whichever is greater. If for any reason we cannot comply with all or part of your request, we will explain the reasons why. For data portability requests, we will select a format to provide your personal information that is readily usable and should allow you to transmit information easily from one entity to another entity. We will not charge you a fee to process or respond to your verifiable consumer request unless your request is excessive, repetitive or manifestly unfounded. Should we determine that your request warrants that we charge a fee, we will communicate why it made that decision along with the estimated costs associated with your request prior to completing your request. If your appeal is denied, you may contact the Attorney General to submit a complaint.</p>

          <h3>14.22 Privacy Rights For Other Jurisdictions</h3>
          <p>If you are located in another jurisdiction that is not specifically discussed in this Privacy Policy, you may have rights, under applicable data privacy laws, to request information about or access to your personal information that we maintain, to require that inaccurate information be corrected or, in some circumstances, to object to our processing of your personal information. To exercise any rights you may have in another jurisdiction, please contact us at <a href="mailto:customer-support@streetfeastapp.com">customer-support@streetfeastapp.com</a> with the subject line &ldquo;Other Jurisdiction Privacy Rights.&rdquo; You may also designate an authorized agent to submit a request on your behalf by providing written authorization. We will verify your identity before fulfilling any request. We may follow up with you to verify your identity before processing your authorized agent&apos;s request. To the extent permitted by applicable law, we may charge a reasonable fee to comply with your request.</p>
        </section>

        {/* SECTION 15: DATA BREACH NOTIFICATION */}
        <section className={styles.section}>
          <h2>15. Data Breach Notification</h2>
          <p>In the event of a security breach that results in the unauthorized access, acquisition, or disclosure of your Personal Information, we will:</p>
          <ul>
            <li>Investigate the nature and scope of the breach promptly</li>
            <li>Take reasonable steps to contain and remediate the breach</li>
            <li>Notify affected individuals without unreasonable delay, and in no event later than the timeframes required by applicable state breach notification laws in the United States of America</li>
            <li>Provide notification to applicable regulatory authorities as required by law</li>
            <li>Include in such notification a description of the nature of the breach, the categories and approximate number of individuals concerned, the likely consequences, and the measures taken or proposed to address the breach</li>
          </ul>
        </section>

        {/* SECTION 16: UPDATES TO THIS PRIVACY POLICY */}
        <section className={styles.section}>
          <h2>16. Updates to This Privacy Policy</h2>
          <p>
            We reserve the right to modify this Privacy Policy at any time in our sole discretion. Amendments to this Privacy Policy shall apply to information already collected as well as information collected after the effective date of the amendment. We will notify you of material changes by:
          </p>
          <ul>
            <li>Posting the updated Policy on the App and Site</li>
            <li>Updating the &ldquo;Effective Date&rdquo; at the top of this Policy</li>
            <li>Sending notification through the App or via email for material changes</li>
          </ul>
          <p>
            Your continued use of the Services following the posting of any amendments constitutes your acceptance of such amendments. If you do not agree to the amended Policy, you must immediately discontinue use of the Services and request deletion of your account.
          </p>
        </section>

        {/* SECTION 17: TERMS OF SERVICE */}
        <section className={styles.section}>
          <h2>17. Terms of Service</h2>
          <p>
            Your use of the Service is also governed by our <Link href="/terms">Terms of Service</Link>, which is hereby incorporated into this Privacy Policy by reference. Please review the Terms of Service carefully since you acknowledge and agree that you have read our Terms of Service and agree to our Terms of Service by accessing and/or using the Services. As stated in the Terms of Service, the Terms of Service may be changed from time to time and such changes are effective immediately upon their posting. Capitalized terms used but not defined in this Privacy Policy will have the meanings assigned to them in the Terms of Service.
          </p>
        </section>

        {/* SECTION 18: SEVERABILITY */}
        <section className={styles.section}>
          <h2>18. Severability</h2>
          <p>
            If any provision of this Privacy Policy is held by a court or arbitrator of competent jurisdiction to be invalid, illegal, or unenforceable, such provision shall be modified and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law, and rhe remaining provisions shall continue in full force and effect.
          </p>
        </section>

        {/* SECTION 19: ENTIRE AGREEMENT */}
        <section className={styles.section}>
          <h2>19. Entire Agreement</h2>
          <p>
            This Privacy Policy, together with our Terms of Service and any other agreements, policies, or guidelines expressly incorporated by reference, constitutes the sole and entire agreement between you and StreetFeast with respect to the subject matter hereof and supersedes all prior or contemporaneous communications, understandings, representations, warranties, and/or agreements, whether oral or written, with respect to such subject matter.
          </p>
        </section>

        {/* SECTION 20: WAIVER */}
        <section className={styles.section}>
          <h2>20. Waiver</h2>
          <p>
            No failure or delay by StreetFeast in exercising any right, remedy, power, or privilege under this Privacy Policy shall operate as a waiver thereof. No single or partial exercise of any right or remedy shall preclude any other or further exercise thereof or the exercise of any other right or remedy. Any waiver must be in writing and signed by StreetFeast to be effective.
          </p>
        </section>

        {/* SECTION 21: CONTACT US */}
        <section className={styles.section}>
          <h2>21. Contact Us</h2>
          <p>
            If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
          </p>
          <div className={styles.contactInfo}>
            <p><strong>StreetFeast LLC</strong></p>
            <a href="mailto:customer-support@streetfeastapp.com">
              <p>Email: customer-support@streetfeastapp.com</p>
            </a>
            <p>Website: <a href="https://streetfeastapp.com/contact" target="_blank" rel="noopener noreferrer">streetfeastapp.com/contact</a></p>
          </div>
        </section>
      </main>
    </div>
  );
}
