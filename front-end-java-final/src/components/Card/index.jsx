import { Button } from '../index';
import { motion } from 'framer-motion';
function Card() {
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
            className="max-w-[20rem] cursor-pointer hover:bg-hover p-4 min-w-[15rem] rounded-lg overflow-hidden"
        >
            <div className=" bg-[#ffffff] w-full rounded-lg flex items-center justify-center">
                <img
                    src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_2__5.jpg"
                    className="max-w-[10rem] rounded-lg"
                ></img>
            </div>
            <div className="flex justify-center items-center flex-col">
                <h3 className="text-gray-400">Smart phone</h3>
                <h1 className="text-lg font-medium">Iphone 15 pro max</h1>
                <div className="flex justify-center items-center">
                    <span className="text-yellow-400 mr-2">2</span> reviews
                </div>
                <h5 className="text-lg font-medium text-orange-400 mb-4">6.000.000 VND</h5>

                <Button>Add Cart</Button>
            </div>
        </motion.div>
    );
}

export default Card;
