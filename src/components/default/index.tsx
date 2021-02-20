import "./default.less";
import classNames from 'classnames';
import React, { useState } from 'react';
import KeyCodeButton from '../keyCodeButton';
import useDeepCopy from '../../hooks/useDeepCopy';
import {
  DEFAULT_CODE,
  NUMBER_CODE,
  SYMBOL_CODE,
} from '../../constants/key_code';

export interface IProps {}

// 最后一行按钮列表
const defaultLineList: Record<'data' | 'type', string>[] = [
  {
    data: '.?123',
    type: 'change2num',
  },
  {
    data: '',
    type: 'change2lang',
  },
  {
    data: ' ',
    type: 'space',
  },
  {
    data: '',
    type: 'close',
  },
];

const DefaultBoard: React.FC<IProps> = props => {
  // 键盘列表
  const [lineList, setLineList] = useState([
    DEFAULT_CODE.line1,
    DEFAULT_CODE.line2,
    DEFAULT_CODE.line3,
  ]);
  // 第四行变动的键码
  const [line4, setLine4] = useState([]);
  // 大小写
  const [isUpper, setUpperStatus] = useState(false);
  // 是否显示符号键盘
  const [isSymbol, setSymbolStatus] = useState(false);
  // 是否显示数字键盘
  const [isNum, setNumberStatus] = useState(false);
  // 中英文模式
  const [isCn, setLanStatus] = useState(false);

  return (
    <div className="default-key-board">
      {lineList.map((line, index) => (
        <div className={classNames('line', `line${index + 1}`)} key={index}>
          {line.map(key => (
            <KeyCodeButton
              isUpper={isUpper}
              key={key}
              type={key}
              data={key}
              isSymbol={isSymbol}
              click={() => {}}
            />
          ))}
        </div>
      ))}
      <div className="line line4">
        {line4.map(key => (
          <KeyCodeButton
            key={key}
            type={key}
            data={key}
            isCn={isCn}
            isNum={isNum}
            click={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default DefaultBoard;
