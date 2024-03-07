import { ButtonHTMLAttributes, LegacyRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantOptions;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const variantOptions = {
  fill: "bg-primary text-white",
  outline: "bg-transparent hover:bg-lightPurple text-primary",
  error: "bg-error hover:opacity-80 text-white border-none",
};

const Button = forwardRef(
  (
    { variant = "fill", icon, children, ...buttonProps }: Props,
    ref: LegacyRef<HTMLButtonElement>,
  ) => {
    return (
      <button
        {...buttonProps}
        className={twMerge(
          `flex items-center justify-center gap-2 border border-primary px-[27px] py-[11px] ${variantOptions[variant]} min-h-[46px] rounded-lg font-semibold shadow transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50`,
          buttonProps.className,
        )}
        ref={ref}
      >
        {icon} {children}
      </button>
    );
  },
);

export default Button;
