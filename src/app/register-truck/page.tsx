"use client";

import Image from "next/image";
import { useRegisterTruckForm } from "@/hooks/useRegisterTruckForm";
import { FormInput } from "@/components/FormInput";
import { PasswordInput } from "@/components/PasswordInput";
import styles from "./page.module.css";

export default function RegisterTruck() {
  const {
    formData,
    errors,
    error,
    isLoading,
    handleChange,
    handleBlur,
    isFormValid,
    handleSubmit,
  } = useRegisterTruckForm();

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
            {error && <div className={styles.errorBanner}>{error}</div>}

            <div className={styles.nameRow}>
              <FormInput
                label="First Name"
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                disabled={isLoading}
                autoComplete="given-name"
              />
              <FormInput
                label="Last Name"
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                disabled={isLoading}
                autoComplete="family-name"
              />
            </div>

            <FormInput
              label="Phone Number"
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              required
              disabled={isLoading}
              autoComplete="tel"
            />

            <FormInput
              label="Email Address"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
              autoComplete="email"
            />

            <FormInput
              label="Truck Name"
              type="text"
              id="truckName"
              name="truckName"
              value={formData.truckName}
              onChange={handleChange}
              required
              disabled={isLoading}
              autoComplete="organization"
            />

            <FormInput
              label="ZIP Code"
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              error={errors.zipCode}
              required
              disabled={isLoading}
              autoComplete="postal-code"
            />

            <PasswordInput
              label="Password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password}
              required
              disabled={isLoading}
              showRequirements
              autoComplete="new-password"
            />

            <PasswordInput
              label="Verify Password"
              id="verifyPassword"
              name="verifyPassword"
              value={formData.verifyPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.verifyPassword}
              required
              disabled={isLoading}
              autoComplete="new-password"
            />

            <button
              type="submit"
              className={styles.submitButton}
              disabled={!isFormValid() || isLoading}
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}