import { Button, TextMain, TextSub } from '../index';
import { motion } from 'framer-motion';
import { BsCalendar4Week } from 'react-icons/bs';
import { GiAlarmClock } from 'react-icons/gi';
function BlogItem({ width, className, direction = 'vertical' }) {
    return (
        <motion.div
            whileHover={{ scale: 1, transition: { duration: 0.3 } }}
            whileTap={{
                scale: 0.8,
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
            className={`${width} ${
                direction == 'horizontal' && 'flex justify-start'
            } shadow-lg cursor-pointer hover:bg-hover p-2 min-w-[15rem] max-h-[20rem] rounded-lg overflow-hidden ${className}`}
        >
            <motion.img
                src="https://cdn2.cellphones.com.vn/insecure/rs:fill:385:0/q:100/plain/https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/Pixel-9-thong-tin.jpeg"
                className="w-full max-h-52 h-52 rounded-lg"
            ></motion.img>
            <motion.div className="flex w-full p-4 justify-center items-center flex-col">
                <motion.div className="flex w-full justify-between items-center">
                    <motion.div className="flex w-fit justify-start items-center">
                        <BsCalendar4Week className=" mr-2 h-4 w-4"></BsCalendar4Week>
                        <TextSub>August, 8, 2023</TextSub>
                    </motion.div>
                    <motion.div className="flex  w-fit justify-end items-center">
                        <GiAlarmClock className="mr-2 h-4 w-4"></GiAlarmClock>
                        <TextSub>3 hours ago</TextSub>
                    </motion.div>
                </motion.div>
                <motion.div className="w-full">
                    <TextMain className={' truncate mt-2 text-ellipsis font-bold'}>
                        Hé lộ những thông tin đầu tiên về dòng Google Pixel 9
                    </TextMain>
                    <TextSub className="text-md brightness-75 font-medium h-32 line-clamp-2 truncate">
                        Chỉ vài ngày sau khi dòng Pixel 8 ra mắt, leaker đáng tin cậy Ross Young đã chia sẻ cho chúng ta
                        những thông tin rò rỉ đầu tiên về Pixel 9 series.
                    </TextSub>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default BlogItem;
