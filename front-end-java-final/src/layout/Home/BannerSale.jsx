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
            className="grid grid-cols-3 justify-between overflow-hidden rounded-xl gap-10 w-full items-center pt-10 pb-10"
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
                className="max-h-[30rem] xl:col-span-2 2xl:col-span-2 lg:col-span-2 col-span-3 h-full w-full cursor-pointer  rounded-xl bg-contain"
            ></motion.img>
            <motion.img
                whileTap={{
                    scale: 0.8,
                    transition: { duration: 0.3 },
                }}
                whileHover={{ scale: 1, transition: { duration: 0.3 } }}
                variants={item}
                src={banner2}
                className="max-h-[30rem] xl:col-span-1 2xl:col-span-1 lg:col-span-1 col-span-3 h-full cursor-pointer w-full rounded-xl"
            ></motion.img>
        </motion.div>
    );
}

export default BannerSale;
