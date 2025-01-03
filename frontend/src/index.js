import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './components/contexts/AuthContext';
import { ProfileProvider } from './components/contexts/ProfileContext';
import { ToastProvider } from './components/contexts/ToastContext';
import { CartProvider } from './components/contexts/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ProfileProvider>
        <ToastProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ToastProvider>
      </ProfileProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
