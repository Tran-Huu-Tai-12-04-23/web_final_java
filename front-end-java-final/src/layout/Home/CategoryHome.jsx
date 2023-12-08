import * as React from 'react';
import { AnimateHover } from '../../components/Animate';
import { TextMain } from '../../components';
import { Category } from '../../assets/data';
import { Link } from 'react-router-dom';

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

const CategoryHome = () => (
    <div className="w-full pb-10">
        <ul
            className="w-full flex justify-center items-center flex-wrap"
            variants={container}
            initial="hidden"
            animate="visible"
        >
            {Category.map((cate, index) => (
                <Link
                    to={cate.path}
                    key={index}
                    className="xl:w-1/6 scale-75 lg:w-1/3 md:w-1/3 sm:w-1/2 w-full block cursor-pointer pt-4 pb-4 select-none "
                    variants={item}
                >
                    <AnimateHover className={'flex flex-col justify-center items-center w-full rounded-xl shadow-md'}>
                        <img className="h-[10rem] scale-75 rounded-lg " src={cate.linkImg}></img>
                        <TextMain className={'text-xl font-bold mb-5'}>{cate.name}</TextMain>
                    </AnimateHover>
                </Link>
            ))}
        </ul>
    </div>
);

export default CategoryHome;
