"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

export default function RegisterTruck() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    truckName: "",
    billingPeriod: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    return (
      formData.name.trim() !== "" &&
      formData.phone.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.truckName.trim() !== "" &&
      formData.billingPeriod !== ""
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
              className={styles.input}
              required
            />
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
