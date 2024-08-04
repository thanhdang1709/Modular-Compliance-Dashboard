import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { createRoot } from 'react-dom/client';

const mount = (el: HTMLElement) => {
  const container = document.getElementById('root');
  const root = createRoot(container!);
  root.render(<App />);
};

if (process.env.NODE_ENV === 'development') {
  const devRoot: HTMLElement | null = document.querySelector('#root');

  if (devRoot) {
    mount(devRoot);
  }
}

export { mount };