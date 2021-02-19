import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.less';
import KeyBoard from '../src/index';

const App = () => {
  return (
    <div className="demo">
      <form>
        <div className="form-group">
          <label>默认</label>
          <input data-mode className="form-control" v-model="value" />
        </div>
        <div className="form-group">
          <label>英文键盘</label>
          <input data-mode="en" className="form-control" v-model="value" />
        </div>
        <div className="form-group">
          <label>数字键盘</label>
          <input data-mode="number" className="form-control" v-model="value" />
        </div>
        <div className="form-group">
          <label>标点键盘</label>
          <input data-mode="symbol" className="form-control" v-model="value" />
        </div>
        <div className="form-group">
          <label>手写键盘</label>
          <input
            data-mode="handwrite"
            className="form-control"
            v-model="value"
          />
        </div>
      </form>
      <KeyBoard blurHide={false} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
