import Image from "next/image";
import styles from "./tutorials.module.css";

export default function PushNotificationsTutorial() {
  return (
    <>
      <section id="overview" className={styles.section}>
        <h2 className={styles.sectionTitle}>Overview</h2>
        <p className={styles.paragraph}>
          Push notifications allow you to send instant messages to all customers who have followed your truck on StreetFeast. When you send a notification, it appears on their device even if they&apos;re not currently using the app.
        </p>
        <div className={styles.noteBox}>
          <p className={styles.noteTitle}>Important:</p>
          <p className={styles.noteContent}>
            You can only send one manual push notification every 4 hours. Use this feature strategically to maximize engagement.
          </p>
        </div>
      </section>

      <section id="accessing-push-notifications" className={styles.section}>
        <h2 className={styles.sectionTitle}>Accessing Push Notifications</h2>
        <ol className={styles.list}>
          <li>Open the StreetFeast app and navigate to the <strong className={styles.strong}>My Truck</strong> tab.</li>
        </ol>
        <figure className={styles.figure}>
          <Image
            src="/tutorials/push-notifications/01-my-truck-home.png"
            alt="My Truck Home Screen showing the Send Push Notification button"
            width={300}
            height={600}
            className={styles.image}
          />
          <figcaption className={styles.caption}>My Truck Home Screen</figcaption>
        </figure>
        <ol className={styles.list} start={2}>
          <li>Tap the orange <strong className={styles.strong}>Send Push Notification</strong> button.</li>
          <li>A form will appear where you can compose your notification.</li>
        </ol>
        <figure className={styles.figure}>
          <Image
            src="/tutorials/push-notifications/02-push-notification-form.png"
            alt="Push Notification Form with empty title and description fields"
            width={300}
            height={600}
            className={styles.image}
          />
          <figcaption className={styles.caption}>Push Notification Form</figcaption>
        </figure>
      </section>

      <section id="composing-a-notification" className={styles.section}>
        <h2 className={styles.sectionTitle}>Composing a Notification</h2>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>Notification Title</h3>
        <ul className={styles.list}>
          <li>Maximum 50 characters</li>
          <li>This is the headline that appears first on the customer&apos;s device</li>
          <li>Make it attention-grabbing and clear</li>
        </ul>
        <p className={styles.paragraph}>Examples:</p>
        <ul className={styles.list}>
          <li>&quot;Special Today!&quot;</li>
          <li>&quot;New Location Alert&quot;</li>
          <li>&quot;Limited Time Offer&quot;</li>
          <li>&quot;We&apos;re Open Early!&quot;</li>
        </ul>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>Notification Description</h3>
        <ul className={styles.list}>
          <li>Maximum 200 characters</li>
          <li>Provide more details about your message</li>
          <li>Include relevant information like location, time, or specific offers</li>
        </ul>
        <p className={styles.paragraph}>Examples:</p>
        <ul className={styles.list}>
          <li>&quot;Buy one taco, get one free! Today only at downtown location.&quot;</li>
          <li>&quot;We&apos;ve moved to Main Street for the lunch rush. Come find us!&quot;</li>
          <li>&quot;New menu item alert: Try our loaded nachos, available all week!&quot;</li>
        </ul>
        <figure className={styles.figure}>
          <Image
            src="/tutorials/push-notifications/03-push-notification-filled.png"
            alt="Push Notification Form filled with a title and description"
            width={300}
            height={600}
            className={styles.image}
          />
          <figcaption className={styles.caption}>Filled Notification Form</figcaption>
        </figure>
      </section>

      <section id="understanding-rate-limits" className={styles.section}>
        <h2 className={styles.sectionTitle}>Understanding Rate Limits</h2>
        <ul className={styles.list}>
          <li>You can send one notification every 4 hours</li>
          <li>If you try to send another notification before the limit expires, you&apos;ll see an error message showing the remaining wait time</li>
          <li>Plan your notifications strategically to make the most of this limit</li>
        </ul>
      </section>

      <section id="best-practices" className={styles.section}>
        <h2 className={styles.sectionTitle}>Best Practices</h2>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>Timing</h3>
        <ul className={styles.list}>
          <li>Send notifications when your followers are most likely to be hungry (11am-1pm, 5pm-7pm)</li>
          <li>Avoid sending late at night or very early in the morning</li>
          <li>Consider time zones if you have followers in different areas</li>
        </ul>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>Content</h3>
        <ul className={styles.list}>
          <li>Be specific and actionable</li>
          <li>Include a clear benefit for the customer</li>
          <li>Create urgency when appropriate (&quot;Today only!&quot;, &quot;First 50 customers!&quot;)</li>
          <li>Keep it concise and easy to read</li>
        </ul>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>Frequency</h3>
        <ul className={styles.list}>
          <li>Don&apos;t overuse notifications - you&apos;re limited to one every 4 hours for a reason</li>
          <li>Save notifications for truly noteworthy updates</li>
          <li>Quality over quantity builds trust with your followers</li>
        </ul>
      </section>

      <section id="notification-ideas" className={styles.section}>
        <h2 className={styles.sectionTitle}>Notification Ideas</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">When to Use</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>&quot;Flash Sale!&quot;</td>
              <td>&quot;50% off all tacos for the next 2 hours. Downtown location only!&quot;</td>
              <td>Time-sensitive promotions</td>
            </tr>
            <tr>
              <td>&quot;We&apos;re Here!&quot;</td>
              <td>&quot;Set up at Central Park for the festival. Come hungry!&quot;</td>
              <td>Event announcements</td>
            </tr>
            <tr>
              <td>&quot;New Menu Item&quot;</td>
              <td>&quot;Introducing our BBQ pulled pork sandwich. Available starting today!&quot;</td>
              <td>New products</td>
            </tr>
            <tr>
              <td>&quot;Weather Update&quot;</td>
              <td>&quot;Closing early today due to storm. Back tomorrow at 11am!&quot;</td>
              <td>Important changes</td>
            </tr>
            <tr>
              <td>&quot;Thank You!&quot;</td>
              <td>&quot;1000 followers! Free drink with any order today to celebrate!&quot;</td>
              <td>Milestone celebrations</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="important-notes" className={styles.section}>
        <h2 className={styles.sectionTitle}>Important Notes</h2>
        <p className={styles.paragraph}>When you send a push notification, your followers will see:</p>
        <ol className={styles.list}>
          <li>Your truck name as the sender</li>
          <li>The notification title as the headline</li>
          <li>The notification description as the body text</li>
          <li>Tapping the notification opens your truck profile in the app</li>
        </ol>
        <p className={styles.paragraph}>
          You can view how your notifications perform in the Analytics section. See how many notifications were delivered and track how many followers opened them.
        </p>
      </section>
    </>
  );
}
