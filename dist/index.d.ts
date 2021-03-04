import './libs/flexible.js';
import './assets/css/_BASE_.less';
import { ForwardRefExoticComponent } from 'react';
export interface IDictionary<T> {
  [key: string]: T;
}
export declare type IKeyCode = Record<'data' | 'type', string>;
export declare type IValue = {
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
export declare const KeyBoardContext: React.Context<{
  color: string;
  modeList: ('handwrite' | 'symbol')[];
  handApi?: string | undefined;
  transitionTime: number;
  closeKeyBoard: () => void;
  changeDefaultBoard: () => void;
}>;
declare const _default: ForwardRefExoticComponent<IKeyBoard &
  React.RefAttributes<any>>;
export default _default;
