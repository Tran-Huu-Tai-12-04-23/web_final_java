import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { NavHeader, UserMenu } from '../../assets/data';
import logo from '../../assets/img/logo.png';
import { CiUser, CiSearch, CiShoppingBasket, CiBrightnessDown, CiCloudMoon } from 'react-icons/ci';

import MenuUser from './MenuUser';
import { AnimateHover, AnimateText } from '../Animate';
import { useTheme } from '../../context/theme';
import { useLogin } from '../../context/login';

import { motion } from 'framer-motion';
import { ModalSearch, Button } from '../index';
import ModalSign from './ModalSign';
import Util from '../../utils/Util';
import toast from 'react-hot-toast';
import Constants from '../../Constants';

import { BsArrowRightShort } from 'react-icons/bs';
import { request } from '../../services';

function Header() {
    const { theme, setTheme } = useTheme();
    const { account, setAccount } = useLogin();
    const [menuUser, setMenuUser] = useState(false);
    const [modalSearch, setModalSearch] = useState(false);
    const [modalSign, setModalSign] = useState(false);
    const location = useLocation();
    const history = useNavigate();
    const [activeNav, setActiveNav] = useState(0);
    const [sizeCart, setSizeCart] = useState(0);

    useEffect(() => {
        const pathName = location.pathname;

        switch (pathName) {
            case Constants.PRODUCT: {
                setActiveNav(1);
                break;
            }
            case Constants.BLOGS: {
                setActiveNav(2);
                break;
            }
            case Constants.FAQ: {
                setActiveNav(3);
                break;
            }
            case Constants.CONTACT: {
                setActiveNav(4);
                break;
            }
            default: {
                setActiveNav(0);
            }
        }
    }, [location]);

    useEffect(() => {
        const getSizeCart = async () => {
            request('GET', '/api/v1/user/cart/size?mId=' + account?.memberId)
                .then((res) => {
                    setSizeCart(res.data);
                })
                .catch((err) => {});
        };
        if (account) {
            getSizeCart();
        }
    }, [account]);
    const renderHeader = () => {
        return NavHeader.map((item, index) => {
            return (
                <Link
                    to={item.path}
                    key={index}
                    className={`${
                        index === activeNav ? 'text-primary' : 'text-light dark:text-dark'
                    }  relative group hover:text-hover dark:hover:text-hover cursor-pointer rounded-md px-3 py-2 text-sm`}
                >
                    {item.name}
                </Link>
            );
        });
    };

    const renderHeaderIcon = () => {
        return NavHeader.map((item, index) => {
            return (
                <Button
                    key={index}
                    onClick={() => {
                        history(item.path);
                    }}
                    className="w-1/5 text-white flex flex-col justify-center items-center dark:text-dark hover:text-hover dark:hover:text-hover cursor-pointer rounded-md px-3 py-2 text-sm"
                >
                    {item.icon}
                    <span>{item.name}</span>
                </Button>
            );
        });
    };

    const renderUserMenu = () => {
        return UserMenu.map((item, index) => {
            return (
                <Button
                    to={item.path}
                    key={index}
                    onClick={() => {
                        if (item.name.toLowerCase() === 'sign out') {
                            setAccount(null);
                            Util.logOut();
                            toast.success('Log out successfully!');
                        } else {
                            history(item.path);
                        }
                    }}
                    className={`${
                        index === UserMenu.length - 1 && 'rounded-b-lg '
                    } flex w-full min-w-[12rem] justify-start items-center hover:text-hover dark:bg-bg-dark-menu bg-bg-light-menu backdrop-blur-lg pl-4 pr-4 p-2 text-sm hover:brightness-150 dark:hover:bg-dark-hover hover:bg-light-hover`}
                >
                    {item.icon}
                    <span className="ml-2">{item.name}</span>
                </Button>
            );
        });
    };

    return (
        <>
            {modalSign && <ModalSign onClose={(e) => setModalSign(!modalSign)} setAccount={setAccount}></ModalSign>}

            <div
                onClick={(e) => e.stopPropagation()}
                className={
                    'pl-10 pr-10 flex z-50 shadow-md items-center justify-between bg-bg-light-menu dark:bg-dark backdrop-blur-3xl border-header border-b-[3px] border-solid fixed top-0 left-0 right-0'
                }
            >
                <Link to="/">
                    <img src={logo} alt="Logo" className="h-logo w-logo" />
                </Link>
                <div className="xl:flex lg:flex md:flex space-x-4 hidden ">{renderHeader()}</div>
                <div className="fixed xl:hidden lg:hidden md:hidden bottom-0 left-0 right-0 min-h-10 bg-primary backdrop-blur-md flex justify-center items-center">
                    {renderHeaderIcon()}
                </div>
                <div className="flex justify-end items-center">
                    <AnimateHover onClick={(e) => setModalSearch(!modalSearch)}>
                        <CiSearch className="h-6 w-6 mr-2 cursor-pointer hover:text-hover"></CiSearch>
                    </AnimateHover>

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
                    {account === null && (
                        <Button className="ml-5 pt-1 pb-1" style="outline" onClick={(e) => setModalSign(true)}>
                            MUA NGAY
                        </Button>
                    )}

                    {account !== null && (
                        <AnimateHover>
                            <motion.div onClick={() => history('/cart')} className="relative">
                                <CiShoppingBasket className="h-6 w-6 mr-2 cursor-pointer hover:text-hover"></CiShoppingBasket>
                                {sizeCart > 0 && (
                                    <motion.div
                                        className="absolute p-3 text-sm bg-primary -top-2 rounded-full h-4 w-4 flex justify-center items-center right-0"
                                        color="pink"
                                    >
                                        {sizeCart}
                                    </motion.div>
                                )}
                            </motion.div>
                        </AnimateHover>
                    )}

                    {account !== null && (
                        <div
                            className="relative group"
                            onMouseEnter={(e) => setMenuUser(true)}
                            onMouseLeave={(e) => setMenuUser(false)}
                        >
                            <AnimateHover>
                                <CiUser className="h-6 w-6 cursor-pointer hover:text-hover"></CiUser>
                            </AnimateHover>
                            <div className="group-hover:block hidden bg-transparent absolute w-[8rem] h-4 top-[100%] right-0"></div>
                        </div>
                    )}
                </div>
                {menuUser && (
                    <MenuUser
                        handleOpen={() => setMenuUser(true)}
                        handleClose={() => setMenuUser(false)}
                        items={renderUserMenu()}
                    ></MenuUser>
                )}
            </div>
            {modalSearch && <ModalSearch onClose={(e) => setModalSearch(!modalSearch)} />}
        </>
    );
}

export default Header;
