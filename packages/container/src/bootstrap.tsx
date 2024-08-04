import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';

// const mount = (el: HTMLElement) => {
//   ReactDOM.render(<App />, el);
// };

// if (process.env.NODE_ENV === 'development') {
//   const devRoot = document.querySelector('#root');

//   if (devRoot) {
//     mount(devRoot as HTMLElement);
//   }
// }

// export { mount };
// src/bootstrap.tsx
import ReactDOM from 'react-dom';
import App from './App';
import { Amplify } from 'aws-amplify';
import awsconfig from '../../../src/aws-exports';
Amplify.configure(awsconfig);
console.log(Amplify.configure(awsconfig))

import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App/>);