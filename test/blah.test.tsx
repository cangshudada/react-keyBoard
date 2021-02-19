import * as React from 'react';
import * as ReactDOM from 'react-dom';
import KeyBoard from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<KeyBoard />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
