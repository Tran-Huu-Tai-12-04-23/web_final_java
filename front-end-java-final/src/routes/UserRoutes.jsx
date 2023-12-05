import { lazy } from 'react';
import Constants from '../Constants';
import MainLayout from '../layout/MainLayout';
<<<<<<< HEAD
=======
import UserAssessLayout from '../layout/UserAssessLayout';
>>>>>>> main

const Home = lazy(() => import('../layout/Home'));
const Contact = lazy(() => import('../layout/Contact'));
const FAQs = lazy(() => import('../layout/FAQs'));
const ProductUser = lazy(() => import('../layout/Product'));
const Blog = lazy(() => import('../layout/Blog'));
const Cart = lazy(() => import('../layout/Cart'));
const DetailProductUser = lazy(() => import('../layout/DetailProductUser'));
const Account = lazy(() => import('../layout/Account'));
const AccountInfo = lazy(() => import('../layout/Account/Scene/AccountInfo'));
const AccountAddress = lazy(() => import('../layout/Account/Scene/AccountAddress'));
const AccountChangePassword = lazy(() => import('../layout/Account/Scene/AccountChangePassword'));
const AccountOrder = lazy(() => import('../layout/Account/Scene/AccountOrder'));
const AccountNotification = lazy(() => import('../layout/Account/Scene/AccountNotification'));
const AccountOrderDetail = lazy(() => import('../layout/Account/Scene/AccountOrderDetail'));
const DetailBlog = lazy(() => import('../layout/Global/DetailBlog'));

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
        path: Constants.ACCOUNT_INFO,
        component: (
<<<<<<< HEAD
            <MainLayout>
                <Account>
                    <AccountInfo />
                </Account>
            </MainLayout>
=======
            <UserAssessLayout>
                <MainLayout>
                    <Account>
                        <AccountInfo />
                    </Account>
                </MainLayout>
            </UserAssessLayout>
>>>>>>> main
        ),
    },
    {
        path: Constants.ACCOUNT_ADDRESS,
        component: (
<<<<<<< HEAD
            <MainLayout>
                <Account>
                    <AccountAddress />
                </Account>
            </MainLayout>
=======
            <UserAssessLayout>
                <MainLayout>
                    <Account>
                        <AccountAddress />
                    </Account>
                </MainLayout>
            </UserAssessLayout>
>>>>>>> main
        ),
    },
    {
        path: Constants.ACCOUNT_CHANGE_PASSWORD,
        component: (
<<<<<<< HEAD
            <MainLayout>
                <Account>
                    <AccountChangePassword />
                </Account>
            </MainLayout>
=======
            <UserAssessLayout>
                <MainLayout>
                    <Account>
                        <AccountChangePassword />
                    </Account>
                </MainLayout>
            </UserAssessLayout>
>>>>>>> main
        ),
    },
    {
        path: Constants.ACCOUNT_ORDER,
        component: (
<<<<<<< HEAD
            <MainLayout>
                <Account>
                    <AccountOrder />
                </Account>
            </MainLayout>
=======
            <UserAssessLayout>
                <MainLayout>
                    <Account>
                        <AccountOrder />
                    </Account>
                </MainLayout>
            </UserAssessLayout>
>>>>>>> main
        ),
    },
    {
        path: Constants.ACCOUNT_ORDER + '/:id',
        component: (
<<<<<<< HEAD
            <MainLayout>
                <Account>
                    <AccountOrderDetail />
                </Account>
            </MainLayout>
=======
            <UserAssessLayout>
                <MainLayout>
                    <Account>
                        <AccountOrderDetail />
                    </Account>
                </MainLayout>
            </UserAssessLayout>
>>>>>>> main
        ),
    },
    {
        path: Constants.ACCOUNT_NOTIFICATION,
        component: (
<<<<<<< HEAD
            <MainLayout>
                <Account>
                    <AccountNotification />
                </Account>
            </MainLayout>
=======
            <UserAssessLayout>
                <MainLayout>
                    <Account>
                        <AccountNotification />
                    </Account>
                </MainLayout>
            </UserAssessLayout>
>>>>>>> main
        ),
    },
    {
        path: Constants.ACCOUNT_PAYMENT_INSTALLMENT,
        component: <div></div>,
    },
    {
        path: Constants.ACCOUNT_WISHLIST,
        component: <div></div>,
    },
    {
        path: Constants.ACCOUNT_SECURITY_ACCESS,
        component: <div></div>,
    },
    {
        path: Constants.ACCOUNT_NOTIFICATION,
        component: <div></div>,
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
        path: Constants.PRODUCT + '/:id',
        component: (
            <MainLayout>
                <DetailProductUser />
            </MainLayout>
        ),
    },
    {
        path: Constants.CART,
        component: (
<<<<<<< HEAD
            <MainLayout>
                <Cart />
            </MainLayout>
=======
            <UserAssessLayout>
                <MainLayout>
                    <Cart />
                </MainLayout>
            </UserAssessLayout>
>>>>>>> main
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
        path: Constants.BLOGS + '/:id',
        component: (
            <MainLayout>
                <DetailBlog />
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
