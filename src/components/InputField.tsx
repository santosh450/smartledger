import React from "react";

interface InputFieldProps {
  label: string;
  type: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  helpText?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  id,
  value,
  onChange,
  required = false,
  pattern,
  minLength,
  maxLength,
  helpText,
}) => {
  const helpId = helpText ? `${id}-help` : undefined;

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label d-block text-start">
        {label}
        {required && <span className="text-danger"> *</span>}
      </label>
      <input
        type={type}
        className="form-control"
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        pattern={pattern}
        minLength={minLength}
        maxLength={maxLength}
        aria-describedby={helpId}
      />
      {helpText && (
        <div id={helpId} className="form-text text-start">
          {helpText}
        </div>
      )}
    </div>
  );
};

export default InputField;
