import { HtmlHTMLAttributes } from "react";
import { useInputGroupContext } from "./InputGroupContext";

interface Props extends HtmlHTMLAttributes<HTMLSpanElement> {
  children: string;
}

const InputError = ({ children, ...spanProps }: Props) => {
  useInputGroupContext();
  return (
    <span {...spanProps} className="text-xs leading-[18px] text-error">
      {children}
    </span>
  );
};

export default InputError;
