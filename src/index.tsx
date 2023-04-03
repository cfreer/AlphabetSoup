import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App';
import './styles.css';

let rootEl = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootEl);
root.render(
    <App />
);
