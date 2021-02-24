import './default.less';
import classNames from 'classnames';
import React, { useState, useEffect, useContext } from 'react';
import KeyCodeButton from '../keyCodeButton';
import useDeepCopy from '../../hooks/useDeepCopy';
import {
  DEFAULT_CODE,
  NUMBER_CODE,
  SYMBOL_CODE,
} from '../../constants/key_code';
import { KeyBoardContext } from '../..';

export interface IProps {
  change: (value: string) => void;
  trigger: (parmas: Record<'data' | 'type', string>) => void;
  translate: (value: string) => void;
}

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

const DefaultBoard: React.FC<IProps> = ({ translate, trigger, change }) => {
  const { modeList, handApi, closeKeyBoard } = useContext(KeyBoardContext);
  // 键盘列表
  const [lineList, setLineList] = useState([
    DEFAULT_CODE.line1,
    DEFAULT_CODE.line2,
    DEFAULT_CODE.line3,
  ]);
  // 第四行变动的键码
  const [line4, setLine4] = useState<Record<'data' | 'type', string>[]>([]);
  // 大小写
  const [isUpper, setUpperStatus] = useState(false);
  // 是否显示符号键盘
  const [isSymbol, setSymbolStatus] = useState(false);
  // 是否显示数字键盘
  const [isNum, setNumberStatus] = useState(false);
  // 中英文模式
  const [isCn, setLanStatus] = useState(false);
  // 上一次存的val值
  const [oldVal, setoldVal] = useState('');

  useEffect(() => {
    setLine4(useDeepCopy(defaultLineList));

    if (modeList.find(mode => mode === 'handwrite') && handApi) {
      setLine4(dataSource => {
        dataSource.splice(2, 0, {
          data: '',
          type: 'handwrite',
        });
        return dataSource;
      });
    }
  }, []);

  /**
   * @description 按钮点击事件
   * @param {(Record<'data' | 'type', string>)} { data, type }
   */
  function keyButtonClick({ data, type }: Record<'data' | 'type', string>) {
    switch (type) {
      //  关闭
      case 'close':
        {
          setoldVal('');
          closeKeyBoard();
        }
        break;
      //  大小写
      case 'upper':
        {
          setoldVal('');
          setUpperStatus(!isUpper);
        }
        break;
      //   语言
      case 'change2lang':
        {
          setLanStatus(!isCn);
          // 默认键盘状态下
          if (!isNum && !isSymbol) {
            // this.$EventBus?.$emit('keyBoardChange', this.isCn ? 'CN' : 'EN');
          }
        }
        break;
      //  数字键盘
      case 'change2num':
        {
          setNumberStatus(!isNum);
          setSymbolStatus(false);
          if (isNum) {
            // this.$EventBus?.$emit('keyBoardChange', 'number');
            const numberCodeLine3List = useDeepCopy(NUMBER_CODE.line3);
            if (!modeList.find(mode => mode === 'symbol')) {
              numberCodeLine3List.shift();
              numberCodeLine3List.unshift('+');
            }
            setLineList([
              NUMBER_CODE.line1,
              NUMBER_CODE.line2,
              numberCodeLine3List,
            ]);
          } else {
            // this.$EventBus?.$emit('keyBoardChange', this.isCn ? 'CN' : 'EN');
            setLineList([
              DEFAULT_CODE.line1,
              DEFAULT_CODE.line2,
              DEFAULT_CODE.line3,
            ]);
          }
        }
        break;
      // 切换符号显示
      case '#+=':
        {
          setSymbolStatus(!isSymbol);
          if (isSymbol) {
            // this.$EventBus?.$emit('keyBoardChange', 'symbol');
            setLineList([
              SYMBOL_CODE.line1,
              SYMBOL_CODE.line2,
              SYMBOL_CODE.line3,
            ]);
          } else {
            // this.$EventBus?.$emit('keyBoardChange', 'number');
            setLineList([
              NUMBER_CODE.line1,
              NUMBER_CODE.line2,
              NUMBER_CODE.line3,
            ]);
          }
        }
        break;
      // 切换手写板以及删除
      case 'handwrite':
      case 'delete':
        {
          // 如果是中文模式只删存好的字段
          if (isCn && type === 'delete' && oldVal) {
            setoldVal(oldVal.substr(0, oldVal.length - 1));
            translate(oldVal);
          } else {
            if (type === 'handwrite') {
              // this.$EventBus?.$emit('keyBoardChange', 'handwrite');
            }
            trigger({
              data,
              type,
            });
          }
        }
        break;
      // 默认
      default:
        {
          // 中文需要转
          if (isCn && !isNum && !isSymbol) {
            translate(oldVal + data);
            setoldVal(oldVal + data);
          } else {
            // 英文直接输出
            change(data);
          }
        }
        break;
    }
  }

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
              click={keyButtonClick}
            />
          ))}
        </div>
      ))}
      <div className="line line4">
        {line4.map((key, index) => (
          <KeyCodeButton
            key={index}
            type={key.type}
            data={key.data}
            isCn={isCn}
            isNum={isNum}
            click={keyButtonClick}
          />
        ))}
      </div>
    </div>
  );
};

export default DefaultBoard;
