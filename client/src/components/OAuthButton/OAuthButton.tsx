import { ButtonHTMLAttributes, memo, useState } from "react";
import { OAUTH_BUTTON_VARIANTS } from "./OAuthButtonVariants";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: keyof typeof OAUTH_BUTTON_VARIANTS;
  children: string;
}

const OAuthButton = memo(({ variant, children, ...buttonProps }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleButton = () => {
    setIsLoading(true);
    window.location.href = OAUTH_BUTTON_VARIANTS[variant].href;
  };

  return (
    <button
      type="button"
      {...buttonProps}
      className={`flex w-full items-center gap-2 px-[27px] py-[11px] shadow ${OAUTH_BUTTON_VARIANTS[variant].bg} ${OAUTH_BUTTON_VARIANTS[variant].text} justify-center rounded-lg font-semibold transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50`}
      onClick={handleButton}
      title={children}
      disabled={isLoading}
    >
      {
        <img
          src={OAUTH_BUTTON_VARIANTS[variant].icon}
          width={25}
          height={25}
          alt=""
          className="shrink-0"
        />
      }
      <span className={`${isLoading ? "w-auto" : "w-[155px]"} text-left max-[360px]:w-[70px]`}>
        {isLoading ? "Loading..." : children}
      </span>
    </button>
  );
});

export default OAuthButton;
