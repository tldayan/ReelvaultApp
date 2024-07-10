import React from 'react';
import { StytchProvider } from '@stytch/react';
import { StytchUIClient } from '@stytch/vanilla-js';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import {Provider} from "react-redux"
import './index.css';
import store from '../Components/store/store.js';
import ReactGA from "react-ga4";

ReactGA.initialize("G-6Z3LEDT59J");

const stytchClient = new StytchUIClient(import.meta.env.VITE_STYTCH_PUBLIC_TOKEN, {
  cookieOptions: {
    opaqueTokenCookieName: 'stytch_session',
    jwtCookieName: 'stytch_session_jwt',
    path: '/',
    secure: true, // Ensure this is true for HTTPS
    sameSite: 'None' // Required for cross-site cookies
  }
});


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StytchProvider stytch={stytchClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </StytchProvider>
  </React.StrictMode>
);
