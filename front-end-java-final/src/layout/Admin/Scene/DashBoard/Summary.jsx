import { useState } from 'react';
import { motion } from 'framer-motion';

import { CiBadgeDollar, CiWallet } from 'react-icons/ci';
import { PiBagSimpleThin } from 'react-icons/pi';
import { BsPersonAdd } from 'react-icons/bs';
import { TextMain } from '../../../../components';
import { Link } from 'react-router-dom';

function Summary() {
    const [items, setItems] = useState([
        {
            name: 'Tổng cộng',
            icon: '',
            content: '$559.25k',
            link: '',
            nameLink: 'Xem chi tiết',
            icon: (
                <div className={`rounded-md flex justify-center items-center p-2  bg-[rgba(10,179,161,0.1)]`}>
                    <CiBadgeDollar className="w-6 h-6 text-[rgb(10,179,161)]"></CiBadgeDollar>
                </div>
            ),
            color: 'rgb(218,244,240)',
        },
        {
            name: 'Đơn hàng',
            icon: '',
            content: '36',
            link: '',
            nameLink: 'Xem tất cả đơn hàng',
            icon: (
                <div className={`rounded-md flex justify-center items-center p-2  bg-[rgba(76,163,220,0.1)]`}>
                    <PiBagSimpleThin className="w-6 h-6 text-[rgb(76,163,220)]"></PiBagSimpleThin>
                </div>
            ),
            color: 'rgb(223,240,250)',
        },
        {
            name: 'Đăng ký thành viên',
            icon: '',
            content: '18.35M',
            link: '',
            nameLink: 'Xem danh sách tất cả thành viên đã đăng ký',
            icon: (
                <div className={`rounded-md flex justify-center items-center p-2  bg-[rgba(247,184,75,0.1)]`}>
                    <BsPersonAdd className="w-6 h-6 text-[rgb(247,184,75)]"></BsPersonAdd>
                </div>
            ),
            color: 'rgb(254,244,228)',
        },
        {
            name: 'Doanh thu',
            icon: '',
            content: '$165',
            link: '',
            nameLink: 'Xem chi tiết',
            icon: (
                <div className={`rounded-md flex justify-center items-center p-2  bg-[rgba(85,102,143,0.1)]`}>
                    <CiWallet className="w-6 h-6 text-[rgb(85,102,143)]"></CiWallet>
                </div>
            ),
            color: 'rgb(226,229,237)',
        },
    ]);
    const renderItems = () => {
        return items.map((item, index) => {
            return (
                <motion.div
                    className="rounded-lg cursor-pointer p-3 dark:bg-dark bg-light  w-full"
                    whileHover={{ scale: 1, y: -10, transition: { duration: 0.3 } }}
                    whileTap={{
                        scale: 0.8,
                        transition: { duration: 0.3 },
                    }}
                    key={index}
                >
                    <TextMain>{item.name}</TextMain>
                    <h1 className="text-2xl mt-2">{item.content}</h1>
                    <div className="flex justify-between items-center mt-3">
                        <Link
                            className="underline hover:text-primary cursor-pointer truncate overflow-ellipsis w-2/3 scale-95"
                            to={item.link}
                        >
                            {item.nameLink}
                        </Link>

                        {item.icon}
                    </div>
                </motion.div>
            );
        });
    };
    return <motion.div className="mt-10 flex justify-between items-center gap-5">{renderItems()}</motion.div>;
}

export default Summary;
