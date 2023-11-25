interface Props extends React.SVGAttributes<SVGElement> {}

const ChevronDownIcon = ({ ...svgProps }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      width={"1rem"}
      height={"1rem"}
      {...svgProps}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
};

export default ChevronDownIcon;
