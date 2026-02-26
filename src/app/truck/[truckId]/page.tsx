'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getTruckDetails, getTruckOccurrences, getTruckMenu } from '@/utils/api';
import { TruckDetailResponse, TruckOccurrence, Menu } from '@/types/api';
import GoogleMap from '@/components/GoogleMap';
import TruckProfileSkeleton from '@/components/TruckProfileSkeleton';
import { APP_STORE_LINK, GOOGLE_PLAY_LINK } from '@/constants/links';
import styles from './page.module.css';

interface TruckProfilePageProps {
    params: Promise<{ truckId: string }>;
}

function TruckProfilePage({ params }: TruckProfilePageProps) {
    const [activeTab, setActiveTab] = useState<'schedules' | 'menu'>('schedules');
    const [selectedScheduleIndex, setSelectedScheduleIndex] = useState(0);
    const [truckData, setTruckData] = useState<TruckDetailResponse | null>(null);
    const [futureOccurrences, setFutureOccurrences] = useState<TruckOccurrence[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [truckId, setTruckId] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [userDevice, setUserDevice] = useState<'ios' | 'android' | 'unknown'>('unknown');
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [defaultMenu, setDefaultMenu] = useState<Menu | null>(null);

    useEffect(() => {
        const loadParams = async () => {
            const resolvedParams = await params;
            setTruckId(resolvedParams.truckId);
        };
        loadParams();
    }, [params]);

    useEffect(() => {
        // Detect user's device
        const userAgent = navigator.userAgent;
        if (/iPad|iPhone|iPod/.test(userAgent)) {
            setUserDevice('ios');
        } else if (/android/i.test(userAgent)) {
            setUserDevice('android');
        } else {
            setUserDevice('unknown');
        }
    }, []);

    useEffect(() => {
        if (!truckId) return;

        const fetchTruckData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch truck details
                const data = await getTruckDetails(truckId);
                setTruckData(data);

                // Fetch future occurrences (30 days from today)
                const today = new Date();
                const endDate = new Date(today);
                endDate.setDate(today.getDate() + 30);

                const startUtc = today.toISOString().split('T')[0];
                const endUtc = endDate.toISOString().split('T')[0];

                const occurrences = await getTruckOccurrences(truckId, startUtc, endUtc);
                setFutureOccurrences(occurrences);

                // Auto-select today's date
                const year = today.getFullYear();
                const month = String(today.getMonth() + 1).padStart(2, '0');
                const day = String(today.getDate()).padStart(2, '0');
                const todayStr = `${year}-${month}-${day}`;
                setSelectedDate(todayStr);
            } catch (err) {
                setError('Failed to load truck information');
                console.error('Error fetching truck data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTruckData();
    }, [truckId]);

    useEffect(() => {
        if (!truckData?.defaultMenuId || !truckId) return;
        const fetchDefaultMenu = async () => {
            try {
                const menu = await getTruckMenu(truckId, truckData.defaultMenuId!);
                console.log(menu)
                setDefaultMenu(menu);
            } catch (err) {
                console.error('Error fetching default menu:', err);
            }
        };
        fetchDefaultMenu();
    }, [truckData?.defaultMenuId, truckId]);

    const closeModal = () => {
        setShowModal(false);
        setModalMessage('');
    };

    if (loading) {
        return <TruckProfileSkeleton />;
    }

    if (error || !truckData) {
        return (
            <>
                {/* Modal */}
                {showModal && (
                    <div className={styles.modalOverlay} onClick={closeModal}>
                        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                            <div className={styles.modalAccent} />
                            <button className={styles.modalClose} onClick={closeModal}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <h2 className={styles.modalTitle}>Download the app to {modalMessage}</h2>
                            <p className={styles.modalText}>
                                Get the full StreetFeast experience with our mobile app.
                            </p>
                            <div className={styles.modalButtons}>
                                {(userDevice === 'ios' || userDevice === 'unknown') && (
                                    <a
                                        href={APP_STORE_LINK}
                                        className={styles.appStoreButton}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Image
                                            src="/app-store-badge.svg"
                                            alt="Download on the App Store"
                                            width={144}
                                            height={48}
                                        />
                                    </a>
                                )}
                                {(userDevice === 'android' || userDevice === 'unknown') && (
                                    <a
                                        href={GOOGLE_PLAY_LINK}
                                        className={styles.playStoreButton}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Image
                                            src="/google-play-badge.png"
                                            alt="Get it on Google Play"
                                            width={162}
                                            height={48}
                                        />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <div className={styles.errorContainer}>
                    <div className={styles.errorContent}>
                        <div className={styles.errorIcon}>
                            <Image
                                src="/streetfeastlogowhite.png"
                                alt="StreetFeast"
                                width={120}
                                height={120}
                            />
                        </div>
                        <h1 className={styles.errorTitle}>Oops! We couldn&apos;t find this truck</h1>
                        <p className={styles.errorMessage}>
                            This food truck might have moved locations or is no longer available.
                            Don&apos;t worry - there are plenty more delicious options waiting for you!
                        </p>
                        <div className={styles.errorActions}>
                            <button
                                className={styles.primaryButton}
                                onClick={() => {
                                    setModalMessage('find food trucks near you');
                                    setShowModal(true);
                                }}
                            >
                                Find Other Trucks
                            </button>
                        </div>
                        <div className={styles.errorBranding}>
                            <span className={styles.brandText}>Street</span>
                            <span className={styles.brandTextAccent}>Feast</span>
                        </div>
                        <p className={styles.errorSubtext}>
                            Discover street food vendors, food trucks & pop-ups near you
                        </p>
                    </div>
                </div>
            </>
        );
    }

    const getImageUrl = (uri: string | null | undefined): string | null => {
        if (!uri) return null;
        if (uri.startsWith('http')) return uri;
        return `${process.env.NEXT_PUBLIC_STORAGE_PREFIX}${uri}`;
    };

    const heroImage = truckData.images && truckData.images.length > 0
        ? getImageUrl(truckData.images[0].imageUri)
        : null;

    const isFavorited = truckData.favoriteId !== null;

    const formatPhoneNumber = (phone: string | null | undefined) => {
        if (!phone) return '';
        const cleaned = phone.replace(/\D/g, '');
        if (cleaned.length === 10) {
            return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
        }
        return phone;
    };

    const formatPrice = (price: number) => {
        return `$${price.toFixed(2)}`;
    };

    const formatScheduleDate = (dateString: string) => {
        const date = new Date(dateString);
        const month = date.toLocaleDateString('en-US', { month: 'short' });
        const day = date.getDate();
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
        return { month, day, dayOfWeek };
    };

    const formatScheduleTime = (openTime: string, closeTime: string) => {
        const open = new Date(openTime);
        const close = new Date(closeTime);
        const dayOfWeek = open.toLocaleDateString('en-US', { weekday: 'short' });
        const openStr = open.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
        const closeStr = close.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
        return `${dayOfWeek}, ${openStr} - ${closeStr}`;
    };

    // Get date string in YYYY-MM-DD format for comparison
    const getDateString = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Get truck status based on current time and future occurrences
    const getTruckStatus = () => {
        const now = new Date();
        const today = getDateString(now);

        // Get only today's occurrences from futureOccurrences
        const todaysOccurrences = futureOccurrences.filter(occurrence => {
            const occurrenceDate = new Date(occurrence.openTimeLocal);
            return getDateString(occurrenceDate) === today;
        });

        // If no occurrences today, return Closed status without a specific occurrence
        if (todaysOccurrences.length === 0) {
            return { label: 'Closed', type: 'closed' as const, occurrence: null, soonestOccurrence: null };
        }

        // Sort today's occurrences by time to find the soonest one
        const sortedOccurrences = [...todaysOccurrences].sort((a, b) =>
            new Date(a.openTimeLocal).getTime() - new Date(b.openTimeLocal).getTime()
        );
        const soonestOccurrence = sortedOccurrences[0];

        // Helper function to check status for a single occurrence
        const checkOccurrenceStatus = (occurrence: TruckOccurrence) => {
            const openTime = new Date(occurrence.openTimeLocal);
            const closeTime = new Date(occurrence.closeTimeLocal);

            // Check if truck is closed
            if (occurrence.isClosed) {
                return { label: 'Closed', type: 'closed' as const, priority: 0, occurrence };
            }

            const minutesUntilOpen = (openTime.getTime() - now.getTime()) / 1000 / 60;
            const minutesUntilClose = (closeTime.getTime() - now.getTime()) / 1000 / 60;

            // Open now
            if (now >= openTime && now < closeTime) {
                // Closing soon (within 60 minutes)
                if (minutesUntilClose > 0 && minutesUntilClose <= 60) {
                    return { label: 'Closing Soon', type: 'closing-soon' as const, priority: 4, occurrence };
                }
                return { label: 'Open', type: 'open' as const, priority: 5, occurrence };
            }

            // Opening soon (within 60 minutes)
            if (minutesUntilOpen > 0 && minutesUntilOpen <= 60) {
                return { label: 'Opening Soon', type: 'opening-soon' as const, priority: 3, occurrence };
            }

            // Closed (before opening or after closing)
            if (now < openTime || now >= closeTime) {
                return { label: 'Closed', type: 'closed' as const, priority: 0, occurrence };
            }

            return null;
        };

        // Check all today's occurrences and get the one with highest priority
        let bestStatus = null;
        let bestPriority = -1;

        for (const occurrence of todaysOccurrences) {
            const status = checkOccurrenceStatus(occurrence);
            if (status && status.priority > bestPriority) {
                bestStatus = { label: status.label, type: status.type, occurrence: status.occurrence, soonestOccurrence };
                bestPriority = status.priority;
            }
        }

        return bestStatus;
    };

    const truckStatus = getTruckStatus();

    // Use future occurrences as schedules
    const schedules = futureOccurrences;

    // Group occurrences by date (using openTimeLocal which is already in the truck's timezone)
    const groupOccurrencesByDate = () => {
        const grouped = new Map<string, TruckOccurrence[]>();

        schedules.forEach(occurrence => {
            const localDate = new Date(occurrence.openTimeLocal);
            const dateStr = getDateString(localDate);
            if (!grouped.has(dateStr)) {
                grouped.set(dateStr, []);
            }
            grouped.get(dateStr)!.push(occurrence);
        });

        // Sort occurrences within each date by time
        grouped.forEach((occurrences) => {
            occurrences.sort((a, b) =>
                new Date(a.openTimeLocal).getTime() - new Date(b.openTimeLocal).getTime()
            );
        });

        return grouped;
    };

    // Generate date cards (one per unique date)
    const generateDateCards = () => {
        const cards: Array<{ date: Date; dateStr: string; occurrences: TruckOccurrence[] }> = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const occurrencesByDate = groupOccurrencesByDate();

        for (let i = 0; i < 15; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            const dateStr = getDateString(date);
            const occurrences = occurrencesByDate.get(dateStr) || [];

            cards.push({ date, dateStr, occurrences });
        }

        return cards;
    };

    const dateCards = generateDateCards();

    // Get selected date's occurrences
    const selectedDateOccurrences = selectedDate
        ? dateCards.find(card => card.dateStr === selectedDate)?.occurrences || []
        : [];

    const selectedSchedule = selectedScheduleIndex >= 0 ? schedules[selectedScheduleIndex] : null;
    const menuCategories = selectedSchedule?.menu?.categories || defaultMenu?.categories || [];

    const handleFavoriteClick = () => {
        setModalMessage('favorite this truck');
        setShowModal(true);
    };

    const handleReportClick = () => {
        setModalMessage('report this truck');
        setShowModal(true);
    };

    const handleMapClick = () => {
        setModalMessage('view the full interactive map');
        setShowModal(true);
    };

    return (
        <div className={styles.container}>
            {/* Modal */}
            {showModal && (
                <div className={styles.modalOverlay} onClick={closeModal}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalAccent} />
                        <button className={styles.modalClose} onClick={closeModal}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h2 className={styles.modalTitle}>Download the app to {modalMessage}</h2>
                        <p className={styles.modalText}>
                            Get the full StreetFeast experience with our mobile app.
                        </p>
                        <div className={styles.modalButtons}>
                            {(userDevice === 'ios' || userDevice === 'unknown') && (
                                <a
                                    href={APP_STORE_LINK}
                                    className={styles.appStoreButton}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Image
                                        src="/app-store-badge.svg"
                                        alt="Download on the App Store"
                                        width={144}
                                        height={48}
                                    />
                                </a>
                            )}
                            {(userDevice === 'android' || userDevice === 'unknown') && (
                                <a
                                    href={GOOGLE_PLAY_LINK}
                                    className={styles.playStoreButton}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Image
                                        src="/google-play-badge.png"
                                        alt="Get it on Google Play"
                                        width={162}
                                        height={48}
                                    />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <div className={styles.contentWrapper}>
                {/* Left Panel - Scrollable Info */}
                <div className={styles.leftPanel}>
                    {/* Hero Image */}
                    <div
                        className={styles.heroSection}
                        style={heroImage ? {
                            backgroundImage: `url(${heroImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        } : undefined}
                    >
                        <button className={styles.reportButton} aria-label="Report" onClick={handleReportClick} style={{ zIndex: 2 }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </button>
                    </div>

                    {/* Truck Info */}
                    <div className={styles.content}>
                        <div className={styles.header}>
                            <h1 className={styles.truckName}>{truckData.name}</h1>
                            <button
                                className={`${styles.favoriteButton} ${isFavorited ? styles.favorited : ''}`}
                                aria-label="Favorite"
                                onClick={handleFavoriteClick}
                            >
                                <svg width="32" height="32" viewBox="0 0 24 24" fill={isFavorited ? "#ED6A00" : "none"} stroke="#ED6A00" strokeWidth="2">
                                    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                            </button>
                        </div>

                        {truckData.description && (
                            <p className={styles.description}>{truckData.description}</p>
                        )}

                        {/* Contact Info */}
                        <div className={styles.contactInfo}>
                            <div className={styles.contactRow}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div className={styles.hoursContent}>
                                    {truckStatus?.soonestOccurrence ? (
                                        <div className={styles.statusTime}>
                                            {formatScheduleTime(truckStatus.soonestOccurrence.openTimeLocal, truckStatus.soonestOccurrence.closeTimeLocal)}
                                        </div>
                                    ) : (
                                        <div className={styles.statusTime}>No hours today</div>
                                    )}
                                </div>
                                <div className={`${styles.statusLabel} ${styles[`status-${truckStatus?.type || 'closed'}`]}`}>
                                    {truckStatus?.label || 'Closed'}
                                </div>
                            </div>

                            {truckData.phone && (
                                <a href={`tel:${truckData.phone}`} className={styles.contactRow}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span>{formatPhoneNumber(truckData.phone)}</span>
                                    <svg className={styles.arrow} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 5l7 7-7 7" />
                                    </svg>
                                </a>
                            )}

                            {truckData.website && (
                                <a href={truckData.website.startsWith('http') ? truckData.website : `https://${truckData.website}`} className={styles.contactRow} target="_blank" rel="noopener noreferrer">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                    </svg>
                                    <span>{truckData.website.replace(/^https?:\/\//, '')}</span>
                                    <svg className={styles.arrow} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 5l7 7-7 7" />
                                    </svg>
                                </a>
                            )}

                            {selectedSchedule?.location && (
                                <a href={`https://maps.google.com/?q=${encodeURIComponent(selectedSchedule.location.address)}`} className={styles.contactRow} target="_blank" rel="noopener noreferrer">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>{selectedSchedule.location.address}</span>
                                    <svg className={styles.arrow} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 5l7 7-7 7" />
                                    </svg>
                                </a>
                            )}
                        </div>

                        {(truckData.instagram || truckData.facebook || truckData.tiktok || truckData.x) && (
                            <div className={styles.socialLinks}>
                                {truckData.instagram && (
                                    <a href={truckData.instagram.startsWith('http') ? truckData.instagram : `https://instagram.com/${truckData.instagram.replace('@', '')}`} className={styles.socialLink} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                                    </a>
                                )}
                                {truckData.facebook && (
                                    <a href={truckData.facebook.startsWith('http') ? truckData.facebook : `https://facebook.com/${truckData.facebook}`} className={styles.socialLink} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                                    </a>
                                )}
                                {truckData.tiktok && (
                                    <a href={truckData.tiktok.startsWith('http') ? truckData.tiktok : `https://tiktok.com/@${truckData.tiktok.replace('@', '')}`} className={styles.socialLink} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                                    </a>
                                )}
                                {truckData.x && (
                                    <a href={truckData.x.startsWith('http') ? truckData.x : `https://x.com/${truckData.x.replace('@', '')}`} className={styles.socialLink} target="_blank" rel="noopener noreferrer" aria-label="X">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                                    </a>
                                )}
                            </div>
                        )}

                        {/* Tabs */}
                        <div className={styles.tabs}>
                            <button
                                className={`${styles.tab} ${activeTab === 'schedules' ? styles.activeTab : ''}`}
                                onClick={() => setActiveTab('schedules')}
                            >
                                Schedules
                            </button>
                            <button
                                className={`${styles.tab} ${activeTab === 'menu' ? styles.activeTab : ''}`}
                                onClick={() => setActiveTab('menu')}
                            >
                                Menu
                            </button>
                        </div>

                        {/* Tab Content */}
                        {activeTab === 'schedules' && (
                            <div className={styles.schedulesContent}>
                                {/* Date Selector - One card per date */}
                                <div className={styles.dateScroller}>
                                    {dateCards.map((card, index) => {
                                        const { month, day, dayOfWeek } = formatScheduleDate(card.date.toISOString());
                                        const hasOccurrences = card.occurrences.length > 0;
                                        const isSelected = selectedDate === card.dateStr;

                                        return (
                                            <button
                                                key={`${card.dateStr}-${index}`}
                                                className={`${styles.dateCard} ${isSelected ? styles.selectedDate : ''} ${!hasOccurrences ? styles.noOccurrence : ''}`}
                                                onClick={() => {
                                                    setSelectedDate(card.dateStr);
                                                    if (hasOccurrences) {
                                                        // Select the first occurrence of this date
                                                        const occurrenceIndex = schedules.findIndex(s => s.id === card.occurrences[0].id);
                                                        if (occurrenceIndex !== -1) {
                                                            setSelectedScheduleIndex(occurrenceIndex);
                                                        }
                                                    } else {
                                                        // Clear selected schedule when selecting a date with no occurrences
                                                        setSelectedScheduleIndex(-1);
                                                    }
                                                }}
                                            >
                                                <div className={styles.dateMonth}>{month}</div>
                                                <div className={styles.dateDay}>{day}</div>
                                                <div className={styles.dateDayOfWeek}>{dayOfWeek}</div>
                                                {hasOccurrences && card.occurrences.length > 1 && (
                                                    <div className={styles.occurrenceDots}>
                                                        {Array.from({ length: Math.min(card.occurrences.length, 5) }).map((_, i) => (
                                                            <div key={i} className={styles.dot} />
                                                        ))}
                                                    </div>
                                                )}
                                                {hasOccurrences && card.occurrences.length === 1 && (
                                                    <div className={styles.occurrenceIndicator} />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Schedule Details - Show all occurrences for selected date */}
                                {selectedDate && selectedDateOccurrences.length > 0 ? (
                                    <div className={styles.occurrencesList}>
                                        {selectedDateOccurrences.map((occurrence) => {
                                            const isActive = selectedSchedule?.id === occurrence.id;
                                            return (
                                                <button
                                                    key={occurrence.id}
                                                    className={`${styles.occurrenceCard} ${isActive ? styles.activeOccurrence : ''}`}
                                                    onClick={() => {
                                                        const occurrenceIndex = schedules.findIndex(s => s.id === occurrence.id);
                                                        if (occurrenceIndex !== -1) {
                                                            setSelectedScheduleIndex(occurrenceIndex);
                                                        }
                                                    }}
                                                >
                                                    <div className={styles.occurrenceCardTime}>
                                                        {formatScheduleTime(occurrence.openTimeLocal, occurrence.closeTimeLocal)}
                                                    </div>
                                                    <div className={styles.occurrenceCardLocation}>
                                                        {occurrence.location.address}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className={styles.noData}>Select a date to view schedule details</div>
                                )}
                            </div>
                        )}

                        {activeTab === 'menu' && (
                            <div className={styles.menuContent}>
                                {menuCategories.length > 1 && (
                                    <div className={styles.categoryNav}>
                                        {menuCategories.map((category) => (
                                            <button
                                                key={category.id}
                                                className={styles.categoryPill}
                                                onClick={() => {
                                                    const el = document.getElementById(`menu-category-${category.id}`);
                                                    if (el) {
                                                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                                    }
                                                }}
                                            >
                                                {category.name}
                                            </button>
                                        ))}
                                    </div>
                                )}
                                {menuCategories.length > 0 ? (
                                    menuCategories.map((category) => (
                                        <div key={category.id} id={`menu-category-${category.id}`} className={styles.menuCategory}>
                                            <h2 className={styles.categoryTitle}>{category.name}</h2>

                                            <div className={styles.menuItems}>
                                                {category.menuItems.map((item) => {
                                                    const itemImageUri = item.image || (item.images && item.images.length > 0 ? item.images[0].imageUri : null);
                                                    const itemImage = getImageUrl(itemImageUri);

                                                    return (
                                                        <div key={item.id} className={styles.menuItem}>
                                                            <div
                                                                className={styles.menuItemImage}
                                                                style={itemImage ? {
                                                                    backgroundImage: `url(${itemImage})`,
                                                                    backgroundSize: 'cover',
                                                                    backgroundPosition: 'center',
                                                                    backgroundColor: 'transparent'
                                                                } : undefined}
                                                            />
                                                            <div className={styles.menuItemInfo}>
                                                                <h3 className={styles.menuItemName}>{item.name}</h3>
                                                                {item.description && (
                                                                    <p className={styles.menuItemDescription}>{item.description}</p>
                                                                )}
                                                                <p className={styles.menuItemPrice}>{formatPrice(item.price)}</p>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className={styles.noData}>No menu available</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Panel - Map */}
                <div className={styles.mapSection}>
                    {selectedSchedule?.location ? (
                        <GoogleMap
                            address={selectedSchedule.location.address}
                            latitude={selectedSchedule.location.latitude}
                            longitude={selectedSchedule.location.longitude}
                            onMapClick={handleMapClick}
                        />
                    ) : (
                        <div className={styles.mapOverlay}>
                            <div className={styles.mapOverlayContent}>
                                <svg className={styles.mapOverlayIcon} width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <h3 className={styles.mapOverlayTitle}>Select a Schedule</h3>
                                <p className={styles.mapOverlayText}>
                                    Choose a date and time from the schedule to view the truck&apos;s location on the map
                                </p>
                                <div className={styles.mapOverlayBranding}>
                                    <span className={styles.brandText}>Street</span>
                                    <span className={styles.brandTextAccent}>Feast</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TruckProfilePage;
