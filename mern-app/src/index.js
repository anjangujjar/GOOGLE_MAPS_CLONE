// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ConfigProvider } from './ConfigContext';

ReactDOM.render(
  <ConfigProvider>
    <App />
  </ConfigProvider>,
  document.getElementById('root')
);
