import { useState } from "react";
import { useRouter } from "next/navigation";
import { AsYouType, isValidPhoneNumber } from "libphonenumber-js";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/authStore";
import { validatePassword } from "@/utils/validation";
import zipcodes from "zipcodes";

interface RegisterTruckFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  truckName: string;
  zipCode: string;
  password: string;
  verifyPassword: string;
}

interface FormErrors {
  phone: string;
  zipCode: string;
  password: string;
  verifyPassword: string;
}

export const useRegisterTruckForm = () => {
  const [formData, setFormData] = useState<RegisterTruckFormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    truckName: "",
    zipCode: "",
    password: "",
    verifyPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    phone: "",
    zipCode: "",
    password: "",
    verifyPassword: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Clear general error when user starts typing
    if (error) {
      setError("");
    }

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

    // Handle zipcode validation
    if (name === "zipCode") {
      // Only allow digits
      processedValue = value.replace(/\D/g, "").slice(0, 5);

      // Validate zipcode format
      if (processedValue && processedValue.length !== 5) {
        newErrors.zipCode = "ZIP code must be 5 digits";
      } else if (processedValue && !zipcodes.lookup(processedValue)) {
        newErrors.zipCode = "Please enter a valid ZIP code";
      } else {
        newErrors.zipCode = "";
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
      formData.firstName.trim() !== "" &&
      formData.phone.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.truckName.trim() !== "" &&
      formData.zipCode.trim() !== "" &&
      formData.password.trim() !== "" &&
      formData.verifyPassword.trim() !== "" &&
      !errors.phone &&
      !errors.zipCode &&
      !errors.password &&
      !errors.verifyPassword &&
      formData.password === formData.verifyPassword
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const zipCodeData = zipcodes.lookup(formData.zipCode);

      if (!zipCodeData) {
        setError("Invalid ZIP code");
        setIsLoading(false);
        return;
      }

      const { latitude, longitude } = zipCodeData;

      const { data: supabaseData, error: supabaseError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            truckName: formData.truckName,
            phoneNumber: formData.phone,
            firstName: formData.firstName,
            lastName: formData.lastName,
            zipCode: Number(formData.zipCode),
            latitude,
            longitude,
          },
          emailRedirectTo: `${typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_DOMAIN}/verify`
        },
      });

      if (supabaseError) {
        setError(supabaseError.message);
        setIsLoading(false);
        return;
      }

      if (!supabaseData.user) {
        setError("Failed to create user account");
        setIsLoading(false);
        return;
      }

      // If no session, user needs to verify email first
      if (!supabaseData.session) {
        router.push('/verify');
        return;
      }

      // If session exists, set auth and register truck
      if (supabaseData.session && supabaseData.user) {
        setAuth(
          supabaseData.user,
          supabaseData.session.access_token,
          supabaseData.session.refresh_token
        );
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return {
    formData,
    errors,
    error,
    isLoading,
    handleChange,
    handleBlur,
    isFormValid,
    handleSubmit,
  };
};
