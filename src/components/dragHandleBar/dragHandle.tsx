import DragIcon from '../../Icons/Drag';
import React, { useEffect } from 'react';
import { handleDragEvent } from '../../utils/drag';

export interface IProps {
  color?: string;
  dargHandleText?: string;
}

const DragHandle: React.FC<IProps> = props => {
  useEffect(() => {
    // 执行拖拽事件
    if (document.querySelector('.key-board-drag-handle')) {
      const dragHandle = document.querySelector(
        '.key-board-drag-handle'
      ) as HTMLElement;
      // 注册拖拽
      handleDragEvent(dragHandle);
    }
  }, []);

  return (
    <div
      className="key-board-drag-handle"
      style={{
        color: props.color,
      }}
    >
      <span>{props.dargHandleText}</span>
      <DragIcon fill="none" stroke={props.color} />
    </div>
  );
};

export default DragHandle;
