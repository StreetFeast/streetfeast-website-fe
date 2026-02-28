'use client';

import { MenuCategory } from '@/types/api';
import styles from './TruckMenu.module.css';

interface TruckMenuProps {
    menuCategories: MenuCategory[];
    menuImageUri: string | null;
    storagePrefix: string;
}

function TruckMenu({ menuCategories, menuImageUri, storagePrefix }: TruckMenuProps) {
    const getImageUrl = (uri: string | null | undefined): string | null => {
        if (!uri) return null;
        if (uri.startsWith('http')) return uri;
        return `${storagePrefix}${uri}`;
    };

    const formatPrice = (price: number) => {
        return `$${price.toFixed(2)}`;
    };


    // Image menu: no categories but has an image
    if (menuCategories.length === 0 && menuImageUri) {
        const imageUrl = getImageUrl(menuImageUri);
        console.log(imageUrl)
        if (imageUrl) {
            return (
                <div className={styles.menuContent}>
                    <div className={styles.menuImageContainer}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={imageUrl}
                            alt="Menu"
                            className={styles.menuImage}
                        />
                    </div>
                </div>
            );
        }
    }

    // Category-based menu
    if (menuCategories.length > 0) {
        return (
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
                {menuCategories.map((category) => (
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
                ))}
            </div>
        );
    }

    // No menu available
    return (
        <div className={styles.menuContent}>
            <div className={styles.noData}>No menu available</div>
        </div>
    );
}

export default TruckMenu;
