import React, { lazy, Suspense } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';

import { Loading, Modal } from '../components';
import Constants from '../Constants';
import DetailProduct from '../layout/Global/Detail-product';

const Home = lazy(() => import('../layout/Home'));
const Sign = lazy(() => import('../layout/Sign'));
const Contact = lazy(() => import('../layout/Contact'));
const FAQs = lazy(() => import('../layout/FAQs'));
const ProductUser = lazy(() => import('../layout/Product'));

const Admin = lazy(() => import('../layout/Admin'));
const Member = lazy(() => import('../layout/Admin/Scene/Member'));
const DashBoard = lazy(() => import('../layout/Admin/Scene/DashBoard'));
const Product = lazy(() => import('../layout/Admin/Scene/Product'));
const AddProduct = lazy(() => import('../layout/Admin/Scene/Product/Add'));
const EditProduct = lazy(() => import('../layout/Admin/Scene/Product/Edit'));

const ConfigRoute = () => {
    return (
        <Suspense
            fallback={
                <Modal className="bg-dark">
                    <Loading></Loading>
                </Modal>
            }
        >
            <BrowserRouter>
                <Routes>
                    <Route
                        path="*"
                        element={
                            <div>
                                <h1>Page not found</h1>
                            </div>
                        }
                    />

                    <Route
                        index
                        element={
                            <MainLayout>
                                <Home />
                            </MainLayout>
                        }
                    />
                    <Route
                        path="contact"
                        index
                        element={
                            <MainLayout>
                                <Contact />
                            </MainLayout>
                        }
                    />
                    <Route
                        path="faq"
                        index
                        element={
                            <MainLayout>
                                <FAQs />
                            </MainLayout>
                        }
                    />
                    <Route
                        path="products"
                        index
                        element={
                            <MainLayout>
                                <ProductUser />
                            </MainLayout>
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
                        path={Constants.ADMIN_MEMBER}
                        element={
                            <Admin>
                                <Member />
                            </Admin>
                        }
                    />
                    <Route
                        path={Constants.ADMIN_PRODUCT}
                        element={
                            <Admin>
                                <Product />
                            </Admin>
                        }
                    />
                    <Route
                        path={Constants.ADMIN_EDIT_PRODUCT + '/:id'}
                        element={
                            <Admin>
                                <EditProduct />
                            </Admin>
                        }
                    />
                    <Route
                        path={Constants.ADMIN_DETAIL_PRODUCT + '/:id'}
                        element={
                            <Admin>
                                <DetailProduct />
                            </Admin>
                        }
                    />

                    <Route
                        path={Constants.ADMIN_ADD_PRODUCT}
                        element={
                            <Admin>
                                <AddProduct />
                            </Admin>
                        }
                    />
                    <Route
                        path={Constants.ADMIN}
                        element={
                            <Admin>
                                <DashBoard />
                            </Admin>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </Suspense>
    );
};

export default ConfigRoute;
