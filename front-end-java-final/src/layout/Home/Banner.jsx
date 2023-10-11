import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AnimateOpacity, AnimateText } from '../../components/Animate';
import { Slide, TextMain, TextSub } from '../../components';
import { Button } from '../../components';

import { CiShop } from 'react-icons/ci';
import bannerImg1 from '../../assets/img/banner.png';
import bannerImg2 from '../../assets/img/banner2.png';
import bannerImg3 from '../../assets/img/banner3.png';

const slides = [
    { id: 1, content: <motion.img src={bannerImg1} alt="banner" className="w-[40rem]"></motion.img> },
    { id: 2, content: <motion.img src={bannerImg2} alt="banner" className="w-[40rem]"></motion.img> },
    { id: 3, content: <motion.img src={bannerImg3} alt="banner" className="w-[40rem]"></motion.img> },
];
function Banner() {
    return (
        <>
            <AnimateOpacity className="flex flex-col xl:flex-row lg:flex-row md:flex-row justify-between items-center p-4 m-auto xl:w-3/4 lg:w-2/3 w-full">
                <motion.div className=" relative flex justify-center items-start flex-col">
                    <AnimateText className={'text-5xl font-bold'}>Java Tech</AnimateText>
                    <AnimateText className={'text-xl mt-5 mb-5'}>
                        "Join the digital <motion.span className="ml-2 text-primary">digital revolution</motion.span>"
                    </AnimateText>
                    <Button className={'rounded-xl flex justify-center items-center  pl-4 pr-4 p-2 bg-second'}>
                        <CiShop className="h-8 w-8 text-primary"></CiShop>
                        <motion.span className="ml-1 text-primary">EXPLORE NOW</motion.span>
                    </Button>
                </motion.div>
                <AnimateOpacity className={'max-h-[40rem]'}>
                    <Slide slides={slides}></Slide>
                </AnimateOpacity>
            </AnimateOpacity>
        </>
    );
}

export default Banner;
