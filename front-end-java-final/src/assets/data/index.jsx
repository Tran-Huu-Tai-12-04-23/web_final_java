import {
    CiLogout,
    CiShoppingCart,
    CiFaceSmile,
    CiHeart,
    CiFacebook,
    CiInstagram,
    CiShoppingBasket,
    CiHome,
} from 'react-icons/ci';
import { RxHome } from 'react-icons/rx';
import { BiCategoryAlt } from 'react-icons/bi';
import { PiBookOpenTextDuotone } from 'react-icons/pi';
import { BsQuestionDiamond } from 'react-icons/bs';
import { TiContacts } from 'react-icons/ti';
import { MdEdit } from 'react-icons/md';
import { IoMdTrash } from 'react-icons/io';

import shipping from '../img/shipping.png';
import policy from '../img/policy.png';
import product from '../img/product.png';
import { AnimateHover } from '../../components/Animate';

const NavHeader = [
    {
        name: 'Home',
        path: '/',
        icon: <RxHome className="h-6 w-6"></RxHome>,
        subNav: [],
    },
    {
        name: 'Products',
        path: '/products',
        icon: <BiCategoryAlt className="h-6 w-6"></BiCategoryAlt>,
        subNav: [],
    },
    {
        name: 'Blog',
        path: '/blogs',
        icon: <PiBookOpenTextDuotone className="h-6 w-6"></PiBookOpenTextDuotone>,
        subNav: [],
    },
    {
        name: 'FAQ',
        path: '/faq',
        icon: <BsQuestionDiamond className="h-6 w-6"></BsQuestionDiamond>,
        subNav: [],
    },
    {
        name: 'Contact',
        path: '/contact',
        icon: <TiContacts className="h-6 w-6"></TiContacts>,
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

// data api hard

export const orderMembers = [
    {
        id: 1,
        isCancel: true,
        isDelete: true,
        orderStatus: 'Shipped',
        createAt: '10/4/2023',
        detailOrders: [
            {
                total: 185.59,
                product: {
                    id: 11,
                },
            },
            {
                total: 141.89,
                product: {
                    id: 43,
                },
            },
            {
                total: 517.06,
                product: {
                    id: 28,
                },
            },
            {
                total: 313.23,
                product: {
                    id: 8,
                },
            },
            {
                total: 373.52,
                product: {
                    id: 82,
                },
            },
        ],
        nameMember: 'John',
    },
    {
        id: 2,
        isCancel: true,
        isDelete: true,
        orderStatus: 'Completed',
        createAt: '9/30/2023',
        detailOrders: [
            {
                total: 558.8,
                product: {
                    id: 67,
                },
            },
            {
                total: 838.04,
                product: {
                    id: 98,
                },
            },
            {
                total: 387.52,
                product: {
                    id: 61,
                },
            },
            {
                total: 507.52,
                product: {
                    id: 62,
                },
            },
            {
                total: 136.84,
                product: {
                    id: 23,
                },
            },
        ],
        nameMember: 'Emma',
    },
    {
        id: 3,
        isCancel: true,
        isDelete: false,
        orderStatus: 'Delivered',
        createAt: '10/6/2023',
        detailOrders: [
            {
                total: 335.13,
                product: {
                    id: 60,
                },
            },
            {
                total: 802.33,
                product: {
                    id: 4,
                },
            },
            {
                total: 623.28,
                product: {
                    id: 96,
                },
            },
            {
                total: 445.68,
                product: {
                    id: 17,
                },
            },
            {
                total: 136.76,
                product: {
                    id: 2,
                },
            },
        ],
        nameMember: 'Sophia',
    },
    {
        id: 4,
        isCancel: false,
        isDelete: true,
        orderStatus: 'Delivered',
        createAt: '10/7/2023',
        detailOrders: [
            {
                total: 240.13,
                product: {
                    id: 51,
                },
            },
            {
                total: 927.69,
                product: {
                    id: 35,
                },
            },
            {
                total: 612.63,
                product: {
                    id: 46,
                },
            },
            {
                total: 391.25,
                product: {
                    id: 16,
                },
            },
            {
                total: 97.68,
                product: {
                    id: 30,
                },
            },
        ],
        nameMember: 'John',
    },
    {
        id: 5,
        isCancel: true,
        isDelete: false,
        orderStatus: 'Processing',
        createAt: '10/13/2023',
        detailOrders: [
            {
                total: 768.44,
                product: {
                    id: 18,
                },
            },
            {
                total: 659.4,
                product: {
                    id: 68,
                },
            },
            {
                total: 372.26,
                product: {
                    id: 70,
                },
            },
            {
                total: 797.81,
                product: {
                    id: 78,
                },
            },
            {
                total: 81.69,
                product: {
                    id: 34,
                },
            },
        ],
        nameMember: 'Bob',
    },
    {
        id: 6,
        isCancel: true,
        isDelete: false,
        orderStatus: 'Delivered',
        createAt: '10/19/2023',
        detailOrders: [
            {
                total: 239.46,
                product: {
                    id: 7,
                },
            },
            {
                total: 139.46,
                product: {
                    id: 19,
                },
            },
            {
                total: 508.82,
                product: {
                    id: 18,
                },
            },
            {
                total: 544.69,
                product: {
                    id: 40,
                },
            },
            {
                total: 816.33,
                product: {
                    id: 79,
                },
            },
        ],
        nameMember: 'Alice',
    },
    {
        id: 7,
        isCancel: false,
        isDelete: false,
        orderStatus: 'Completed',
        createAt: '10/17/2023',
        detailOrders: [
            {
                total: 985.43,
                product: {
                    id: 32,
                },
            },
            {
                total: 589.39,
                product: {
                    id: 40,
                },
            },
            {
                total: 786.78,
                product: {
                    id: 83,
                },
            },
            {
                total: 134.06,
                product: {
                    id: 23,
                },
            },
            {
                total: 727.1,
                product: {
                    id: 88,
                },
            },
        ],
        nameMember: 'Alice',
    },
    {
        id: 8,
        isCancel: true,
        isDelete: true,
        orderStatus: 'Delivered',
        createAt: '10/14/2023',
        detailOrders: [
            {
                total: 687.58,
                product: {
                    id: 99,
                },
            },
            {
                total: 236.39,
                product: {
                    id: 88,
                },
            },
            {
                total: 336.48,
                product: {
                    id: 49,
                },
            },
            {
                total: 931.83,
                product: {
                    id: 51,
                },
            },
            {
                total: 147.06,
                product: {
                    id: 92,
                },
            },
        ],
        nameMember: 'John',
    },
    {
        id: 9,
        isCancel: true,
        isDelete: false,
        orderStatus: 'Shipped',
        createAt: '10/22/2023',
        detailOrders: [
            {
                total: 731.92,
                product: {
                    id: 29,
                },
            },
            {
                total: 529.34,
                product: {
                    id: 72,
                },
            },
            {
                total: 512.38,
                product: {
                    id: 48,
                },
            },
            {
                total: 211.59,
                product: {
                    id: 70,
                },
            },
            {
                total: 445.92,
                product: {
                    id: 59,
                },
            },
        ],
        nameMember: 'Alice',
    },
    {
        id: 10,
        isCancel: true,
        isDelete: false,
        orderStatus: 'Processing',
        createAt: '9/25/2023',
        detailOrders: [
            {
                total: 126.17,
                product: {
                    id: 74,
                },
            },
            {
                total: 257.3,
                product: {
                    id: 88,
                },
            },
            {
                total: 660.24,
                product: {
                    id: 78,
                },
            },
            {
                total: 530.61,
                product: {
                    id: 57,
                },
            },
            {
                total: 798.25,
                product: {
                    id: 40,
                },
            },
        ],
        nameMember: 'David',
    },
    {
        id: 11,
        isCancel: false,
        isDelete: false,
        orderStatus: 'Completed',
        createAt: '10/14/2023',
        detailOrders: [
            {
                total: 539.45,
                product: {
                    id: 44,
                },
            },
            {
                total: 789.86,
                product: {
                    id: 75,
                },
            },
            {
                total: 8.08,
                product: {
                    id: 94,
                },
            },
            {
                total: 678.65,
                product: {
                    id: 42,
                },
            },
            {
                total: 197.59,
                product: {
                    id: 24,
                },
            },
        ],
        nameMember: 'Bob',
    },
    {
        id: 12,
        isCancel: false,
        isDelete: false,
        orderStatus: 'Completed',
        createAt: '9/26/2023',
        detailOrders: [
            {
                total: 317.67,
                product: {
                    id: 76,
                },
            },
            {
                total: 460.42,
                product: {
                    id: 20,
                },
            },
            {
                total: 28.87,
                product: {
                    id: 24,
                },
            },
            {
                total: 783.01,
                product: {
                    id: 51,
                },
            },
            {
                total: 416.49,
                product: {
                    id: 36,
                },
            },
        ],
        nameMember: 'Alice',
    },
    {
        id: 13,
        isCancel: true,
        isDelete: false,
        orderStatus: 'Shipped',
        createAt: '10/6/2023',
        detailOrders: [
            {
                total: 39.24,
                product: {
                    id: 62,
                },
            },
            {
                total: 742.52,
                product: {
                    id: 38,
                },
            },
            {
                total: 903.14,
                product: {
                    id: 47,
                },
            },
            {
                total: 149.48,
                product: {
                    id: 57,
                },
            },
            {
                total: 833.55,
                product: {
                    id: 46,
                },
            },
        ],
        nameMember: 'Liam',
    },
    {
        id: 14,
        isCancel: true,
        isDelete: true,
        orderStatus: 'Processing',
        createAt: '10/17/2023',
        detailOrders: [
            {
                total: 556.92,
                product: {
                    id: 26,
                },
            },
            {
                total: 389.85,
                product: {
                    id: 1,
                },
            },
            {
                total: 685.01,
                product: {
                    id: 74,
                },
            },
            {
                total: 42.15,
                product: {
                    id: 15,
                },
            },
            {
                total: 384.15,
                product: {
                    id: 73,
                },
            },
        ],
        nameMember: 'Olivia',
    },
    {
        id: 15,
        isCancel: true,
        isDelete: false,
        orderStatus: 'Processing',
        createAt: '10/10/2023',
        detailOrders: [
            {
                total: 262.61,
                product: {
                    id: 45,
                },
            },
            {
                total: 569.89,
                product: {
                    id: 75,
                },
            },
            {
                total: 15.92,
                product: {
                    id: 8,
                },
            },
            {
                total: 351.5,
                product: {
                    id: 73,
                },
            },
            {
                total: 130.38,
                product: {
                    id: 16,
                },
            },
        ],
        nameMember: 'Emma',
    },
    {
        id: 16,
        isCancel: false,
        isDelete: false,
        orderStatus: 'Processing',
        createAt: '9/25/2023',
        detailOrders: [
            {
                total: 645.81,
                product: {
                    id: 13,
                },
            },
            {
                total: 445.84,
                product: {
                    id: 17,
                },
            },
            {
                total: 730.39,
                product: {
                    id: 100,
                },
            },
            {
                total: 455.89,
                product: {
                    id: 5,
                },
            },
            {
                total: 764.8,
                product: {
                    id: 88,
                },
            },
        ],
        nameMember: 'Sophia',
    },
    {
        id: 17,
        isCancel: true,
        isDelete: false,
        orderStatus: 'Delivered',
        createAt: '10/22/2023',
        detailOrders: [
            {
                total: 70.06,
                product: {
                    id: 100,
                },
            },
            {
                total: 314.53,
                product: {
                    id: 54,
                },
            },
            {
                total: 281.42,
                product: {
                    id: 35,
                },
            },
            {
                total: 52.22,
                product: {
                    id: 76,
                },
            },
            {
                total: 318.13,
                product: {
                    id: 65,
                },
            },
        ],
        nameMember: 'Alice',
    },
    {
        id: 18,
        isCancel: false,
        isDelete: true,
        orderStatus: 'Completed',
        createAt: '10/19/2023',
        detailOrders: [
            {
                total: 708.27,
                product: {
                    id: 86,
                },
            },
            {
                total: 34.6,
                product: {
                    id: 52,
                },
            },
            {
                total: 353.77,
                product: {
                    id: 50,
                },
            },
            {
                total: 337.67,
                product: {
                    id: 41,
                },
            },
            {
                total: 650.48,
                product: {
                    id: 96,
                },
            },
        ],
        nameMember: 'Sophia',
    },
    {
        id: 19,
        isCancel: false,
        isDelete: true,
        orderStatus: 'Processing',
        createAt: '10/16/2023',
        detailOrders: [
            {
                total: 201.5,
                product: {
                    id: 48,
                },
            },
            {
                total: 182.6,
                product: {
                    id: 99,
                },
            },
            {
                total: 392.58,
                product: {
                    id: 72,
                },
            },
            {
                total: 905.75,
                product: {
                    id: 97,
                },
            },
            {
                total: 692.36,
                product: {
                    id: 2,
                },
            },
        ],
        nameMember: 'Emma',
    },
    {
        id: 20,
        isCancel: false,
        isDelete: false,
        orderStatus: 'Processing',
        createAt: '10/14/2023',
        detailOrders: [
            {
                total: 781.01,
                product: {
                    id: 77,
                },
            },
            {
                total: 173.87,
                product: {
                    id: 41,
                },
            },
            {
                total: 585.26,
                product: {
                    id: 43,
                },
            },
            {
                total: 540.3,
                product: {
                    id: 91,
                },
            },
            {
                total: 175.85,
                product: {
                    id: 38,
                },
            },
        ],
        nameMember: 'Bob',
    },
];

export const products = [
    {
        id: 1,
        name: 'Product 1',
        price: 957.81,
        color: 'Black',
        quantity: 2,
        useage: 'Example Usage 1',
        screenSize: '2.6 inches',
        chipSet: 'Example Chipset 1',
        isDelete: false,
        category: 'Category 9',
        branch: 'Branch 2',
    },
    {
        id: 2,
        name: 'Product 2',
        price: 764.52,
        color: 'Red',
        quantity: 63,
        useage: 'Example Usage 2',
        screenSize: '2.0 inches',
        chipSet: 'Example Chipset 2',
        isDelete: false,
        category: 'Category 3',
        branch: 'Branch 1',
    },
    {
        id: 3,
        name: 'Product 3',
        price: 336.23,
        color: 'Blue',
        quantity: 59,
        useage: 'Example Usage 3',
        screenSize: '1.2 inches',
        chipSet: 'Example Chipset 3',
        isDelete: false,
        category: 'Category 4',
        branch: 'Branch 3',
    },
    {
        id: 4,
        name: 'Product 4',
        price: 61.11,
        color: 'Red',
        quantity: 16,
        useage: 'Example Usage 4',
        screenSize: '4.3 inches',
        chipSet: 'Example Chipset 4',
        isDelete: false,
        category: 'Category 4',
        branch: 'Branch 1',
    },
    {
        id: 5,
        name: 'Product 5',
        price: 731.59,
        color: 'Red',
        quantity: 40,
        useage: 'Example Usage 5',
        screenSize: '1.2 inches',
        chipSet: 'Example Chipset 5',
        isDelete: false,
        category: 'Category 1',
        branch: 'Branch 2',
    },
    {
        id: 6,
        name: 'Product 6',
        price: 549.63,
        color: 'Black',
        quantity: 61,
        useage: 'Example Usage 6',
        screenSize: '9.8 inches',
        chipSet: 'Example Chipset 6',
        isDelete: false,
        category: 'Category 10',
        branch: 'Branch 2',
    },
    {
        id: 7,
        name: 'Product 7',
        price: 883.88,
        color: 'Red',
        quantity: 62,
        useage: 'Example Usage 7',
        screenSize: '4.0 inches',
        chipSet: 'Example Chipset 7',
        isDelete: false,
        category: 'Category 7',
        branch: 'Branch 3',
    },
    {
        id: 8,
        name: 'Product 8',
        price: 203.1,
        color: 'Green',
        quantity: 0,
        useage: 'Example Usage 8',
        screenSize: '5.1 inches',
        chipSet: 'Example Chipset 8',
        isDelete: false,
        category: 'Category 10',
        branch: 'Branch 1',
    },
    {
        id: 9,
        name: 'Product 9',
        price: 846.79,
        color: 'Black',
        quantity: 30,
        useage: 'Example Usage 9',
        screenSize: '9.4 inches',
        chipSet: 'Example Chipset 9',
        isDelete: false,
        category: 'Category 10',
        branch: 'Branch 1',
    },
    {
        id: 10,
        name: 'Product 10',
        price: 584.38,
        color: 'Blue',
        quantity: 75,
        useage: 'Example Usage 10',
        screenSize: '5.3 inches',
        chipSet: 'Example Chipset 10',
        isDelete: false,
        category: 'Category 6',
        branch: 'Branch 3',
    },
    {
        id: 11,
        name: 'Product 11',
        price: 198.96,
        color: 'Blue',
        quantity: 82,
        useage: 'Example Usage 11',
        screenSize: '4.8 inches',
        chipSet: 'Example Chipset 11',
        isDelete: false,
        category: 'Category 10',
        branch: 'Branch 1',
    },
    {
        id: 12,
        name: 'Product 12',
        price: 898.85,
        color: 'Black',
        quantity: 22,
        useage: 'Example Usage 12',
        screenSize: '2.6 inches',
        chipSet: 'Example Chipset 12',
        isDelete: false,
        category: 'Category 5',
        branch: 'Branch 3',
    },
    {
        id: 13,
        name: 'Product 13',
        price: 963.01,
        color: 'Black',
        quantity: 55,
        useage: 'Example Usage 13',
        screenSize: '9.8 inches',
        chipSet: 'Example Chipset 13',
        isDelete: true,
        category: 'Category 10',
        branch: 'Branch 1',
    },
    {
        id: 14,
        name: 'Product 14',
        price: 592.61,
        color: 'Black',
        quantity: 59,
        useage: 'Example Usage 14',
        screenSize: '6.3 inches',
        chipSet: 'Example Chipset 14',
        isDelete: true,
        category: 'Category 5',
        branch: 'Branch 3',
    },
    {
        id: 15,
        name: 'Product 15',
        price: 879.44,
        color: 'Green',
        quantity: 27,
        useage: 'Example Usage 15',
        screenSize: '3.4 inches',
        chipSet: 'Example Chipset 15',
        isDelete: false,
        category: 'Category 7',
        branch: 'Branch 2',
    },
    {
        id: 16,
        name: 'Product 16',
        price: 664.17,
        color: 'Black',
        quantity: 24,
        useage: 'Example Usage 16',
        screenSize: '0.2 inches',
        chipSet: 'Example Chipset 16',
        isDelete: true,
        category: 'Category 3',
        branch: 'Branch 3',
    },
    {
        id: 17,
        name: 'Product 17',
        price: 314.95,
        color: 'Black',
        quantity: 15,
        useage: 'Example Usage 17',
        screenSize: '7.4 inches',
        chipSet: 'Example Chipset 17',
        isDelete: false,
        category: 'Category 1',
        branch: 'Branch 2',
    },
    {
        id: 18,
        name: 'Product 18',
        price: 476.21,
        color: 'Red',
        quantity: 29,
        useage: 'Example Usage 18',
        screenSize: '4.4 inches',
        chipSet: 'Example Chipset 18',
        isDelete: false,
        category: 'Category 7',
        branch: 'Branch 2',
    },
    {
        id: 19,
        name: 'Product 19',
        price: 957.14,
        color: 'Red',
        quantity: 73,
        useage: 'Example Usage 19',
        screenSize: '7.7 inches',
        chipSet: 'Example Chipset 19',
        isDelete: false,
        category: 'Category 9',
        branch: 'Branch 3',
    },
    {
        id: 20,
        name: 'Product 20',
        price: 281.71,
        color: 'Red',
        quantity: 1,
        useage: 'Example Usage 20',
        screenSize: '6.7 inches',
        chipSet: 'Example Chipset 20',
        isDelete: false,
        category: 'Category 9',
        branch: 'Branch 2',
    },
    {
        id: 21,
        name: 'Product 21',
        price: 990.85,
        color: 'Black',
        quantity: 82,
        useage: 'Example Usage 21',
        screenSize: '9.9 inches',
        chipSet: 'Example Chipset 21',
        isDelete: false,
        category: 'Category 6',
        branch: 'Branch 2',
    },
    {
        id: 22,
        name: 'Product 22',
        price: 235.94,
        color: 'Black',
        quantity: 38,
        useage: 'Example Usage 22',
        screenSize: '5.1 inches',
        chipSet: 'Example Chipset 22',
        isDelete: false,
        category: 'Category 6',
        branch: 'Branch 2',
    },
    {
        id: 23,
        name: 'Product 23',
        price: 425.57,
        color: 'Black',
        quantity: 30,
        useage: 'Example Usage 23',
        screenSize: '6.6 inches',
        chipSet: 'Example Chipset 23',
        isDelete: false,
        category: 'Category 8',
        branch: 'Branch 2',
    },
    {
        id: 24,
        name: 'Product 24',
        price: 233.81,
        color: 'Green',
        quantity: 45,
        useage: 'Example Usage 24',
        screenSize: '1.4 inches',
        chipSet: 'Example Chipset 24',
        isDelete: false,
        category: 'Category 2',
        branch: 'Branch 2',
    },
    {
        id: 25,
        name: 'Product 25',
        price: 320.33,
        color: 'Red',
        quantity: 50,
        useage: 'Example Usage 25',
        screenSize: '0.1 inches',
        chipSet: 'Example Chipset 25',
        isDelete: false,
        category: 'Category 6',
        branch: 'Branch 3',
    },
    {
        id: 26,
        name: 'Product 26',
        price: 673.75,
        color: 'Blue',
        quantity: 86,
        useage: 'Example Usage 26',
        screenSize: '4.6 inches',
        chipSet: 'Example Chipset 26',
        isDelete: false,
        category: 'Category 4',
        branch: 'Branch 3',
    },
    {
        id: 27,
        name: 'Product 27',
        price: 56.94,
        color: 'Black',
        quantity: 34,
        useage: 'Example Usage 27',
        screenSize: '2.8 inches',
        chipSet: 'Example Chipset 27',
        isDelete: false,
        category: 'Category 7',
        branch: 'Branch 3',
    },
    {
        id: 28,
        name: 'Product 28',
        price: 967.28,
        color: 'Black',
        quantity: 77,
        useage: 'Example Usage 28',
        screenSize: '7.3 inches',
        chipSet: 'Example Chipset 28',
        isDelete: true,
        category: 'Category 3',
        branch: 'Branch 3',
    },
    {
        id: 29,
        name: 'Product 29',
        price: 322.91,
        color: 'Green',
        quantity: 4,
        useage: 'Example Usage 29',
        screenSize: '4.2 inches',
        chipSet: 'Example Chipset 29',
        isDelete: false,
        category: 'Category 4',
        branch: 'Branch 2',
    },
    {
        id: 30,
        name: 'Product 30',
        price: 994.83,
        color: 'Red',
        quantity: 33,
        useage: 'Example Usage 30',
        screenSize: '1.9 inches',
        chipSet: 'Example Chipset 30',
        isDelete: false,
        category: 'Category 1',
        branch: 'Branch 2',
    },
    {
        id: 31,
        name: 'Product 31',
        price: 895.49,
        color: 'Red',
        quantity: 45,
        useage: 'Example Usage 31',
        screenSize: '3.8 inches',
        chipSet: 'Example Chipset 31',
        isDelete: false,
        category: 'Category 7',
        branch: 'Branch 2',
    },
    {
        id: 32,
        name: 'Product 32',
        price: 441.12,
        color: 'Black',
        quantity: 8,
        useage: 'Example Usage 32',
        screenSize: '0.5 inches',
        chipSet: 'Example Chipset 32',
        isDelete: false,
        category: 'Category 2',
        branch: 'Branch 3',
    },
    {
        id: 33,
        name: 'Product 33',
        price: 608.45,
        color: 'Red',
        quantity: 63,
        useage: 'Example Usage 33',
        screenSize: '7.2 inches',
        chipSet: 'Example Chipset 33',
        isDelete: false,
        category: 'Category 3',
        branch: 'Branch 3',
    },
    {
        id: 34,
        name: 'Product 34',
        price: 150.49,
        color: 'Red',
        quantity: 99,
        useage: 'Example Usage 34',
        screenSize: '0.1 inches',
        chipSet: 'Example Chipset 34',
        isDelete: false,
        category: 'Category 6',
        branch: 'Branch 3',
    },
    {
        id: 35,
        name: 'Product 35',
        price: 366.95,
        color: 'Black',
        quantity: 89,
        useage: 'Example Usage 35',
        screenSize: '2.5 inches',
        chipSet: 'Example Chipset 35',
        isDelete: false,
        category: 'Category 2',
        branch: 'Branch 1',
    },
    {
        id: 36,
        name: 'Product 36',
        price: 108.47,
        color: 'Blue',
        quantity: 90,
        useage: 'Example Usage 36',
        screenSize: '3.6 inches',
        chipSet: 'Example Chipset 36',
        isDelete: false,
        category: 'Category 7',
        branch: 'Branch 2',
    },
    {
        id: 37,
        name: 'Product 37',
        price: 85.02,
        color: 'Red',
        quantity: 18,
        useage: 'Example Usage 37',
        screenSize: '1.7 inches',
        chipSet: 'Example Chipset 37',
        isDelete: false,
        category: 'Category 10',
        branch: 'Branch 2',
    },
    {
        id: 38,
        name: 'Product 38',
        price: 518.98,
        color: 'Blue',
        quantity: 7,
        useage: 'Example Usage 38',
        screenSize: '9.9 inches',
        chipSet: 'Example Chipset 38',
        isDelete: false,
        category: 'Category 4',
        branch: 'Branch 3',
    },
    {
        id: 39,
        name: 'Product 39',
        price: 735.84,
        color: 'Blue',
        quantity: 26,
        useage: 'Example Usage 39',
        screenSize: '6.1 inches',
        chipSet: 'Example Chipset 39',
        isDelete: false,
        category: 'Category 2',
        branch: 'Branch 2',
    },
    {
        id: 40,
        name: 'Product 40',
        price: 615.57,
        color: 'Blue',
        quantity: 64,
        useage: 'Example Usage 40',
        screenSize: '4.4 inches',
        chipSet: 'Example Chipset 40',
        isDelete: false,
        category: 'Category 1',
        branch: 'Branch 2',
    },
    {
        id: 41,
        name: 'Product 41',
        price: 727.21,
        color: 'Red',
        quantity: 13,
        useage: 'Example Usage 41',
        screenSize: '7.2 inches',
        chipSet: 'Example Chipset 41',
        isDelete: false,
        category: 'Category 7',
        branch: 'Branch 1',
    },
    {
        id: 42,
        name: 'Product 42',
        price: 786.6,
        color: 'Red',
        quantity: 14,
        useage: 'Example Usage 42',
        screenSize: '0.4 inches',
        chipSet: 'Example Chipset 42',
        isDelete: false,
        category: 'Category 6',
        branch: 'Branch 1',
    },
    {
        id: 43,
        name: 'Product 43',
        price: 475.13,
        color: 'Green',
        quantity: 57,
        useage: 'Example Usage 43',
        screenSize: '1.3 inches',
        chipSet: 'Example Chipset 43',
        isDelete: false,
        category: 'Category 4',
        branch: 'Branch 2',
    },
    {
        id: 44,
        name: 'Product 44',
        price: 525.11,
        color: 'Red',
        quantity: 69,
        useage: 'Example Usage 44',
        screenSize: '4.4 inches',
        chipSet: 'Example Chipset 44',
        isDelete: false,
        category: 'Category 4',
        branch: 'Branch 2',
    },
    {
        id: 45,
        name: 'Product 45',
        price: 156.96,
        color: 'Black',
        quantity: 40,
        useage: 'Example Usage 45',
        screenSize: '4.1 inches',
        chipSet: 'Example Chipset 45',
        isDelete: true,
        category: 'Category 3',
        branch: 'Branch 3',
    },
    {
        id: 46,
        name: 'Product 46',
        price: 509.44,
        color: 'Black',
        quantity: 15,
        useage: 'Example Usage 46',
        screenSize: '0.0 inches',
        chipSet: 'Example Chipset 46',
        isDelete: false,
        category: 'Category 3',
        branch: 'Branch 3',
    },
    {
        id: 47,
        name: 'Product 47',
        price: 812.49,
        color: 'Blue',
        quantity: 11,
        useage: 'Example Usage 47',
        screenSize: '4.0 inches',
        chipSet: 'Example Chipset 47',
        isDelete: false,
        category: 'Category 9',
        branch: 'Branch 3',
    },
    {
        id: 48,
        name: 'Product 48',
        price: 721.74,
        color: 'Blue',
        quantity: 28,
        useage: 'Example Usage 48',
        screenSize: '4.8 inches',
        chipSet: 'Example Chipset 48',
        isDelete: false,
        category: 'Category 6',
        branch: 'Branch 1',
    },
    {
        id: 49,
        name: 'Product 49',
        price: 818.23,
        color: 'Blue',
        quantity: 27,
        useage: 'Example Usage 49',
        screenSize: '9.6 inches',
        chipSet: 'Example Chipset 49',
        isDelete: false,
        category: 'Category 3',
        branch: 'Branch 2',
    },
    {
        id: 50,
        name: 'Product 50',
        price: 218.29,
        color: 'Green',
        quantity: 29,
        useage: 'Example Usage 50',
        screenSize: '8.4 inches',
        chipSet: 'Example Chipset 50',
        isDelete: false,
        category: 'Category 1',
        branch: 'Branch 3',
    },
];
export const columnsOrder = [
    {
        title: 'ID',
        filed: 'id',
    },
    {
        title: 'Member',
        filed: 'nameMember',
    },
    {
        title: 'Date Order',
        filed: 'createAt',
    },
    {
        title: 'Order Status',
        render: (value) => {
            let classStyle = '';
            if (value === 'Processing') {
                classStyle = 'bg-[rgba(247,188,95,0.1)] text-[rgb(247,188,95)]';
            } else if (value === 'Shipped') {
                classStyle = 'bg-[rgba(64,81,137,0.1)] text-[rgb(64,81,137)] ';
            } else if (value === 'Delivered') {
                classStyle = 'bg-[rgba(50,179,156,0.1)] text-[rgba(50,179,156,1)] ';
            } else if (value === 'Completed') {
                classStyle = 'bg-[rgba(71,255,222,0.1)] text-[rgb(71,255,222)] ';
            }
            return (
                <div className={`${classStyle} w-24 p-1 text-xs rounded-lg flex justify-center items-center `}>
                    {value}
                </div>
            );
        },
        filed: 'orderStatus',
    },
];

export const columnsProduct = [
    {
        title: 'ID',
        filed: 'id',
    },
    {
        title: 'Name',
        filed: 'name',
    },
    {
        title: 'Price',
        filed: 'price',
    },
    {
        title: 'Quantity',
        filed: 'quantity',
    },
    {
        title: 'Branch',
        filed: 'branch',
    },
    // {
    //     title: 'Action',
    //     render: <Button>Edit</Button>,
    // },
];

export const members = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        phoneNumber: '123-456-7890',
        accumulatePoints: 500,
        isDelete: true,
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        phoneNumber: '987-654-3210',
        accumulatePoints: 750,
        isDelete: false,
    },
    {
        id: 3,
        name: 'Alice Johnson',
        email: 'alice@example.com',
        phoneNumber: '555-123-4567',
        accumulatePoints: 600,
        isDelete: false,
    },
    {
        id: 4,
        name: 'Bob Wilson',
        email: 'bob@example.com',
        phoneNumber: '111-222-3333',
        accumulatePoints: 900,
        isDelete: false,
    },
    {
        id: 5,
        name: 'Emily Brown',
        email: 'emily@example.com',
        phoneNumber: '888-777-6666',
        accumulatePoints: 350,
        isDelete: false,
    },
    {
        id: 6,
        name: 'Michael Johnson',
        email: 'michael@example.com',
        phoneNumber: '555-555-5555',
        accumulatePoints: 1200,
        isDelete: false,
    },
    {
        id: 7,
        name: 'Sara Davis',
        email: 'sara@example.com',
        phoneNumber: '444-333-2222',
        accumulatePoints: 800,
        isDelete: false,
    },
    {
        id: 8,
        name: 'David Lee',
        email: 'david@example.com',
        phoneNumber: '777-888-9999',
        accumulatePoints: 950,
        isDelete: false,
    },
    {
        id: 9,
        name: 'Olivia Martin',
        email: 'olivia@example.com',
        phoneNumber: '666-777-8888',
        accumulatePoints: 550,
        isDelete: false,
    },
    {
        id: 10,
        name: 'William Taylor',
        email: 'william@example.com',
        phoneNumber: '123-987-6543',
        accumulatePoints: 750,
        isDelete: false,
    },
    {
        id: 11,
        name: 'Ava White',
        email: 'ava@example.com',
        phoneNumber: '555-123-9876',
        accumulatePoints: 420,
        isDelete: false,
    },
    {
        id: 12,
        name: 'James Parker',
        email: 'james@example.com',
        phoneNumber: '333-555-7777',
        accumulatePoints: 1100,
        isDelete: false,
    },
    {
        id: 13,
        name: 'Sophia Adams',
        email: 'sophia@example.com',
        phoneNumber: '999-888-7777',
        accumulatePoints: 700,
        isDelete: false,
    },
    {
        id: 14,
        name: 'Liam Hall',
        email: 'liam@example.com',
        phoneNumber: '444-666-3333',
        accumulatePoints: 800,
        isDelete: false,
    },
    {
        id: 15,
        name: 'Isabella King',
        email: 'isabella@example.com',
        phoneNumber: '111-999-8888',
        accumulatePoints: 900,
        isDelete: false,
    },
    {
        id: 16,
        name: 'Mason Wright',
        email: 'mason@example.com',
        phoneNumber: '777-222-5555',
        accumulatePoints: 650,
        isDelete: false,
    },
    {
        id: 17,
        name: 'Charlotte Hill',
        email: 'charlotte@example.com',
        phoneNumber: '222-888-4444',
        accumulatePoints: 400,
        isDelete: false,
    },
    {
        id: 18,
        name: 'Elijah Baker',
        email: 'elijah@example.com',
        phoneNumber: '444-111-7777',
        accumulatePoints: 1000,
        isDelete: false,
    },
    {
        id: 19,
        name: 'Aria Carter',
        email: 'aria@example.com',
        phoneNumber: '555-666-7777',
        accumulatePoints: 750,
        isDelete: false,
    },
    {
        id: 20,
        name: 'Carter Foster',
        email: 'carter@example.com',
        phoneNumber: '888-777-6666',
        accumulatePoints: 950,
        isDelete: false,
    },
];

export const WrappedColumnsTableMember = ({ handleRemove = () => {}, handleEdit = () => {} }) => {
    return [
        {
            title: 'ID',
            filed: 'id',
        },
        {
            title: 'Name',
            filed: 'name',
        },
        {
            title: 'Email',
            filed: 'email',
        },
        {
            title: 'Accumulate Points',
            filed: 'accumulatePoints',
        },
        {
            title: 'Status',
            render: (value) => {
                let classStyle = '';
                if (value) {
                    classStyle = 'bg-[rgba(243,122,72,0,1)] text-[rgb(243,122,72)] ';
                } else {
                    classStyle = 'bg-[rgba(50,179,156,0.1)] text-[rgba(50,179,156,1)] ';
                }
                const text = value ? 'Block' : 'Active';
                return (
                    <div
                        className={`${classStyle} w-fit p-1 pl-2 pr-2 text-xs rounded-lg flex justify-center items-center `}
                    >
                        {text}
                    </div>
                );
            },
            filed: 'isDelete',
        },
        {
            title: 'Action',
            render: (value) => {
                return (
                    <div className={`gap-4 flex justify-center items-center `}>
                        <AnimateHover
                            onClick={(e) => {
                                e.stopPropagation();
                                handleEdit(value);
                            }}
                        >
                            <MdEdit className="w-6 h-6 text-blue-600"></MdEdit>
                        </AnimateHover>
                        <AnimateHover
                            onClick={(e) => {
                                e.stopPropagation();
                                handleRemove(value);
                            }}
                        >
                            <IoMdTrash className="w-6 h-6 text-red-600"></IoMdTrash>
                        </AnimateHover>
                    </div>
                );
            },
            filed: 'id',
        },
    ];
};
