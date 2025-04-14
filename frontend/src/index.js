import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Service worker configuration
const serviceWorkerConfig = {
  onUpdate: (registration) => {
    if (registration.waiting) {
      if (window.confirm('New version available! Refresh to update?')) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        window.location.reload();
      }
    }
  }
};

// Register service worker
serviceWorker.register(serviceWorkerConfig);

// Performance monitoring
if (process.env.NODE_ENV === 'development') {
  reportWebVitals(console.log);
}