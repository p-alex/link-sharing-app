import React from "react";
import { IMultiStepModalContext, useMultiStepModalContext } from "../useMultiStepModalContext";

export interface IModalStepProps {
  onSuccess: Function;
}

const ModalStep = ({
  title,
  description,
  render,
}: {
  title: string;
  description: string;
  render: (context: IMultiStepModalContext) => React.ReactNode;
}) => {
  const context = useMultiStepModalContext();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div>{render(context)}</div>
    </div>
  );
};

export default ModalStep;
