import { motion } from 'framer-motion';
import { AnimateHover, AnimateOpacity } from '../../components/Animate';
import { CardMain } from '../../components';
import { IoIosArrowForward } from 'react-icons/io';
import { useState, useEffect } from 'react';

function SaleProduct() {
    const [arrow, setArrow] = useState(false);
    const [x, setX] = useState(0);

    const [items, setItems] = useState([
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
    ]);

    const moveItemUp = (fromIndex, toIndex) => {
        const updatedItems = [...items]; // Tạo một bản sao mới của mảng items
        const [movedItem] = updatedItems.splice(fromIndex, 1); // Xóa phần tử từ vị trí fromIndex và lấy nó ra
        updatedItems.splice(toIndex, 0, movedItem); // Chèn phần tử vào vị trí toIndex
        setItems(updatedItems); // Cập nhật state với mảng mới
    };

    const handleNextItem = () => {
        setX((prev) => prev - 250);
        console.log(250 * (items.length - 5));
        if (x <= -250 * (items.length - 5)) {
            setX(0);
        }
    };

    return (
        <AnimateOpacity
            onMouseEnter={() => setArrow(true)}
            onMouseLeave={() => setArrow(false)}
            className={'w-full relative p-10 flex justify-between text-gray-500 items-center rounded-lg bg-second'}
        >
            <motion.div className="w-1/5 xl:flex lg:flex 2xl:flex md:flex hidden justify-center items-center flex-col">
                <motion.h1 className="font-bold text-3xl ">Product On Sale</motion.h1>
                <motion.h3 className="">Shop Now</motion.h3>
            </motion.div>
            {arrow && (
                <motion.div
                    onClick={handleNextItem}
                    initial={{
                        x: 100,
                        opacity: 0,
                    }}
                    animate={{
                        x: 0,
                        opacity: 1,
                    }}
                    transition={{
                        duration: 0.3,
                    }}
                    className="bg-primary cursor-pointer rounded-full p-2 absolute  right-2 z-50"
                >
                    <AnimateHover className={'w-full'}>
                        <IoIosArrowForward className="text-white h-10 w-10"></IoIosArrowForward>
                    </AnimateHover>
                </motion.div>
            )}
            <motion.div className="2xl:w-4/5 xl:w-4/5 lg:w-4/5 md:w-4/5 w-full overflow-hidden ">
                <motion.div
                    initial={{
                        x: 100,
                    }}
                    animate={{
                        x: x,
                    }}
                    exit={{
                        x: 100,
                    }}
                    className="w-full flex justify-start items-center hidden-scroll  "
                >
                    {items.map((item, index) => {
                        return (
                            <motion.div
                                key={index}
                                initial={{
                                    scale: 0.9,
                                    x: 100,
                                }}
                                animate={{
                                    scale: 0.8,
                                    x: 0,
                                }}
                                exit={{
                                    scale: 1,
                                    x: 100,
                                }}
                                className="scale-90 flex-shrink-0"
                            >
                                <CardMain></CardMain>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </motion.div>
        </AnimateOpacity>
    );
}

export default SaleProduct;
