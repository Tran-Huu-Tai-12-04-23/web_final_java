import { motion } from 'framer-motion';

import React from 'react';
import Slider from 'react-slick';
import { CardNew } from '../../components';

export default function NewItem() {
    const items = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];
    const CustomPrevArrow = (props) => (
        <button className="absolute p-10 h-10 w-10 rounded-full" {...props}>
            Previous
        </button>
    );

    const CustomNextArrow = (props) => (
        <button className="absolute p-10 h-10 w-10 rounded-full" {...props}>
            Next
        </button>
    );

    var settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 6,
        slidesToScroll: 6,
    };
    return (
        <motion.div className="p-10 relative">
            <motion.div className="flex justify-between mb-10 items-center border-b-[1px] border-solid border-primary">
                <motion.h1 className="text-3xl font-bold">New product</motion.h1>
                <motion.h4 className="underline cursor-pointer hover:text-primary">View All</motion.h4>
            </motion.div>
            <Slider {...settings} className="relative">
                {items.map((item, index) => (
                    <motion.div key={index} className="scale-90">
                        <CardNew></CardNew>
                    </motion.div>
                ))}
            </Slider>
        </motion.div>
    );
}
