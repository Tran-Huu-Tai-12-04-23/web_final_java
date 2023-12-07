import { Suspense, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { motion } from 'framer-motion';
import Header from './Header';
import { useLogin } from '../../context/login';
import Constants from '../../Constants';

const variants = {
    open: { width: '100vw', x: '-15rem' },
    closed: { width: 'calc(100vw - 15rem)', x: 0 },
};
function MainBoard({ activeSidebar, setActiveSidebar, order, setOrder, children }) {
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

            <div className=" select-none dark:text-dark text-light  dark:bg-dark-second bg-light-second p-4">
                <Suspense fallback={<div> loading...</div>}>{children}</Suspense>
            </div>
        </motion.div>
    );
}

export default MainBoard;
