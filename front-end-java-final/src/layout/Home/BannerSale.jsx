import { motion } from 'framer-motion';
import banner from '../../assets/img/bannerSale (1).png';
import banner2 from '../../assets/img/bannerSale (2).png';
import { AnimateHover } from '../../components/Animate';
const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.5,
            staggerChildren: 0.2,
        },
    },
};

const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        scale: 0.98,
    },
};

function BannerSale() {
    return (
        <motion.div
            className="flex justify-between gap-10 w-full items-center pt-10 pb-10"
            variants={container}
            initial="hidden"
            animate="visible"
        >
            <motion.img
                whileTap={{
                    scale: 0.8,
                    transition: { duration: 0.3 },
                }}
                whileHover={{ scale: 1, transition: { duration: 0.3 } }}
                variants={item}
                src={banner}
                className="h-[30rem] w-3/5  cursor-pointer  rounded-xl bg-contain"
            ></motion.img>
            <motion.img
                whileTap={{
                    scale: 0.8,
                    transition: { duration: 0.3 },
                }}
                whileHover={{ scale: 1, transition: { duration: 0.3 } }}
                variants={item}
                src={banner2}
                className="h-[30rem] cursor-pointer w-2/5 rounded-xl"
            ></motion.img>
        </motion.div>
    );
}

export default BannerSale;
