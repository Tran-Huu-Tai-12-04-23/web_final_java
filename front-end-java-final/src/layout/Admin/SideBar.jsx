import { motion } from 'framer-motion';

import { MenuItem } from '../../components';
import { AnimateHover } from '../../components/Animate';

import { IoExitOutline } from 'react-icons/io5';
import { GoHome, GoCodeReview } from 'react-icons/go';
import { FiUser } from 'react-icons/fi';
import { PiSealQuestionLight, PiShoppingCartSimpleLight, PiBankLight } from 'react-icons/pi';
import { AiFillThunderbolt, AiOutlineFileProtect, AiOutlineBarChart, AiOutlineAppstoreAdd } from 'react-icons/ai';
import { SiGoogletagmanager } from 'react-icons/si';
import { IoMdAdd } from 'react-icons/io';

const variants = {
    open: { x: 0 },
    closed: { x: '-100%' },
};

function SideBar({ activeSidebar, setOder, order }) {
    const navigate = [
        {
            name: 'DashBoard',
            icon: <GoHome className="text-xl"></GoHome>,
            order: 1,
        },
        {
            name: 'Members',
            icon: <FiUser className="text-xl"></FiUser>,
            order: 2,
        },
        {
            name: 'Products',
            icon: <AiFillThunderbolt className="text-xl"></AiFillThunderbolt>,
            order: 3,
            submenu: [
                {
                    name: 'Manager',
                    icon: <SiGoogletagmanager className="text-xl"></SiGoogletagmanager>,
                    order: 1,
                },
                {
                    name: 'Add product',
                    icon: <IoMdAdd className="text-xl"></IoMdAdd>,
                    order: 2,
                },
            ],
        },
        {
            name: 'Orders',
            icon: <PiShoppingCartSimpleLight className="text-xl"></PiShoppingCartSimpleLight>,
            order: 4,
            submenu: [
                {
                    name: 'Create Member',
                    icon: <GoHome className="text-xl"></GoHome>,
                    order: 1,
                },
                {
                    name: 'Members',
                    icon: <GoHome className="text-xl"></GoHome>,
                    order: 2,
                },
                {
                    name: 'Members Is Delete',
                    icon: <GoHome className="text-xl"></GoHome>,
                    order: 3,
                },
            ],
        },
        {
            name: 'Reviews',
            icon: <GoCodeReview className="text-xl"></GoCodeReview>,
            order: 5,
            submenu: [
                {
                    name: 'Create Member',
                    icon: <GoHome className="text-xl"></GoHome>,
                    order: 1,
                },
                {
                    name: 'Members',
                    icon: <GoHome className="text-xl"></GoHome>,
                    order: 2,
                },
                {
                    name: 'Members Is Delete',
                    icon: <GoHome className="text-xl"></GoHome>,
                    order: 3,
                },
            ],
        },
        {
            name: 'Questions',
            icon: <PiSealQuestionLight className="text-xl"></PiSealQuestionLight>,
            order: 6,
            submenu: [
                {
                    name: 'Create Member',
                    icon: <GoHome className="text-xl"></GoHome>,
                    order: 1,
                },
                {
                    name: 'Members',
                    icon: <GoHome className="text-xl"></GoHome>,
                    order: 2,
                },
                {
                    name: 'Members Is Delete',
                    icon: <GoHome className="text-xl"></GoHome>,
                    order: 3,
                },
            ],
        },
        {
            name: 'Guarantee',
            icon: <AiOutlineFileProtect className="text-xl"></AiOutlineFileProtect>,
            order: 7,
        },
        {
            name: 'Bank setting',
            icon: <PiBankLight className="text-xl"></PiBankLight>,
            order: 8,
        },
        {
            name: 'Charts',
            icon: <AiOutlineBarChart className="text-xl"></AiOutlineBarChart>,
            order: 9,
        },
    ];
    return (
        <motion.div
            className="relative select-none shadow-xl flex flex-col justify-between items-start dark:text-dark text-light  dark:bg-dark bg-white h-screen min-w-[15rem] w-1/5 p-4"
            animate={activeSidebar ? 'open' : 'closed'}
            variants={variants}
        >
            <h1 className="mb-10 text-xl  font-bold font-mono border-b-4 border-solid border-primary w-fit">
                Dashboard Admin
            </h1>
            <div className="h-full w-full">
                {navigate.map((nav, index) => {
                    return (
                        <MenuItem
                            key={index}
                            handleOnClickSubMenu={(value) => {
                                setOder((prev) => {
                                    return {
                                        menu: prev.menu,
                                        submenu: value,
                                    };
                                });
                            }}
                            onClick={(e) =>
                                setOder((prev) => {
                                    if (prev.menu === nav.order) {
                                        return {
                                            menu: nav.order,
                                            submenu: prev.submenu,
                                        };
                                    } else {
                                        return {
                                            menu: nav.order,
                                            submenu: 1,
                                        };
                                    }
                                })
                            }
                            active={order.menu === nav.order}
                            data={nav}
                            submenu={(nav.submenu && nav.submenu) || []}
                            activeSubmenu={order.submenu}
                        ></MenuItem>
                    );
                })}
            </div>
            <AnimateHover className={'flex justify-start items-center hover:text-primary cursor-pointer'}>
                <IoExitOutline className="h-6 mr-2 hover:text-primary cursor-pointer w-6 ml-2 "></IoExitOutline>
                <span>Eixt</span>
            </AnimateHover>
        </motion.div>
    );
}

export default SideBar;
