import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Reset from './reset'; // Ensure consistent casing
import { createGlobalStyle } from 'styled-components';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const GlobalStyle = createGlobalStyle`
  ${Reset}
`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  </React.StrictMode>
);

reportWebVitals();
