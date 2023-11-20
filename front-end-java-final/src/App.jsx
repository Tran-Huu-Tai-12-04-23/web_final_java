import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { Loading, Modal } from './components';
import {  AccountLayout, AccountWishlist, MainLayout } from './layout';
import { useTheme } from './context/theme';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const Home = lazy(() => import('./layout/Home'));
const Admin = lazy(() => import('./layout/Admin'));
const Sign = lazy(() => import('./layout/Sign'));
const Contact = lazy(() => import('./layout/Contact'));
const FAQs = lazy(() => import('./layout/FAQs'));
const AccountInfo = lazy(() => import('./layout/AccountInfo'));
const AccountInstallment = lazy(() => import('./layout/AccountInstallment'));
const AccountOrder = lazy(() => import('./layout/AccountOrder'));
// const AccountWishlist = lazy(() => import('./layout/AccountWishlist'));
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
            {/* <motion.div
                className={`fixed top-[3.1rem] z-50  rounded-r-lg h-[4px] left-0 right-0 bg-btn-primary`}
                style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
            ></motion.div> */}
            <motion.div ref={ref} className="">
                <Toaster position="top-center" reverseOrder={false} />
                <AnimatePresence mode="wait">
                    <motion.div className=" transition-all dark:bg-dark bg-light dark:text-dark text-light  ">
                        <Suspense
                            fallback={
                                <Modal className="dark:bg-dark bg-light">
                                    <Loading></Loading>
                                </Modal>
                            }
                        >
                            <BrowserRouter>
                                <Routes>
                                    <Route
                                        index
                                        element={
                                            <MainLayout>
                                                <Home />
                                            </MainLayout>
                                        }
                                    />
                                    <Route path="admin" element={<Admin />} />
                                    <Route path="contact"
                                        index
                                        element={
                                            <MainLayout>
                                                <Contact />
                                            </MainLayout>
                                        }
                                    />
                                    <Route path="faq"
                                        index
                                        element={
                                            <MainLayout>
                                                <FAQs />
                                            </MainLayout>
                                        }
                                    />
                                    <Route path="account"
                                        index
                                        element={
                                            <AccountLayout>
                                                <AccountInfo></AccountInfo>
                                            </AccountLayout>
                                        }
                                    />
                                    <Route
                                        path="sign"
                                        element={
                                            <MainLayout>
                                                <Sign />
                                            </MainLayout>
                                        }
                                    />
                                    <Route
                                        path="*"
                                        element={
                                            <MainLayout>
                                                <div>
                                                    <h1>Page not found</h1>
                                                </div>
                                            </MainLayout>
                                        }
                                    />
                                    <Route
                                    path='/payment-installment'
                                    element={
                                        <AccountLayout>
                                            <AccountInstallment></AccountInstallment>
                                        </AccountLayout>
                                    }
                                    >
                                    </Route>
                                    <Route
                                    path='orders'
                                    element={
                                        <AccountLayout>
                                            <AccountOrder></AccountOrder>
                                        </AccountLayout>
                                    }
                                    >
                                    </Route>
                                    <Route
                                    path='wishlist'
                                    element={
                                        <AccountLayout>
                                            <AccountWishlist></AccountWishlist>
                                        </AccountLayout>
                                    }
                                    ></Route>
                                </Routes>
                            </BrowserRouter>
                        </Suspense>
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </>
    );
}

export default App;
