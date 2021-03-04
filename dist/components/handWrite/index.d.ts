import './handwrite.less';
import { IKeyCode } from '../..';
import React from 'react';
export interface Iprops {
    trigger?: (parmas: IKeyCode) => void;
}
declare const HandBoard: React.FC<Iprops>;
export default HandBoard;
