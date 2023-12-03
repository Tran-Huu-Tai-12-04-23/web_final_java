import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import SideBar from './SideBar';
import MainBoard from './MainBoard';
import Constants from '../../Constants';

function Admin({ children }) {
    const [activeSidebar, setActiveSidebar] = useState(true);
    const history = useNavigate();
    const [order, setOrder] = useState({
        menu: 1,
        submenu: null,
    });

    const location = useLocation();

    useEffect(() => {
        const pathName = location.pathname;

        switch (pathName) {
            case Constants.ADMIN: {
                setOrder({
                    menu: 1,
                    submenu: null,
                });
                break;
            }
            case Constants.ADMIN_MEMBER: {
                setOrder({
                    menu: 2,
                    submenu: null,
                });
                break;
            }
            case Constants.ADMIN_PRODUCT: {
                setOrder({
                    menu: 3,
                    submenu: 1,
                });
                break;
            }
            case Constants.ADMIN_ADD_PRODUCT: {
                setOrder({
                    menu: 3,
                    submenu: 2,
                });
                break;
            }
            case Constants.ADMIN_ORDER: {
                setOrder({
                    menu: 4,
                    submenu: 1,
                });
                break;
            }
            case Constants.ADMIN_ORDER_DETAIL: {
                setOrder({
                    menu: 4,
                    submenu: null,
                });
                break;
            }
            case Constants.ADMIN_BLOG: {
                setOrder({
                    menu: 6,
                    submenu: 1,
                });
                break;
            }
            case Constants.ADMIN_ADD_BLOG: {
                setOrder({
                    menu: 6,
                    submenu: 2,
                });
                break;
            }
            case Constants.ADMIN_QUESTION: {
                setOrder({
                    menu: 7,
                    submenu: null,
                });
                break;
            }
            default: {
                setOrder({
                    menu: null,
                    submenu: null,
                });
            }
        }
    }, [location]);

    return (
        <motion.div className="flex select-none justify-start h-screen w-screen overflow-hidden  dark:text-dark text-light  dark:bg-dark bg-white">
            <SideBar setOrder={setOrder} order={order} activeSidebar={activeSidebar}></SideBar>
            <MainBoard
                order={order}
                setOrder={setOrder}
                activeSidebar={activeSidebar}
                setActiveSidebar={setActiveSidebar}
            >
                {children}
            </MainBoard>
        </motion.div>
    );
}

export default Admin;
