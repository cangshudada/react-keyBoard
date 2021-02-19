import './libs/flexible.js';
import React, { useState, useEffect } from 'react';
import './assets/css/_BASE_.less';
import classNames from 'classnames';
import { axiosConfig } from './helper/axiosConfig';
import { CSSTransition } from 'react-transition-group';

export interface IOptions {
  /** Binding value */
  value?: string | number;
  /** theme color - support rgb or hex - default("#eaa050") */
  color?: string;
  /** mode list - support symbol or handwrite keyboard - default(["handwrite", "symbol"]) */
  modeList?: ('handwrite' | 'symbol')[];
  /** is blur status hide - default(true) */
  blurHide?: boolean;
  /** Whether to show the drag handle - default(true)  */
  showHandleBar?: boolean;
  /** handwrite interface */
  handApi?: string;
  /** transition className */
  animateClass?: string;
  /** darg Handle text */
  dargHandleText?: string;
  /** modal exist status */
  modal?: boolean;
  /** modal can hide when click modal */
  closeOnClickModal?: boolean;
  /** key change */
  keyChange?: (value: string) => void;
  /** value change */
  change?: (value: string) => void;
  /** keyboard close hook */
  closed?: () => void;
  /** keyboard modal click hook */
  modalClick?: () => void;
}

// 注册键盘绑定的input列表
let inputList: HTMLInputElement[] = [];
// 当前触发的input
let currentInput: HTMLInputElement | null = null;

const KeyBoard: React.FC<IOptions> = (options: IOptions) => {
  // 键盘显隐控制
  const [keyBoardVisible, setKeyBoardVisible] = useState<boolean>(false);
  // 键盘展示模式
  const [keyBoardShowMode, setKeyBoardShowMode] = useState<string>('default');
  // 中文模式下显示字符
  const [resultVal, setResultVal] = useState<{
    code?: string;
    value?: string;
  }>({});

  // 键盘组件初始化准备
  useEffect(() => {
    // 注册键盘
    signUpKeyboard();
  }, []);

  /**
   * @description 注册键盘
   */
  function signUpKeyboard() {
    // 设置baseUrl
    options.handApi && axiosConfig(options.handApi);
    // 给键盘绑定相应input
    document.querySelectorAll('input').forEach(input => {
      // 存在data-mode属性的可以注册为键盘input
      if (input.getAttribute('data-mode') !== null) {
        inputList.push(input);
        input.addEventListener('focus', showKeyBoard);
        options.blurHide && input.addEventListener('blur', hideKeyBoard);
      }
    });
  }

  /**
   * @description 显示键盘
   */
  function showKeyBoard(event: FocusEvent) {
    setKeyBoardVisible(true);
    currentInput = event.target as HTMLInputElement | null;
  }

  /**
   * @description 关闭键盘
   */
  function hideKeyBoard() {
    // 输入框触发blur
    currentInput && currentInput.blur();
    currentInput = null;
    setKeyBoardVisible(false);

    // 如果存在关闭钩子函数则触发
    if (options.closed) {
      options.closed();
    }

    // 重置显示mode
    setKeyBoardShowMode('default');

    // 重置中文模式下显示字符
    setResultVal({});

    // 隐藏遮罩层
    if (document.querySelector('.key-board-modal')) {
      const keyBoardModal = document.querySelector(
        '.key-board-modal'
      ) as HTMLElement;
      keyBoardModal.style.display = 'none';
    }
  }

  return (
    <CSSTransition
      in={keyBoardVisible}
      classNames={classNames('move-bottom-to-top' || options.animateClass)}
      timeout={300}
      unmountOnExit
    >
      <div
        className="key-board"
        onMouseDown={event => {
          event.preventDefault();
        }}
      >
        <div className="key-board-container">
          <div className="key-board-area"></div>
        </div>
      </div>
    </CSSTransition>
  );
};

// Specifies the default values for props:
KeyBoard.defaultProps = {
  color: "#eaa050",
  modeList: ["handwrite", "symbol"],
  blurHide: true,
  showHandleBar: true,
  closeOnClickModal: true
};

export default KeyBoard;
