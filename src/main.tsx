import { createRoot } from 'react-dom/client';
import './index.css';
import './lib/i18n/i18n.ts';
import App from './App.tsx';
import AppProvider from './providers/AppProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <AppProvider>
    <App />
  </AppProvider>
);
