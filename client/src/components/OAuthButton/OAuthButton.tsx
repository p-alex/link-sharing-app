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
      className={`w-full py-[11px] px-[27px] flex gap-2 items-center ${OAUTH_BUTTON_VARIANTS[variant].bg} ${OAUTH_BUTTON_VARIANTS[variant].text} font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:cursor-not-allowed disabled:opacity-50 justify-center`}
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
      <span className="max-[360px]:w-[70px] w-[155px] text-left">
        <span className="max-[360px]:hidden">Log in with </span>
        {variant.charAt(0).toUpperCase() + variant.slice(1, variant.length)}
      </span>
    </button>
  );
};

export default AuthProviderButton;
