import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { initStore } from './store/store';
import App from './components/app/app';
import './index.css';

export const store = initStore();

const root = ReactDOM.createRoot( document.getElementById('root') as Element );

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store} >
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
