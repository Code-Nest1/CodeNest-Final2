// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GlobalStyle } from './styles/global';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async'; // <--- NEW IMPORT

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider> {/* <--- WRAPPED APP FOR SEO */}
      <BrowserRouter>
        <GlobalStyle />
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
);