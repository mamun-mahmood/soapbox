import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MyListContext from './context/MyListContext';
import MyStreamContext from './context/MyStreamContext';

ReactDOM.render(
  <React.StrictMode>
    <MyStreamContext>
      <MyListContext>
        <App />
      </MyListContext>
    </MyStreamContext>
  </React.StrictMode>,
  document.getElementById('root')
);