"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useProfileStore } from "@/store/profileStore";
import styles from "./page.module.css";

export default function ProfileHome() {
  const profile = useProfileStore((state) => state.profile);
  const isLoading = useProfileStore((state) => state.isLoading);

  const userInfo = profile;
  const ownedTruck = profile?.truckToCreate || profile?.ownedTrucks?.[0];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Profile Information</h1>
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
          </>
        ) : (
          <>
            <div className={styles.profileField}>
              <label className={styles.fieldLabel}>Name</label>
              <p className={styles.fieldValue}>
                {userInfo?.firstName && userInfo?.lastName
                  ? `${userInfo.firstName} ${userInfo.lastName}`
                  : "Not provided"}
              </p>
            </div>
            <div className={styles.profileField}>
              <label className={styles.fieldLabel}>Truck Name</label>
              <p className={styles.fieldValue}>
                {ownedTruck?.name || "Not provided"}
              </p>
            </div>
            <div className={styles.profileField}>
              <label className={styles.fieldLabel}>Phone</label>
              <p className={styles.fieldValue}>
                {userInfo?.phoneNumber || "Not provided"}
              </p>
            </div>
            <div className={styles.profileField}>
              <label className={styles.fieldLabel}>Email</label>
              <p className={styles.fieldValue}>
                {userInfo?.email || "Not provided"}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
