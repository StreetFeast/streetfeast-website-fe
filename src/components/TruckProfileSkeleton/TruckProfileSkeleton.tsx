import styles from './TruckProfileSkeleton.module.css';

function TruckProfileSkeleton() {
    return (
        <div className={styles.container}>
            <div className={styles.contentWrapper}>
                {/* Left Panel Skeleton */}
                <div className={styles.leftPanel}>
                    {/* Hero Image Skeleton */}
                    <div className={styles.heroSkeleton} />

                    {/* Content Skeleton */}
                    <div className={styles.content}>
                        {/* Header Skeleton */}
                        <div className={styles.header}>
                            <div className={styles.titleSkeleton} />
                            <div className={styles.iconSkeleton} />
                        </div>

                        {/* Description Skeleton */}
                        <div className={styles.descriptionSkeleton} />

                        {/* Contact Info Skeleton */}
                        <div className={styles.contactInfo}>
                            <div className={styles.contactRow}>
                                <div className={styles.iconSmallSkeleton} />
                                <div className={styles.textSkeleton} />
                            </div>
                            <div className={styles.contactRow}>
                                <div className={styles.iconSmallSkeleton} />
                                <div className={styles.textSkeleton} />
                            </div>
                            <div className={styles.contactRow}>
                                <div className={styles.iconSmallSkeleton} />
                                <div className={styles.textSkeleton} />
                            </div>
                        </div>

                        {/* Tabs Skeleton */}
                        <div className={styles.tabs}>
                            <div className={styles.tabSkeleton} />
                            <div className={styles.tabSkeleton} />
                        </div>

                        {/* Date Scroller Skeleton */}
                        <div className={styles.dateScroller}>
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className={styles.dateCardSkeleton} />
                            ))}
                        </div>

                        {/* Occurrences List Skeleton */}
                        <div className={styles.occurrencesListSkeleton}>
                            {[...Array(2)].map((_, i) => (
                                <div key={i} className={styles.occurrenceCardSkeleton}>
                                    <div className={styles.textMediumSkeleton} />
                                    <div className={styles.textSmallSkeleton} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Panel - Map Skeleton */}
                <div className={styles.mapSection}>
                    <div className={styles.mapSkeleton} />
                </div>
            </div>
        </div>
    );
}

export default TruckProfileSkeleton;
