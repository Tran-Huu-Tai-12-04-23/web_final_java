import { lazy, Suspense } from 'react';

import { motion } from 'framer-motion';
import Header from './Header';
const DashBoard = lazy(() => import('./Scene/DashBoard'));
const ManagerMember = lazy(() => import('./Scene/Member'));
const ManagerProduct = lazy(() => import('./Scene/Product'));

const variants = {
    open: { width: '100vw', x: '-15rem' },
    closed: { width: 'calc(100vw - 15rem)', x: 0 },
};
function MainBoard({ activeSidebar, setActiveSidebar, order, setOrder }) {
    return (
        <motion.div
            initial={{
                width: 'calc(100vw - 15rem)',
            }}
            variants={variants}
            className="flex-shrink-0 text-black max-h-screen overflow-auto  "
            animate={activeSidebar ? 'closed' : 'open'}
        >
            <Header activeSidebar={activeSidebar} setActiveSidebar={setActiveSidebar}></Header>

            <div className=" select-none dark:text-dark text-light  dark:bg-dark-second bg-light-second p-10">
                <Suspense fallback={<div> loading...</div>}>
                    {order.menu === 1 && <DashBoard></DashBoard>}
                    {order.menu === 2 && <ManagerMember></ManagerMember>}
                    {order.menu === 3 && (
                        <ManagerProduct
                            setActiveSidebar={setActiveSidebar}
                            setOrder={setOrder}
                            order={order}
                        ></ManagerProduct>
                    )}
                </Suspense>
            </div>
        </motion.div>
    );
}

export default MainBoard;
