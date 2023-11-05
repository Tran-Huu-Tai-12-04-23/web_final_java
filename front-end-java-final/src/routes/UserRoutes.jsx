import { lazy } from 'react';
import Constants from '../Constants';
import MainLayout from '../layout/MainLayout';

const Home = lazy(() => import('../layout/Home'));
const Contact = lazy(() => import('../layout/Contact'));
const FAQs = lazy(() => import('../layout/FAQs'));
const ProductUser = lazy(() => import('../layout/Product'));
const Blog = lazy(() => import('../layout/Blog'));
const Cart = lazy(() => import('../layout/Cart'));

export const MainRoutes = [
    {
        path: Constants.HOME,
        component: (
            <MainLayout>
                <Home />
            </MainLayout>
        ),
    },

    {
        path: Constants.PRODUCT,
        component: (
            <MainLayout>
                <ProductUser />
            </MainLayout>
        ),
    },
    {
        path: Constants.CART,
        component: (
            <MainLayout>
                <Cart />
            </MainLayout>
        ),
    },
    {
        path: Constants.BLOGS,
        component: (
            <MainLayout>
                <Blog />
            </MainLayout>
        ),
    },

    {
        path: Constants.FAQ,
        component: (
            <MainLayout>
                <FAQs />
            </MainLayout>
        ),
    },
    {
        path: Constants.CONTACT,
        component: (
            <MainLayout>
                <Contact />
            </MainLayout>
        ),
    },
];
