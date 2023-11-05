import { lazy } from 'react';

import Constants from '../Constants';
import DetailProduct from '../layout/Global/Detail-product';
const Admin = lazy(() => import('../layout/Admin'));
const Member = lazy(() => import('../layout/Admin/Scene/Member'));
const DashBoard = lazy(() => import('../layout/Admin/Scene/DashBoard'));
const Product = lazy(() => import('../layout/Admin/Scene/Product'));
const AddProduct = lazy(() => import('../layout/Admin/Scene/Product/Add'));
const EditProduct = lazy(() => import('../layout/Admin/Scene/Product/Edit'));

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
        path: Constants.ADMIN,
        component: (
            <Admin>
                <DashBoard />
            </Admin>
        ),
    },
];
