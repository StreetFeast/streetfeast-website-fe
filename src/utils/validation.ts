export const validatePassword = (password: string): string => {
  if (password.length < 10) {
    return "Password must be at least 10 characters long";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter";
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return "Password must contain at least one special character";
  }
  if (!/\d/.test(password)) {
    return "Password must contain at least one number";
  }
  return "";
};
