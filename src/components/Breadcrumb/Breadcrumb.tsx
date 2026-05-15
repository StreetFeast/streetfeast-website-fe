// src/components/Breadcrumb/Breadcrumb.tsx
import Link from 'next/link';
import styles from './Breadcrumb.module.css';

export type BreadcrumbItem = { name: string; path: string };

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className={styles.nav}>
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path} className={styles.item}>
              {isLast ? (
                <span className={styles.current} aria-current="page">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.path} className={styles.link}>
                    {item.name}
                  </Link>
                  <span className={styles.sep} aria-hidden="true">
                    {' › '}
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
