import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { AuthProvider } from './Context/AuthContext.tsx';
import { CardsProvider } from './Context/CardsContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <CardsProvider>
        <App />
      </CardsProvider>
    </AuthProvider>
  </StrictMode>
);