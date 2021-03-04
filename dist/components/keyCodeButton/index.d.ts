import './keyCodeButton.less';
import React from 'react';
import { IKeyCode } from '../../index';
export interface IProps {
    type: string;
    data: string;
    isCn?: boolean;
    isNum?: boolean;
    isUpper?: boolean;
    isSymbol?: boolean;
    click?: (parmas: IKeyCode) => void;
}
declare const KeyCodeButton: React.FC<IProps>;
export default KeyCodeButton;
