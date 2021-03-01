import React, { useRef, useState, useEffect } from 'react';

export interface IProps {
  lib: 'CN' | 'EN';
}

const HandBoard: React.FC<IProps> = props => {
  const paintRef: React.RefObject<HTMLCanvasElement> = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  /**
   * @description 鼠标按下
   * @param {(React.TouchEvent<HTMLCanvasElement>
   *       | React.MouseEvent<HTMLCanvasElement, MouseEvent>)} event
   */
  function down(
    event:
      | React.TouchEvent<HTMLCanvasElement>
      | React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) {}

  /**
   * @description 鼠标移动
   * @param {(React.TouchEvent<HTMLCanvasElement>
   *       | React.MouseEvent<HTMLCanvasElement, MouseEvent>)} event
   */
  function move(
    event:
      | React.TouchEvent<HTMLCanvasElement>
      | React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) {}

  /**
   * @description 鼠标松开
   */
  function mouseup() {}

  return (
    <div className="paint-board">
      <canvas
        ref={paintRef}
        width={width}
        height={height}
        onTouchStart={down}
        onTouchMove={move}
        onTouchEnd={mouseup}
        onMouseDown={down}
        onMouseMove={move}
        onMouseUp={mouseup}
        onMouseLeave={mouseup}
      ></canvas>
    </div>
  );
};

export default HandBoard;
