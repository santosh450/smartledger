import React from "react";

interface CardProps {
  name: string;
  amount: string | number;
  backgroundColor?: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  name,
  amount,
  backgroundColor = "#f8f9fa",
  className = "",
}) => {
  return (
    <div
      className={`p-3 rounded ${className}`.trim()}
      style={{
        backgroundColor,
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.12)",
      }}
    >
      <h5 className="mb-2">{name}</h5>
      <p className="mb-0 fw-semibold">Amount: {amount}</p>
    </div>
  );
};

export default Card;
