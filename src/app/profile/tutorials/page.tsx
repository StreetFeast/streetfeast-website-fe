"use client";

import Link from "next/link";
import { getTutorialsByCategory, TUTORIAL_CATEGORIES } from "@/constants/tutorials";
import styles from "./page.module.css";

export default function Tutorials() {
  const tutorialsByCategory = getTutorialsByCategory();
  const categoryOrder = [
    "profile-identity",
    "customer-communication",
    "scheduling",
    "menu-management",
    "business-intelligence",
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Tutorials</h1>
        <p className={styles.subtitle}>
          Learn how to manage your food truck on StreetFeast with these step-by-step guides.
        </p>
      </header>

      <nav className={styles.categories} aria-label="Tutorial categories">
        {categoryOrder.map((categoryKey) => {
          const categoryTutorials = tutorialsByCategory[categoryKey];
          if (!categoryTutorials) return null;

          const categoryName = TUTORIAL_CATEGORIES[categoryKey as keyof typeof TUTORIAL_CATEGORIES];

          return (
            <section key={categoryKey} className={styles.category} aria-labelledby={`category-${categoryKey}`}>
              <h2 id={`category-${categoryKey}`} className={styles.categoryTitle}>
                {categoryName}
              </h2>
              <ul className={styles.tutorialList} role="list">
                {categoryTutorials.map((tutorial) => (
                  <li key={tutorial.slug}>
                    <Link
                      href={`/tutorials/${tutorial.slug}`}
                      className={styles.tutorialCard}
                    >
                      <span className={styles.tutorialNumber}>{tutorial.order}</span>
                      <div className={styles.tutorialContent}>
                        <h3 className={styles.tutorialTitle}>{tutorial.title}</h3>
                        <p className={styles.tutorialDescription}>{tutorial.description}</p>
                      </div>
                      <span className={styles.arrow} aria-hidden="true">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </nav>
    </div>
  );
}
