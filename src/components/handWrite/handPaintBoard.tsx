import { getWordFromHandWrite } from '../../serve';
import useEventEmitter from '../../hooks/useEventEmitter';
import { KeyBoardContext } from '../../context/keyboardContext';
import React, { memo, useRef, useState, useEffect, useContext } from 'react';
export interface IProps {
  lib: 'CN' | 'EN';
}

// canvas上下文
let ctx: CanvasRenderingContext2D | null | undefined;
// 是否按下
let isMouseDown = false,
  x: number = 0, // 当前canvas相距左上角x
  y: number = 0, // 当前canvas相距左上角y
  oldX: number = 0, // 当前canvas相距左上角x
  oldY: number = 0, // 当前canvas相距左上角y
  clickX: number[] = [], // 轨迹X
  clickY: number[] = [], // 轨迹Y
  clickC: number[] = []; // 轨迹标志位，为1则是终点
// 定时器id
let timer: NodeJS.Timeout | undefined = undefined;

const HandBoard: React.FC<IProps> = memo(props => {
  // canvas dom
  const canvas: React.RefObject<HTMLCanvasElement> = useRef(null);
  const [width, setWidth] = useState(500); // 宽
  const [height, setHeight] = useState(500); // 高
  const { color, transitionTime } = useContext(KeyBoardContext);

  useEffect(() => {
    ctx = canvas.current?.getContext('2d');
    paintBoardInit();
    useEventEmitter.on('updateBound', () => {
      updateBound();
    });

    return () => {
      window.removeEventListener('transitionend', updateBound);
      window.removeEventListener('animationend', updateBound);
      window.removeEventListener('resize', updateBound);
      window.removeEventListener('scroll', updateBound);
      useEventEmitter.remove('updateBound');
    };
  }, []);

  /**
   * @description 面板初始化
   */
  function paintBoardInit() {
    reload();
    // 此处兼容CSSTransition动画过程之前计算
    setTimeout(() => {
      updateBound();
    }, transitionTime);
    window.addEventListener('transitionend', updateBound);
    window.addEventListener('animationend', updateBound);
    window.addEventListener('resize', updateBound);
    window.addEventListener('scroll', updateBound);
  }

  /**
   * @description 更新尺寸以及位置
   */
  function updateBound() {
    if (!document.querySelector('.paint-board')) return;
    const bound = document
      .querySelector('.paint-board')
      ?.getBoundingClientRect();
    // 设置距离左上角坐标
    if (bound) {
      x = bound.x;
      y = bound.y;
    }
    // 设置距离宽高
    setWidth(
      parseFloat(
        window.getComputedStyle(
          document.querySelector('.paint-board') as Element
        ).width
      )
    );
    setHeight(
      parseFloat(
        window.getComputedStyle(
          document.querySelector('.paint-board') as Element
        ).height
      )
    );
  }

  /**
   * @description canvas重置
   */
  function reload() {
    if (!canvas || !ctx) return;
    clickX = [];
    clickY = [];
    clickC = [];
    ctx.clearRect(0, 0, width, height);
  }

  /**
   * @description 获取x坐标
   * @param {(React.TouchEvent<HTMLCanvasElement>
   *       | React.MouseEvent<HTMLCanvasElement, MouseEvent>)} event
   */
  function getCx(
    event:
      | React.TouchEvent<HTMLCanvasElement>
      | React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ): number {
    // mouse事件
    if (event.type.includes('mouse')) {
      const _event = event as React.MouseEvent<HTMLCanvasElement, MouseEvent>;
      return Math.floor(_event.clientX - x);
    } else if (event.type.includes('touch')) {
      // touch事件
      const _event = event as React.TouchEvent<HTMLCanvasElement>;
      return Math.floor(_event.targetTouches[0].clientX - x);
    }
    return 0;
  }

  /**
   * @description 获取y坐标
   * @param {(React.TouchEvent<HTMLCanvasElement>
   *       | React.MouseEvent<HTMLCanvasElement, MouseEvent>)} event
   */
  function getCy(
    event:
      | React.TouchEvent<HTMLCanvasElement>
      | React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ): number {
    // mouse事件
    if (event.type.includes('mouse')) {
      const _event = event as React.MouseEvent<HTMLCanvasElement, MouseEvent>;
      return Math.floor(_event.clientY - y);
    } else if (event.type.includes('touch')) {
      // touch事件
      const _event = event as React.TouchEvent<HTMLCanvasElement>;
      return Math.floor(_event.targetTouches[0].clientY - y);
    }
    return 0;
  }

  /**
   * @description 鼠标按下
   * @param {(React.TouchEvent<HTMLCanvasElement>
   *       | React.MouseEvent<HTMLCanvasElement, MouseEvent>)} event
   */
  function down(
    event:
      | React.TouchEvent<HTMLCanvasElement>
      | React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) {
    if (!ctx) return;
    isMouseDown = true;
    const cx = getCx(event);
    const cy = getCy(event);
    timer && clearTimeout(timer);
    oldX = cx;
    oldY = cy;
    ctx.beginPath();
  }

  /**
   * @description 鼠标移动
   * @param {(React.TouchEvent<HTMLCanvasElement>
   *       | React.MouseEvent<HTMLCanvasElement, MouseEvent>)} event
   */
  function move(
    event:
      | React.TouchEvent<HTMLCanvasElement>
      | React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) {
    if (!ctx) return;

    // mouse事件 阻止默认事件 touch事件不需要 详见https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener
    if (event.type.includes('mouse')) {
      event.preventDefault();
    }

    if (isMouseDown) {
      const cx = getCx(event);
      const cy = getCy(event);
      clickX.push(cx);
      clickY.push(cy);
      clickC.push(0);
      //画图
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.moveTo(oldX, oldY);
      ctx.lineTo(cx, cy);
      ctx.stroke();
      oldX = cx;
      oldY = cy;
    }
  }

  /**
   * @description 鼠标松开
   */
  function mouseup() {
    if (isMouseDown) {
      isMouseDown = false;
      timer = setTimeout(() => {
        reload();
      }, 1500);
      //标记最后一点为终点
      clickC.pop();
      clickC.push(1);
      getWords();
    }
  }

  /**
   * @description 获取文字
   */
  async function getWords() {
    const { data } = await getWordFromHandWrite(
      clickX,
      clickY,
      clickC,
      props.lib
    );

    useEventEmitter.emit('getWordsFromServer', data?.v || '');
  }

  return (
    <div className="paint-board">
      <canvas
        ref={canvas}
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
});

export default HandBoard;
