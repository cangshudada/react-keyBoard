import './libs/flexible.js';
import './assets/css/_BASE_.less';
import classNames from 'classnames';
import Result from './components/result';
import HandBoard from './components/handWrite';
import DefaultBoard, { IDefaultRef } from './components/default';
import { axiosConfig } from './helper/axiosConfig';
import useEventEmitter from './hooks/useEventEmitter';
import { CSSTransition } from 'react-transition-group';
import { pinYinNote } from './constants/pinyin_dict_note';
import DragHandle from './components/dragHandleBar/dragHandle';
import React, {
  useState,
  useEffect,
  createContext,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
export interface IDictionary<T> {
  [key: string]: T;
}

export type IKeyCode = Record<'data' | 'type', string>;

export type IValue = {
  code?: string;
  value?: string;
};

export interface IKeyBoard {
  /** value auto change */
  autoChange?: boolean;
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
  /** transition time */
  transitionTime?: number;
  /** darg Handle text */
  dargHandleText?: string;
  /** modal exist status */
  modal?: boolean;
  /** modal can hide when click modal */
  closeOnClickModal?: boolean;
  /** key change */
  keyChange?: (value: string) => void;
  /** value change */
  onChange?: (value: string) => void;
  /** keyboard close hook */
  closed?: () => void;
  /** keyboard modal click hook */
  modalClick?: () => void;
}
export interface IKeyBoardRef {
  /** keyboard reSign up */
  reSignUp: () => void;
}

export const KeyBoardContext = createContext<{
  color: string;
  modeList: ('handwrite' | 'symbol')[];
  handApi?: string;
  transitionTime: number;
  closeKeyBoard: () => void;
  changeDefaultBoard: () => void;
}>({
  color: '#eaa050',
  modeList: ['handwrite', 'symbol'],
  handApi: '',
  transitionTime: 300,
  closeKeyBoard: () => {},
  changeDefaultBoard: () => {},
});

// 注册键盘绑定的input列表
let inputList: HTMLInputElement[] = [];
// 当前触发的input
let currentInput: HTMLInputElement | null = null;

const KeyBoard = (options: IKeyBoard, ref: any) => {
  // Specifies the default values for props:
  options = {
    ...options,
    autoChange: options.autoChange || true,
    color: options.color || '#eaa050',
    modeList: options.modeList || ['handwrite', 'symbol'],
    blurHide: options.blurHide || false,
    showHandleBar: options.showHandleBar || true,
    closeOnClickModal: options.closeOnClickModal || true,
    dargHandleText: options.dargHandleText || '将键盘拖到您喜欢的位置',
  };

  // 键盘显隐控制
  const [keyBoardVisible, setKeyBoardVisible] = useState<boolean>(false);
  // 键盘展示模式
  const [keyBoardMode, setKeyBoardShowMode] = useState<string>('default');
  // 中文模式下显示字符
  const [resultVal, setResultVal] = useState<IValue>({});

  // 默认键盘的ref
  const defaultRef = useRef<IDefaultRef>();

  // 键盘组件初始化准备
  useEffect(() => {
    options.modal && addMoDal();
    // 注册键盘
    signUpKeyboard();

    useEventEmitter.on('resultReset', () => {
      setResultVal({});
    });

    // destory hook
    return () => {
      document
        .querySelector('.key-board-modal')
        ?.removeEventListener('click', modalClick);
      inputList.forEach(input => {
        input.removeEventListener('focus', showKeyBoard);
        input.removeEventListener('blur', hideKeyBoard);
      });
    };
  }, []);

  // 暴露给父组件的子组件方法
  useImperativeHandle(ref, () => {
    return {
      // 重新给键盘注册输入框
      reSignUp() {
        signUpKeyboard();
      },
    };
  });

  /**
   * @description 新增modal
   */
  function addMoDal() {
    // 如果modal存在的话继续绑定事件 - 此处解决多路由页面切换时造成的bug
    if (document.querySelector('.key-board-modal')) {
      document
        .querySelector('.key-board-modal')
        ?.addEventListener('click', modalClick);
      return;
    }

    // 如果不存在modal则创建一个modal遮罩层
    const modalDom = document.createElement('div');
    modalDom.className = 'key-board-modal';
    modalDom.style.display = 'none';
    document.querySelector('body')?.appendChild(modalDom);
    modalDom.addEventListener('click', modalClick);
  }

  /**
   * @description 点击遮罩层
   */
  function modalClick() {
    // 如果点击遮罩层允许关闭则触发键盘隐藏事件
    options.closeOnClickModal && hideKeyBoard();

    if (options.modalClick) {
      options.modalClick();
    }
  }

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
    // 显示键盘
    setKeyBoardVisible(true);

    // 赋值当前事件触发的input
    currentInput = event.target as HTMLInputElement;

    // 设置默认的键盘显示模式
    setDefaultKeyBoardMode(currentInput.getAttribute('data-mode') as string);

    // 显示遮罩层
    if (document.querySelector('.key-board-modal')) {
      const keyBoardModal = document.querySelector(
        '.key-board-modal'
      ) as HTMLElement;
      keyBoardModal.style.display = 'block';
    }
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

  /**
   * @description 设置初始化键盘模式
   */
  function setDefaultKeyBoardMode(mode: string) {
    useEventEmitter.emit('keyBoardChange', 'CN');
    switch (mode) {
      // 英文键盘
      case 'en':
        setKeyBoardShowMode('default');
        defaultRef.current?.keyButtonTrigger({
          data: '',
          type: 'change2lang',
        });
        break;
      // 数字键盘
      case 'number':
        setKeyBoardShowMode('default');
        defaultRef.current?.keyButtonTrigger({
          data: '.?123',
          type: 'change2num',
        });
        break;
      // 手写键盘
      case 'handwrite':
        if (
          options.modeList?.find(mode => mode === 'handwrite') &&
          options.handApi
        ) {
          setKeyBoardShowMode('handwrite');
          useEventEmitter.emit('keyBoardChange', 'handwrite');
        } else {
          setKeyBoardShowMode('default');
        }
        break;
      // 标点键盘
      case 'symbol':
        setKeyBoardShowMode('default');
        // 如果存在标点键盘才允许切换
        if (options.modeList?.find(mode => mode === 'symbol')) {
          defaultRef.current?.keyButtonTrigger({
            data: '.?123',
            type: 'change2num',
          });
          defaultRef.current?.keyButtonTrigger({
            data: '#+=',
            type: '#+=',
          });
        }
        break;
      // 默认
      default:
        setKeyBoardShowMode('default');
        break;
    }
  }

  /**
   * @description 模式切换
   * @param {IKeyCode} {type}
   */
  function trigger({ type }: IKeyCode) {
    switch (type) {
      case 'handwrite':
        {
          setKeyBoardShowMode('handwrite');
        }
        break;
      case 'delete':
        {
          if (!currentInput) return;
          const changeValue = currentInput.value.substr(
            0,
            currentInput.value.length - 1
          );

          // 自动改变
          if (options.autoChange) {
            currentInput.value = changeValue;
          }

          // 触发change事件
          if (options.onChange) {
            options.onChange(changeValue);
          }
        }
        break;
    }
  }

  /**
   * @description 文字改变
   * @param {string} value
   */
  function change(value: string) {
    if (!currentInput) return;

    const changeValue = currentInput.value + value;

    // 自动改变
    if (options.autoChange) {
      currentInput.value = changeValue;
    }

    if (options.onChange) {
      options.onChange(changeValue);
    }
    if (options.keyChange) {
      options.keyChange(value);
    }
  }

  /**
   * @description 拼音转中文
   * @param {string} value
   */
  function translate(value: string) {
    const reg = new RegExp(`^${value}\\w*`);
    const keys = Object.keys(pinYinNote)
      .filter(key => reg.test(key))
      .sort();
    setResultVal({
      code: value,
      value: value
        ? keys.length > 1
          ? keys.reduce((a, b) => a + pinYinNote[b], '')
          : pinYinNote[keys[0]]
        : '',
    });
    if (options.keyChange) {
      options.keyChange(value);
    }
  }

  return (
    <CSSTransition
      in={keyBoardVisible}
      classNames={classNames('move-bottom-to-top' || options.animateClass)}
      timeout={options.transitionTime || 300}
      unmountOnExit
    >
      <KeyBoardContext.Provider
        value={{
          color: options.color || '#eaa050',
          modeList: options.modeList || ['handwrite', 'symbol'],
          handApi: options.handApi,
          transitionTime: options.transitionTime || 300,
          closeKeyBoard: () => {
            hideKeyBoard();
          },
          changeDefaultBoard: () => {
            setKeyBoardShowMode('default');
            useEventEmitter.emit('resultReset');
          },
        }}
      >
        <div
          className="key-board"
          onMouseDown={event => {
            event.preventDefault();
          }}
        >
          {/* 键盘主体 */}
          <div className="key-board-container">
            {/* 结果展示 */}
            <Result resultVal={resultVal} change={change} />
            <div className="key-board-area">
              {/* 默认键盘 */}
              {keyBoardMode === 'default' && (
                <DefaultBoard
                  ref={defaultRef}
                  translate={translate}
                  change={change}
                  trigger={trigger}
                />
              )}
              {/* 手写键盘 */}
              {keyBoardMode === 'handwrite' && <HandBoard trigger={trigger} />}
            </div>
          </div>
          {/* 拖拽句柄 */}
          {options.showHandleBar && (
            <DragHandle
              color={options.color}
              dargHandleText={options.dargHandleText}
            />
          )}
        </div>
      </KeyBoardContext.Provider>
    </CSSTransition>
  );
};

export default forwardRef<any, IKeyBoard>(KeyBoard);
