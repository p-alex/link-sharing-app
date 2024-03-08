import React, { useRef, useState } from "react";
import { IMultiStepModalContext, MultiStepModalContext } from "./useMultiStepModalContext";
import { CloseIcon } from "../../svgs";
import FocusTrapRedirectFocus from "../focusTrap";

interface Props {
  name: string;
  handleCloseModal: () => void;
  steps: (context: IMultiStepModalContext) => React.ReactNode[];
}

export interface IMultiStepModalProps {
  handleCloseModal: () => void;
}

export type ModalStepsListType = ({
  context,
}: {
  context: IMultiStepModalContext;
}) => React.ReactNode;

const MultiStepModal = ({ name, handleCloseModal, steps }: Props) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const handleNextStep = () => setCurrentStepIndex((prevState) => prevState + 1);

  const firstFocusableElementRef = useRef<HTMLButtonElement>(null);
  const lastFocusableElementRef = useRef<HTMLButtonElement>(null);

  const context = {
    currentStepIndex,
    handleNextStep,
    firstFocusableElementRef,
    lastFocusableElementRef,
  };

  const currentStep = steps(context)[currentStepIndex];

  return (
    <MultiStepModalContext.Provider value={context}>
      <FocusTrapRedirectFocus element={lastFocusableElementRef} />
      <div
        role="dialog"
        className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center"
      >
        <div
          className="fixed left-0 top-0 z-40 flex h-full w-full bg-[rgba(0,0,0,0.75)]"
          onClick={handleCloseModal}
        ></div>
        <div className="z-50 w-full max-w-[400px] overflow-hidden rounded-lg bg-white">
          <header className="flex w-full justify-end px-6 pt-6">
            <button
              onClick={handleCloseModal}
              className="h-6 w-6"
              ref={firstFocusableElementRef}
              aria-label={`close ${name} modal`}
            >
              <CloseIcon width={20} height={20} />
            </button>
          </header>
          <div className="w-full p-6">{currentStep}</div>
        </div>
      </div>

      <FocusTrapRedirectFocus element={firstFocusableElementRef} />
    </MultiStepModalContext.Provider>
  );
};

export default MultiStepModal;
