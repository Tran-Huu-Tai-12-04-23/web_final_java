import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '../../components';
import { AnimateHover, AnimateText } from '../../components/Animate';
import { useTheme } from '../../context/theme';
import FullScreen from './FullScreen';

import { CiBrightnessDown, CiCloudMoon } from 'react-icons/ci';
import { IoSearchOutline } from 'react-icons/io5';
import { AiOutlineMenu } from 'react-icons/ai';
import { IoIosNotificationsOutline } from 'react-icons/io';

function Header({ activeSidebar, setActiveSidebar }) {
    const { theme, setTheme } = useTheme();
    const [search, setSearch] = useState('');
    return (
        <motion.div
            className="w-full select-none z-50 flex sticky top-0 justify-between items-center transition-all p-4 shadow-xl  dark:text-dark text-light  dark:bg-dark bg-white"
            initial={{
                y: -300,
            }}
            animate={{
                y: 0,
            }}
            exit={{
                y: -300,
            }}
            transition={{
                duration: 0.3,
            }}
        >
            <div className="flex justify-start items-center">
                <AiOutlineMenu
                    onClick={() => setActiveSidebar(!activeSidebar)}
                    // onAuxClick={}
                    className={`text-xl mr-4 cursor-pointer hover:scale-110 transition-all ${
                        activeSidebar ? 'text-primary' : ''
                    }`}
                ></AiOutlineMenu>
                <Input
                    iconRight={
                        <AnimateHover>
                            <IoSearchOutline className="h-6 w-6 mr-2 hover:text-primary text-gray-600"></IoSearchOutline>
                        </AnimateHover>
                    }
                    placeholder={'Nhập keyword...'}
                ></Input>
            </div>

            <div className="flex justify-end items-center">
                {theme === 'light' ? (
                    <AnimateHover>
                        <AnimateText>
                            <CiBrightnessDown
                                onClick={() => {
                                    localStorage.setItem('theme', 'dark');
                                    setTheme('dark');
                                }}
                                className="h-6 w-6 mr-2 cursor-pointer hover:text-hover"
                            ></CiBrightnessDown>
                        </AnimateText>
                    </AnimateHover>
                ) : (
                    <AnimateHover>
                        <AnimateText>
                            <CiCloudMoon
                                onClick={() => {
                                    localStorage.setItem('theme', 'light');
                                    setTheme('light');
                                }}
                                className="h-6 w-6 mr-2 cursor-pointer hover:text-hover"
                            ></CiCloudMoon>
                        </AnimateText>
                    </AnimateHover>
                )}
                <IoIosNotificationsOutline className="text-3xl mr-3 cursor-pointer hover:text-primary hover:scale-125 transition-all " />
                <FullScreen></FullScreen>
                <h5 className="text-md font-bold font-mono mr-2 text-primary ml-4">Xin chào, Admin</h5>
                <img
                    className="rounded-full h-6 w-6 "
                    src={
                        'https://img.freepik.com/free-vector/man-look-graphic-chart-business-analytics-concept-big-data-processing-icon_39422-761.jpg?w=1060&t=st=1697813785~exp=1697814385~hmac=5cc67010778023d3f0cc7f943af3d7aeea4aa46d7896457d26304a3658d70837'
                    }
                    alt={''}
                ></img>
            </div>
        </motion.div>
    );
}

export default Header;
