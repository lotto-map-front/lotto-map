import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import Layout from './components/layout/Layout';
import { PopUpCtxProvider } from './context/PopUpCtx';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <PopUpCtxProvider>
        <Layout>
          <App />
        </Layout>
      </PopUpCtxProvider>
    </BrowserRouter>
  </React.StrictMode>
);
