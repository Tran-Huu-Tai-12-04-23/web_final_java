import * as React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AnimateHover } from '../../../components/Animate';
import { TextMain } from '../../../components';
import { categoryBlog } from '../../../assets/data';
// import { Tooltip } from 'flowbite-react';

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
        scale: 0.88,
    },
};

const CategoryApp = () => (
    <motion.div className="pt-10">
        <motion.ul
            className="flex justify-center gap-x-8 items-center flex-wrap"
            variants={container}
            initial="hidden"
            animate="visible"
        >
            {categoryBlog.map((cate, index) => (
                <Link
                    to={cate?.path}
                    key={index}
                    className="block cursor-pointer pt-4 pb-4 select-none "
                    variants={item}
                >
                    <AnimateHover className={'flex flex-col justify-center items-center'}>
                        {/* <Tooltip content={cate.name}>{cate.icon}</Tooltip> */}
                        <motion.div className={'text-md mb-5'}>{cate.icon}</motion.div>
                        <TextMain className={'text-md mb-5'}>{cate.name}</TextMain>
                    </AnimateHover>
                </Link>
            ))}
        </motion.ul>
    </motion.div>
);

export default CategoryApp;
