import { Link } from "react-router-dom";
import type { LinkProps } from "react-router-dom";

type CustomLinkProps = {
  text?: string;
  className?: string;
  children?: React.ReactNode;
} & LinkProps;

export default function CustomLink({
  text,
  className = "",
  children,
  ...props
}: CustomLinkProps) {
  return (
    <Link className={`text-decoration-none ${className}`} {...props}>
      {children ?? text}
    </Link>
  );
}
