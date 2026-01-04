"use client";

import Link from 'next/link';
import Image from 'next/image';
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
          <Image
            src="/logowithtext.png"
            alt="StreetFeast"
            width={220}
            height={100}
            priority
          />
        </Link>
        <nav className={styles.nav}>
          {user ? (
            <Link href="/my-profile" className={styles.button}>
              My Profile
            </Link>
          ) : (
            <>
              <Link href="/login-truck" className={styles.loginButton}>
                Login
              </Link>
              <Link href="/register-truck" className={styles.registerButton}>
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
