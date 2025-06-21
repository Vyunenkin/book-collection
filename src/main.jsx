import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import ThemeProvider from './context/ThemeProvider.jsx';
import DefaultTextSettingsProvider from './context/DefaultTextSettingsContext';
import AppContextProvider from './context/AppContext.jsx';
import 'antd/dist/reset.css';
import '@ant-design/v5-patch-for-react-19';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <DefaultTextSettingsProvider>
          <AppContextProvider>
            <App />
          </AppContextProvider>
        </DefaultTextSettingsProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
