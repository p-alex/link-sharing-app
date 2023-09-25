import AuthProviderButton from "../OAuthButton";
import useOAuthListContext from "./useOAuthListContext";

const AuthProviderList = () => {
  const { isLoading } = useOAuthListContext();
  return (
    <ul className="w-full flex flex-col gap-2">
      <li className="w-full">
        <AuthProviderButton variant="google" disabled={isLoading} />
      </li>
      <li className="w-full">
        <AuthProviderButton variant="discord" disabled={isLoading} />
      </li>
      <li className="w-full">
        <AuthProviderButton variant="linkedin" disabled={isLoading} />
      </li>
      <li className="w-full">
        <AuthProviderButton variant="github" disabled={isLoading} />
      </li>
    </ul>
  );
};

export default AuthProviderList;
