import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CountProvider } from './count-context';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <CountProvider>
      <App />
    </CountProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
