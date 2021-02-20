import * as React from 'react';

function SvgClose(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 35.93" {...props}>
      <defs>
        <style>
          {
            '.cls-2,.cls-3,.cls-4{stroke-width:2px;}.cls-3,.cls-4{stroke-linecap:round;}.cls-3{stroke-dasharray:3 4;}.cls-5,.cls-6{stroke-miterlimit:10;}.cls-5{stroke-width:2.2px;}.cls-6{stroke-width:3.39px;}'
          }
        </style>
      </defs>
      <g>
        <g>
          <g>
            <g>
              <rect className="cls-1" width="50" height="27" rx="5" />
              <rect
                className="cls-2"
                x="1"
                y="1"
                width="48"
                height="25"
                rx="4"
              />
            </g>
            <g>
              <path className="cls-3" d="M9.5,8H40.18" />
              <path className="cls-3" d="M9.5,13.5H40.18" />
              <path className="cls-3" d="M9.5,19h3.17" />
              <path className="cls-4" d="M16.5,19h17" />
              <path className="cls-3" d="M37.5,19h2.68" />
            </g>
          </g>
          <path
            className="cls-5"
            d="M25.18,34.82l5.32-4.25a.07.07,0,0,0,0-.12H19.83a.07.07,0,0,0,0,.12l5.31,4.25A.06.06,0,0,0,25.18,34.82Z"
          />
          <circle className="cls-6" cx="25.14" cy="32.58" r="1" />
        </g>
      </g>
    </svg>
  );
}

export default SvgClose;
