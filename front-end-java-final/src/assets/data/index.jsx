import { CiLogout, CiShoppingCart, CiFaceSmile, CiHeart } from 'react-icons/ci';

const NavHeader = [
    {
        name: 'Home',
        path: '/',
        subNav: [],
    },
    {
        name: 'Products',
        path: '/products',
        subNav: [],
    },
    {
        name: 'Blog',
        path: '/blogs',
        subNav: [],
    },
    {
        name: 'FAQ',
        path: '/faq',
        subNav: [],
    },
    {
        name: 'Contact US',
        path: '/contact',
        subNav: [],
    },
];

const UserMenu = [
    {
        name: 'Tran Huu Tai',
        icon: <CiFaceSmile className="h-6 w-6" />,
        path: '/account',
    },
    {
        name: 'Orders',
        icon: <CiShoppingCart className="h-6 w-6" />,
        path: '/cart',
    },
    {
        name: 'With lists',
        path: '/list-favorites',
        icon: <CiHeart className="h-6 w-6" />,
    },
    {
        name: 'Sign Out',
        path: '/sign-out',
        icon: <CiLogout className="h-6 w-6" />,
    },
];

export { NavHeader, UserMenu };
