import { motion } from 'framer-motion';
import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const variants = {
    active: { rotate: 0 },
    inActive: { rotate: 180 },
};

const variantsSubmenu = {
    open: { opacity: 1, display: 'flex', y: 1 },
    close: { opacity: 0, display: 'none', y: -20 },
};
function MenuItem({
    data,
    submenu = [],
    active = false,
    onClick = () => {},
    handleOnClickSubMenu = () => {},
    activeSubmenu,
}) {
    const [openSubmenu, setOpenSubmenu] = useState(true);

    return (
        <motion.div className="flex flex-col overflow-hidden items-start  w-full ">
            <motion.div
                onClick={() => {
                    onClick();
                    setOpenSubmenu(!openSubmenu);
                }}
                className={`${
                    active && 'bg-[rgba(168,85,247,0.1)] text-primary'
                } p-2 text-md w-full select-none hover:cursor-pointer hover:text-primary rounded-md hover:bg-[rgba(168,85,247,0.1)] flex justify-between items-center mt-4`}
            >
                <motion.div className="flex justify-start items-center">
                    {data.icon}
                    <span className="ml-4">{data.name}</span>
                </motion.div>

                {submenu.length > 0 && (
                    <motion.div
                        animate={active && openSubmenu ? 'active' : 'inActive'}
                        variants={variants}
                        transition={{
                            duration: 0.3,
                        }}
                    >
                        <IoIosArrowDown className="h-4 w-4"></IoIosArrowDown>
                    </motion.div>
                )}
            </motion.div>
            {submenu.length > 0 && (
                <motion.div
                    variants={variantsSubmenu}
                    transition={{
                        duration: 0.3,
                    }}
                    animate={active && activeSubmenu && openSubmenu ? 'open' : 'close'}
                    className="flex justify-center select-none w-full overflow-hidden items-start flex-col ml-4"
                >
                    {submenu.map((subm, index) => {
                        return (
                            <motion.div
                                onClick={() => handleOnClickSubMenu(subm.order)}
                                key={index}
                                className={`${
                                    activeSubmenu === subm.order && 'text-primary '
                                }w-full mt-2 hover:text-primary rounded-md cursor-pointer flex justify-start items-center p-2`}
                            >
                                {subm.icon}
                                <span className="ml-4">{subm.name}</span>
                            </motion.div>
                        );
                    })}
                </motion.div>
            )}
        </motion.div>
    );
}

export default MenuItem;
