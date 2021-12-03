import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import './index.css';
import { storage} from './redux/storage';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
      <Provider store={storage}>
        <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

