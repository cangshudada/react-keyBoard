import * as React from 'react';

function SvgDrag(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="29.526"
      viewBox="0 0 28 29.526"
      {...props}
    >
      <g id="drag" transform="translate(-1623.5 -915.5)">
        <line
          y2="22.015"
          transform="translate(1637.049 919.566)"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="3"
        />
        <line
          x1="22.015"
          transform="translate(1626.041 930.574)"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="3"
        />
        <path
          d="M728.456,559.625l3.888-3.887,3.885,3.885"
          transform="translate(904.603 361.262)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        />
        <path
          d="M736.229,568.465l-3.888,3.888-3.885-3.885"
          transform="translate(904.603 371.172)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        />
        <path
          d="M735.8,561.184l3.888,3.888-3.885,3.885"
          transform="translate(910.317 365.503)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        />
        <path
          d="M727.813,568.957l-3.888-3.888,3.885-3.885"
          transform="translate(901.075 365.503)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        />
      </g>
    </svg>
  );
}

export default SvgDrag;
