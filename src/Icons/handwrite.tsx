import * as React from 'react';

function SvgHandwrite(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24.784}
      height={33.44}
      viewBox="0 0 24.784 33.44"
      {...props}
    >
      <g transform="translate(-783.997 -761.616)">
        <rect
          width={7.324}
          height={23.712}
          rx={1.136}
          transform="rotate(33.07 -892.505 1727.373)"
        />
        <rect
          width={7.324}
          height={4.946}
          rx={1.136}
          transform="rotate(33.07 -884.183 1729.853)"
        />
        <path d="M785.413 788.854l-.407 3.922a1.136 1.136 0 001.693 1.1l3.425-1.953a1.137 1.137 0 00.057-1.939l-3.017-1.968a1.137 1.137 0 00-1.751.838z" />
      </g>
    </svg>
  );
}

export default SvgHandwrite;
