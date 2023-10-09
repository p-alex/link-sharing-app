import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "fill" | "outline";
  children: string;
}

const Button = ({ variant = "fill", children, ...buttonProps }: Props) => {
  const btnBg = variant === "fill" ? "bg-primary" : "bg-transparent";
  return (
    <button
      {...buttonProps}
      className={`px-[27px] py-[11px] ${btnBg} rounded-lg font-semibold text-white shadow transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50`}
    >
      {children}
    </button>
  );
};

export default Button;
