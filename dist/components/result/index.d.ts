import './result.less';
import { IValue } from '../..';
import React from 'react';
export interface IProps {
    resultVal: IValue;
    change?: (word: string) => void;
}
declare const Result: React.FC<IProps>;
export default Result;
