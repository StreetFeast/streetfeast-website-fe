"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/authStore";
import styles from "./page.module.css";

function VerifyContent() {
  const [status, setStatus] = useState<"awaiting" | "verifying" | "success" | "error" | "loading">("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [hasProcessed, setHasProcessed] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    // Prevent running verification multiple times
    if (hasProcessed) return;

    const checkVerificationStatus = async () => {
      // Check for hash fragment (Supabase sends tokens in the hash)
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const hashAccessToken = hashParams.get("access_token");
      const hashRefreshToken = hashParams.get("refresh_token");

      // Also check query parameters (some Supabase configs use query params)
      const queryAccessToken = searchParams.get("access_token");
      const queryRefreshToken = searchParams.get("refresh_token");

      const accessToken = hashAccessToken || queryAccessToken;
      const refreshToken = hashRefreshToken || queryRefreshToken;

      console.log("Verification params:", {
        hashAccessToken: !!hashAccessToken,
        queryAccessToken: !!queryAccessToken,
        hasRefreshToken: !!refreshToken
      });

      // If we have tokens, process the verification
      if (accessToken) {
        setHasProcessed(true);
        setStatus("verifying");
        try {
          // Exchange the tokens for a session
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken || "",
          });

          console.log("setSession result:", { hasSession: !!data.session, hasUser: !!data.user, error });

          if (error) {
            setStatus("error");
            setErrorMessage(error.message);
            return;
          }

          if (data.session && data.user) {
            setAuth(
              data.user,
              data.session.access_token,
              data.session.refresh_token
            );
            setStatus("success");

            // Clear the hash/query from the URL
            window.history.replaceState(null, "", window.location.pathname);

            setTimeout(() => {
              router.push("/profile");
            }, 2000);
          } else {
            setStatus("error");
            setErrorMessage("Verification failed. Please try again.");
          }
        } catch (err) {
          console.error("Verification error:", err);
          setStatus("error");
          setErrorMessage("An unexpected error occurred. Please try again.");
        }
        return;
      }

      // No tokens - check for existing session
      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error("Session error:", error);
          setStatus("error");
          setErrorMessage("Failed to check session. Please try logging in again.");
          setHasProcessed(true);
          return;
        }

        // No session - this is okay, user might have just registered
        if (!session || !session.user) {
          setHasProcessed(true);
          setStatus("awaiting");
          setErrorMessage("Please check your email to verify your account. If you didn't receive an email, try logging in and we'll resend it.");
          return;
        }

        // Has session - check verification status
        const email = session.user.email;
        setUserEmail(email || "");

        if (session.user.email_confirmed_at) {
          // Already verified - redirect to profile
          setHasProcessed(true);
          setStatus("success");
          setTimeout(() => {
            router.push("/profile");
          }, 1500);
        } else {
          // Unverified - show awaiting status
          setHasProcessed(true);
          setStatus("awaiting");
        }
      } catch (err) {
        console.error("Session check error:", err);
        setStatus("error");
        setErrorMessage("An unexpected error occurred. Please try again.");
        setHasProcessed(true);
      }
    };

    checkVerificationStatus();
  }, [searchParams, router, setAuth, hasProcessed]);

  const handleResendEmail = async () => {
    if (!userEmail) {
      setResendMessage("Unable to resend email. Please try logging in again.");
      return;
    }

    setResendLoading(true);
    setResendMessage("");

    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: userEmail,
        options: {
          emailRedirectTo: `${window.location.origin}/verify`
        }
      });

      if (error) {
        setResendMessage(error.message);
      } else {
        setResendMessage("Confirmation email sent! Please check your inbox.");
      }
    } catch {
      setResendMessage("Failed to resend email. Please try again.");
    } finally {
      setResendLoading(false);
    }
  };

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
          Welcome to StreetFeast, the app built to connect you to your hungry customers.
        </p>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.contentWrapper}>
          {status === "loading" && (
            <>
              <div className={styles.spinner} />
              <h1 className={styles.title}>Loading...</h1>
            </>
          )}

          {status === "awaiting" && (
            <>
              <div className={styles.emailIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={styles.mailIcon}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </div>
              <h1 className={styles.title}>Check Your Email</h1>
              {userEmail ? (
                <>
                  <p className={styles.message}>
                    We sent a confirmation email to <strong>{userEmail}</strong>.
                    Please click the link in the email to verify your account.
                  </p>
                  <p className={styles.submessage}>
                    Didn&apos;t receive the email? Check your spam folder or request a new one.
                  </p>

                  {resendMessage && (
                    <div className={resendMessage.includes("sent") ? styles.successBanner : styles.errorBanner}>
                      {resendMessage}
                    </div>
                  )}

                  <button
                    onClick={handleResendEmail}
                    className={styles.secondaryButton}
                    disabled={resendLoading}
                  >
                    {resendLoading ? "Sending..." : "Resend Confirmation Email"}
                  </button>
                </>
              ) : (
                <>
                  <p className={styles.message}>
                    {errorMessage || "Please check your email to verify your account."}
                  </p>
                  <button
                    onClick={() => router.push("/login-truck")}
                    className={styles.button}
                  >
                    Go to Login
                  </button>
                </>
              )}
            </>
          )}

          {status === "verifying" && (
            <>
              <div className={styles.spinner} />
              <h1 className={styles.title}>Verifying Your Email</h1>
              <p className={styles.message}>
                Please wait while we confirm your email address...
              </p>
            </>
          )}

          {status === "success" && (
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
              <h1 className={styles.title}>Email Verified!</h1>
              <p className={styles.message}>
                Your email has been successfully verified. Redirecting you to your profile...
              </p>
            </>
          )}

          {status === "error" && (
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
              <button
                onClick={() => router.push("/login-truck")}
                className={styles.button}
              >
                Go to Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Verify() {
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
            Welcome to StreetFeast, the app built to connect you to your hungry customers.
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
      <VerifyContent />
    </Suspense>
  );
}
