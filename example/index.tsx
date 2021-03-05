import './index.less';
import * as React from 'react';
import '../src/libs/flexible.js';
import * as ReactDOM from 'react-dom';
// import '../src/assets/css/_BASE_.less';
// import KeyBoard from '../src/index';
import KeyBoard from '../dist';
import '../dist/keyboard.min.css';

const App = () => {
  return (
    <div className="demo">
      <form>
        <div className="form-group">
          <label>默认</label>
          <input data-mode className="form-control" />
        </div>
        <div className="form-group">
          <label>英文键盘</label>
          <input data-mode="en" className="form-control" />
        </div>
        <div className="form-group">
          <label>数字键盘</label>
          <input data-mode="number" className="form-control" />
        </div>
        <div className="form-group">
          <label>标点键盘</label>
          <input data-mode="symbol" className="form-control" />
        </div>
        <div className="form-group">
          <label>手写键盘</label>
          <input data-mode="handwrite" className="form-control" />
        </div>
      </form>
      <KeyBoard
        modal
        color="#292953"
        onChange={value => {
          console.log('value', value);
        }}
        keyChange={value => {
          console.log('value', value);
        }}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
