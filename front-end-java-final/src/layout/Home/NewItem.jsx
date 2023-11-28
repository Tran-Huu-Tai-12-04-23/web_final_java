import { motion } from 'framer-motion';
import React from 'react';
import Slider from 'react-slick';
import { CardNew } from '../../components';
import MediaQuery from 'react-responsive';

export default function NewItem() {
    const items = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
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

    var settingLaptop = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 4,
    };
    var settingTablet = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 3,
    };
    var settingMobile = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div className="p-10 relative">
            <motion.div className="flex justify-between mb-10 items-center border-b-[1px] border-solid border-primary">
                <motion.h1 className="text-3xl font-bold">Sản phẩm mới</motion.h1>
                <motion.h4 className="underline cursor-pointer hover:text-primary">Xem tất cả</motion.h4>
            </motion.div>
            <MediaQuery query="(min-width: 1024px)">
                <Slider {...settingLaptop}>
                    {items.map((item, index) => (
                        <motion.div key={index} className=" scale-90">
                            <CardNew></CardNew>
                        </motion.div>
                    ))}
                </Slider>
            </MediaQuery>
            <MediaQuery query="(min-width: 768px) and (max-width: 1023px)">
                <Slider {...settingTablet}>
                    {items.map((item, index) => (
                        <motion.div key={index} className="scale-90">
                            <CardNew></CardNew>
                        </motion.div>
                    ))}
                </Slider>
            </MediaQuery>
            <MediaQuery query="(max-width: 767px)">
                <Slider {...settingMobile}>
                    {items.map((item, index) => (
                        <motion.div key={index} className="scale-90">
                            <CardNew></CardNew>
                        </motion.div>
                    ))}
                </Slider>
            </MediaQuery>
        </div>
    );
}
