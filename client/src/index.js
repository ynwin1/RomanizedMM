import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Auth0Provider} from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Auth0Provider
          domain="dev-i5t7cfwxrdivttbu.us.auth0.com"
          clientId="3WbEnuTHrvEmjNcRs6gMA37hiBPz3Ajp"
          authorizationParams={{
              redirect_uri: 'http://localhost:3000/callback',
              audience: 'https://dev-i5t7cfwxrdivttbu.us.auth0.com/api/v2/',
              scope: 'openid profile email',
          }}
      >
          <App />
      </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
