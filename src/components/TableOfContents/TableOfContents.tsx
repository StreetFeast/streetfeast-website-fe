import { TutorialSection } from "@/constants/tutorials";
import styles from "./TableOfContents.module.css";

interface TableOfContentsProps {
  sections: TutorialSection[];
}

export default function TableOfContents({ sections }: TableOfContentsProps) {
  return (
    <nav className={styles.container} aria-labelledby="toc-heading">
      <h2 id="toc-heading" className={styles.heading}>
        Table of Contents
      </h2>
      <ol className={styles.list} role="list">
        {sections.map((section, index) => (
          <li key={section.id} className={styles.item}>
            <a href={`#${section.id}`} className={styles.link}>
              <span className={styles.number} aria-hidden="true">
                {index + 1}.
              </span>
              {section.heading}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
