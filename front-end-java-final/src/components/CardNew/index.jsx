import { Button } from '../index';
import { motion } from 'framer-motion';
function CardNew({ width }) {
    return (
        <motion.div
            whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
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
            className={`${width} cursor-pointer hover:brightness-125 bg-bg-light-menu dark:bg-bg-dark-menu p-2 min-w-[15rem] rounded-lg overflow-hidden`}
        >
            <motion.div className=" bg-[#ffffff] w-full rounded-lg flex items-center justify-center">
                <motion.img
                    src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_2__5.jpg"
                    className="max-w-[10rem] w-1/2 rounded-lg"
                ></motion.img>
            </motion.div>
            <motion.div className="flex justify-center items-center flex-col">
                <motion.h3 className="text-gray-400">Smart phone</motion.h3>
                <motion.h1 className="text-md font-medium">Iphone 15 pro max</motion.h1>
                <motion.div className="flex justify-center items-center">
                    <motion.span className="text-yellow-400 mr-2">2</motion.span> đánh giá
                </motion.div>
                <motion.h5 className="text-md font-medium text-orange-400 mb-4">6.000.000 VND</motion.h5>
                <Button className={'rounded-md p-2 bg-primary text-white'}>Thêm vào giỏ hàng</Button>
            </motion.div>
        </motion.div>
    );
}

export default CardNew;
