import { motion } from 'framer-motion';
import { CardMain } from '../../components';
import { useState, useEffect } from 'react';

import { request } from '../../services';

function BestSeller() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            await request('GET', '/api/v1/public/product?page=0&&size=20')
                .then((res) => {
                    const data = res.data;
                    if (!data) return;
                    setData(data);
                })
                .catch((err) => {
                    console.error(err);
                });
        };

        getData();
    }, []);

    return (
        <motion.div className="p-10">
            <motion.div className="flex justify-between items-center border-b-[1px] border-solid border-primary">
                <motion.h1 className="text-3xl font-bold">Best Seller</motion.h1>
                <motion.h4 className="underline cursor-pointer hover:text-primary">Xem tất cả</motion.h4>
            </motion.div>
            <motion.div className="flex justify-between items-center mt-10 overflow-hidden">
                {data.map((item, index) => {
                    return (
                        <motion.div className="w-full flex-shrink-0 scale-90" key={index}>
                            <CardMain data={item}></CardMain>
                        </motion.div>
                    );
                })}{' '}
            </motion.div>
        </motion.div>
    );
}

export default BestSeller;
