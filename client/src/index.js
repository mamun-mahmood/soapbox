import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MyListContext from './context/MyListContext';
import MyPublicHootBoxContext from './context/MyPublicHootBoxContext';
import MyStreamContext from './context/MyStreamContext';

ReactDOM.render(
  <React.StrictMode>
    <MyPublicHootBoxContext>
      <MyStreamContext>
        <MyListContext>
          <App />
        </MyListContext>
      </MyStreamContext>
    </MyPublicHootBoxContext>
  </React.StrictMode>,
  document.getElementById('root')
);