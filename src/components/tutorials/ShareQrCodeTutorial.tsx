import Image from "next/image";
import styles from "./tutorials.module.css";

export default function ShareQrCodeTutorial() {
  return (
    <>
      <section id="overview" className={styles.section}>
        <h2 className={styles.sectionTitle}>Overview</h2>
        <p className={styles.paragraph}>
          Your unique QR code allows customers to instantly view your truck profile in the StreetFeast app by scanning it with their phone. This is a powerful marketing tool for both physical and digital promotion.
        </p>
      </section>

      <section id="accessing-your-qr-code" className={styles.section}>
        <h2 className={styles.sectionTitle}>Accessing Your QR Code</h2>
        <ol className={styles.list}>
          <li>Open the StreetFeast app and navigate to the <strong className={styles.strong}>My Truck</strong> tab.</li>
        </ol>
        <figure className={styles.figure}>
          <Image
            src="/tutorials/share-qr-code/01-my-truck-home.png"
            alt="My Truck Home Screen showing the QR Code button next to Edit Profile"
            width={300}
            height={600}
            className={styles.image}
          />
          <figcaption className={styles.caption}>My Truck Home Screen</figcaption>
        </figure>
        <ol className={styles.list} start={2}>
          <li>Tap the <strong className={styles.strong}>QR Code</strong> button next to the Edit Profile button.</li>
          <li>Your unique QR code will be displayed on screen with the StreetFeast logo in the center.</li>
        </ol>
        <figure className={styles.figure}>
          <Image
            src="/tutorials/share-qr-code/02-qr-code-screen.png"
            alt="QR Code Screen displaying your unique truck QR code with Share, Copy Link, and Download buttons"
            width={300}
            height={600}
            className={styles.image}
          />
          <figcaption className={styles.caption}>QR Code Screen</figcaption>
        </figure>
      </section>

      <section id="sharing-options" className={styles.section}>
        <h2 className={styles.sectionTitle}>Sharing Options</h2>
        <p className={styles.paragraph}>Your QR code screen provides three ways to share your truck:</p>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>Share Button</h3>
        <p className={styles.paragraph}>
          The <strong className={styles.strong}>Share</strong> button opens your device&apos;s share menu, allowing you to:
        </p>
        <ul className={styles.list}>
          <li>Send the link via text message</li>
          <li>Share on social media (Facebook, Instagram, Twitter, etc.)</li>
          <li>Send via email</li>
          <li>Share through any other app that supports link sharing</li>
        </ul>
        <figure className={styles.figure}>
          <Image
            src="/tutorials/share-qr-code/03-share-sheet.png"
            alt="Share sheet showing various sharing options including Messages, Mail, and social media apps"
            width={300}
            height={600}
            className={styles.image}
          />
          <figcaption className={styles.caption}>Share Sheet</figcaption>
        </figure>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>Copy Link Button</h3>
        <p className={styles.paragraph}>
          The <strong className={styles.strong}>Copy Link</strong> button copies your truck&apos;s direct link to your clipboard. You can then:
        </p>
        <ul className={styles.list}>
          <li>Paste it into social media posts</li>
          <li>Add it to your website</li>
          <li>Include it in marketing materials</li>
          <li>Send it in messages</li>
        </ul>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>Download Button</h3>
        <p className={styles.paragraph}>
          The <strong className={styles.strong}>Download</strong> button saves the QR code image directly to your device&apos;s photo library. This is useful for:
        </p>
        <ul className={styles.list}>
          <li>Printing the QR code for your truck window or menu board</li>
          <li>Adding it to flyers and promotional materials</li>
          <li>Including it in digital marketing assets</li>
          <li>Creating table tents or business cards</li>
        </ul>
      </section>

      <section id="best-practices-for-qr-code-use" className={styles.section}>
        <h2 className={styles.sectionTitle}>Best Practices for QR Code Use</h2>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>Physical Display</h3>
        <ul className={styles.list}>
          <li>Print your QR code and display it prominently on your truck</li>
          <li>Add it to your menu boards</li>
          <li>Include it on receipts or packaging</li>
          <li>Create table tents with the QR code for customer tables</li>
        </ul>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>Digital Marketing</h3>
        <ul className={styles.list}>
          <li>Add the QR code to your social media profiles</li>
          <li>Include it in email newsletters</li>
          <li>Feature it on your website</li>
          <li>Use it in digital advertisements</li>
        </ul>

        <div className={styles.tipBox}>
          <p className={styles.tipTitle}>Tips for Maximum Engagement:</p>
          <ul className={styles.tipContent}>
            <li>Make sure the QR code is large enough to scan easily (at least 2x2 inches for print)</li>
            <li>Place it at eye level where customers can easily see it</li>
            <li>Add a call-to-action near the code like &quot;Scan to follow us on StreetFeast!&quot;</li>
            <li>Test the code regularly to ensure it works properly</li>
          </ul>
        </div>
      </section>

      <section id="tips-for-success" className={styles.section}>
        <h2 className={styles.sectionTitle}>What Happens When Customers Scan</h2>
        <p className={styles.paragraph}>When a customer scans your QR code:</p>
        <ol className={styles.list}>
          <li>If they have the StreetFeast app installed, it opens directly to your truck profile</li>
          <li>If they don&apos;t have the app, they&apos;ll be prompted to download it</li>
          <li>
            From your profile, they can:
            <ul className={styles.nestedList}>
              <li>View your menu and prices</li>
              <li>See your schedule and locations</li>
              <li>Follow your truck to get notifications</li>
              <li>Get directions to your current location</li>
            </ul>
          </li>
        </ol>

        <div className={styles.noteBox}>
          <p className={styles.noteTitle}>Important Notes:</p>
          <ul className={styles.noteContent}>
            <li>Your QR code is unique to your truck and never changes</li>
            <li>The code works even if customers don&apos;t have the StreetFeast app (they&apos;ll be directed to download it)</li>
            <li>Make sure to update your truck profile regularly so customers see current information when they scan</li>
          </ul>
        </div>
      </section>
    </>
  );
}
