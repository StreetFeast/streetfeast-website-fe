import Link from 'next/link';
import styles from './page.module.css';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read the StreetFeast Terms of Service. Understand your rights and responsibilities when using our food discovery platform.',
  openGraph: {
    title: 'Terms of Service | StreetFeast',
    description: 'Read the StreetFeast Terms of Service. Understand your rights and responsibilities when using our platform.',
    url: 'https://streetfeastapp.com/terms',
  },
};

export default function Terms() {
  const lastUpdated = "February 26, 2026";


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
          <p>
            PLEASE READ THESE TERMS OF SERVICE (&quot;TERMS&quot;) CAREFULLY BEFORE USING THE
            STREETFEAST MOBILE APPLICATION AND/OR WEBSITE. THESE TERMS CONTAIN AN ARBITRATION
            AGREEMENT AND CLASS ACTION WAIVER THAT AFFECT YOUR LEGAL RIGHTS. BY ACCESSING
            OR USING THE SERVICE, YOU AGREE TO BE BOUND BY THESE TERMS.
          </p>
        </section>

        <section className={styles.section}>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By downloading, installing, accessing, or using the StreetFeast mobile application
            (&quot;App&quot;), the StreetFeast website located at streetfeastapp.com
            (&quot;Site&quot;), or any and all related services, features, content, or functionality
            (collectively, the App, Site or any and all related services, features, content, or
            functionality are referred to herein as the &quot;Service&quot;), you acknowledge that you
            have read, understood, and agree to be bound by these Terms of Service (&quot;Terms&quot;),
            our Privacy Policy, and any additional terms, policies, or guidelines referenced herein,
            all of which are incorporated by reference into these Terms. If you do not agree to these
            Terms, you must immediately cease all use of the Service.
          </p>
          <p>
            These Terms constitute a legally binding agreement between you (&quot;you,&quot;
            &quot;your,&quot; or &quot;User&quot;) and StreetFeast, LLC (&quot;StreetFeast,&quot;
            &quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). If you are
            accessing and/or using our Service for an entity, such as the company you work for, you
            represent that you have authority to bind that entity to these Terms, and you agree that
            &quot;you,&quot; and &quot;your,&quot; and &quot;User&quot; as used in these Terms includes
            both you personally and the entity you represent. If you are accessing our Service on
            behalf of only yourself as an individual, then you agree that &quot;you,&quot; and
            &quot;your,&quot; and &quot;User&quot; as used in these Terms includes only you personally
            as an individual.
          </p>
          <p>
            BY ACCESSING, DOWNLOADING, INSTALLING, OR USING THE SERVICES IN ANY MANNER, YOU
            ACKNOWLEDGE THAT YOU HAVE READ, FAMILIARIZED, UNDERSTOOD, AND AGREE TO BE BOUND BY
            THESE TERMS. IF YOU DO NOT AGREE TO THESE TERMS, YOU MUST IMMEDIATELY CEASE ALL USE
            OF THE SERVICES. YOUR CONTINUED USE OF THE SERVICES FOLLOWING THE POSTING OF ANY
            AMENDMENTS TO THESE TERMS SHALL CONSTITUTE YOUR ACCEPTANCE OF SUCH AMENDMENTS.
          </p>
          <p>
            We reserve the right to modify these Terms at any time at our sole discretion. Material
            changes will be communicated through the App, by email, or by posting updated Terms on
            the Site with a revised &quot;Last Updated&quot; date at the top of these Terms which
            shows the date these Terms were last updated. Your continued use of the Service following
            such modifications constitutes your acceptance of the revised Terms. It is your
            responsibility to review these Terms periodically. If you do not agree to any
            modifications, your sole remedy is to immediately discontinue use of the Service and
            request deletion of your account.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Eligibility</h2>
          <p>
            You must be at least thirteen (13) years of age to use the Service. If you are
            between the ages of thirteen (13) and eighteen (18) (or the age of legal majority
            in your jurisdiction), you may only use the Service with the consent of a parent
            or legal guardian who agrees to be bound by these Terms on your behalf. By using
            the Service, you represent and warrant that you meet the foregoing eligibility
            requirements. If you do not meet these requirements, you must not access or use
            the Service. We reserve the right to request proof of age and to terminate accounts
            of any User who misrepresents their age.
          </p>
        </section>

        <section className={styles.section}>
          <h2>3. Description of Service</h2>
          <p>
            StreetFeast is a mobile and web-based platform that connects consumers with street
            food vendors, food trucks, and pop-up restaurants (&quot;Vendors&quot;). The Service
            provides location-based discovery, vendor profiles, menus, scheduling information,
            search functionality, and related features. The Service includes, without limitation:
          </p>
          <ul>
            <li>
              An interactive map-based interface for discovering nearby Vendors and food trucks
              using geolocation services;
            </li>
            <li>
              Vendor profiles, including menus, product descriptions, images, operating schedules,
              contact information, and pricing;
            </li>
            <li>
              The ability for Users to save favorite Vendors, receive push notifications regarding
              schedule updates and daily digests, and navigate to Vendor locations;
            </li>
            <li>
              A Vendor dashboard enabling registered Vendors to manage their truck profiles, menus,
              product listings, event schedules, analytics, push notifications to followers, and
              related features (&quot;Vendor Dashboard&quot;);
            </li>
            <li>
              Anonymous browsing capabilities for Users who elect not to create an account; and
            </li>
            <li>
              Such other features and functionality as StreetFeast may offer from time to time.
            </li>
          </ul>
          <p>
            STREETFEAST IS A TECHNOLOGY PLATFORM ONLY. STREETFEAST DOES NOT ITSELF PREPARE,
            SELL, OR DELIVER FOOD OR BEVERAGES AND IS NOT A FOOD SERVICE ESTABLISHMENT. STREETFEAST
            DOES NOT EMPLOY VENDORS, NOR DOES IT ACT AS AN AGENT FOR ANY VENDOR. ALL FOOD,
            BEVERAGES, AND RELATED PRODUCTS ARE PROVIDED SOLELY BY INDEPENDENT THIRD-PARTY
            VENDORS. STREETFEAST MAKES NO REPRESENTATIONS OR WARRANTIES REGARDING THE QUALITY,
            SAFETY, LEGALITY, OR SUITABILITY OF ANY FOOD, BEVERAGE, OR SERVICE OFFERED BY ANY
            VENDOR, AND ASSUMES NO LIABILITY THEREFOR. BY USING THE SERVICE TO DISCOVER OR
            PURCHASE FOOD FROM ANY VENDOR, YOU ASSUME ALL RISK ASSOCIATED WITH SUCH TRANSACTIONS,
            INCLUDING WITHOUT LIMITATION RISKS RELATED TO FOOD QUALITY, FOOD SAFETY, ALLERGENS,
            FOODBORNE ILLNESS, AND COMPLIANCE WITH DIETARY RESTRICTIONS. VENDORS ARE SOLELY
            RESPONSIBLE FOR OBTAINING AND MAINTAINING ALL REQUIRED HEALTH PERMITS, FOOD HANDLER
            CERTIFICATIONS, BUSINESS LICENSES, AND ANY OTHER PERMITS OR APPROVALS REQUIRED BY
            APPLICABLE LOCAL, STATE, OR FEDERAL LAW. STREETFEAST DOES NOT VERIFY, MONITOR, OR
            ENFORCE VENDOR COMPLIANCE WITH SUCH REQUIREMENTS.
          </p>
          <p>
            The Service is operated in the United States of America and is intended for users
            located within the United States. We do not knowingly offer services to individuals
            in the European Union or other jurisdictions outside the United States of America. As
            such, we make no representation that the Service is appropriate or available for use
            beyond the United States of America. If you use the Service outside of the United
            States of America, you are doing so on your own initiative and you are solely
            responsible for compliance with applicable local laws regarding your online conduct
            and acceptable content, if and to the extent local laws apply.
          </p>
          <p>
            Although the Service may be accessible worldwide, not all features or services
            discussed, referenced, provided or offered through the Service are available to all
            persons or in all geographic locations, or appropriate or available for use outside
            the United States of America. We reserve the right to limit, in our sole discretion,
            the provision and quantity of any feature or service to any person or geographic area.
            Any offer for any feature or service made in the Service is void where prohibited. If
            you choose to access the Service from outside the United States of America, you do so
            on your own initiative and you are solely responsible for complying with all applicable
            local laws.
          </p>
          <p>
            The Service may include certain functions that are accessed or modified through the
            Service, which may require explicit user permission to access such functions. You
            acknowledge and agree that denying explicit user permission to those functions may
            affect or reduce your user experience, or prevent the Service from working altogether.
            Those functions may include, but are not limited to access to your location, contacts,
            microphone, or camera functions.
          </p>
        </section>

        <section className={styles.section}>
          <h2>4. User Accounts</h2>
          <p>
            <strong>4.1 Account Registration.</strong> Certain features of the Service require
            you to create an account. Consumer Users may register using a mobile phone number
            and SMS-based one-time password verification. Vendor Users may register using an
            email address and password. You agree to provide accurate, current, and complete
            information during registration and to update such information to keep all such
            information accurate, current, and complete.
          </p>
          <p>
            <strong>4.2 Account Security.</strong> You are solely responsible for maintaining
            the confidentiality of your account credentials and for all activities that occur
            under your account, whether or not authorized by you. You agree to immediately
            notify StreetFeast of any unauthorized use of your account or any other breach of
            security. StreetFeast shall not be liable for any loss or damage arising from your
            failure to maintain the security of your account credentials.
          </p>
          <p>
            <strong>4.3 Anonymous Use.</strong> Certain limited features of the Service may be
            accessible without creating an account through anonymous browsing. Anonymous Users
            are assigned an anonymous identifier and are subject to these Terms. Anonymous Users
            may have restricted access to certain features, including but not limited to
            favoriting Vendors, receiving notifications, and accessing the Vendor Dashboard.
          </p>
          <p>
            <strong>4.4 Account Deletion.</strong> You may request deletion of your account at
            any time through the profile settings within the App. Upon initiating account deletion,
            your account will be scheduled for permanent deletion following a thirty (30) day
            grace period. If you log back into the Service during this grace period, the deletion
            request will be automatically cancelled. After the grace period expires, your account
            and associated data will be permanently deleted in accordance with our Privacy Policy
            and applicable law.
          </p>
          <p>
            <strong>4.5 User Responsibility.</strong> You are responsible for violations of these
            Terms and/or applicable law by anyone using the Service with your permission or using
            your account on an unauthorized basis. Your use of the Service to assist another person
            in an activity that would violate these Terms and/or applicable law if performed by you
            is a violation of these Terms. These Terms apply to anyone accessing or using the
            Service; however, each provision in these Terms shall be interpreted to include, and
            apply to, any action directly or indirectly taken, authorized, facilitated, promoted,
            encouraged or permitted by a user of the Service, even if such person did not themselves
            violate the provision.
          </p>
          <p>
            <strong>4.6 Account Suspension and Termination.</strong> We reserve the right, in
            our sole discretion, to suspend, disable, or terminate your account and access to
            the Service at any time, with or without cause and with or without notice. Grounds
            for such action include, but are not limited to: (a) violations of these Terms;
            (b) requests by law enforcement or other government authorities; (c) a request by
            you; (d) unexpected technical or security issues; (e) extended periods of inactivity;
            or (f) engagement in fraudulent or illegal activities. StreetFeast shall not be
            liable to you or any third party for any suspension or termination of your account.
          </p>
        </section>

        <section className={styles.section}>
          <h2>5. Subscription Terms and In-App Purchases</h2>
          <p>
            <strong>5.1 Vendor Subscription.</strong> Access to the Vendor Dashboard and related
            Vendor features requires an active paid subscription (&quot;Vendor Subscription&quot;).
            Vendor Subscriptions are offered on a monthly and annual basis, with pricing as
            displayed within the App at the time of purchase. StreetFeast reserves the right to
            modify subscription pricing at any time at StreetFeast&apos;s sole discretion;
            provided, however, that any price changes will not affect your current billing period.
            If we change the pricing for your subscription, we will provide you with reasonable
            advance notice of such change. Your continued use of the Vendor Subscription after
            the price change takes effect constitutes your agreement to pay the modified
            subscription amount.
          </p>
          <p>
            <strong>5.2 Free Trial.</strong> StreetFeast may, at its sole discretion, offer a
            free trial period for the Vendor Subscription. Unless you cancel before the end of
            the free trial period, your subscription will automatically convert to a paid
            subscription and you will be charged the applicable subscription fee. Free trial
            eligibility is solely determined by StreetFeast and the applicable App Store or
            payment platform and may be limited to one per User or device.
          </p>
          <p>
            <strong>5.3 Billing and Renewal.</strong> All Vendor Subscriptions are purchased
            exclusively through Apple In-App Purchases (for iOS) or Google Play In-App Purchases
            (for Android) (each, a &quot;Payment Platform&quot;). StreetFeast is not the payment
            processor or merchant of record for any subscription transaction; Apple Inc. or
            Google LLC (as applicable) serves as the merchant of record. All billing and payment
            processing is handled entirely by the applicable Payment Platform, subject to the
            terms and conditions of such Payment Platform. Subscriptions are billed in advance on
            a recurring basis (monthly or annually, depending on the plan selected). Your
            subscription will automatically renew at the end of each billing period unless you
            cancel auto-renewal at least twenty-four (24) hours prior to the end of the current
            billing period. Apple or Google (as applicable) manages all subscription renewal
            and billing cycles.
          </p>
          <p>
            <strong>5.4 Cancellation.</strong> You may cancel your Vendor Subscription at any
            time. Because subscriptions are managed by Apple or Google (as applicable),
            cancellation must be performed through the subscription management settings on your
            device: via the Apple App Store (Settings &gt; Apple ID &gt; Subscriptions) for iOS
            users, or via the Google Play Store (Google Play &gt; Payments &amp; subscriptions
            &gt; Subscriptions) for Android users. Cancellation cannot be processed by StreetFeast
            directly. Cancellation will take effect at the end of the current billing period, and
            you will retain access to Vendor features until that date. Uninstalling the App does
            not cancel your subscription.
          </p>
          <p>
            <strong>5.5 Refunds.</strong> Refunds are subject to Apple&apos;s and
            Google&apos;s applicable refund policies. Because Apple and Google serve as the
            merchant of record for all subscription transactions, all refund requests must be
            directed to the applicable Payment Platform in accordance with its refund policies.
            StreetFeast does not process payments or refunds directly and is not responsible for
            the refund policies of any Payment Platform. For Apple, you may request a refund at
            reportaproblem.apple.com. For Google, you may request a refund through the Google
            Play Store.
          </p>
          <p>
            <strong>5.6 Platform Fees.</strong> You acknowledge that the applicable Payment
            Platform (Apple, Google, or otherwise) may charge platform fees, commissions, or
            transaction fees in connection with your subscription. Such fees are the sole
            responsibility of the applicable parties under their respective agreements and are
            not within StreetFeast&apos;s control.
          </p>
          <p>
            <strong>5.7 Price Changes.</strong> StreetFeast reserves the right to change
            subscription pricing at any time at StreetFeast&apos;s sole discretion; provided,
            however, that any price changes will not affect your current billing period. If we
            change the pricing for your subscription, we will provide you with reasonable advance
            notice of such change. Your continued use of the Vendor Subscription after the price
            change takes effect constitutes your agreement to pay the modified subscription amount.
          </p>
        </section>

        <section className={styles.section}>
          <h2>6. Intellectual Property Rights</h2>
          <p>
            <strong>6.1 StreetFeast Intellectual Property.</strong> The Service, including but
            not limited to all text, graphics, photographs, images, illustrations, icons, software,
            source code, object code, data, databases, interfaces, trademarks, service marks, trade
            names, logos, trade dress, domain names, slogans, documentation, audio, video, and other
            content, features, and functionality (collectively, &quot;StreetFeast Content&quot;),
            and the design, selection, coordination, and arrangement thereof, are exclusively
            the property of StreetFeast or its licensors and are protected by United States of
            America and international copyright, trademark, patent, trade secret, and other
            intellectual property or proprietary rights laws. No license, right, title, or interest
            in or to any StreetFeast Content is granted to you except as expressly set forth herein.
            All rights not expressly granted are reserved by StreetFeast. The StreetFeast Content
            and Services are provided &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; for your
            information and use only.
          </p>
          <p>
            <strong>6.2 Limited License to Users.</strong> Subject to your compliance with these
            Terms, StreetFeast grants you a limited, non-exclusive, non-transferable,
            non-sublicensable, revocable license to access and use the Service and StreetFeast
            Content solely for your personal, non-commercial use (or, in the case of Vendors,
            for legitimate business purposes in connection with the Vendor Dashboard) as intended
            by the functionality of the Service. This license does not include any right to:
            (a) modify, reproduce, distribute, aggregateor create derivative works of the Service
            or StreetFeast Content; (b) use any data mining, robots, scraping, or similar data
            gathering or extraction methods; (c) download (other than page caching) any portion
            of the Service or StreetFeast Content except as expressly permitted; or
            (d) use the Service or StreetFeast Content for any purpose other than as permitted
            by these Terms. You may not, either directly or through the use of any device,
            software, online resource or other means, remove, alter, bypass, avoid, interfere
            with or circumvent any copyright, trademark or other proprietary notice on the Service
            or StreetFeast Content or any digital rights management mechanism, device, or other
            content protection or access control measure associated with the Service or StreetFeast
            Content.
          </p>
        </section>

        <section className={styles.section}>
          <h2>7. User Content</h2>
          <p>
            <strong>7.1 Definition.</strong> &quot;User Content&quot; means any content, material,
            information, or data that you submit, post, upload, transmit, or otherwise make
            available through the Service, including but not limited to: truck profiles, business
            descriptions, menu items, product descriptions, product pricing, images, photographs,
            event schedules, location information, contact information, push notification content,
            reviews, ratings, comments, and any other content contributed by Users or Vendors.
          </p>
          <p>
            <strong>7.2 License Grant.</strong> By submitting, posting, transmitting, or uploading
            User Content to or through the Service or otherwise making User Content available
            through the Service, you hereby grant to StreetFeast a worldwide, non-exclusive,
            royalty-free, sublicensable, transferable, perpetual, and irrevocable license to use,
            copy, reproduce, modify, adapt, edit, publish, transmit, display, distribute, perform,
            translate, create derivative works from, and otherwise exploit such User Content, in
            whole or in part, in any media, format, platform, or technology now known or hereafter
            developed, for any purpose in connection with the operation, promotion, and improvement
            of the Service, including without limitation for marketing, advertising, and
            promotional purposes. This license survives termination of your account or these Terms.
          </p>
          <p>
            <strong>7.3 Vendor Content License.</strong> Vendors who submit content through the
            Vendor Dashboard (including, without limitation, truck profiles, menu items, product
            descriptions, images, and schedules) grant StreetFeast the rights set forth in
            Section 7.2, and additionally authorize StreetFeast to display such content to
            consumers and other Users within the Service and in connection with StreetFeast&apos;s
            marketing, advertising and promotional activities. Vendors represent and warrant that
            all Vendor content is accurate, current, not misleading, and complies with all
            applicable laws and regulations, including without limitation food labeling and
            allergen disclosure requirements.
          </p>
          <p>
            <strong>7.4 Representations and Warranties.</strong> You represent and warrant that:
            (a) you own or have obtained all rights, licenses, permissions, and consents necessary
            to grant the licenses set forth herein; (b) your User Content does not and will not
            infringe, violate, or misappropriate any third-party intellectual property rights,
            privacy rights, publicity rights, or other personal or proprietary rights;
            (c) your User Content does not contain any material that is defamatory, obscene,
            threatening, harassing, discriminatory, fraudulent, or otherwise unlawful;
            (d) your User Content complies with all applicable laws, rules, and regulations;
            (e) you will not use the Service for the purpose of recruiting including, but not
            limited to recruiting for another website and/or app and/or service that offers
            competing functionality to the Service; and (f) your User Content does not violate
            any law or third-party rights, including without limitation any intellectual property,
            privacy, or publicity rights. You agree to indemnify and hold harmless StreetFeast and
            the StreetFeast Parties (as defined in Section 15 of these Terms) from and against any
            and all claims, damages, losses, liabilities, costs, and expenses (including, but not
            limited to reasonable attorneys&apos; fees) arising out of, related to, or in connection
            with your User Content, including but not limited to any claim that your User Content
            infringes or violates any third-party rights or applicable law.
          </p>
          <p>
            <strong>7.5 Content Moderation.</strong> StreetFeast reserves the right, but has no
            obligation, to monitor, review, screen, edit, remove, or refuse any User Content at
            any time, in StreetFeast&apos;s sole discretion, with or without notice, for any
            reason or no reason. Without limiting the foregoing, StreetFeast may remove or disable
            access to any User Content that StreetFeast, in its sole discretion, considers to be
            in violation of these Terms, applicable law, or otherwise objectionable. StreetFeast
            shall not be liable for any removal or failure to remove User Content.
          </p>
          <p>
            <strong>7.6 Moral Rights Waiver.</strong> To the fullest extent permitted by
            applicable law, you hereby irrevocably waive any and all moral rights (including,
            without limitation, rights of attribution and integrity) that you may have in or to
            any User Content submitted, posted, transmitted or uploaded to the Service or otherwise
            made available through the Service. If it is determined that you retain moral rights
            (including, without limitation, rights of attribution or integrity) in User Content
            submitted, posted, transmitted or uploaded to the Service or otherwise made available
            through the Service, then you hereby declare that: (i) you do not require that any
            personally identifying information be used in connection with the User Content, or any
            derivative works of or upgrades or updates thereto; (ii) you have no objection to the
            publication, use, modification, deletion and exploitation of the User Content by us or
            our licensees, successors and assigns; (iii) you forever waive and agree not to claim
            or assert any entitlement to any and all moral rights of an author in any of the User
            Content; and (iv) you forever release us, and our licensees, successors and assigns,
            from any claims that you could otherwise assert against us by virtue of any such moral
            rights.
          </p>
          <p>
            <strong>7.7 No Obligation.</strong> StreetFeast is under no obligation to store,
            maintain, or provide you with a copy of any User Content that you or other Users
            submit to the Service. You are solely responsible for maintaining backup copies of
            any User Content.
          </p>
          <p>
            <strong>7.8 No Liability.</strong> StreetFeast takes no responsibility and assumes no
            liability for User Content, or for any loss or damage thereto, nor are we liable for
            any mistakes, defamation, slander, libel, omissions, falsehoods, obscenity, pornography
            or profanity you may encounter. We are not liable for any statements, representations or
            User Content provided by our users in any public forum, personal home page or other area.
          </p>
          <p>
            <strong>7.9 SPAM Policy.</strong> StreetFeast enforces a zero-tolerance SPAM policy
            regarding information transmitted through our network. StreetFeast may determine in
            StreetFeast&apos;s sole discretion whether any transmissions are considered SPAM. SPAM
            includes, but is not limited to, the following: (a) Bulk unsolicited e-mail, promotional
            material, or other forms of solicitation sent via the Services, or e-mail that advertises
            the Service, or any IP address belonging to us, or any URL (domain) that is hosted by us,
            or any App belonging to us; (b) The use of web pages set up on ISPs that allow SPAMing
            that directly or indirectly reference customers to domains or IP addresses hosted by us;
            and/or (c) Forging or misrepresenting message headers, whether in whole or in part, to
            mask the true origin of the message.
          </p>
        </section>

        <section className={styles.section}>
          <h2>8. Image Uploads and Media</h2>
          <p>
            <strong>8.1 Image Submission.</strong> The Service permits Vendors and, where
            applicable, other Users to upload images, photographs, and other visual media
            (&quot;Media&quot;) in connection with truck profiles, product listings, and other
            features. All Media uploaded to the Service constitutes User Content and is subject
            to the license grants and terms set forth in Section 7.
          </p>
          <p>
            <strong>8.2 Media Processing.</strong> You acknowledge and agree that StreetFeast
            may automatically compress, resize, convert, crop, or otherwise process any Media
            uploaded to the Service for purposes of optimization, display, and storage. Media
            may be stored using third-party cloud storage providers on behalf of StreetFeast.
          </p>
          <p>
            <strong>8.3 Media Representations.</strong> By uploading Media, you represent and
            warrant that: (a) you are the owner of the Media or have obtained all necessary
            rights, licenses, and permissions to upload and grant the licenses herein; (b) the
            Media does not infringe or violate any third-party rights, including but not limited
            to intellectual property rights, privacy rights, or publicity rights; (c) if the
            Media depicts any identifiable individual, you have obtained the express consent of
            such individual to use their likeness in connection with the Service; and (d) the
            Media does not contain any illegal, harmful, threatening, abusive, hateful, defamatory,
            or otherwise objectionable material.
          </p>
        </section>

        <section className={styles.section}>
          <h2>9. Copyright Infringement and DMCA Takedown Notices</h2>
          <p>
            StreetFeast respects the intellectual property rights of others and expects its Users
            to do the same. In accordance with the Digital Millennium Copyright Act of 1998
            (&quot;DMCA&quot;), StreetFeast will respond to notices of alleged copyright
            infringement that comply with the DMCA and applicable law.
          </p>
          <p>
            <strong>9.1 Reporting Instances of Copyright Infringement.</strong> If you believe
            that any content on the Service infringes your copyright, you may submit a DMCA
            Takedown Notice to us at <strong>customer-support@streetfeastapp.com</strong> containing
            the following information:
          </p>
          <ul>
            <li>
              A physical or electronic signature of the copyright owner or a person authorized to
              act on the owner&apos;s behalf;
            </li>
            <li>
              Identification of the copyrighted work claimed to have been infringed;
            </li>
            <li>
              Identification of the material that is claimed to be infringing and that is to be
              removed, and information reasonably sufficient to permit StreetFeast to locate the
              material;
            </li>
            <li>
              Your contact information, including your address, telephone number, and email address;
            </li>
            <li>
              A statement that you have a good faith belief that the use of the material in the
              manner complained of is not authorized by the copyright owner, its agent, or the law;
              and
            </li>
            <li>
              A statement, under penalty of perjury, that the information in the notification is
              accurate and that you are authorized to act on behalf of the owner of the exclusive
              right that is allegedly infringed.
            </li>
          </ul>
          <p>
            DMCA Takedown Notices should be sent to: <strong>customer-support@streetfeastapp.com</strong>.
            You acknowledge that for StreetFeast to act on your notice, your DMCA Takedown Notice
            must comply with all of the requirements of this Section.
          </p>
          <p>
            Please also note that the information provided in a notice of copyright infringement
            may be forwarded to the user who posted the allegedly infringing content. Additionally,
            under Section 512(f) of the DMCA and similar regulations in other jurisdictions, anyone
            who knowingly misrepresents that material or activity is infringing may be liable for
            damages and attorneys&apos; fees incurred by the alleged infringer or by us.
          </p>
          <p>
            <strong>9.2 Our Response to a DMCA Takedown Notice.</strong> Following receipt of a
            proper written notification, we will promptly remove or disable access to the allegedly
            infringing content. We will also: (i) notify the user who posted the allegedly
            infringing material that we have removed the material or disabled access to it; and
            (ii) provide the user with a copy of the copyright infringement notification.
            StreetFeast reserves the right to suspend or terminate the accounts of repeat
            infringers in appropriate circumstances.
          </p>
          <p>
            <strong>9.3 Submitting a DMCA Counter-Notification.</strong> If you believe your
            content was removed or disabled by mistake or misidentification, you may send us a
            DMCA counter-notification to that includes the following information:
          </p>
          <ul>
            <li>
              Identification of the material that has been removed or to which access has been
              disabled, and the location at which the material appeared in the Materials before it
              was removed or access was disabled;
            </li>
            <li>
              Your contact information including your name, address, telephone number, and email
              address;
            </li>
            <li>
              A statement that you consent to the jurisdiction of the State court and U.S. Federal
              District Court located in the State of Delaware, and that you shall accept service of
              process from the person who provided the notification of infringement or an agent of
              such person;
            </li>
            <li>
              A statement that you swear, under penalty of perjury, that you have a good faith
              belief that the material was removed or disabled as a result of a mistake or
              misidentification of the material to be removed or disabled; and
            </li>
            <li>
              A physical or electronic signature of the copyright owner or a person authorized to
              act on the owner&apos;s behalf.
            </li>
          </ul>
          <p>
            DMCA counter-notifications should be sent to: <strong>customer-support@streetfeastapp.com</strong>.
            You acknowledge that for StreetFeast to act on your notice, your DMCA counter-notification
            must comply with all of the requirements of this Section.
          </p>
          <p>
            Please note that under Section 512(f) of the DMCA and similar regulations in other
            jurisdictions, any person who knowingly misrepresents that material or activity was
            removed or disabled by mistake or misidentification may be subject to liability.
          </p>
          <p>
            Upon receipt of a valid DMCA counter-notification, we shall forward it to the person
            who submitted the infringement notification. The person who submitted the infringement
            notification or the copyright holder they represent shall then have ten (10) days to
            notify us that they have filed legal action relating to the allegedly infringing
            material. If we do not receive any such notification within ten (10) days, we may
            restore the material to the Service.
          </p>
          <p>
            <strong>9.4 Repeat Infringer Policy.</strong> In accordance with the DMCA and other
            applicable law, we have adopted a policy of terminating access to materials for any
            users who, in our sole discretion, are deemed to be repeat infringers. We may also
            and at our sole discretion limit and/or terminate access to the materials of any users
            who infringe any intellectual property rights of others, whether or not they are repeat
            infringers.
          </p>
        </section>

        <section className={styles.section}>
          <h2>10. Prohibited Conduct</h2>
          <p>You agree not to, and agree not to assist, encourage, or enable any third party to:</p>
          <ul>
            <li>
              Use the Service for any illegal purpose or in violation of any applicable local,
              state, national, or international law, regulation, or ordinance;
            </li>
            <li>
              Submit false, misleading, inaccurate, or fraudulent information, including but not
              limited to false Vendor profiles, menus, pricing, locations, or schedules;
            </li>
            <li>
              Impersonate any person or entity, or falsely state or misrepresent your affiliation
              with any person or entity;
            </li>
            <li>
              Harass, threaten, abuse, stalk, intimidate, defame, or discriminate against any
              User, Vendor, or other individual;
            </li>
            <li>
              Post or transmit any User Content that is unlawful, harmful, threatening, abusive,
              hateful, defamatory, vulgar, obscene, invasive of another&apos;s privacy, or
              otherwise objectionable;
            </li>
            <li>
              Attempt to gain unauthorized access to the Service, other User accounts, computer
              systems, or networks connected to the Service through hacking, password mining,
              brute force, or any other means;
            </li>
            <li>
              Trick, defraud, or mislead us and/or other Users, especially in any attempt to learn
              sensitive account information such as User passwords;
            </li>
            <li>
              Use the Service as part of any effort to compete with us or otherwise use the Service
              and/or the content thereof for any revenue-generating endeavor or commercial enterprise
              without StreetFeast&apos;s express prior written permission;
            </li>
            <li>
              Use any robot, spider, scraper, crawler, or other automated means to access the
              Service for any purpose without StreetFeast&apos;s express prior written permission;
            </li>
            <li>
              Misuse of APIs;
            </li>
            <li>
              Make improper use of our support services or submit false reports of abuse or
              misconduct;
            </li>
            <li>
              Interfere with or disrupt the Service, servers, or networks connected to the Service,
              including but not limited to through the transmission of viruses, worms, malware, or
              other harmful code;
            </li>
            <li>
              Reverse engineer, decompile, disassemble, or otherwise attempt to derive the source
              code of the Service or any part thereof;
            </li>
            <li>
              Use the Service for commercial purposes without StreetFeast&apos;s prior written
              consent, except as expressly permitted by the Vendor Dashboard features;
            </li>
            <li>
              Circumvent, disable, or otherwise interfere with any security-related features of
              the Service or features that prevent or restrict use or copying of any content;
            </li>
            <li>
              Falsely state, misrepresent or submit false, misleading, inaccurate, or fraudulent
              information about the location, operating schedule, availability, or any other
              material information of a Vendor, food truck, or pop-up restaurant;
            </li>
            <li>
              Post, upload, or transmit any content that is harmful, threatening, abusive,
              harassing, tortious, defamatory, vulgar, obscene, libelous, or that promotes
              violence, discrimination, illegal activities, or harm to any person or group;
            </li>
            <li>
              Use any automated tools, bots, scripts, spiders, scrapers, crawlers, or similar
              technology to access, scrape, extract, index, or manipulate data from the Service
              or its underlying databases, whether for competitive purposes, data aggregation,
              or any other purpose, without StreetFeast&apos;s express prior written consent;
            </li>
            <li>
              Use the Service in any manner that could damage, disable, overburden, or impair
              the Service or interfere with any other party&apos;s use and enjoyment of the
              Service;
            </li>
            <li>
              Provide us with any information or submit any information to us if you are not
              expressly authorized by such party to do so;
            </li>
            <li>
              Sell and/or resell access to the Service without StreetFeast&apos;s express prior
              written consent;
            </li>
            <li>
              Manipulate the Service in any way, shape or form;
            </li>
            <li>
              Manipulate Vendor analytics, engagement metrics, or any data tracked by the Service
              through artificial or fraudulent means;
            </li>
            <li>
              Creating deep-links to the Service including but not limited to by bypassing the
              Service pages, mirroring or similar navigational technology or directly link to any
              portion of the Service;
            </li>
            <li>
              Probe, scan, test the vulnerability of or breach the authentication measures of the
              Service or any related web pages, apps, networks or systems;
            </li>
            <li>
              Use or access the Service in any way that, in our sole judgment, adversely affects
              the performance or function of the Service or interferes with the ability of
              authorized parties to access the Service, including but not limited to any action
              that imposes, or may impose, in our sole discretion, an unreasonable or
              disproportionately large load on our infrastructure and/or harassment through
              responses;
            </li>
            <li>
              Use or access the Service in any way that violates the law or for any illegal
              activities; or
            </li>
            <li>
              Violate any applicable Apple App Store, Google Play Store, or other platform
              guidelines or terms of service.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>11. Privacy and Data Processing</h2>
          <p>
            <strong>11.1 Privacy Policy.</strong> Your use of the Service is also governed by our
            Privacy Policy, which is hereby incorporated into these Terms by reference. By using
            the Service, you consent to the collection, use, storage, and processing of your
            information as described in the Privacy Policy. Please review the Privacy Policy
            carefully to understand our practices regarding your personal information. As stated
            in the Privacy Policy, the Privacy Policy may be changed from time to time and such
            changes are effective immediately upon their posting.
          </p>
          <p>
            <strong>11.2 Data Collection.</strong> In connection with the operation of the
            Service, StreetFeast and its third-party service providers collect and process certain
            data, including but not limited to:
          </p>
          <ul>
            <li>
              <strong>Account Information:</strong> Name, email address, phone number, and
              account credentials provided during registration;
            </li>
            <li>
              <strong>Location Data:</strong> With your consent, the Service collects foreground
              location data (GPS coordinates) to display nearby Vendors and provide location-based
              features. StreetFeast does not collect background location data;
            </li>
            <li>
              <strong>Device Information:</strong> Device type, operating system, application
              version, device identifiers, and timezone;
            </li>
            <li>
              <strong>Usage Analytics:</strong> The Service uses third-party analytics tools
              (including but not limited to PostHog and Sentry) to collect information about how
              you interact with the Service, including but not limited to pages visited, features
              used, tap events, session duration, and error reports. Error tracking services may
              collect device state information and session replay data in connection with app
              errors;
            </li>
            <li>
              <strong>Push Notification Tokens:</strong> Device tokens for Firebase Cloud
              Messaging used to deliver push notifications; and
            </li>
            <li>
              <strong>Vendor Analytics Data:</strong> Aggregated and anonymized analytics data
              relating to Vendor profile views, directions requests, discovery sources, engagement
              metrics, and push notification performance.
            </li>
          </ul>
          <p>
            <strong>11.3 Third-Party Services.</strong> The Service integrates with third-party
            services and platforms, including but not limited to Supabase (authentication),
            Mapbox (mapping and geolocation), Firebase (push notifications), RevenueCat
            (subscription management), PostHog (analytics), Sentry (error tracking and monitoring),
            and Azure (cloud storage). Your use of the Service may be subject to the terms and
            privacy policies of such third-party services. StreetFeast is not responsible for
            the privacy practices of any third-party service provider.
          </p>
          <p>
            <strong>11.4 Data Transfer.</strong> The Service is hosted in and operated from the
            United States of America. If you access the Service from outside the United States of
            America, you acknowledge and consent to the transfer, storage, and processing of your
            personal data in the United States of America and other jurisdictions that may not
            provide the same level of data protection as your jurisdiction of residence. By using
            the Service, you consent to such transfers.
          </p>
          <p>
            <strong>11.5 Cookies Policy.</strong> We use cookies or similar technologies to
            optimize the functionality of the Service to help us understand how the Service is
            used and to improve the Service. For more information about the cookies and similar
            technologies used on the Service, please refer to our Cookie Policy located in the
            Privacy Policy.
          </p>
        </section>

        <section className={styles.section}>
          <h2>12. Push Notifications</h2>
          <p>
            <strong>12.1 User Notifications.</strong> With your permission, StreetFeast may send
            push notifications to your device regarding schedule updates for favorited Vendors,
            daily digest summaries, and other Service-related communications. You may manage your
            notification preferences through the App settings or your device settings at any time.
          </p>
          <p>
            <strong>12.2 Vendor-Initiated Notifications.</strong> Vendors may send push
            notifications to Users who have favorited their business. Such notifications are
            subject to rate limitations imposed by StreetFeast. StreetFeast is not responsible
            for the content of Vendor-initiated notifications and does not endorse or guarantee
            any information contained therein.
          </p>
        </section>

        <section className={styles.section}>
          <h2>13. Third-Party Links, Content, and Services</h2>
          <p>
            The Service may contain links to third-party websites, applications, or services,
            or display content from third parties. Such links and content are provided for your
            convenience only and do not signify endorsement, sponsorship, or recommendation by
            StreetFeast. StreetFeast has no control over, and assumes no responsibility for, the
            content, privacy policies, terms of service, or practices of any third-party websites,
            applications, or services. You access and use third-party content and services
            entirely at your own risk.
          </p>
        </section>

        <section className={styles.section}>
          <h2>14. Disclaimers</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE SERVICE, ALL STREETFEAST
            CONTENT, AND ALL USER CONTENT ARE PROVIDED &quot;AS IS,&quot; &quot;AS AVAILABLE,&quot;
            AND &quot;WITH ALL FAULTS,&quot; WITHOUT ANY WARRANTY OF ANY KIND, WHETHER EXPRESS,
            IMPLIED, STATUTORY, OR OTHERWISE. STREETFEAST HEREBY EXPRESSLY DISCLAIMS ALL
            WARRANTIES, INCLUDING WITHOUT LIMITATION: (A) WARRANTIES OF MERCHANTABILITY, FITNESS
            FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, AND QUIET ENJOYMENT;
            (B) WARRANTIES ARISING FROM COURSE OF DEALING, USAGE, OR TRADE PRACTICE;
            (C) WARRANTIES REGARDING THE ACCURACY, COMPLETENESS, RELIABILITY, AVAILABILITY,
            TIMELINESS, SECURITY, OR PERFORMANCE OF THE SERVICE; AND (D) WARRANTIES THAT THE
            SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, VIRUS-FREE, OR SECURE.
          </p>
          <p>
            WITHOUT LIMITING THE FOREGOING, STREETFEAST MAKES NO WARRANTY OR REPRESENTATION
            REGARDING: (I) THE QUALITY, SAFETY, LEGALITY, OR SUITABILITY OF ANY FOOD, BEVERAGE,
            OR PRODUCT OFFERED BY ANY VENDOR; (II) THE ACCURACY OR COMPLETENESS OF ANY VENDOR
            PROFILE, MENU, PRICING, SCHEDULE, LOCATION, OR OTHER INFORMATION DISPLAYED ON THE
            SERVICE; (III) THE IDENTITY, QUALIFICATIONS, LICENSING, OR REGULATORY COMPLIANCE OF
            ANY VENDOR; (IV) THE AVAILABILITY OR OPERATING STATUS OF ANY VENDOR AT ANY GIVEN
            TIME; OR (V) THE ACCURACY OF ANY LOCATION DATA, DIRECTIONS, OR MAPS PROVIDED THROUGH
            THE SERVICE.
          </p>
          <p>
            YOU ACKNOWLEDGE AND AGREE THAT STREETFEAST IS A TECHNOLOGY PLATFORM AND NOT A FOOD
            SERVICE PROVIDER, HEALTH INSPECTOR, OR REGULATORY BODY. ANY RELIANCE ON VENDOR
            INFORMATION, USER CONTENT, OR ANY OTHER CONTENT AVAILABLE THROUGH THE SERVICE IS AT
            YOUR SOLE RISK. STREETFEAST DOES NOT GUARANTEE THAT VENDORS COMPLY WITH APPLICABLE
            HEALTH, SAFETY, FOOD HANDLING, ALLERGEN DISCLOSURE, OR LICENSING REQUIREMENTS.
          </p>
        </section>

        <section className={styles.section}>
          <h2>15. Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL STREETFEAST,
            ITS AFFILIATES, SUBSIDIARIES, PARENT COMPANIES, OR THEIR RESPECTIVE OFFICERS,
            DIRECTORS, EMPLOYEES, AGENTS, PARTNERS, LICENSORS, OR SUPPLIERS (COLLECTIVELY,
            THE &quot;STREETFEAST PARTIES&quot;) BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY
            INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES,
            INCLUDING BUT NOT LIMITED TO DAMAGES FOR LOSS OF PROFITS, REVENUE, GOODWILL, DATA,
            USE, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR IN CONNECTION WITH:
          </p>
          <ul>
            <li>Your access to, use of, or inability to access or use the Service;</li>
            <li>Any conduct or content of any third party on or through the Service, including
              without limitation any defamatory, offensive, or illegal conduct of other Users
              or Vendors;</li>
            <li>Any User Content or Vendor content accessed through the Service;</li>
            <li>Any food, beverage, product, or service provided by any Vendor;</li>
            <li>Any allergic reaction, foodborne illness, injury, or damage arising from the
              consumption of food or beverages obtained from any Vendor discovered through the
              Service;</li>
            <li>Unauthorized access, use, or alteration of your transmissions or content;</li>
            <li>Any errors, inaccuracies, or omissions in Vendor information, location data,
              or other content;</li>
            <li>Any interruption, suspension, or termination of the Service or any part thereof;
              or</li>
            <li>Any other matter relating to the Service,</li>
          </ul>
          <p>
            WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING BUT NOT LIMITED TO NEGLIGENCE),
            STRICT LIABILITY, PRODUCT LIABILITY, OR ANY OTHER LEGAL THEORY, AND WHETHER OR NOT
            STREETFEAST HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES, AND EVEN IF A
            LIMITED REMEDY SET FORTH HEREIN IS FOUND TO HAVE FAILED OF ITS ESSENTIAL PURPOSE.
          </p>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE AGGREGATE LIABILITY OF THE
            STREETFEAST PARTIES FOR ALL CLAIMS ARISING OUT OF OR IN CONNECTION WITH THESE TERMS
            OR THE SERVICE SHALL NOT EXCEED THE GREATER OF: (A) ONE HUNDRED UNITED STATES OF
            AMERICA DOLLARS (US $100.00); OR (B) THE TOTAL AMOUNT YOU PAID TO STREETFEAST IN
            SUBSCRIPTION FEES DURING THE TWELVE (12) MONTHS IMMEDIATELY PRECEDING THE EVENT
            GIVING RISE TO THE CLAIM.
          </p>
          <p>
            IF YOU ARE DISSATISFIED WITH THE SERVICE OR ANY CONTENT THEREON, YOUR SOLE AND
            EXCLUSIVE REMEDY IS TO DISCONTINUE ACCESSING AND USING THE SERVICE.
          </p>
          <p>
            THE LIMITATIONS OF THIS SECTION SHALL APPLY NOTWITHSTANDING THE FAILURE OF THE
            ESSENTIAL PURPOSE OF ANY LIMITED REMEDY. SOME JURISDICTIONS DO NOT ALLOW THE
            EXCLUSION OR LIMITATION OF INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE ABOVE
            LIMITATIONS MAY NOT APPLY TO YOU.
          </p>
        </section>

        <section className={styles.section}>
          <h2>16. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless the StreetFeast Parties from and
            against all claims, losses, liabilities, damages, judgments, settlements, fines,
            penalties, expenses, and costs (including but not limited to reasonable attorneys&apos;
            fees and court costs) arising out of or in connection with: (a) your access to or use
            of the Service; (b) your User Content or any other content you submit, post, or
            transmit through the Service; (c) your violation of these Terms; (d) your violation
            of any applicable law, rule, regulation, or the rights of any third party; (e) any
            dispute between you and any Vendor or other User; (f) your negligence, willful
            misconduct, or fraud; or (g) any misrepresentation made by you.
          </p>
          <p>
            StreetFeast reserves the right, at your sole expense, to assume the exclusive defense
            and control of any matter subject to indemnification by you, in which case you agree
            to cooperate fully with StreetFeast in the defense of such matter. You shall not
            settle any claim subject to indemnification without StreetFeast&apos;s prior written
            consent.
          </p>
        </section>

        <section className={styles.section}>
          <h2>17. Dispute Resolution</h2>
          <p>
            <strong>PLEASE READ THIS SECTION CAREFULLY. IT AFFECTS YOUR LEGAL RIGHTS, INCLUDING
            YOUR RIGHT TO FILE A LAWSUIT IN COURT AND TO HAVE A JURY HEAR YOUR CLAIMS.</strong>
          </p>
          <p>
            <strong>17.1 Informal Resolution.</strong> As a condition precedent to initiating any
            arbitration or court proceeding, both you and StreetFeast agree to first attempt to
            resolve any dispute, claim, or controversy arising out of or relating to these Terms
            or the Service (&quot;Dispute&quot;) informally. The party asserting the Dispute shall
            send written notice to the other party describing the facts and circumstances of the
            Dispute, including any supporting documentation. For notices to StreetFeast, please
            send to: <strong>customer-support@streetfeastapp.com</strong>. For notices to you, StreetFeast will
            use the email address or phone number associated with your account. The receiving
            party shall have thirty (30) days from receipt of such notice to respond to or
            attempt to resolve the Dispute. Neither party may initiate arbitration or court
            proceedings until this thirty (30) day period has expired.
          </p>
          <p>
            <strong>17.2 Binding Arbitration.</strong> If a Dispute cannot be resolved through
            the informal resolution process described above, the Dispute shall be exclusively
            and finally resolved by binding individual arbitration administered by the American
            Arbitration Association (&quot;AAA&quot;) in accordance with its Consumer Arbitration
            Rules (&quot;AAA Rules&quot;), as modified by this Section. The AAA Rules are available
            at www.adr.org or by calling the AAA at (800) 778-7879. You and StreetFeast each
            expressly delegate to the arbitrator the authority to determine the arbitrability of
            any Dispute, including but not limited to the scope, applicability, validity, and
            enforceability of this arbitration provision.
          </p>
          <p>
            The arbitration shall be conducted by a single arbitrator selected in accordance with
            the AAA Rules. You may elect to have the arbitration conducted by telephone, video
            conference, or other remote means, based on written submissions, or in person in the
            county where you reside or at another mutually agreed location. The arbitration shall
            be conducted in the English language. Each party shall be responsible for paying its
            own attorneys&apos; fees, costs, and expenses in connection with the arbitration,
            unless otherwise required by applicable law or as determined by the arbitrator pursuant
            to the AAA Rules. The arbitrator may award on an individual basis any relief that would
            be available in a court, including but not limited to injunctive or declaratory relief,
            and must follow and enforce these Terms as a court would. The arbitrator shall issue a
            reasoned written decision sufficient to explain the essential findings and conclusions
            on which the award is based. Any arbitration proceedings shall be confidential, and
            neither party may disclose the existence, content, or results of any arbitration except
            as required by law or for purposes of enforcement of the arbitration award. Judgment on
            any arbitration award may be entered in any court of competent jurisdiction.
          </p>
          <p>
            <strong>17.2.1 Arbitration Fees.</strong> Payment of all filing, administration, and
            arbitrator fees will be governed by the AAA Rules. If you demonstrate that the costs
            of arbitration will be prohibitive as compared to the costs of litigation, StreetFeast
            will pay as much of the filing, administration, and arbitrator fees as the arbitrator
            deems necessary to prevent the arbitration from being cost-prohibitive.
          </p>
          <p>
            This arbitration provision is made pursuant to a transaction involving interstate
            commerce and shall be governed by the Federal Arbitration Act, 9 U.S.C. &sect; 1 et
            seq., and not by state arbitration law.
          </p>
          <p>
            <strong>17.3 Class Action and Jury Waiver.</strong> YOU AND STREETFEAST EACH AGREE
            THAT ANY DISPUTE SHALL BE CONDUCTED ONLY ON AN INDIVIDUAL BASIS AND NOT IN A CLASS,
            CONSOLIDATED, OR REPRESENTATIVE ACTION. YOU AND STREETFEAST EACH WAIVE THE RIGHT TO
            A TRIAL BY JURY. YOU AND STREETFEAST EACH WAIVE THE RIGHT TO PARTICIPATE IN A CLASS
            ACTION, PRIVATE ATTORNEY GENERAL ACTION, OR OTHER REPRESENTATIVE OR COLLECTIVE
            ACTION. If a court or arbitrator determines that this class action waiver is
            unenforceable as to a particular Dispute, then the arbitration agreement in this
            Section shall be deemed void as to that Dispute, and such Dispute shall proceed in
            a court of competent jurisdiction.
          </p>
          <p>
            <strong>17.4 Exceptions.</strong> Notwithstanding the foregoing: (a) either party
            may bring an individual claim in small claims court consistent with the jurisdictional
            and dollar limits that may apply, provided the claim is brought and maintained as an
            individual claim; and (b) either party may seek injunctive or other equitable relief
            in a court of competent jurisdiction to prevent the actual or threatened infringement,
            misappropriation, or violation of intellectual property rights or confidential
            information.
          </p>
          <p>
            <strong>17.5 Statute of Limitations.</strong> You agree that any Dispute must be
            commenced within one (1) year after the claim arises; otherwise, such Dispute is
            permanently barred. This provision shall not modify any statutory limitation period
            that cannot be shortened by agreement under applicable law.
          </p>
        </section>

        <section className={styles.section}>
          <h2>18. Governing Law</h2>
          <p>
            These Terms and any Dispute arising out of or relating to these Terms or the Service
            shall be governed by and construed in accordance with the laws of the State of
            Delaware, without regard to its conflict of law principles. To the extent any
            litigation is permitted under these Terms, you and StreetFeast consent to the
            exclusive jurisdiction of the federal and state courts located in the State of
            Delaware, and you waive any objection to jurisdiction and venue in such courts.
          </p>
        </section>

        <section className={styles.section}>
          <h2>19. Apple App Store and Google Play Store Terms</h2>
          <p>
            The following terms apply if you access or use the Service through the Apple App
            Store or Google Play Store:
          </p>
          <p>
            <strong>19.1 Apple App Store.</strong> If you downloaded or accessed the App through
            the Apple App Store, you acknowledge and agree that: (a) these Terms are between you
            and StreetFeast only, and not with Apple Inc. (&quot;Apple&quot;), and StreetFeast,
            not Apple, is solely responsible for the App and its content; (b) Apple has no
            obligation to provide any maintenance or support services with respect to the App;
            (c) in the event of any failure of the App to conform to any applicable warranty,
            you may notify Apple, and Apple will refund the purchase price, if any, for the App
            to you; to the maximum extent permitted by applicable law, Apple will have no other
            warranty obligation with respect to the App; (d) Apple is not responsible for
            addressing any claims by you or any third party relating to the App or your
            possession and/or use of the App, including without limitation: (i) product liability
            claims; (ii) any claim that the App fails to conform to any applicable legal or
            regulatory requirement; and (iii) claims arising under consumer protection, privacy,
            or similar legislation; (e) in the event of any third-party claim that the App or
            your possession and use of the App infringes a third party&apos;s intellectual
            property rights, StreetFeast, not Apple, will be solely responsible for the
            investigation, defense, settlement, and discharge of any such intellectual property
            infringement claim; (f) Apple and its subsidiaries are third-party beneficiaries of
            these Terms, and upon your acceptance of these Terms, Apple will have the right (and
            will be deemed to have accepted the right) to enforce these Terms against you as a
            third-party beneficiary thereof; and (g) you represent and warrant that: (i) you are
            not located in a country that is subject to a U.S. Government embargo or that has
            been designated by the U.S. Government as a &quot;terrorist supporting&quot; country;
            and (ii) you are not listed on any U.S. Government list of prohibited or restricted
            parties.
          </p>
          <p>
            <strong>19.2 Google Play Store.</strong> If you downloaded or accessed the App through
            the Google Play Store, you acknowledge and agree that: (a) these Terms are between
            you and StreetFeast only, and not with Google LLC (&quot;Google&quot;); (b) Google is
            not responsible for the App or its content; (c) Google has no obligation to provide
            any maintenance or support services with respect to the App; (d) Google is not
            responsible for addressing any claims by you or any third party relating to the App;
            and (e) your use of the App is also subject to the Google Play Store Terms of Service.
          </p>
        </section>

        <section className={styles.section}>
          <h2>20. Export Controls and Compliance</h2>
          <p>
            The Service may be subject to United States of America export control laws and
            regulations. You shall not, directly or indirectly, export, re-export, or transfer
            the Service or any portion thereof to any country, entity, or person prohibited by
            applicable export control laws, including without limitation: (a) any country subject
            to a U.S. Government embargo; (b) any person or entity on the U.S. Department of the
            Treasury&apos;s list of Specially Designated Nationals or the U.S. Department of
            Commerce&apos;s Denied Persons List or Entity List; or (c) any prohibited destination
            specified by U.S. export laws. You represent and warrant that you are not located in,
            under the control of, or a national or resident of any such country, or on any such
            list.
          </p>
        </section>

        <section className={styles.section}>
          <h2>21. Miscellaneous</h2>
          <p>
            <strong>21.1 Entire Agreement.</strong> These Terms, together with the Privacy Policy
            and any other agreements, policies, or guidelines expressly incorporated by reference,
            constitutes the sole and entire agreement between you and StreetFeast with respect to
            the subject matter hereof and supersede all prior and contemporaneous communications,
            understandings, agreements, representations, and/or warranties, whether written and
            oral, with respect to such subject matter.
          </p>
          <p>
            <strong>21.2 Severability.</strong> If any provision of these Terms is held by a
            court or arbitrator of competent jurisdiction to be invalid, illegal, or unenforceable,
            such provision shall be modified and interpreted to accomplish the objectives of such
            provision to the greatest extent possible under applicable law, and the remaining
            provisions shall continue in full force and effect.
          </p>
          <p>
            <strong>21.3 Waiver.</strong> No failure or delay by StreetFeast in exercising any
            right, remedy, power, or privilege under these Terms shall operate as a waiver
            thereof. No single or partial exercise of any right or remedy shall preclude any
            other or further exercise thereof or the exercise of any other right or remedy. Any
            waiver must be in writing and signed by StreetFeast to be effective.
          </p>
          <p>
            <strong>21.4 Assignment.</strong> You may not assign, transfer, or delegate these
            Terms or any of your rights or obligations hereunder without StreetFeast&apos;s prior
            written consent. Any purported assignment in violation of this Section is void.
            StreetFeast may freely assign, transfer, or delegate these Terms and its rights and
            obligations hereunder without restriction. These Terms shall be binding upon and
            inure to the benefit of the parties and their permitted successors and assigns.
          </p>
          <p>
            <strong>21.5 Force Majeure.</strong> StreetFeast shall not be liable for any delay
            or failure in performance resulting from causes beyond its reasonable control,
            including but not limited to acts of God, natural disasters, war, terrorism, riots,
            embargoes, acts of governmental authorities, fire, floods, epidemics, pandemics,
            strikes, power outages, internet service provider failures, or telecommunications
            failures.
          </p>
          <p>
            <strong>21.6 Service Availability.</strong> The Service may be temporarily unavailable
            due to scheduled maintenance, upgrades, or technical issues. StreetFeast will use
            commercially reasonable efforts to provide advance notice of scheduled maintenance
            but shall have no liability for any unavailability or downtime, whether planned or
            unplanned.
          </p>
          <p>
            <strong>21.7 Electronic Communications.</strong> By using the Service, you consent
            to receiving electronic communications from StreetFeast, including but not limited
            to push notifications, emails, and in-app messages. You agree that all agreements,
            notices, disclosures, and other communications that StreetFeast provides to you
            electronically satisfy any legal requirement that such communications be in writing.
          </p>
          <p>
            <strong>21.8 No Third-Party Beneficiaries.</strong> Except as expressly provided in
            Section 19 (Apple App Store and Google Play Store Terms), these Terms do not confer
            any rights, remedies, or benefits upon any person or entity other than the parties
            hereto and their permitted successors and assigns.
          </p>
          <p>
            <strong>21.9 Headings.</strong> The section headings in these Terms are for
            convenience only and shall not affect the interpretation of these Terms.
          </p>
          <p>
            <strong>21.10 Survival.</strong> The following Sections of these Terms shall survive
            any termination or expiration of these Terms or your account: Sections 6, 7, 8, 9,
            14, 15, 16, 17, 18, 19, 20, and 21. In addition any other provision which, by its
            terms is intended to survive the termination of this Terms, shall survive the
            termination or expiration of this Terms.
          </p>
        </section>

        <section className={styles.section}>
          <h2>22. Contact Information</h2>
          <p>
            If you have any questions, concerns, or complaints regarding these Terms or the
            Service, please contact us at:
          </p>
          <p>
            <strong>StreetFeast</strong><br />
            Email: <a href="mailto:customer-support@streetfeastapp.com">customer-support@streetfeastapp.com</a><br />
            Website: <a href="https://www.streetfeastapp.com/contact">streetfeastapp.com/contact</a>
          </p>
        </section>
      </main>
    </div>
  );
}
