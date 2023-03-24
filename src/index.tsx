import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
// Стандартно следует использовать BrowserRouter (более современный роутер React).
// Однако если используется хост-провайдер с поддержкой статических приложений / статический файловый сервер
// (например, Github Pages), следует использоваить HashRouter. В противном случае приложение не будет
// работать, как ожидалось, и при перезагрузке страницы будет выдавать ошибку 404. Например,
// при размещении сайта на Github Pages. Это означает, что хост не может найти index.html в моем URL-адресе.
import { Provider } from 'react-redux';

import { initStore } from './store/store';
import App from './components/app/app';
import './index.css';

export const store = initStore();

const root = ReactDOM.createRoot( document.getElementById('root') as Element );

root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store} >
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>
);
