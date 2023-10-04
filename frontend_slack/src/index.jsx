import React from 'react';
import { Provider as ProviderRoll, ErrorBoundary } from '@rollbar/react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import i18n from './Locales/i18next';
import App from './Components/App';
import reportWebVitals from './reportWebVitals';
import store from './Slices/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from './Providers/AuthProvider';
import { SocketProvider } from './Providers/SocketProvider';

const rollbarConfig = {
  accessToken: 'cc1d733bc8bf47c88c5ba80d7e3de215',
  environment: 'testenv',
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ProviderRoll config={rollbarConfig}>
    <ErrorBoundary>
      <Provider store={store}>
        <React.StrictMode />
        <I18nextProvider i18n={i18n}>
          <AuthProvider>
            <SocketProvider>
              <App />
            </SocketProvider>
          </AuthProvider>
        </I18nextProvider>
        <React.StrictMode />
      </Provider>
    </ErrorBoundary>
  </ProviderRoll>,
);

reportWebVitals();
