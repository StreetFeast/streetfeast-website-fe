"use client";

import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import styles from './Header.module.css';

export default function Header() {
  const user = useAuthStore((state) => state.user);

  return (
    <header className={styles.header}>
      <a href="#main-content" className={styles.skipLink}>
        Skip to content
      </a>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          StreetFeast
        </Link>
        <nav className={styles.nav}>
          {user ? (
            <Link href="/my-profile" className={styles.button}>
              My Profile
            </Link>
          ) : (
            <>
              <Link href="/register-truck" className={styles.button}>
                Register Truck
              </Link>
              <Link href="/login-truck" className={styles.button}>
                Truck Login
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
