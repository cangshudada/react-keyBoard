import * as React from 'react';

function SvgBack(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58.6 35.1" {...props}>
      <defs>
        <style>
          {
            '.st0{stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;}.st1{stroke-width:2.1499;stroke-miterlimit:10;}.st2{stroke-width:3.2571;stroke-miterlimit:10;}'
          }
        </style>
      </defs>
      <g>
        <path
          className="st0"
          d="M8.4,8.8h37.1c6.7,0,12.2,5.4,12.2,12.2l0,0c0,7.2-5.8,13.1-13.1,13.1c0,0,0,0,0,0h-24"
        />
        <g>
          <path
            className="st1"
            d="M3,9.1l8.6,6.9c0.1,0.1,0.3,0,0.3-0.1V2c0-0.2-0.2-0.2-0.3-0.1L3,8.8C2.9,8.9,2.9,9,3,9.1z"
          />
          <path
            className="st2"
            d="M10.4,4.8c0,0-5.4,4.1-5.4,4s5.6,3.8,5.6,3.8L10.4,4.8z"
          />
        </g>
      </g>
    </svg>
  );
}

export default SvgBack;
