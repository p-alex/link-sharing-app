import { HTMLAttributes } from "react";
import { useInputGroupContext } from "./InputGroupContext";

interface Props extends HTMLAttributes<HTMLUListElement> {
  items: string[];
}

const InputDescribe = ({ items, ...ulProps }: Props) => {
  useInputGroupContext();
  return (
    <ul {...ulProps} className="bg-lightGray flex flex-col gap-1 rounded-lg p-4">
      {items.map((item) => {
        return <li className=" text-xs">{item}</li>;
      })}
    </ul>
  );
};

export default InputDescribe;
