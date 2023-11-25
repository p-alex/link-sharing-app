import React from "react";
import InputGroupContext from "./InputGroupContext";
import Input from "./Input";
import InputError from "./InputError";
import InputLabel from "./InputLabel";
import SelectContainer from "./SelectContainer";

interface Props {
  label?: React.ReactNode;
  input: React.ReactNode;
  error: React.ReactNode;
}

const InputGroup = ({ label, input, error }: Props) => {
  return (
    <InputGroupContext.Provider value={{ isError: error !== null }}>
      <div className="flex flex-col gap-1">
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
