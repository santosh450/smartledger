import React from "react";

interface SubmitProps {
  text?: string;
  disabled?: boolean;
  className?: string;
}

const Submit: React.FC<SubmitProps> = ({
  text = "Submit",
  disabled = false,
  className = "btn btn-primary w-100",
}) => {
  return (
    <button type="submit" className={className} disabled={disabled}>
      {text}
    </button>
  );
};

export default Submit;
