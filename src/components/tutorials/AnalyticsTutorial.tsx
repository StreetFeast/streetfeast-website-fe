import Image from "next/image";
import styles from "./tutorials.module.css";

export default function AnalyticsTutorial() {
  return (
    <>
      <section id="overview" className={styles.section}>
        <h2 className={styles.sectionTitle}>Overview</h2>
        <p className={styles.paragraph}>
          The Analytics section provides insights into:
        </p>
        <ul className={styles.list}>
          <li>How customers discover your truck</li>
          <li>Push notification performance</li>
          <li>Customer engagement metrics</li>
          <li>Profile interaction trends</li>
        </ul>
        <p className={styles.paragraph}>
          Use this data to make informed decisions about your marketing, scheduling, and customer engagement strategies.
        </p>
      </section>

      <section id="accessing-analytics" className={styles.section}>
        <h2 className={styles.sectionTitle}>Accessing Analytics</h2>
        <ol className={styles.list}>
          <li>Open the StreetFeast app and navigate to the <strong className={styles.strong}>My Truck</strong> tab.</li>
          <li>Tap the <strong className={styles.strong}>Analytics</strong> tab at the bottom of the screen.</li>
        </ol>
        <figure className={styles.figure}>
          <Image
            src="/tutorials/analytics/01-analytics-overview.png"
            alt="Analytics Overview screen showing various metrics cards for discovery, engagement, and notifications"
            width={300}
            height={600}
            className={styles.image}
          />
          <figcaption className={styles.caption}>Analytics Overview</figcaption>
        </figure>
      </section>

      <section id="discovery-sources" className={styles.section}>
        <h2 className={styles.sectionTitle}>Discovery Sources</h2>
        <p className={styles.paragraph}>
          <strong className={styles.strong}>What it shows:</strong> How customers find your truck on StreetFeast.
        </p>
        <p className={styles.paragraph}><strong className={styles.strong}>Metrics tracked:</strong></p>
        <ul className={styles.list}>
          <li><strong className={styles.strong}>Map</strong>: Customers who found you by browsing the map</li>
          <li><strong className={styles.strong}>Search</strong>: Customers who found you through search</li>
          <li><strong className={styles.strong}>Favorites</strong>: Customers who accessed your profile from their favorites list</li>
        </ul>
        <p className={styles.paragraph}><strong className={styles.strong}>Why it matters:</strong></p>
        <ul className={styles.list}>
          <li>High map discovery suggests good location visibility</li>
          <li>High search discovery indicates strong brand recognition</li>
          <li>High favorites indicates loyal returning customers</li>
        </ul>
        <div className={styles.tipBox}>
          <p className={styles.tipTitle}>How to use this data:</p>
          <ul className={styles.tipContent}>
            <li>If map discovery is low, consider locations with more foot traffic</li>
            <li>If search is low, improve your profile keywords and description</li>
            <li>Encourage customers to add you to favorites for repeat visits</li>
          </ul>
        </div>
      </section>

      <section id="push-notification-metrics" className={styles.section}>
        <h2 className={styles.sectionTitle}>Push Notification Metrics</h2>
        <p className={styles.paragraph}>
          <strong className={styles.strong}>What it shows:</strong> Performance of your push notification campaigns.
        </p>
        <figure className={styles.figure}>
          <Image
            src="/tutorials/analytics/02-analytics-push-notifications.png"
            alt="Push Notifications analytics showing sent/received and opened/pressed metrics"
            width={300}
            height={600}
            className={styles.image}
          />
          <figcaption className={styles.caption}>Push Notification Analytics</figcaption>
        </figure>
        <p className={styles.paragraph}><strong className={styles.strong}>Metrics tracked:</strong></p>
        <ul className={styles.list}>
          <li><strong className={styles.strong}>Sent/Received</strong>: Total notifications delivered to followers</li>
          <li><strong className={styles.strong}>Opened/Pressed</strong>: Notifications that customers actually tapped</li>
        </ul>
        <p className={styles.paragraph}><strong className={styles.strong}>Why it matters:</strong></p>
        <ul className={styles.list}>
          <li>Open rate indicates how engaging your notification content is</li>
          <li>Low open rates suggest your messages may not be compelling</li>
          <li>High open rates mean your notifications drive customer action</li>
        </ul>
        <div className={styles.tipBox}>
          <p className={styles.tipTitle}>How to use this data:</p>
          <ul className={styles.tipContent}>
            <li>Compare open rates between different notification types</li>
            <li>Test different message styles to improve engagement</li>
            <li>Send notifications when open rates are historically highest</li>
          </ul>
        </div>
        <p className={styles.paragraph}>
          <strong className={styles.strong}>Calculating Open Rate:</strong> Open Rate = (Opened / Sent) × 100%
        </p>
        <p className={styles.paragraph}>
          A good open rate is typically 10-20% or higher.
        </p>
      </section>

      <section id="engagement-metrics" className={styles.section}>
        <h2 className={styles.sectionTitle}>Engagement Metrics</h2>
        <p className={styles.paragraph}>
          <strong className={styles.strong}>What it shows:</strong> How customers interact with your profile.
        </p>
        <p className={styles.paragraph}><strong className={styles.strong}>Metrics tracked:</strong></p>
        <ul className={styles.list}>
          <li><strong className={styles.strong}>Profile Views</strong>: How many times customers viewed your full profile</li>
          <li><strong className={styles.strong}>Directions</strong>: How many times customers requested directions to your location</li>
          <li><strong className={styles.strong}>Phone</strong>: How many times customers tapped to call you (if phone number is set)</li>
        </ul>
        <p className={styles.paragraph}><strong className={styles.strong}>Why it matters:</strong></p>
        <ul className={styles.list}>
          <li>Profile views show interest in your truck</li>
          <li>Directions requests indicate intent to visit</li>
          <li>Phone interactions show direct customer engagement</li>
        </ul>
        <div className={styles.tipBox}>
          <p className={styles.tipTitle}>How to use this data:</p>
          <ul className={styles.tipContent}>
            <li>High views but low directions may indicate unclear location info</li>
            <li>Increase directions by having clear, consistent schedule</li>
            <li>Add a phone number to enable direct customer contact</li>
          </ul>
        </div>
      </section>

      <section id="favorites" className={styles.section}>
        <h2 className={styles.sectionTitle}>Favorites</h2>
        <p className={styles.paragraph}>
          <strong className={styles.strong}>What it shows:</strong> How many customers have favorited your truck over time.
        </p>
        <p className={styles.paragraph}><strong className={styles.strong}>Metrics tracked:</strong></p>
        <ul className={styles.list}>
          <li>Total follower count</li>
          <li>Growth trend over selected time period</li>
        </ul>
        <p className={styles.paragraph}><strong className={styles.strong}>Why it matters:</strong></p>
        <ul className={styles.list}>
          <li>Favorites represent your loyal customer base</li>
          <li>Growth indicates successful customer acquisition</li>
          <li>Decline may indicate need for engagement improvements</li>
        </ul>
        <div className={styles.tipBox}>
          <p className={styles.tipTitle}>How to use this data:</p>
          <ul className={styles.tipContent}>
            <li>Track growth after events or promotions</li>
            <li>Set goals for follower growth</li>
            <li>Identify what activities drive new favorites</li>
          </ul>
        </div>
      </section>

      <section id="filtering-by-time-period" className={styles.section}>
        <h2 className={styles.sectionTitle}>Filtering by Time Period</h2>
        <p className={styles.paragraph}>
          At the top of the Analytics screen, you can select the time period for your data.
        </p>
        <p className={styles.paragraph}>
          Tap the <strong className={styles.strong}>Time</strong> dropdown to choose from:
        </p>
        <figure className={styles.figure}>
          <Image
            src="/tutorials/analytics/03-time-filter.png"
            alt="Time Filter dropdown showing Week, Month, and Year options"
            width={300}
            height={600}
            className={styles.image}
          />
          <figcaption className={styles.caption}>Time Filter</figcaption>
        </figure>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Period</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong className={styles.strong}>Week</strong></td>
              <td>Last 7 days of data</td>
            </tr>
            <tr>
              <td><strong className={styles.strong}>Month</strong></td>
              <td>Last 30 days of data</td>
            </tr>
            <tr>
              <td><strong className={styles.strong}>Year</strong></td>
              <td>Last 365 days of data</td>
            </tr>
          </tbody>
        </table>
        <p className={styles.paragraph}>
          Select the time period that best suits your analysis needs. Shorter periods are better for recent trends, while longer periods show overall patterns.
        </p>
      </section>

      <section id="understanding-your-data" className={styles.section}>
        <h2 className={styles.sectionTitle}>Understanding Your Data</h2>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>Line Charts</h3>
        <ul className={styles.list}>
          <li><strong className={styles.strong}>X-axis</strong>: Time (dates)</li>
          <li><strong className={styles.strong}>Y-axis</strong>: Metric value (count)</li>
          <li><strong className={styles.strong}>Lines</strong>: Different metrics shown in different colors</li>
          <li><strong className={styles.strong}>Tap</strong>: Tap on the chart to see specific values</li>
        </ul>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>Pie Charts</h3>
        <ul className={styles.list}>
          <li><strong className={styles.strong}>Segments</strong>: Different categories shown as proportions</li>
          <li><strong className={styles.strong}>Legend</strong>: Shows what each color represents</li>
          <li><strong className={styles.strong}>Values</strong>: Actual counts shown in the legend</li>
        </ul>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>Pinning Analytics Cards</h3>
        <p className={styles.paragraph}>
          Each analytics card has a <strong className={styles.strong}>bookmark icon</strong> in the top right corner. Tap the bookmark to:
        </p>
        <ul className={styles.list}>
          <li><strong className={styles.strong}>Pin</strong> important metrics to the top of your dashboard</li>
          <li><strong className={styles.strong}>Unpin</strong> metrics you check less frequently</li>
        </ul>
        <p className={styles.paragraph}>
          Pinned cards appear at the top for quick access to your most important data.
        </p>
      </section>

      <section id="tips-for-improving-metrics" className={styles.section}>
        <h2 className={styles.sectionTitle}>Tips for Improving Metrics</h2>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>Increase Discovery</h3>
        <ul className={styles.list}>
          <li>Keep your profile complete and up-to-date</li>
          <li>Use clear, searchable keywords in your description</li>
          <li>Maintain consistent schedule for map visibility</li>
        </ul>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>Improve Engagement</h3>
        <ul className={styles.list}>
          <li>Add high-quality photos</li>
          <li>Write compelling descriptions</li>
          <li>Respond to customer interactions</li>
        </ul>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>Boost Notifications</h3>
        <ul className={styles.list}>
          <li>Write attention-grabbing titles</li>
          <li>Offer real value (discounts, specials, new items)</li>
          <li>Time notifications when customers are likely hungry</li>
        </ul>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>Grow Favorites</h3>
        <ul className={styles.list}>
          <li>Provide excellent food and service</li>
          <li>Ask satisfied customers to follow you</li>
          <li>Offer incentives for favorites (occasional follower-only specials)</li>
        </ul>
      </section>

      <section id="important-notes" className={styles.section}>
        <h2 className={styles.sectionTitle}>Important Notes</h2>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>Interpreting No Data</h3>
        <p className={styles.paragraph}>When you see &quot;No Data Yet&quot; messages:</p>
        <ul className={styles.list}>
          <li><strong className={styles.strong}>New trucks</strong>: Data takes time to accumulate</li>
          <li><strong className={styles.strong}>Recent time period</strong>: Try selecting a longer time range</li>
          <li><strong className={styles.strong}>Low activity</strong>: Increase profile engagement to generate data</li>
        </ul>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>Common Questions</h3>
        <p className={styles.paragraph}>
          <strong className={styles.strong}>Q: Why are my numbers low?</strong><br />
          A: Data accumulates over time. New trucks naturally have less data. Focus on consistent activity and the numbers will grow.
        </p>
        <p className={styles.paragraph}>
          <strong className={styles.strong}>Q: How often is data updated?</strong><br />
          A: Analytics are typically updated in real-time or within a few hours of the activity.
        </p>
        <p className={styles.paragraph}>
          <strong className={styles.strong}>Q: Can I export my analytics?</strong><br />
          A: Currently, analytics are viewable within the app only.
        </p>
        <p className={styles.paragraph}>
          <strong className={styles.strong}>Q: What&apos;s a good engagement rate?</strong><br />
          A: This varies by location and truck type. Compare your data over time rather than to absolute benchmarks.
        </p>

        <h3 className={styles.sectionTitle} style={{ fontSize: '1.125rem' }}>Best Practices</h3>
        <ul className={styles.list}>
          <li><strong className={styles.strong}>Regular Review</strong>: Check analytics weekly to spot trends</li>
          <li><strong className={styles.strong}>Data-Driven Decisions</strong>: Use discovery sources to choose locations</li>
          <li><strong className={styles.strong}>Goal Setting</strong>: Set targets for follower growth</li>
          <li><strong className={styles.strong}>Seasonal Patterns</strong>: Look for weekly patterns and identify seasonal trends</li>
        </ul>
      </section>
    </>
  );
}
