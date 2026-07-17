import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
// IMPORT ROUTER
import { BrowserRouter } from 'react-router-dom'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* WRAP APP IN BROWSER ROUTER */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);