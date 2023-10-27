import { useState } from 'react';

import { motion } from 'framer-motion';
import SideBar from './SideBar';
import MainBoard from './MainBoard';

function Admin({}) {
    const [activeSidebar, setActiveSidebar] = useState(true);
    const [order, setOder] = useState({
        menu: 1,
        subMenu: null,
    });

    console.log(order);
    return (
        <motion.div className="flex select-none justify-start h-screen w-screen overflow-hidden  dark:text-dark text-light  dark:bg-dark bg-white">
            <SideBar setOder={setOder} order={order} activeSidebar={activeSidebar}></SideBar>
            <MainBoard
                order={order}
                setOrder={setOder}
                activeSidebar={activeSidebar}
                setActiveSidebar={setActiveSidebar}
            ></MainBoard>
        </motion.div>
    );
}

export default Admin;
