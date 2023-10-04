import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Home, Admin, Sign } from './layout';
import { Header, Footer } from './components';
import { useTheme } from './context/theme';

function App() {
    const { theme, setTheme } = useTheme();
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            setTheme(storedTheme);
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
            localStorage.setItem('theme', 'dark');
        }
    }, []);

    useEffect(() => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
    }, [theme]);

    return (
        <div className="App transition-all dark:bg-dark h-screen bg-light dark:text-dark text-light [&::-webkit-scrollbar]:[width:8px] [&::-webkit-scrollbar]:rounded-xl [&::-webkit-scrollbar-thumb]:rounded-xl [&::-webkit-scrollbar-track]:rounded-xl [&::-webkit-scrollbar-thumb]:bg-primary overflow-scroll">
            <BrowserRouter basename="/">
                <Header></Header>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="admin" element={<Admin />} />
                    <Route path="sign" element={<Sign />} />
                    <Route
                        path="*"
                        element={
                            <div>
                                <h1>Page not found</h1>
                            </div>
                        }
                    />
                </Routes>
                <Footer></Footer>
            </BrowserRouter>
        </div>
    );
}

export default App;
