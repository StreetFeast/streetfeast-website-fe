import styles from './NeighborhoodsBlock.module.css';

type Props = {
  items: string[];
  cityName: string;
};

export default function NeighborhoodsBlock({ items, cityName }: Props) {
  if (items.length === 0) return null;
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Where to find food trucks in {cityName}</h2>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item} className={styles.item}>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
