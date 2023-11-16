import { useEffect, useRef } from 'react';
import { useTheme } from './context/theme';
import { useLogin } from './context/login';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import ConfigRoute from './routes/ConfigRoute';
import Util from './utils/Util';

function App() {
    const ref = useRef(null);
    const { theme, setTheme } = useTheme();
    const { setAccount } = useLogin();
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

    // handle check login
    useEffect(() => {
        const account = Util.getDataLogin();
        if (account == null) return;

        setAccount(account);
    }, []);

    return (
        <>
            <Toaster
                containerStyle={{
                    position: 'fixed',
                    zIndex: 10000000000,
                }}
                position="top-center"
                reverseOrder={false}
            />
            {/* <motion.div
                className={`fixed top-[3.1rem] z-50  `rounded-r-lg h-[4px] left-0 right-0 bg-btn-primary`}
                style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
            ></motion.div> */}
            <motion.div ref={ref} className="bg-transparent select-none">
                <AnimatePresence mode="wait">
                    <motion.div className=" transition-all dark:bg-dark bg-light dark:text-dark text-light  ">
                        <ConfigRoute></ConfigRoute>
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </>
    );
}

export default App;
