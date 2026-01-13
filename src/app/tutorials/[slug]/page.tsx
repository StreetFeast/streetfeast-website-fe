"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { getTutorialBySlug } from "@/constants/tutorials";
import TableOfContents from "@/components/TableOfContents";
import UpdateProfileTutorial from "@/components/tutorials/UpdateProfileTutorial";
import ShareQrCodeTutorial from "@/components/tutorials/ShareQrCodeTutorial";
import PushNotificationsTutorial from "@/components/tutorials/PushNotificationsTutorial";
import ScheduledEventsTutorial from "@/components/tutorials/ScheduledEventsTutorial";
import CreateProductsTutorial from "@/components/tutorials/CreateProductsTutorial";
import CreateMenuTutorial from "@/components/tutorials/CreateMenuTutorial";
import AnalyticsTutorial from "@/components/tutorials/AnalyticsTutorial";
import styles from "./page.module.css";

const tutorialComponents: Record<string, React.ComponentType> = {
  "update-profile": UpdateProfileTutorial,
  "share-qr-code": ShareQrCodeTutorial,
  "push-notifications": PushNotificationsTutorial,
  "scheduled-events": ScheduledEventsTutorial,
  "create-products": CreateProductsTutorial,
  "create-menu": CreateMenuTutorial,
  analytics: AnalyticsTutorial,
};

export default function TutorialPage() {
  const params = useParams();
  const slug = params.slug as string;

  const tutorial = getTutorialBySlug(slug);

  if (!tutorial) {
    notFound();
  }

  const TutorialContent = tutorialComponents[slug];

  if (!TutorialContent) {
    notFound();
  }

  return (
    <article className={styles.container}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/profile/tutorials" className={styles.breadcrumbLink}>
          Tutorials
        </Link>
        <span aria-hidden="true">/</span>
        <span className={styles.breadcrumbCurrent}>{tutorial.title}</span>
      </nav>

      <header className={styles.header}>
        <h1 className={styles.title}>{tutorial.title}</h1>
        <p className={styles.description}>{tutorial.description}</p>
      </header>

      <TableOfContents sections={tutorial.sections} />

      <div className={styles.content}>
        <TutorialContent />
      </div>

      <footer className={styles.footer}>
        <Link href="/profile/tutorials" className={styles.backLink}>
          ← Back to Tutorials
        </Link>
      </footer>
    </article>
  );
}
