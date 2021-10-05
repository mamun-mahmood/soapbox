import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MyListContext from './context/MyListContext';

ReactDOM.render(
  <React.StrictMode>
    <MyListContext>
      <App />
    </MyListContext>
  </React.StrictMode>,
  document.getElementById('root')
);