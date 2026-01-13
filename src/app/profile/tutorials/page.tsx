"use client";

import styles from "./page.module.css";

export default function Tutorials() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tutorials</h1>
      <div className={styles.card}>
        <p className={styles.message}>
          Tutorials and guides are coming soon. Stay tuned for helpful content
          to help you get the most out of StreetFeast!
        </p>
      </div>
    </div>
  );
}
