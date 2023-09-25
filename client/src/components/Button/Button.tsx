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
      className={`py-[11px] px-[27px] ${btnBg} text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:cursor-not-allowed disabled:opacity-50`}
    >
      {children}
    </button>
  );
};

export default Button;
