import { createContext, useEffect, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const DefaultTextSettingsContext = createContext();

export function DefaultTextSettingsProvider({ children }) {
  const [textSettings, setTextSettings] = useState(() => {
    const stored = localStorage.getItem('default-text-settings');
    return stored
      ? JSON.parse(stored)
      : {
          textColor: 'black',
          textSize: 'medium',
          bold: false,
        };
  });

  useEffect(() => {
    localStorage.setItem('default-text-settings', JSON.stringify(textSettings));
  }, [textSettings]);

  return (
    <DefaultTextSettingsContext.Provider value={{ textSettings, setTextSettings }}>
      {children}
    </DefaultTextSettingsContext.Provider>
  );
}

export default DefaultTextSettingsProvider;