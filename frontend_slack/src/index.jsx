import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import i18n from './Locales/i18next';
import App from './Components/App';
import reportWebVitals from './reportWebVitals';
import store from './Slices/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode />
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
    <React.StrictMode />
  </Provider>,
);

reportWebVitals();
