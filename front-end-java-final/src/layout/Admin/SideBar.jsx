import { useNavigate, useLocation } from 'react-router-dom';
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
import { BsPostcard } from 'react-icons/bs';

import Constants from '../../Constants';
import Util from '../../utils/Util';
import { useLogin } from '../../context/login';

const variants = {
    open: { x: 0 },
    closed: { x: '-100%' },
};

function SideBar({ activeSidebar, setOrder, order }) {
    const { setAccount } = useLogin();
    const location = useLocation();
    const history = useNavigate();
    const navigate = [
        {
            name: 'Bảng thống kê',
            icon: <GoHome className="text-xl"></GoHome>,
            order: 1,
            path: Constants.ADMIN,
        },
        {
            name: 'Thành viên',
            icon: <FiUser className="text-xl"></FiUser>,
            order: 2,
            path: Constants.ADMIN_MEMBER,
        },
        {
            name: 'Sản phẩm',
            icon: <AiFillThunderbolt className="text-xl"></AiFillThunderbolt>,
            order: 3,
            path: Constants.ADMIN_PRODUCT,
            submenu: [
                {
                    name: 'Quản lý',
                    path: Constants.ADMIN_PRODUCT,
                    icon: <SiGoogletagmanager className="text-xl"></SiGoogletagmanager>,
                    order: 1,
                },
                {
                    name: 'Thêm sản phẩm',
                    path: Constants.ADMIN_ADD_PRODUCT,
                    icon: <IoMdAdd className="text-xl"></IoMdAdd>,
                    order: 2,
                },
            ],
        },
        {
            name: 'Đơn hàng',
            path: '/admin/orders',
            icon: <PiShoppingCartSimpleLight className="text-xl"></PiShoppingCartSimpleLight>,
            order: 4,
        },

        {
            name: 'Blogs',
            icon: <BsPostcard className="text-xl"></BsPostcard>,
            order: 6,
            path: Constants.ADMIN_BLOG,
            submenu: [
                {
                    name: 'Quản lý',
                    path: Constants.ADMIN_BLOG,
                    icon: <SiGoogletagmanager className="text-xl"></SiGoogletagmanager>,
                    order: 1,
                },
                {
                    name: 'Thêm blog',
                    path: Constants.ADMIN_ADD_BLOG,
                    icon: <IoMdAdd className="text-xl"></IoMdAdd>,
                    order: 2,
                },
            ],
        },
        {
            name: 'Câu hỏi',
            path: '/admin/questions',
            icon: <PiSealQuestionLight className="text-xl"></PiSealQuestionLight>,
            order: 7,
            submenu: [],
        },
        {
            name: 'Chính sách bảo hành',
            path: '/admin/Guarantees',
            icon: <AiOutlineFileProtect className="text-xl"></AiOutlineFileProtect>,
            order: 8,
        },
        {
            name: 'Quản lý ngân hàng',
            path: '/admin/bank-setting',
            icon: <PiBankLight className="text-xl"></PiBankLight>,
            order: 9,
        },
        {
            name: 'Đồ thị',
            path: '/admin/chart',
            icon: <AiOutlineBarChart className="text-xl"></AiOutlineBarChart>,
            order: 10,
        },
    ];
    return (
        <motion.div
            className="relative select-none shadow-xl flex flex-col justify-between items-start dark:text-dark text-light  dark:bg-dark bg-white h-screen min-w-[15rem] w-1/5 p-4"
            animate={activeSidebar ? 'open' : 'closed'}
            variants={variants}
        >
            <h1 className="mb-10 text-xl  font-bold font-mono border-b-4 border-solid border-primary w-fit">
                Bảng thống kê Admin
            </h1>
            <div className="h-full w-full">
                {navigate.map((nav, index) => {
                    return (
                        <MenuItem
                            key={index}
                            handleOnClickSubMenu={(value) => {
                                setOrder((prev) => {
                                    return {
                                        ...prev,
                                        submenu: value.order,
                                    };
                                });
                                if (location.pathname != value.path) {
                                    history(value.path);
                                }
                            }}
                            onClick={(e) => {
                                setOrder((prev) => {
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
                                });
                                if (location.pathname != nav.path) {
                                    history(nav.path);
                                }
                            }}
                            active={order.menu === nav.order}
                            data={nav}
                            submenu={(nav.submenu && nav.submenu) || []}
                            activeSubmenu={order.submenu}
                        ></MenuItem>
                    );
                })}
            </div>
            <AnimateHover
                onClick={() => {
                    Util.logOut();
                    setAccount(null);
                    history(Constants.ADMIN_LOGIN);
                }}
                className={'flex justify-start items-center hover:text-primary cursor-pointer'}
            >
                <IoExitOutline className="h-6 mr-2 hover:text-primary cursor-pointer w-6 ml-2 "></IoExitOutline>
                <span>Thoát</span>
            </AnimateHover>
        </motion.div>
    );
}

export default SideBar;
