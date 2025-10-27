"use client";

import { useState } from "react";
import Image from "next/image";
import { AsYouType, isValidPhoneNumber } from "libphonenumber-js";
import styles from "./page.module.css";

export default function RegisterTruck() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    truckName: "",
    billingPeriod: "",
    password: "",
    verifyPassword: "",
  });

  const [errors, setErrors] = useState({
    phone: "",
    password: "",
    verifyPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);

  const validatePassword = (password: string): string => {
    if (password.length < 10) {
      return "Password must be at least 10 characters long";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return "Password must contain at least one special character";
    }
    if (!/\d/.test(password)) {
      return "Password must contain at least one number";
    }
    return "";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    let processedValue = value;
    const newErrors = { ...errors };

    // Handle phone number formatting
    if (name === "phone") {
      const asYouType = new AsYouType("US");
      processedValue = asYouType.input(value);

      // Validate phone number
      if (value && !isValidPhoneNumber(processedValue, "US")) {
        newErrors.phone = "Please enter a valid US phone number";
      } else {
        newErrors.phone = "";
      }
    }

    // Re-validate password on change if already in error state
    if (name === "password" && errors.password && value) {
      const passwordError = validatePassword(value);
      newErrors.password = passwordError;

      // Check if verify password matches
      if (formData.verifyPassword && value !== formData.verifyPassword) {
        newErrors.verifyPassword = "Passwords do not match";
      } else if (formData.verifyPassword) {
        newErrors.verifyPassword = "";
      }
    }

    // Re-validate verify password on change if already in error state
    if (name === "verifyPassword" && errors.verifyPassword && value) {
      if (value !== formData.password) {
        newErrors.verifyPassword = "Passwords do not match";
      } else {
        newErrors.verifyPassword = "";
      }
    }

    setErrors(newErrors);
    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newErrors = { ...errors };

    // Handle password validation on blur
    if (name === "password" && value) {
      const passwordError = validatePassword(value);
      newErrors.password = passwordError;

      // Check if verify password matches
      if (formData.verifyPassword && value !== formData.verifyPassword) {
        newErrors.verifyPassword = "Passwords do not match";
      } else if (formData.verifyPassword) {
        newErrors.verifyPassword = "";
      }
    }

    // Handle verify password validation on blur
    if (name === "verifyPassword" && value) {
      if (value !== formData.password) {
        newErrors.verifyPassword = "Passwords do not match";
      } else {
        newErrors.verifyPassword = "";
      }
    }

    setErrors(newErrors);
  };

  const isFormValid = () => {
    return (
      formData.name.trim() !== "" &&
      formData.phone.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.truckName.trim() !== "" &&
      formData.billingPeriod !== "" &&
      formData.password.trim() !== "" &&
      formData.verifyPassword.trim() !== "" &&
      !errors.phone &&
      !errors.password &&
      !errors.verifyPassword &&
      formData.password === formData.verifyPassword
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
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
          Welcome to StreetFeast, the app built to connect you to your hungry
          customers.
        </p>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.formWrapper}>
        <h1 className={styles.title}>Register Your Food Truck</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.label}>
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
              required
            />
            {errors.phone && (
              <span className={styles.errorMessage}>{errors.phone}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="truckName" className={styles.label}>
              Truck Name
            </label>
            <input
              type="text"
              id="truckName"
              name="truckName"
              value={formData.truckName}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <div className={styles.passwordInputWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
                required
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.eyeIcon}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.eyeIcon}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
            <p className={styles.passwordRequirements}>
              Password must be at least 10 characters long and contain at least one special character and one number.
            </p>
            {errors.password && (
              <span className={styles.errorMessage}>{errors.password}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="verifyPassword" className={styles.label}>
              Verify Password
            </label>
            <div className={styles.passwordInputWrapper}>
              <input
                type={showVerifyPassword ? "text" : "password"}
                id="verifyPassword"
                name="verifyPassword"
                value={formData.verifyPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${styles.input} ${errors.verifyPassword ? styles.inputError : ""}`}
                required
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowVerifyPassword(!showVerifyPassword)}
                aria-label={showVerifyPassword ? "Hide password" : "Show password"}
              >
                {showVerifyPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.eyeIcon}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.eyeIcon}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.verifyPassword && (
              <span className={styles.errorMessage}>{errors.verifyPassword}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Subscription Plan</label>
            <div className={styles.planOptions}>
              <label
                className={`${styles.planCard} ${
                  formData.billingPeriod === "monthly" ? styles.selected : ""
                }`}
              >
                <input
                  type="radio"
                  name="billingPeriod"
                  value="monthly"
                  checked={formData.billingPeriod === "monthly"}
                  onChange={handleChange}
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
                  formData.billingPeriod === "yearly" ? styles.selected : ""
                }`}
              >
                <input
                  type="radio"
                  name="billingPeriod"
                  value="yearly"
                  checked={formData.billingPeriod === "yearly"}
                  onChange={handleChange}
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
            type="submit"
            className={styles.submitButton}
            disabled={!isFormValid()}
          >
            Sign Up
          </button>
        </form>
        </div>
      </div>
    </div>
  );
}
