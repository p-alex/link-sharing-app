import { ButtonHTMLAttributes } from "react";
import useOAuthListContext from "../OAuthList/useOAuthListContext";
import { OAUTH_BUTTON_VARIANTS } from "./OAuthButtonVariants";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: keyof typeof OAUTH_BUTTON_VARIANTS;
}

const AuthProviderButton = ({ variant, ...buttonProps }: Props) => {
  const { setIsLoading } = useOAuthListContext();

  const handleButton = () => {
    setIsLoading(true);
    window.location.href = OAUTH_BUTTON_VARIANTS[variant].href;
  };

  return (
    <button
      {...buttonProps}
      className={`flex w-full items-center gap-2 px-[27px] py-[11px] ${OAUTH_BUTTON_VARIANTS[variant].bg} ${OAUTH_BUTTON_VARIANTS[variant].text} justify-center rounded-lg font-semibold transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50`}
      onClick={handleButton}
      title={`log in with ${variant}`}
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
      <span className="w-[155px] text-left max-[360px]:w-[70px]">
        <span className="max-[360px]:hidden">Log in with </span>
        {variant.charAt(0).toUpperCase() + variant.slice(1, variant.length)}
      </span>
    </button>
  );
};

export default AuthProviderButton;
