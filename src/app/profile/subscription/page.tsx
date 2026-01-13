"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useProfileStore } from "@/store/profileStore";
import styles from "./page.module.css";

export default function Subscription() {
  const profile = useProfileStore((state) => state.profile);
  const isLoading = useProfileStore((state) => state.isLoading);

  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">(
    "monthly"
  );

  const userInfo = profile;
  const isTruckSubscriptionActive = userInfo?.isTruckSubscriptionActive ?? false;
  const stripeCustomerId = userInfo?.stripeCustomerId;
  const stripeSubscriptionId = userInfo?.stripeSubscriptionId;
  const hasSubscription = !!stripeSubscriptionId;

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBillingPeriod(e.target.value as "monthly" | "yearly");
  };

  const handleSubscriptionUpdate = () => {
    const checkoutUrl =
      billingPeriod === "monthly"
        ? profile?.stripeCheckoutLinkMonthly
        : profile?.stripeCheckoutLinkYearly;

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

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Manage Subscription</h1>

      {isLoading ? (
        <div className={styles.subscriptionCard}>
          <Skeleton height={40} width={200} />
          <Skeleton height={300} />
          <Skeleton height={48} />
        </div>
      ) : isTruckSubscriptionActive ? (
        <div className={styles.subscriptionCard}>
          <div className={styles.activeSubscriptionBadge}>
            <span className={styles.activeDot}></span>
            Active Subscription
          </div>

          <div className={styles.subscriptionDetails}>
            <p className={styles.subscriptionMessage}>
              You have an active subscription! Manage your subscription details,
              billing information, and payment methods through our secure
              customer portal.
            </p>

            {stripeCustomerId && (
              <div className={styles.profileField}>
                <label className={styles.fieldLabel}>Customer ID</label>
                <p className={styles.fieldValue}>{stripeCustomerId}</p>
              </div>
            )}

            {stripeSubscriptionId && (
              <div className={styles.profileField}>
                <label className={styles.fieldLabel}>Subscription ID</label>
                <p className={styles.fieldValue}>{stripeSubscriptionId}</p>
              </div>
            )}
          </div>

          <button
            onClick={handleViewSubscriptionDetails}
            className={styles.updateButton}
          >
            See Subscription Information
          </button>
        </div>
      ) : hasSubscription ? (
        <div className={styles.subscriptionCard}>
          <div className={styles.inactiveSubscriptionBadge}>
            Inactive Subscription
          </div>

          <div className={styles.subscriptionDetails}>
            <p className={styles.subscriptionMessage}>
              Your subscription is currently inactive. This may be due to
              payment issues or cancellation. Please manage your subscription
              through our secure customer portal.
            </p>

            {stripeCustomerId && (
              <div className={styles.profileField}>
                <label className={styles.fieldLabel}>Customer ID</label>
                <p className={styles.fieldValue}>{stripeCustomerId}</p>
              </div>
            )}

            {stripeSubscriptionId && (
              <div className={styles.profileField}>
                <label className={styles.fieldLabel}>Subscription ID</label>
                <p className={styles.fieldValue}>{stripeSubscriptionId}</p>
              </div>
            )}
          </div>

          <button
            onClick={handleViewSubscriptionDetails}
            className={styles.updateButton}
          >
            Manage Subscription
          </button>
        </div>
      ) : (
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
                  <p className={styles.planPrice}>$69.99/month</p>
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
                <div className={styles.savingsBadge}>
                  <p className={styles.savingsBadgeText}>Save 28%</p>
                </div>
                <div className={styles.planContent}>
                  <h3 className={styles.planTitle}>Yearly</h3>
                  <p className={styles.planPrice}>$599.88/year</p>
                  <p className={styles.planNote}>$49.99/month equivalent</p>
                </div>
              </label>
            </div>
            <p className={styles.trialNote}>
              All plans start with a <strong>1 month free trial</strong>
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
  );
}
