"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/authStore";
import { useProfileStore } from "@/store/profileStore";
import { getUserProfile } from "@/utils/api";
import ProfileSidebar from "@/components/ProfileSidebar";
import styles from "./layout.module.css";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);
  const isHydrated = useAuthStore((state) => state.isHydrated);

  const setProfile = useProfileStore((state) => state.setProfile);
  const setLoading = useProfileStore((state) => state.setLoading);
  const setError = useProfileStore((state) => state.setError);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    if (!user || !accessToken) {
      toast.error("You must be authenticated to view this page!");
      router.push("/login-truck");
      return;
    }

    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const profileData = await getUserProfile();
        setProfile(profileData);
      } catch (error) {
        console.error("Error loading user profile:", error);
        setError("Failed to load profile data");
        toast.error("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHydrated, user, accessToken, router]);

  return (
    <div className={styles.container}>
      <ProfileSidebar
        isOpen={isSidebarOpen}
        onToggle={handleToggleSidebar}
        onClose={handleCloseSidebar}
      />
      <main className={styles.content}>{children}</main>
    </div>
  );
}
