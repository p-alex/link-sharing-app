import OAuthButton from "../OAuthButton/OAuthButton";
import useOAuthListContext from "./useOAuthListContext";

const OAuthList = () => {
  const { isLoading } = useOAuthListContext();
  return (
    <ul className="flex w-full flex-col gap-2">
      <li className="w-full">
        <OAuthButton variant="google" disabled={isLoading} />
      </li>
      <li className="w-full">
        <OAuthButton variant="discord" disabled={isLoading} />
      </li>
      <li className="w-full">
        <OAuthButton variant="linkedin" disabled={isLoading} />
      </li>
      <li className="w-full">
        <OAuthButton variant="github" disabled={isLoading} />
      </li>
    </ul>
  );
};

export default OAuthList;
