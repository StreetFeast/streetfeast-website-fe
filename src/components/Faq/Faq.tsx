'use client';

import { useState } from 'react';
import type { FaqItem } from '@/lib/content/types';
import styles from './Faq.module.css';

export default function Faq({ items, heading }: { items: FaqItem[]; heading?: string }) {
  const [open, setOpen] = useState<number | null>(null);

  if (items.length === 0) return null;

  return (
    <section className={styles.section}>
      {heading && <h2 className={styles.heading}>{heading}</h2>}
      <dl className={styles.list}>
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className={styles.item}>
              <dt>
                <button
                  type="button"
                  className={styles.question}
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{item.q}</span>
                  <span aria-hidden="true" className={styles.icon}>
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
              </dt>
              {isOpen && (
                <dd className={styles.answer}>
                  <p>{item.a}</p>
                </dd>
              )}
            </div>
          );
        })}
      </dl>
    </section>
  );
}
