'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getTruckDetails, getTruckOccurrences } from '@/utils/api';
import { TruckDetailResponse, TruckOccurrence } from '@/types/api';
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
            } catch (err) {
                setError('Failed to load truck information');
                console.error('Error fetching truck data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTruckData();
    }, [truckId]);

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.loading}>Loading truck information...</div>
            </div>
        );
    }

    if (error || !truckData) {
        return (
            <div className={styles.container}>
                <div className={styles.error}>{error || 'Truck not found'}</div>
            </div>
        );
    }

    const heroImage = truckData.images && truckData.images.length > 0
        ? `https://streetfeastdevelopment.blob.core.windows.net${truckData.images[0].imageUri}`
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

    const formatPrice = (cents: number) => {
        return `$${(cents / 100).toFixed(2)}`;
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

        if (todaysOccurrences.length === 0) return null;

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
                bestStatus = { label: status.label, type: status.type, occurrence: status.occurrence };
                bestPriority = status.priority;
            }
        }

        return bestStatus;
    };

    const truckStatus = getTruckStatus();

    // Use future occurrences as schedules
    const schedules = futureOccurrences;

    // Generate 30 days of calendar dates starting from today
    const generateCalendarDates = () => {
        const dates = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let i = 0; i < 30; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            dates.push(date);
        }

        return dates;
    };

    // Check if a date has any occurrences
    const hasOccurrence = (date: Date) => {
        const dateStr = getDateString(date);
        return schedules.some(schedule => {
            const scheduleDate = new Date(schedule.openTimeLocal);
            const scheduleDateStr = getDateString(scheduleDate);
            return scheduleDateStr === dateStr;
        });
    };

    // Get occurrence for a specific date
    const getOccurrenceForDate = (date: Date) => {
        const dateStr = getDateString(date);
        return schedules.find(schedule => {
            const scheduleDate = new Date(schedule.openTimeLocal);
            const scheduleDateStr = getDateString(scheduleDate);
            return scheduleDateStr === dateStr;
        });
    };

    const calendarDates = generateCalendarDates();
    const selectedSchedule = schedules[selectedScheduleIndex];
    const menuCategories = selectedSchedule?.menu?.categories || [];

    const handleFavoriteClick = () => {
        setModalMessage('favorite this truck');
        setShowModal(true);
    };

    const handleReportClick = () => {
        setModalMessage('report this truck');
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setModalMessage('');
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
                                    href="https://apps.apple.com"
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
                                    href="https://play.google.com"
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
                {/* Hero Image */}
                <div
                    className={styles.heroSection}
                    style={heroImage ? {
                        backgroundImage: `url(${heroImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    } : undefined}
                >
                    <button className={styles.reportButton} aria-label="Report" onClick={handleReportClick}>
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
                    {truckStatus && (
                        <div className={styles.contactRow}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div className={styles.hoursContent}>
                                {truckStatus.occurrence && (
                                    <div className={styles.statusTime}>
                                        {formatScheduleTime(truckStatus.occurrence.openTimeLocal, truckStatus.occurrence.closeTimeLocal)}
                                    </div>
                                )}
                            </div>
                            <div className={`${styles.statusLabel} ${styles[`status-${truckStatus.type}`]}`}>
                                {truckStatus.label}
                            </div>
                        </div>
                    )}

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
                        {/* Date Selector - Always show 30 days */}
                        <div className={styles.dateScroller}>
                            {calendarDates.map((date, index) => {
                                const { month, day, dayOfWeek } = formatScheduleDate(date.toISOString());
                                const occurrence = getOccurrenceForDate(date);
                                const isSelected = selectedSchedule && occurrence?.id === selectedSchedule.id;
                                const dateHasOccurrence = hasOccurrence(date);

                                return (
                                    <button
                                        key={index}
                                        className={`${styles.dateCard} ${isSelected ? styles.selectedDate : ''} ${!dateHasOccurrence ? styles.noOccurrence : ''}`}
                                        onClick={() => {
                                            if (occurrence) {
                                                const occurrenceIndex = schedules.findIndex(s => s.id === occurrence.id);
                                                if (occurrenceIndex !== -1) {
                                                    setSelectedScheduleIndex(occurrenceIndex);
                                                }
                                            }
                                        }}
                                        disabled={!dateHasOccurrence}
                                    >
                                        <div className={styles.dateMonth}>{month}</div>
                                        <div className={styles.dateDay}>{day}</div>
                                        <div className={styles.dateDayOfWeek}>{dayOfWeek}</div>
                                        {dateHasOccurrence && <div className={styles.occurrenceIndicator} />}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Schedule Details */}
                        {selectedSchedule ? (
                            <div className={styles.scheduleDetails}>
                                <div className={styles.scheduleDate}>
                                    {formatScheduleDate(selectedSchedule.openTimeLocal).month}
                                    <br />
                                    {formatScheduleDate(selectedSchedule.openTimeLocal).day}
                                </div>
                                <div className={styles.scheduleInfo}>
                                    <div className={styles.scheduleLocation}>{selectedSchedule.location.address}</div>
                                    <div className={styles.scheduleTime}>
                                        {formatScheduleTime(selectedSchedule.openTimeLocal, selectedSchedule.closeTimeLocal)}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className={styles.noData}>Select a date to view schedule details</div>
                        )}
                    </div>
                )}

                {activeTab === 'menu' && (
                    <div className={styles.menuContent}>
                        {menuCategories.length > 0 ? (
                            menuCategories.map((category) => (
                                <div key={category.id} className={styles.menuCategory}>
                                    <button className={styles.categoryPill}>{category.name}</button>

                                    <h2 className={styles.categoryTitle}>{category.name}</h2>

                                    <div className={styles.menuItems}>
                                        {category.menuItems.map((item) => {
                                            const itemImage = item.image &&
                                                item.image
                                                ? `https://streetfeastdevelopment.blob.core.windows.net${item.image}`
                                                : null;

                                            console.log(item)

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
        </div>
    );
}

export default TruckProfilePage;
