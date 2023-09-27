import { HtmlHTMLAttributes } from "react";

interface Props extends HtmlHTMLAttributes<HTMLSpanElement> {
  children: string;
}

const InputError = ({ children, ...spanProps }: Props) => {
  return (
    <span {...spanProps} className="text-error text-xs leading-[18px]">
      {children}
    </span>
  );
};

export default InputError;
