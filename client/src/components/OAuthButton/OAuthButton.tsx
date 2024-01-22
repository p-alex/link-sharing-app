import { ButtonHTMLAttributes, memo, useState } from "react";
import { OAUTH_BUTTON_VARIANTS } from "./OAuthButtonVariants";
import Button from "../Button";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: keyof typeof OAUTH_BUTTON_VARIANTS;
  title: string;
}

const OAuthButton = memo(({ variant, title }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleButton = () => {
    setIsLoading(true);
    window.location.href = OAUTH_BUTTON_VARIANTS[variant].href;
  };

  return (
    <Button
      onClick={handleButton}
      title={title}
      disabled={isLoading}
      variant="outline"
      className="w-full"
    >
      {OAUTH_BUTTON_VARIANTS[variant].icon}
    </Button>
  );
});

export default OAuthButton;
