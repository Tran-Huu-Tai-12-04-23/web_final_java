import { useState, useEffect } from 'react';
import Summary from './Summary';
import BarChart from '../../Chart/BarChart';

import { motion } from 'framer-motion';
import { TextMain, TextSub, PickedRangeDate, Button, TableCustom } from '../../../../components';
import { AnimateText } from '../../../../components/Animate';

import { IoAdd } from 'react-icons/io5';
import { Link } from 'react-router-dom';

import { orderMembers, products, columnsOrder, columnsProduct } from '../../../../assets/data';

function DashBoard() {
    const [textHello, setTextHello] = useState('Morning');
    const [productSelected, setProductSelected] = useState([]);
    // const [orderMembers, setOrderMembers] = useState([]);
    const [revenue, setRevenue] = useState(0);
    const [totalAccount, setTotalAccount] = useState(0);
    const [totalOrder, setTotalOrder] = useState(0);

    useEffect(() => {
        const currentHour = new Date().getHours();
        if (currentHour >= 5 && currentHour < 12) {
            setTextHello('Buổi sáng');
        } else if (currentHour >= 12 && currentHour < 18) {
            setTextHello('Buổi chiều');
        } else {
            setTextHello('Buổi tối');
        }
    }, []);

    return (
        <motion.div>
            <motion.div className="flex justify-between items-center">
                <AnimateText>
                    <TextMain>Chào {textHello}, </TextMain>
                    <TextSub>bạn! Đây là những điều diễn ra trong cửa hàng ngày hôm nay.</TextSub>
                </AnimateText>
                <motion.div className="w-2/3 flex justify-end items-center">
                    <motion.div className="w-2/3">
                        <PickedRangeDate></PickedRangeDate>
                    </motion.div>
                    <Button style="normal" className={'ml-4 '}>
                        <IoAdd className="w-6 h-6 mr-2"></IoAdd>
                        <span>Thêm sản phẩm</span>
                    </Button>
                </motion.div>
            </motion.div>

            <Summary></Summary>

            <div className="flex mt-10 h-[25rem]  mb-10 justify-between items-start gap-10">
                <div className="w-1/2 h-full shadow-xl">
                    <BarChart height="25rem"></BarChart>
                </div>
                <div className="w-1/2 h-full flex flex-col justify-between">
                    <motion.div className="flex justify-between items-center border-b-[1px] border-dashed border-light-tiny dark:border-dark-tiny">
                        <TextMain className={'pb-1 font-bold text-xl'}>Danh sách đơn hàng gần đây</TextMain>
                        <Link to={''} className="hover:text-primary cursor-pointer underline">
                            Xem thêm
                        </Link>
                    </motion.div>
                    <TableCustom
                        setCheckedData={setProductSelected}
                        checked={false}
                        // searchBy={'name'}
                        columns={columnsOrder}
                        data={orderMembers}
                        numberRow={5}
                        className=" overflow-hidden"
                    />
                </div>
            </div>
            <motion.div>
                <motion.div className="flex justify-between items-center border-b-[1px] border-dashed border-light-tiny dark:border-dark-tiny">
                    <TextMain className={'mb-2 font-bold text-xl'}>Thêm sản phẩm mới</TextMain>
                    <Link to={''} className="hover:text-primary cursor-pointer underline">
                        Xem thêm
                    </Link>
                </motion.div>
                <TableCustom
                    setCheckedData={setProductSelected}
                    checked={false}
                    // searchBy={'name'}
                    columns={columnsProduct}
                    data={products}
                    numberRow={6}
                    className=" h-full overflow-hidden"
                />
            </motion.div>
        </motion.div>
    );
}

export default DashBoard;
