"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useAuthStore } from "@/store/authStore";
import { useProfileStore } from "@/store/profileStore";
import { supabase } from "@/lib/supabase";
import { getUserProfile } from "@/utils/api";
import styles from "./page.module.css";
import Image from "next/image";

export default function MyProfile() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const profile = useProfileStore((state) => state.profile);
  const setProfile = useProfileStore((state) => state.setProfile);
  const setLoading = useProfileStore((state) => state.setLoading);
  const setError = useProfileStore((state) => state.setError);
  const isLoading = useProfileStore((state) => state.isLoading);

  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  useEffect(() => {
    // Wait for store to hydrate before checking authentication
    if (!isHydrated) {
      return;
    }

    // Check if user is authenticated
    if (!user || !accessToken) {
      toast.error("You must be authenticated to view this page!");
      router.push("/login-truck");
      return;
    }

    // Fetch user profile data from backend
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
  }, [isHydrated]);

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBillingPeriod(e.target.value as "monthly" | "yearly");
  };

  const handleSubscriptionUpdate = () => {
    // Navigate to Stripe checkout link based on selected billing period
    const checkoutUrl = billingPeriod === "monthly"
      ? stripeCheckoutLinks?.monthly
      : stripeCheckoutLinks?.yearly;

    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    } else {
      toast.error("Checkout link not available. Please try again later.");
    }
  };

  const handleViewSubscriptionDetails = () => {
    const stripeDashboardUrl = process.env.NEXT_PUBLIC_STRIPE_DASHBOARD_URL;
    if (stripeDashboardUrl) {
      window.open(stripeDashboardUrl, "_blank");
    } else {
      toast.error("Unable to open subscription dashboard");
    }
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

  // Extract data from profile
  const userInfo = profile?.userInformation;
  const ownedTruck = profile?.ownedTrucks?.[0]; // Get first truck
  const stripeMetadata = userInfo?.stripeMetadata;
  const isTruckSubscriptionActive = stripeMetadata?.isTruckSubscriptionActive ?? false;
  const stripeCheckoutLinks = stripeMetadata?.stripeCheckoutLinks;

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <Image src="/app-vector-file.svg" alt="StreetFeast" className={styles.logo} />
        <h1 className={styles.sectionTitle}>Profile Information</h1>
        <div className={styles.profileCard}>
          {isLoading ? (
            <>
              <div className={styles.profileField}>
                <label className={styles.fieldLabel}>Name</label>
                <Skeleton height={28} />
              </div>
              <div className={styles.profileField}>
                <label className={styles.fieldLabel}>Truck Name</label>
                <Skeleton height={28} />
              </div>
              <div className={styles.profileField}>
                <label className={styles.fieldLabel}>Phone</label>
                <Skeleton height={28} />
              </div>
              <div className={styles.profileField}>
                <label className={styles.fieldLabel}>Email</label>
                <Skeleton height={28} />
              </div>
              <Skeleton height={48} style={{ marginTop: '0.5rem' }} />
            </>
          ) : (
            <>
              <div className={styles.profileField}>
                <label className={styles.fieldLabel}>Name</label>
                <p className={styles.fieldValue}>
                  {userInfo?.user_metadata?.firstName && userInfo?.user_metadata?.lastName
                    ? `${userInfo.user_metadata.firstName} ${userInfo.user_metadata.lastName}`
                    : "Not provided"}
                </p>
              </div>
              <div className={styles.profileField}>
                <label className={styles.fieldLabel}>Truck Name</label>
                <p className={styles.fieldValue}>{userInfo?.user_metadata?.truckName || "Not provided"}</p>
              </div>
              <div className={styles.profileField}>
                <label className={styles.fieldLabel}>Phone</label>
                <p className={styles.fieldValue}>{userInfo?.phone || "Not provided"}</p>
              </div>
              <div className={styles.profileField}>
                <label className={styles.fieldLabel}>Email</label>
                <p className={styles.fieldValue}>{userInfo?.email || "Not provided"}</p>
              </div>
              <button onClick={handleLogout} className={styles.logoutButton}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      <div className={styles.rightSection}>
        <h1 className={styles.sectionTitle}>Manage Subscription</h1>

        {isLoading ? (
          // Loading skeleton for entire subscription card
          <div className={styles.subscriptionCard}>
            <Skeleton height={40} width={200} />
            <Skeleton height={300} />
            <Skeleton height={48} />
          </div>
        ) : isTruckSubscriptionActive ? (
          // Subscribed State - Show link to Stripe dashboard
          <div className={styles.subscriptionCard}>
            <div className={styles.activeSubscriptionBadge}>
              <span className={styles.activeDot}></span>
              Active Subscription
            </div>

            <div className={styles.subscriptionDetails}>
              <p className={styles.subscriptionMessage}>
                You have an active subscription! Manage your subscription details,
                billing information, and payment methods through our secure customer portal.
              </p>
            </div>

            <button
              onClick={handleViewSubscriptionDetails}
              className={styles.updateButton}
            >
              See Subscription Information
            </button>
          </div>
        ) : (
          // Unsubscribed State (Original)
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
              Start Subscription
            </button>
          </div>
        )}
      </div>
    </div>
  );
}