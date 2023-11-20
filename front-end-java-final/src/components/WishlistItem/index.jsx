import { useState } from 'react';

import { Button } from '../index';
import { motion } from 'framer-motion';
import { AiFillStar } from 'react-icons/ai';
import { BsSuitHeartFill } from 'react-icons/bs';
import { CiHeart, CiShoppingCart } from 'react-icons/ci';
import { FaRegTrashCan } from "react-icons/fa6";
import { FaTrashCan } from "react-icons/fa6";
import { TextMain, TextSub } from '../index';
function WishlistItem({ width, sale = true }) {
    const color = ['gray', 'white', 'black'];
    const [isHovered, setHovered] = useState(false);
    const [hearted, setHearted] = useState(false);
    return (
        <motion.div
            whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
            whileTap={{
                scale: 0.9,
                borderRadius: '10%',
                transition: { duration: 0.3 },
            }}
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            exit={{
                opacity: 0,
            }}
            transition={{
                duration: 0.3,
                ease: 'easeInOut',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`${width} group flex-shrink-0 dark:text-white bg-white dark:bg-primary text-black shadow-md relative cursor-pointer p-2 rounded-lg overflow-hidden`}
        >
            <motion.div className="absolute right-4 top-1/4 flex justify-center items-center flex-col">
                {color.map((col, index) => {
                    return (
                        <motion.div
                            key={index}
                            className={`bg-${col}-600 bg-${col} mb-1 shadow-md h-4 w-4 rounded-full `}
                        ></motion.div>
                    );
                })}
            </motion.div>
            {sale && (
                <motion.div className="absolute top-[5%] left-0 rounded-r-md w-10 text-sm text-center text-sale bg-sale">
                    13%
                </motion.div>
            )}
            <motion.div className=" bg-[#ffffff] w-full flex items-center justify-center border-b-[1px] group-hover:border-primary border-gray-500 border-solid">
                <motion.img
                    src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_2__5.jpg"
                    className="max-w-[10rem] w-1/2 rounded-lg"
                ></motion.img>
            </motion.div>
            <motion.div className="flex p-2 flex-col">
                <TextMain className="group-hover:text-primary">Apple macbook air 15 pro max</TextMain>
                <motion.div className="w-full h-10 overflow-hidden">
                    <motion.div
                        initial={false}
                        animate={{ y: isHovered ? '100%' : 0 }}
                        className="flex n justify-between items-end w-full mt-2"
                    >
                        <motion.div className="flex flex-col">
                            <TextSub className="line-through">35$</TextSub>
                            <TextSub className={'text-yellow-400'}>30$</TextSub>
                        </motion.div>
                        <motion.div className="flex justify-end items-center">
                            <AiFillStar className="h-4 w-4 text-yellow-400"></AiFillStar>
                            <TextSub>4.9</TextSub>
                        </motion.div>
                    </motion.div>
                    <motion.div
                        initial={false}
                        animate={{ y: isHovered ? '-100%' : 0 }}
                        className="flex translate-y-[100%] justify-between items-center w-full p-1"
                    >
                        <Button style={'outline'}>
                            <CiShoppingCart className="h-4 w-4" />
                            <motion.span className="ml-1">Add Cart</motion.span>
                        </Button>
                        {hearted && (
                            <FaTrashCan
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setHearted(!hearted);
                                }}
                                className="w-6 h-6 text-primary"
                            ></FaTrashCan>
                        )}
                        {!hearted && (
                            <FaRegTrashCan
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setHearted(!hearted);
                                }}
                                className="w-6 text-primary h-6"
                            ></FaRegTrashCan>
                        )}
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
export default WishlistItem;
