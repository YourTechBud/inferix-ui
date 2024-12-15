import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import Root from './routes';
import { Toaster } from './ui/components/sonner';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Root />
      <Toaster />
    </BrowserRouter>
  </React.StrictMode>,
);
