import './default.less';
import React from 'react';
import { IKeyCode } from '../..';
export interface IProps {
    change: (value: string) => void;
    trigger: (parmas: IKeyCode) => void;
    translate: (value: string) => void;
}
export interface IDefaultRef {
    keyButtonTrigger: (parmas: IKeyCode) => void;
}
declare const _default: React.ForwardRefExoticComponent<IProps & React.RefAttributes<unknown>>;
export default _default;
