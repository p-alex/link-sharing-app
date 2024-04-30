import React from "react";
import InputGroupContext from "./InputGroupContext";
import Input from "./Input";
import InputError from "./InputError";
import InputLabel from "./InputLabel";
import SelectContainer from "./SelectContainer";
import { twMerge } from "tailwind-merge";

interface Props {
  label?: React.ReactNode;
  input: React.ReactNode;
  error: React.ReactNode;
  className?: string;
}

const InputGroup = ({ label, input, error, className }: Props) => {
  return (
    <InputGroupContext.Provider value={{ isError: error !== null }}>
      <div className={twMerge(["flex w-full flex-col gap-1", className])}>
        {label}
        {input}
        {error}
      </div>
    </InputGroupContext.Provider>
  );
};

InputGroup.InputLabel = InputLabel;
InputGroup.Input = Input;
InputGroup.InputError = InputError;
InputGroup.SelectContainer = SelectContainer;

export default InputGroup;
