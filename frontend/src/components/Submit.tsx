import type { ButtonHTMLAttributes } from "react";

type SubmitProps = {
  text?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Submit({
  text = "Submit",
  className = "btn btn-primary w-100",
  type = "submit",
  ...props
}: SubmitProps) {
  return (
    <button type={type} className={className} {...props}>
      {text}
    </button>
  );
}
