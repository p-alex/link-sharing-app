import { createContext, useContext } from "react";

const InputGroupContext = createContext<{ isError: boolean } | null>(null);

export const useInputGroupContext = () => {
  const context = useContext(InputGroupContext);
  if (!context) {
    throw new Error("InputGroup.* component must be rendered as child of InputGroup component.");
  }
  return context;
};

export default InputGroupContext;
