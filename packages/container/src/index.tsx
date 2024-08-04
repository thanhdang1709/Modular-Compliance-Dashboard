import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import NextTopLoader from 'nextjs-toploader';
import { BrowserRouter } from 'react-router-dom';

import './aws-export';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NextTopLoader />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
