import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const createEnvFile = () => {
  if (!import.meta.env.VITE_API_BASE_URL) {
    console.log('Using default API URL for development');
    window.process = window.process || {};
    window.process.env = window.process.env || {};
    window.process.env.VITE_API_BASE_URL = 'http://localhost:3000';
  }
};

createEnvFile();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);