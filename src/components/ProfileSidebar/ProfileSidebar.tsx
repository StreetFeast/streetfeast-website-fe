"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FiUser, FiCreditCard, FiBook, FiMail, FiMap, FiMenu, FiX } from "react-icons/fi";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/authStore";
import styles from "./ProfileSidebar.module.css";
import { IconType } from "react-icons";

interface NavItem {
  label: string;
  href: string;
  Icon: IconType;
}

const navItems: NavItem[] = [
  { label: "Profile", href: "/profile/home", Icon: FiUser },
  { label: "Subscription", href: "/profile/subscription", Icon: FiCreditCard },
  { label: "Tutorials", href: "/profile/tutorials", Icon: FiBook },
  { label: "Roadmap", href: "/profile/roadmap", Icon: FiMap },
  { label: "Contact Us", href: "/profile/contact", Icon: FiMail },
];

interface ProfileSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export default function ProfileSidebar({ isOpen, onToggle, onClose }: ProfileSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      clearAuth();
      toast.success("Logged out successfully!");
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out");
    }
  };

  const handleNavClick = () => {
    onClose();
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className={styles.mobileToggle}
        onClick={onToggle}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Overlay */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.logoContainer}>
          <Image
            src="/app-vector-file.svg"
            alt="StreetFeast"
            className={styles.logo}
            width={120}
            height={120}
          />
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${isActive ? styles.active : ""}`}
                onClick={handleNavClick}
              >
                <item.Icon className={styles.navIcon} />
                <span className={styles.navLabel}>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className={styles.bottomSection}>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
