import { twMerge } from "tailwind-merge";
import ErrorIcon from "../../svgs/ErrorIcon";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  message: string;
}

const Error = ({ message, ...divProps }: Props) => {
  return (
    <div
      {...divProps}
      className={twMerge("text-red flex w-max items-center gap-2", divProps.className)}
    >
      <ErrorIcon className="shrink-0 text-error" />
      <p className="text-error">{message}</p>
    </div>
  );
};

export default Error;
