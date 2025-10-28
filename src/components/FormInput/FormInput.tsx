import styles from "./FormInput.module.css";

interface FormInputProps {
  label: string;
  type: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  autoComplete?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  id,
  name,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  disabled = false,
  className = "",
  autoComplete,
}) => {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`${styles.input} ${error ? styles.inputError : ""} ${className}`}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};
