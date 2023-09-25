import React from "react";
import InputGroupContext from "./InputGroupContext";
import Input from "./Input";
import InputError from "./InputError";
import InputLabel from "./InputLabel";
import InputDescribe from "./InputDescribe";

interface Props {
  label: React.ReactNode;
  input: React.ReactNode;
  error: React.ReactNode;
  describe?: React.ReactNode;
}

const InputGroup = ({ label, input, error, describe }: Props) => {
  return (
    <InputGroupContext.Provider value={{ isError: error !== null }}>
      <div className="flex flex-col gap-1">
        {label}
        {input}
        {error}
        {describe}
      </div>
    </InputGroupContext.Provider>
  );
};

InputGroup.InputLabel = InputLabel;
InputGroup.Input = Input;
InputGroup.InputError = InputError;
InputGroup.InputDescribe = InputDescribe;

export default InputGroup;
