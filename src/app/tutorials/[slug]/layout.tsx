import styles from "./layout.module.css";

export default function TutorialDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      <main className={styles.content}>{children}</main>
    </div>
  );
}
