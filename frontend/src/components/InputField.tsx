import { useId, type InputHTMLAttributes } from "react";

type InputFieldProps = {
  label: string;
  helpText?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function InputField({
  label,
  helpText,
  id,
  required,
  className = "",
  ...props
}: InputFieldProps) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const helpId = helpText ? `${inputId}-help` : undefined;

  return (
    <div className="mb-3">
      <label htmlFor={inputId} className="form-label d-block text-start">
        {label}
        {required && <span className="text-danger"> *</span>}
      </label>

      <input
        id={inputId}
        className={`form-control ${className}`}
        aria-describedby={helpId}
        required={required}
        {...props}
      />

      {helpText && (
        <div id={helpId} className="form-text text-start">
          {helpText}
        </div>
      )}
    </div>
  );
}
