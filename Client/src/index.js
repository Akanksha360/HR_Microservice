import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <Auth0Provider
    domain="dev-s3y8x6l6.us.auth0.com" 
    clientId="vgk5uyFCitYBJ3aMBEMjVwijchbL7P1P" 
    redirectUri="http://localhost:3000/oidc/.well-known/openid-configuration" 
    audience="Akanksha"
    scope="openid profile email"
    >
    <App /></Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
