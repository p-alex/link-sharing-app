import React from "react";

interface Props extends React.SVGAttributes<SVGElement> {}

const TwitterIcon = ({ ...svgProps }: Props) => {
  return (
    <svg
      width="1rem"
      height="1rem"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      <path
        d="M18.7165 5.00016C18.0749 5.29183 17.3832 5.4835 16.6665 5.57516C17.3999 5.1335 17.9665 4.4335 18.2332 3.59183C17.5415 4.0085 16.7749 4.30016 15.9665 4.46683C15.3082 3.75016 14.3832 3.3335 13.3332 3.3335C11.3749 3.3335 9.77487 4.9335 9.77487 6.9085C9.77487 7.19183 9.8082 7.46683 9.86654 7.72516C6.89987 7.57516 4.2582 6.15016 2.49987 3.99183C2.19154 4.51683 2.01654 5.1335 2.01654 5.7835C2.01654 7.02516 2.64154 8.12516 3.6082 8.75016C3.01654 8.75016 2.46654 8.5835 1.9832 8.3335V8.3585C1.9832 10.0918 3.21654 11.5418 4.84987 11.8668C4.32548 12.0103 3.77495 12.0303 3.24154 11.9252C3.46788 12.6356 3.91115 13.2572 4.50905 13.7026C5.10695 14.148 5.82941 14.3949 6.57487 14.4085C5.31123 15.4089 3.74487 15.9496 2.1332 15.9418C1.84987 15.9418 1.56654 15.9252 1.2832 15.8918C2.86654 16.9085 4.74987 17.5002 6.76654 17.5002C13.3332 17.5002 16.9415 12.0502 16.9415 7.32516C16.9415 7.16683 16.9415 7.01683 16.9332 6.8585C17.6332 6.3585 18.2332 5.72516 18.7165 5.00016Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default TwitterIcon;
