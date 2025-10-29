import { useState } from "react";
import { useRouter } from "next/navigation";
import { AsYouType, isValidPhoneNumber } from "libphonenumber-js";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/authStore";
import { validatePassword } from "@/utils/validation";
import axios from "axios";

interface RegisterTruckFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  truckName: string;
  password: string;
  verifyPassword: string;
}

interface FormErrors {
  phone: string;
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
    password: "",
    verifyPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    phone: "",
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
      formData.password.trim() !== "" &&
      formData.verifyPassword.trim() !== "" &&
      !errors.phone &&
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
      // Step 1: Register user with Supabase
      const { data: supabaseData, error: supabaseError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            truck_name: formData.truckName,
            phone_number: formData.phone,
            first_name: formData.firstName,
            last_name: formData.lastName,
          },
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

      // Step 2: Register truck on backend
      // TODO: Eventually we'll require email validation which will make Supabase not return a session.
      try {
        const backendResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/User/RegisterTruck`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${supabaseData.session?.access_token}`,
            },
          }
        );

        if (backendResponse) {
          // Set auth state
          if (supabaseData.session && supabaseData.user) {
            setAuth(
              supabaseData.user,
              supabaseData.session.access_token,
              supabaseData.session.refresh_token
            );
          }

          // Redirect to home or dashboard
          router.push("/");
        }
      } catch (backendError) {
        if (axios.isAxiosError(backendError) && backendError.response) {
          setError(
            backendError.response.data?.title ||
              backendError.response.data?.detail ||
              "Failed to register truck."
          );
        } else {
          setError("Failed to register truck.");
        }
        setIsLoading(false);
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
