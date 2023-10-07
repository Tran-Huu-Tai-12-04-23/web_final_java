import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { Home, Admin, Sign } from './layout';
import { Header, Footer } from './components';
import { useTheme } from './context/theme';
import { motion, useScroll } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
    const ref = useRef(null);
    const { theme, setTheme } = useTheme();
    const { scrollYProgress } = useScroll({ container: ref });

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
        <>
            <motion.div
                className={`fixed top-[3.1rem] z-50  rounded-r-lg h-[4px] left-0 right-0 bg-btn-primary`}
                style={{ scaleX: scrollYProgress, 'transform-origin': '0%' }}
            ></motion.div>
            <motion.div ref={ref} className="h-screen overflow-x-hidden overflow-scroll">
                <Toaster position="top-center" reverseOrder={false} />
                <AnimatePresence mode="wait">
                    <motion.div className="App transition-all dark:bg-dark bg-light dark:text-dark text-light  [&::-webkit-scrollbar]:[width:0px] [&::-webkit-scrollbar]:rounded-xl [&::-webkit-scrollbar-thumb]:rounded-xl [&::-webkit-scrollbar-track]:rounded-xl [&::-webkit-scrollbar-thumb]:bg-primary ">
                        <BrowserRouter>
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
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </>
    );
}

export default App;
