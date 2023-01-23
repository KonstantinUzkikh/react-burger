import React, { StrictMode } from 'react';
//import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

import './index.css';

import App from './components/app/app';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

//Updates to Client Rendering APIs
//https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#updates-to-client-rendering-apis

// Before
//import { render } from 'react-dom';
//const container = document.getElementById('app');
//render(<App tab="home" />, container);

// After
//import { createRoot } from 'react-dom/client';
//const container = document.getElementById('app');
//const root = createRoot(container); // createRoot(container!) if you use TypeScript
//root.render(<App tab="home" />);

//const rootElement = document.getElementById('root');
//ReactDOM.render(
//  <StrictMode>
//    <App />
//  </StrictMode>,
//  rootElement
//);
