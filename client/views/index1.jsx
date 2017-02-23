import React from 'react';
import ReactDOM, {render} from 'react-dom';
import { Provider } from 'react-redux';
import {createStore} from 'redux';
import reducers from '../reducers/app_red';
import App from '../containers/app_con';
import '../utils/css/main.less';
import '../utils/css/iconfont.css';
import '../utils/javascript/main';
import '../utils/css/other.css';

let store = createStore(reducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const app = document.createElement('div');
app.setAttribute('id', 'react_root');
document.body.appendChild(app);

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  app
);
