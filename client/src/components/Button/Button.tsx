import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantOptions;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const variantOptions = {
  fill: "bg-primary text-white",
  outline: "bg-transparent hover:bg-lightPurple text-primary",
};

const Button = ({ variant = "fill", icon, children, ...buttonProps }: Props) => {
  return (
    <button
      {...buttonProps}
      className={`flex items-center justify-center gap-2 border border-primary px-[27px] py-[11px] ${variantOptions[variant]} rounded-lg font-semibold shadow transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50`}
    >
      {icon} {children}
    </button>
  );
};

export default Button;
