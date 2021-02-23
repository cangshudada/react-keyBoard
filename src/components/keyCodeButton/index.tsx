import './keyCodeButton.less';
import classNames from 'classnames';
import BackIcon from '../../icons/back';
import CloseIcon from '../../icons/close';
import UpperIcon from '../../icons//upper';
import DeleteIcon from '../../icons/delete';
import { KeyBoardContext } from '../../index';
import HandWriteIcon from '../../icons/handwrite';
import React, { useState, useContext } from 'react';

export interface IProps {
  type: string;
  data: string;
  isCn?: boolean;
  isNum?: boolean;
  isUpper?: boolean;
  isSymbol?: boolean;
  click?: (parmas: Record<'data' | 'type', string>) => void;
}

const KeyCodeButton: React.FC<IProps> = props => {
  const [isHover, setHoverStatus] = useState(false);
  const { color } = useContext(KeyBoardContext);

  /**
   * @description 获取样式
   * @returns {React.CSSProperties}
   */
  function getStyle(): React.CSSProperties {
    if (
      (props.isUpper && props.type === 'upper') ||
      (props.isNum && props.type === 'change2num') ||
      (props.isSymbol && props.type === '#+=') ||
      isHover
    ) {
      return {
        color: '#f5f5f5',
        background: color,
      };
    } else {
      return {
        color: color,
        background: '#f5f5f5',
      };
    }
  }

  /**
   * @description 获取键码
   * @returns {Record<'__html', string>}
   */
  function getCode(): Record<'__html', string> {
    if (props.type === 'change2lang') {
      return {
        __html: props.isCn ? '<label>中</label>/EN' : '<label>EN</label>/中',
      };
    }
    return {
      __html: props.isUpper ? props.data.toUpperCase() : props.data,
    };
  }

  return (
    <button
      className={classNames(
        'key-board-button',
        `key-board-button-${props.type}`,
        {
          'key-board-button-active':
            (props.isUpper && props.type === 'upper') ||
            (props.isNum && props.type === 'change2num') ||
            (props.isSymbol && props.type === '#+='),
        }
      )}
      style={getStyle()}
      onClick={event => {
        // 阻止按钮默认行为
        event.preventDefault();
        // 传递当前点击的键
        props.click &&
          props.click({
            data: props.isUpper ? props.data.toUpperCase() : props.data,
            type: props.type,
          });
      }}
      onMouseEnter={() => {
        setHoverStatus(true);
      }}
      onMouseLeave={() => {
        setHoverStatus(false);
      }}
    >
      {props.type === 'back' ? (
        // 图标按键
        <BackIcon fill="none" stroke={color} />
      ) : props.type === 'close' ? (
        <CloseIcon fill="none" stroke={color} />
      ) : props.type === 'handwrite' ? (
        <HandWriteIcon fill="none" stroke={color} />
      ) : props.type === 'delete' ? (
        <DeleteIcon fill="none" stroke={color} />
      ) : props.type === 'upper' ? (
        <UpperIcon fill="none" stroke={color} />
      ) : (
        // 按键
        <span dangerouslySetInnerHTML={getCode()}></span>
      )}
    </button>
  );
};

export default KeyCodeButton;
