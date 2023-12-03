import { lazy } from 'react';

import Constants from '../Constants';
import DetailProduct from '../layout/Global/DetailProduct';
import OrderDetail from '../layout/Admin/Scene/Order/Detail';
import Question from '../layout/Admin/Scene/Question';
const Admin = lazy(() => import('../layout/Admin'));
const Member = lazy(() => import('../layout/Admin/Scene/Member'));
const DashBoard = lazy(() => import('../layout/Admin/Scene/DashBoard'));
const Product = lazy(() => import('../layout/Admin/Scene/Product'));
const AddProduct = lazy(() => import('../layout/Admin/Scene/Product/Add'));
const EditProduct = lazy(() => import('../layout/Admin/Scene/Product/Edit'));
const ManagerOrder = lazy(() => import('../layout/Admin/Scene/Order/Manager/index'));
const OrderInvoice = lazy(() => import('../layout/Admin/Scene/Order/Invoice/index'));

const BlogManger = lazy(() => import('../layout/Admin/Scene/Blog/Manager'));
const AddBlog = lazy(() => import('../layout/Admin/Scene/Blog/Add'));
const EditBlog = lazy(() => import('../layout/Admin/Scene/Blog/Edit'));
const DetailBlog = lazy(() => import('../layout/Global/DetailBlog'));

export const AdminRoutes = [
    {
        path: Constants.ADMIN_MEMBER,
        component: (
            <Admin>
                <Member />
            </Admin>
        ),
    },
    {
        path: Constants.ADMIN_ORDER,
        component: (
            <Admin>
                <ManagerOrder />
            </Admin>
        ),
    },
    {
        path: Constants.ADMIN_ORDER_DETAIL + '/:id',
        component: (
            <Admin>
                <OrderDetail />
            </Admin>
        ),
    },
    {
        path: Constants.ADMIN_ORDER_INVOICE + '/:id',
        component: (
            <Admin>
                <OrderInvoice />
            </Admin>
        ),
    },
    {
        path: Constants.ADMIN_QUESTION,
        component: (
            <Admin>
                <Question />
            </Admin>
        ),
    },
    {
        path: Constants.ADMIN_PRODUCT,
        component: (
            <Admin>
                <Product />
            </Admin>
        ),
    },
    {
        path: Constants.ADMIN_EDIT_PRODUCT + '/:id',
        component: (
            <Admin>
                <EditProduct />
            </Admin>
        ),
    },

    {
        path: Constants.ADMIN_DETAIL_PRODUCT + '/:id',
        component: (
            <Admin>
                <DetailProduct />
            </Admin>
        ),
    },
    {
        path: Constants.ADMIN_ADD_PRODUCT,
        component: (
            <Admin>
                <AddProduct />
            </Admin>
        ),
    },
    {
        path: Constants.ADMIN_BOG,
        component: (
            <Admin>
                <BlogManger />
            </Admin>
        ),
    },
    {
        path: Constants.ADMIN_DETAIL_BLOG + '/:id',
        component: (
            <Admin>
                <DetailBlog />
            </Admin>
        ),
    },
    {
        path: Constants.ADMIN_ADD_BLOG,
        component: (
            <Admin>
                <AddBlog />
            </Admin>
        ),
    },
    {
        path: Constants.ADMIN_EDIT_BLOG + '/:id',
        component: (
            <Admin>
                <EditBlog />
            </Admin>
        ),
    },
    {
        path: Constants.ADMIN_BLOG,
        component: (
            <Admin>
                <BlogManger />
            </Admin>
        ),
    },
    {
        path: Constants.ADMIN,
        component: (
            <Admin>
                <DashBoard />
            </Admin>
        ),
    },
];
