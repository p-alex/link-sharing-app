import { InputHTMLAttributes, forwardRef, LegacyRef } from "react";
import { useInputGroupContext } from "./InputGroupContext";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
}

const Input = forwardRef(({ icon, ...inputProps }: Props, ref: LegacyRef<HTMLInputElement>) => {
  const { isError } = useInputGroupContext();
  return (
    <div className="group relative flex w-full flex-col gap-1">
      <div
        className={`flex h-[48px] w-full items-center gap-[12px] rounded-lg border bg-white p-4 transition-shadow group-focus-within:shadow-inputFocus ${
          isError ? "border-error" : "border-grey"
        } group-focus-within:border-purple`}
      >
        {icon && icon}
        <input
          {...inputProps}
          className="w-full outline-none"
          aria-invalid={isError ? "true" : "false"}
          ref={ref}
        />
      </div>
    </div>
  );
});

export default Input;
