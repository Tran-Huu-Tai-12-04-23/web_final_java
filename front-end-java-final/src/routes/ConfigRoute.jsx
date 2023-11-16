import React, { Suspense, lazy } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import { Loading, Modal } from '../components';

import { MainRoutes } from './UserRoutes';
import { AdminRoutes } from './AdminRoutes';
import Constants from '../Constants';
import Parent from '../test/parent';

const Login = lazy(() => import('../layout/Admin/Scene/Login'));

const ConfigRoute = () => {
    return (
        <>
            <Suspense
                fallback={
                    <Modal className="bg-dark">
                        <Loading></Loading>
                    </Modal>
                }
            >
                <BrowserRouter>
                    <Routes>
                        {MainRoutes.map((rou, index) => {
                            return <Route key={index} path={rou.path} index element={rou.component} />;
                        })}

                        {AdminRoutes.map((rou, index) => {
                            return <Route key={index} path={rou.path} index element={rou.component} />;
                        })}

                        <Route path={Constants.ADMIN_LOGIN} element={<Login></Login>} />
                        <Route path="/test" element={<Parent> </Parent>} />
                        <Route
                            path="*"
                            element={
                                <div>
                                    <h1>Page not found</h1>
                                </div>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </Suspense>
        </>
    );
};

export default ConfigRoute;
