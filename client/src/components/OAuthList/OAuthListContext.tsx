import { createContext, useState } from "react";

interface IOAuthListContext {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const OAuthListContext = createContext<IOAuthListContext>({
  isLoading: false,
  setIsLoading: () => {},
});

const OAuthListProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <OAuthListContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </OAuthListContext.Provider>
  );
};

export default OAuthListProvider;
