import './assets/css/_BASE_.less';
import React from 'react';
export interface IDictionary<T> {
    [key: string]: T;
}
export interface IKeyBoardContext {
    color: string;
    modeList: ('handwrite' | 'symbol')[];
    handApi?: string;
    transitionTime: number;
    closeKeyBoard: () => void;
    changeDefaultBoard: () => void;
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
    keyChange?: (value: string, prop: string | HTMLInputElement) => void;
    /** value change */
    onChange?: (value: string, prop: string | HTMLInputElement) => void;
    /** keyboard close hook */
    closed?: () => void;
    /** keyboard modal click hook */
    modalClick?: () => void;
}
export interface IKeyBoardRef {
    /** keyboard reSign up */
    reSignUp: () => void;
    /** get current input */
    getCurrentInput: () => HTMLInputElement | null;
}
declare const _default: React.ForwardRefExoticComponent<IKeyBoard & React.RefAttributes<any>>;
export default _default;
