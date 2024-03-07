import { createContext, useContext } from "react";

export interface IMultiStepModalContext {
  currentStepIndex: number;
  handleNextStep: () => void;
  firstFocusableElementRef: React.RefObject<HTMLButtonElement>;
  lastFocusableElementRef: React.RefObject<HTMLButtonElement>;
}

export const MultiStepModalContext = createContext<IMultiStepModalContext | null>(null);

export const useMultiStepModalContext = () => {
  const context = useContext(MultiStepModalContext);
  if (!context) {
    throw new Error(
      "MultiModalStep.* component must be rendered as child of MultiModalStep component.",
    );
  }
  return context;
};
