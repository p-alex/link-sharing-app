import { useContext } from "react";
import { OAuthListContext } from "./OAuthListContext";

const useOAuthListContext = () => {
  const oauthListContext = useContext(OAuthListContext);
  return oauthListContext;
};

export default useOAuthListContext;
