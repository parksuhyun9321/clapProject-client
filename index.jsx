import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import "./style/reset.css"
import "./style/layout.scss"
import "./style/response.scss"


const strictMode = false;

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  strictMode ? <React.StrictMode><App /></React.StrictMode> : <App />
  // <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
