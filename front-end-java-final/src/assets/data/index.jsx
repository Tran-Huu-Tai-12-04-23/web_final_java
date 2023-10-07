import {
    CiLogout,
    CiShoppingCart,
    CiFaceSmile,
    CiHeart,
    CiFacebook,
    CiInstagram,
    CiShoppingBasket,
} from 'react-icons/ci';

import shipping from '../img/shipping.png';
import policy from '../img/policy.png';
import product from '../img/product.png';
import { AnimateHover } from '../../components/Animate';

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

const ContactSocial = [
    {
        name: 'Facebook',
        icon: <CiFacebook className="h-8 w-8"></CiFacebook>,
    },

    {
        name: 'Instagram',
        icon: <CiInstagram className="h-8 w-8"></CiInstagram>,
    },
    {
        name: 'ShoppingBasket',
        icon: <CiShoppingBasket className="h-8 w-8"></CiShoppingBasket>,
    },
];

const HomeService = [
    {
        name: 'Reliable Shipping',
        description:
            'Green Society provides Canada Post express Shipping right to your doorstep! You can also opt in for shipping insurance. For orders over $149, shipping is free!',
        icon: (
            <AnimateHover className={'h-[10rem] rounded-full w-[20rem] mr-4 overflow-hidden'}>
                <img
                    src={shipping}
                    alt="shipping"
                    className="w-full border-solid hover:border-primary border-transparent border-[1px] bg-white mb-10 rounded-full "
                ></img>
            </AnimateHover>
        ),
    },
    {
        name: 'You’re Safe With Us',
        description:
            'Our secure payment system accepts the most common forms of payments making the checkout process quicker! The payments we accept are debit, all major credit cards, and cryptocurrency.',
        icon: (
            <AnimateHover className={'h-[10rem] rounded-full w-[20rem] mr-4 overflow-hidden'}>
                <img
                    src={policy}
                    alt="policy"
                    className="w-full border-solid hover:border-primary border-transparent border-[1px] bg-white mb-10 rounded-full "
                ></img>
            </AnimateHover>
        ),
    },
    {
        name: 'Best Quality & Pricing',
        description:
            'Here at our shop, we take pride in the quality of our products and service. Our prices are set to ensure you receive your order at a reasonable price and safely.',
        icon: (
            <AnimateHover className={'h-[10rem] rounded-full w-[20rem] mr-4 overflow-hidden'}>
                <img
                    src={product}
                    alt="product"
                    className="w-full border-solid hover:border-primary border-transparent border-[1px] bg-white mb-10 rounded-full "
                ></img>
            </AnimateHover>
        ),
    },
];

const Category = [
    {
        name: 'Accessories',
        linkImg:
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/g/r/group_182_1__3.png',
    },
    {
        name: 'Camera',
        linkImg:
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/c/a/camera-hanh-trinh-gopro-hero-12_3_.png',
    },
    {
        name: 'Laptop',
        linkImg:
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_31__5.png',
    },
    {
        name: 'Smart Phone',
        linkImg:
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/g/a/galaxy-z-fold-5-xanh-1.jpg',
    },
    {
        name: 'Gaming',
        linkImg:
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/g/r/group_8_2__1.png',
    },
    {
        name: 'Smart Watch',
        linkImg:
            'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/w/a/watch6_thumbnail.png',
    },
];

export { NavHeader, UserMenu, ContactSocial, HomeService, Category };
