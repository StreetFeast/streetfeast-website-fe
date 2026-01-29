"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";

function TruckVerificationContent() {
  const [deepLink, setDeepLink] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    // Collect all parameters from query string
    const queryParams = new URLSearchParams();
    searchParams.forEach((value, key) => {
      queryParams.set(key, value);
    });

    // Also collect parameters from hash fragment (Supabase sometimes uses this)
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    hashParams.forEach((value, key) => {
      queryParams.set(key, value);
    });

    // Check for errors from Supabase
    const error = queryParams.get("error");
    const errorDescription = queryParams.get("error_description");

    if (error) {
      setHasError(true);
      setErrorMessage(errorDescription || error || "Verification failed");
      return;
    }

    // Build the deep link with all the parameters
    const deepLinkUrl = `https://www.streetfeastapp.com/m/verifyTruckEmail?${queryParams.toString()}`;
    setDeepLink(deepLinkUrl);
  }, [searchParams]);

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <Image
          src="/app-vector-file.svg"
          alt="StreetFeast Logo"
          width={200}
          height={200}
          className={styles.logo}
        />
        <h1 className={styles.brandTitle}>StreetFeast</h1>
        <p className={styles.brandDescription}>
          Welcome to StreetFeast, the app built to connect food trucks with hungry customers.
        </p>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.contentWrapper}>
          {!deepLink && !hasError && (
            <>
              <div className={styles.spinner} />
              <h1 className={styles.title}>Loading...</h1>
            </>
          )}

          {deepLink && !hasError && (
            <>
              <div className={styles.successIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className={styles.checkIcon}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h1 className={styles.title}>Almost There!</h1>
              <p className={styles.message}>
                Tap the button below to complete your email verification in the StreetFeast app.
              </p>
              <a href={deepLink} className={styles.button}>
                Open StreetFeast App
              </a>
              <p className={styles.submessage}>
                If the app doesn&apos;t open automatically, make sure you have the StreetFeast app installed on your device.
              </p>
            </>
          )}

          {hasError && (
            <>
              <div className={styles.errorIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className={styles.xIcon}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h1 className={styles.title}>Verification Failed</h1>
              <p className={styles.message}>{errorMessage}</p>
              <p className={styles.submessage}>
                Please try clicking the verification link in your email again, or request a new verification email from the app.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TruckVerification() {
  return (
    <Suspense fallback={
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <Image
            src="/app-vector-file.svg"
            alt="StreetFeast Logo"
            width={200}
            height={200}
            className={styles.logo}
          />
          <h1 className={styles.brandTitle}>StreetFeast</h1>
          <p className={styles.brandDescription}>
            Welcome to StreetFeast, the app built to connect food trucks with hungry customers.
          </p>
        </div>
        <div className={styles.rightSection}>
          <div className={styles.contentWrapper}>
            <div className={styles.spinner} />
            <h1 className={styles.title}>Loading...</h1>
          </div>
        </div>
      </div>
    }>
      <TruckVerificationContent />
    </Suspense>
  );
}
