import React from 'react';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom';

/**
 * This file can be ignored, please work in ./components/App.jsx
 */


import './mock';


import './styles/index.css';

import App from './components/App';

const container = document.getElementById('root')!;
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
