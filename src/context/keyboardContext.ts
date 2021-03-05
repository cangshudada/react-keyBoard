import { createContext } from 'react';
import { IKeyBoardContext } from '../index';

export const KeyBoardContext = createContext<IKeyBoardContext>({
  color: '',
  modeList: [],
  handApi: '',
  transitionTime: 0,
  closeKeyBoard: () => {},
  changeDefaultBoard: () => {},
});