import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.tsx';
import './index.css';
import { store } from './redux/store.ts';
import './scss/index.scss';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PayPalScriptProvider options={{ clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID }}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_CLIENT_ID}>
        <App />
      </GoogleOAuthProvider>
    </PayPalScriptProvider>
  </Provider>
);
