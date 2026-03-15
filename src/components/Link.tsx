import React from "react";
import { Link } from "react-router-dom";

interface LinkProps {
  text: string;
  to: string;
  className?: string;
}

const CustomLink: React.FC<LinkProps> = ({ text, to, className = "" }) => {
  return (
    <Link to={to} className={`text-decoration-none ${className}`}>
      {text}
    </Link>
  );
};

export default CustomLink;
