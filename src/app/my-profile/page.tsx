"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/authStore";
import { supabase } from "@/lib/supabase";
import styles from "./page.module.css";

export default function MyProfile() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState({
    name: "",
    truckName: "",
    phone: "",
    email: "",
  });
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  useEffect(() => {
    // Check if user is authenticated
    if (!user) {
      toast.error("You must be authenticated to view this page!");
      router.push("/login-truck");
      return;
    }

    // Load user profile data
    const loadUserProfile = async () => {
      try {
        const { data: { user: supabaseUser } } = await supabase.auth.getUser();

        if (supabaseUser) {
          setUserProfile({
            name: supabaseUser.user_metadata?.name || "",
            truckName: supabaseUser.user_metadata?.truck_name || "",
            phone: supabaseUser.user_metadata?.phone_number || "",
            email: supabaseUser.email || "",
          });
        }
      } catch (error) {
        console.error("Error loading user profile:", error);
        toast.error("Failed to load profile data");
      } finally {
        setIsLoading(false);
      }
    };

    loadUserProfile();
  }, [user, router]);

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBillingPeriod(e.target.value as "monthly" | "yearly");
  };

  const handleSubscriptionUpdate = () => {
    // TODO: Implement subscription update logic
    toast.success(`Subscription updated to ${billingPeriod} plan!`);
  };

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

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <img src="/app-vector-file.svg" alt="StreetFeast" className={styles.logo} />
        <h1 className={styles.sectionTitle}>Profile Information</h1>
        <div className={styles.profileCard}>
          <div className={styles.profileField}>
            <label className={styles.fieldLabel}>Name</label>
            <p className={styles.fieldValue}>{userProfile.name || "Not provided"}</p>
          </div>
          <div className={styles.profileField}>
            <label className={styles.fieldLabel}>Truck Name</label>
            <p className={styles.fieldValue}>{userProfile.truckName || "Not provided"}</p>
          </div>
          <div className={styles.profileField}>
            <label className={styles.fieldLabel}>Phone</label>
            <p className={styles.fieldValue}>{userProfile.phone || "Not provided"}</p>
          </div>
          <div className={styles.profileField}>
            <label className={styles.fieldLabel}>Email</label>
            <p className={styles.fieldValue}>{userProfile.email}</p>
          </div>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>

      <div className={styles.rightSection}>
        <h1 className={styles.sectionTitle}>Manage Subscription</h1>
        <div className={styles.subscriptionCard}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Subscription Plan</label>
            <div className={styles.planOptions}>
              <label
                className={`${styles.planCard} ${
                  billingPeriod === "monthly" ? styles.selected : ""
                }`}
              >
                <input
                  type="radio"
                  name="billingPeriod"
                  value="monthly"
                  checked={billingPeriod === "monthly"}
                  onChange={handleBillingChange}
                  className={styles.radio}
                />
                <div className={styles.planContent}>
                  <h3 className={styles.planTitle}>Monthly</h3>
                  <p className={styles.planPrice}>$79.99/month</p>
                  <p className={styles.planNote}>Billed monthly</p>
                </div>
              </label>

              <label
                className={`${styles.planCard} ${
                  billingPeriod === "yearly" ? styles.selected : ""
                }`}
              >
                <input
                  type="radio"
                  name="billingPeriod"
                  value="yearly"
                  checked={billingPeriod === "yearly"}
                  onChange={handleBillingChange}
                  className={styles.radio}
                />
                <div className={styles.planContent}>
                  <div className={styles.savingsBadge}>Save 37%</div>
                  <h3 className={styles.planTitle}>Yearly</h3>
                  <p className={styles.planPrice}>$599.88/year</p>
                  <p className={styles.planNote}>$49.99/month equivalent</p>
                </div>
              </label>
            </div>
            <p className={styles.trialNote}>
              ✨ All plans start with a <strong>1 month free trial</strong>
            </p>
          </div>
          <button
            onClick={handleSubscriptionUpdate}
            className={styles.updateButton}
          >
            Update Subscription
          </button>
        </div>
      </div>
    </div>
  );
}