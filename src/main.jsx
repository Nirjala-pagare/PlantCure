import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import App from './App.jsx';
import './index.css';
import i18n from './i18n/i18n';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <Suspense fallback={<div className="p-8 text-center text-gray-700">Loading...</div>}>
        <App />
      </Suspense>
    </I18nextProvider>
  </React.StrictMode>,
);

