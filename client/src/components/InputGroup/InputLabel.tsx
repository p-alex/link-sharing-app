import { LabelHTMLAttributes } from "react";
import { useInputGroupContext } from "./InputGroupContext";

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  children: string;
}

const InputLabel = ({ children, ...labelProps }: Props) => {
  useInputGroupContext();
  return (
    <label {...labelProps} className="text-xs leading-[18px] text-darkGray">
      {children}
    </label>
  );
};

export default InputLabel;
