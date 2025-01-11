import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { HydratedRouter } from 'react-router/dom';

async function prepareApp() {
  if (import.meta.env.DEV && import.meta.env.MOCK_API === 'true') {
    const { worker } = await import('./lib/mocks/browser');
    return worker.start();
  }

  return Promise.resolve();
}

prepareApp().then(() => {
  ReactDOM.hydrateRoot(
    document,
    <React.StrictMode>
      <HydratedRouter />
    </React.StrictMode>,
  );
});
