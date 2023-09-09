import { HTMLAttributes } from "react";
import { useInputGroupContext } from "./InputGroupContext";

interface Props extends HTMLAttributes<HTMLUListElement> {
  items: string[];
}

const InputDescribe = ({ items, ...ulProps }: Props) => {
  useInputGroupContext();
  return (
    <ul {...ulProps} className="flex flex-col gap-1 p-4 bg-lightGray rounded-lg">
      {items.map((item) => {
        return <li className=" text-xs">{item}</li>;
      })}
    </ul>
  );
};

export default InputDescribe;
