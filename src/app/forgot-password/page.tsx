"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import styles from "./page.module.css";

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Pre-fill email from URL parameter
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const isFormValid = () => {
    return email.trim() !== "" && email.includes("@");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_DOMAIN}/reset-password`,
      });

      if (error) {
        setError(error.message);
        setIsLoading(false);
        return;
      }

      setSuccess(true);
      setIsLoading(false);
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  if (success) {
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
            Welcome back to StreetFeast, the app built to connect you to your
            hungry customers.
          </p>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.formWrapper}>
            <h1 className={styles.title}>Check Your Email</h1>
            <div className={styles.successBanner}>
              Password reset email sent! Please check your inbox for instructions.
            </div>
            <button
              onClick={() => router.push("/login-truck")}
              className={styles.submitButton}
            >
              Return to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

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
          Welcome back to StreetFeast, the app built to connect you to your
          hungry customers.
        </p>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.formWrapper}>
          <h1 className={styles.title}>Reset Your Password</h1>
          <p className={styles.description}>
            Enter your email address and we&apos;ll send you a link to reset your password.
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            {error && (
              <div className={styles.errorBanner}>
                {error}
              </div>
            )}

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                required
                disabled={isLoading}
                placeholder="your@email.com"
              />
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={!isFormValid() || isLoading}
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>

            <button
              type="button"
              className={styles.backButton}
              onClick={() => router.push("/login-truck")}
              disabled={isLoading}
            >
              Back to Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function ForgotPassword() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ForgotPasswordForm />
    </Suspense>
  );
}
