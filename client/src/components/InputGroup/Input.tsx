import { InputHTMLAttributes, forwardRef, LegacyRef } from "react";
import { useInputGroupContext } from "./InputGroupContext";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
}

const Input = forwardRef(({ icon, ...inputProps }: Props, ref: LegacyRef<HTMLInputElement>) => {
  const { isError } = useInputGroupContext();
  return (
    <div className="flex flex-col gap-1 relative w-full group">
      <div
        className={`flex items-center p-4 gap-[12px] h-[48px] w-full rounded-lg bg-white border transition-shadow group-focus-within:shadow-inputFocus ${
          isError ? "border-error" : "border-gray"
        } group-focus-within:border-purple`}
      >
        {icon && icon}
        <input
          {...inputProps}
          className="outline-none w-full"
          aria-invalid={isError ? "true" : "false"}
          ref={ref}
        />
      </div>
    </div>
  );
});

export default Input;
