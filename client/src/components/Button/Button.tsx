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
      className={`py-[11px] px-[27px] ${btnBg} text-white font-semibold rounded-lg hover:bg-primaryHover transition-colors disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
};

export default Button;
