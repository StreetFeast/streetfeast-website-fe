import { HOW_IT_WORKS } from '@/content/home';
import styles from './HomeHowItWorks.module.css';

export default function HomeHowItWorks() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>How StreetFeast Works</h2>
        <ol className={styles.list}>
          {HOW_IT_WORKS.map((step, i) => (
            <li key={i} className={styles.item}>
              <div className={styles.number}>{i + 1}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepBody}>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
