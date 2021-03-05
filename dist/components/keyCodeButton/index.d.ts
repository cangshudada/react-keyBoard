import './keyCodeButton.less';
import { IKeyCode } from '../../index';
import React from 'react';
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
