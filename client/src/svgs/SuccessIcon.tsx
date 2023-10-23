import React from "react";

interface Props extends React.SVGAttributes<SVGElement> {}

const SuccessIcon = ({ ...svgProps }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      width={"1rem"}
      height={"1rem"}
      {...svgProps}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
};

export default SuccessIcon;
