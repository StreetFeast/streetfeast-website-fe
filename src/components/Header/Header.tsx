"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/store/authStore';
import styles from './Header.module.css';

export default function Header() {
  const user = useAuthStore((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const allowAuth = process.env.NEXT_PUBLIC_ALLOW_AUTH === 'true';

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

        {/* Desktop Navigation */}
        {allowAuth && (
          <nav className={styles.nav}>
            {user ? (
              <Link href="/profile" className={styles.button}>
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
        )}

        {/* Hamburger Menu Button */}
        <button
          className={`${styles.hamburger} ${isMenuOpen ? styles.hamburgerOpen : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={styles.mobileMenu}>
            <div className={styles.mobileMenuHeader}>
              <Link href="/" className={styles.mobileMenuLogo} onClick={closeMenu}>
                <Image
                  src="/app-symbol.png"
                  alt="StreetFeast"
                  width={74}
                  height={70}
                  priority
                />
              </Link>
            </div>

            <nav className={styles.mobileNav}>
              {allowAuth && (
                <>
                  {user ? (
                    <Link href="/profile" className={styles.mobileButton} onClick={closeMenu}>
                      My Profile
                    </Link>
                  ) : (
                    <>
                      <Link href="/login-truck" className={styles.mobileButton} onClick={closeMenu}>
                        Login
                      </Link>
                      <Link href="/register-truck" className={styles.mobileButton} onClick={closeMenu}>
                        Register
                      </Link>
                    </>
                  )}Í\
                </>
              )}
              <Link href="/about" className={styles.mobileButton} onClick={closeMenu}>
                About Us
              </Link>
              <Link href="/contact" className={styles.mobileButton} onClick={closeMenu}>
                Contact Us
              </Link>
              <Link href="/privacy" className={styles.mobileButton} onClick={closeMenu}>
                Privacy Policy
              </Link>
              <Link href="/terms" className={styles.mobileButton} onClick={closeMenu}>
                Terms of Service
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
