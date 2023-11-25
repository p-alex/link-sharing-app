import React from "react";

interface Props extends React.SVGAttributes<SVGElement> {}

const GrabIcon = ({ ...svgProps }: Props) => {
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
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
    </svg>
  );
};

export default GrabIcon;
