import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext(null);

export default function ThemeProviderApp({ children }) {
    const [theme, setTheme] = useState('light');

    return (
        <ThemeContext.Provider
            value={{
                theme,
                setTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => {
    return useContext(ThemeContext);
};
