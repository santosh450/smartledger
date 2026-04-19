import type { HTMLAttributes } from "react";

type CardProps = {
  name: string;
  amount: string | number;
  backgroundColor?: string;
  children?: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export default function Card({
  name,
  amount,
  backgroundColor = "#f8f9fa",
  className = "",
  children,
  style,
  ...props
}: CardProps) {
  return (
    <div
      className={`p-3 rounded ${className}`.trim()}
      style={{
        backgroundColor,
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.12)",
        ...style,
      }}
      {...props}
    >
      <h5 className="mb-2 fw-bold">{name}</h5>
      <p className="mb-0 fw-semibold">Amount: {amount}</p>

      {children}
    </div>
  );
}
