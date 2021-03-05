import './result.less';
import { IValue } from '../..';
import { groupSplitArray } from '../../utils';
import useEventEmitter from '../../hooks/useEventEmitter';
import { KeyBoardContext } from '../../context/keyboardContext';
import React, { memo, useState, useEffect, useContext } from 'react';
export interface IProps {
  resultVal: IValue;
  change?: (word: string) => void;
}

const Result: React.FC<IProps> = memo(({ resultVal, change }) => {
  const { color } = useContext(KeyBoardContext);
  const [status, setStatus] = useState('');
  const [valueList, setValueList] = useState<string[]>([]);
  const [showList, setShowList] = useState<string[][]>([]);
  const [showIndex, setShowIndex] = useState(0);

  // border color
  const borderStyle = {
    borderTopColor: color,
  };

  useEffect(() => {
    useEventEmitter.on('keyBoardChange', status => {
      // 会引起高度变化 需要重新计算画板
      useEventEmitter.emit('updateBound');
      setStatus(status);
      // 重置
      reset();
    });

    useEventEmitter.on('getWordsFromServer', (serverData: string) => {
      const _valueList = Array.from(
        new Set(serverData.replace(/\s+/g, '').split(''))
      );
      setValueList(_valueList);
      setShowList(groupSplitArray(_valueList, 11));
    });

    return () => {
      useEventEmitter.remove('keyBoardChange');
      useEventEmitter.remove('getWordsFromServer');
    };
  }, []);

  // 监听传入值的变化
  useEffect(() => {
    setShowIndex(0);

    const _valueList = resultVal?.value?.split('') || [];
    setValueList(_valueList);

    if (_valueList.length === 0) {
      setShowList([]);
      return;
    }
    setShowList(groupSplitArray(_valueList, 11));
  }, [resultVal]);

  /**
   * @description 重置
   */
  function reset() {
    setShowIndex(0);
    setValueList([]);
    setShowList([]);
    useEventEmitter.emit('resultReset');
  }

  return status === 'CN' || status === 'handwrite' ? (
    <div className="key-board-result" style={{ color }}>
      {status === 'CN' && (
        <div className="key-board-code-show">{resultVal.code}</div>
      )}
      <div className="key-board-result-show">
        <div className="key-board-result-show-container">
          {showList.length > 0 &&
            showList[showIndex].map((key, index) => (
              <span
                key={index}
                onClick={() => {
                  reset();
                  // 传递选中的字
                  change && change(key);
                }}
              >
                {index + 1}.{key}
              </span>
            ))}
        </div>
        {valueList.length > 11 && (
          <div className="key-board-result-show-more">
            <span
              style={borderStyle}
              onClick={() => {
                if (showIndex === 0) return;
                setShowIndex(showIndex - 1);
              }}
            ></span>
            <span
              style={borderStyle}
              onClick={() => {
                if (showIndex === showList.length - 1) return;
                setShowIndex(showIndex + 1);
              }}
            ></span>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div></div>
  );
});

export default Result;
