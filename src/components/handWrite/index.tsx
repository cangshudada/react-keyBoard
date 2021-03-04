import './handwrite.less';
import KeyCodeButton from '../keyCodeButton';
import HandPaintBoard from './handPaintBoard';
import { KeyBoardContext, IKeyCode } from '../..';
import React, { memo, useState, useContext } from 'react';
import useEventEmitter from '../../hooks/useEventEmitter';

export interface Iprops {
  trigger?: (parmas: IKeyCode) => void;
}

const HandBoard: React.FC<Iprops> = memo(props => {
  const { closeKeyBoard, changeDefaultBoard } = useContext(KeyBoardContext);

  // 手写板部分按钮列表
  const handBoardOperList: IKeyCode[] = [
    {
      data: '中/EN',
      type: 'change2lang',
    },
    {
      data: '',
      type: 'back',
    },
    {
      data: '',
      type: 'delete',
    },
    {
      data: '',
      type: 'close',
    },
  ];

  // 中英文模式
  const [isCn, setLanStatus] = useState(true);

  return (
    <div className="hand-write-board">
      {/* 手写板 */}
      <HandPaintBoard lib={isCn ? 'CN' : 'EN'} />
      {/* 操作按钮栏 */}
      <div className="hand-write-board-opers">
        {handBoardOperList.map(key => (
          <KeyCodeButton
            v-for="key in handBoardOperList"
            key={key.type}
            type={key.type}
            data={key.data}
            isCn={isCn}
            click={({ data, type }) => {
              switch (type) {
                //  关闭
                case 'close':
                  {
                    closeKeyBoard();
                  }
                  break;
                //  回退
                case 'back':
                  {
                    changeDefaultBoard();
                    useEventEmitter.emit('keyBoardChange', isCn && 'CN');
                  }
                  break;
                //   语言
                case 'change2lang':
                  {
                    setLanStatus(!isCn);
                  }
                  break;
                // 删除
                case 'delete':
                  {
                    props?.trigger &&
                      props?.trigger({
                        data,
                        type,
                      });
                  }
                  break;
              }
            }}
          />
        ))}
      </div>
    </div>
  );
});

export default HandBoard;
