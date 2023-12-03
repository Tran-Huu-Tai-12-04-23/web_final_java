import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import Slider from 'react-slick';
import { AnimateOpacity } from '../Animate';
import { Modal, ModalItem } from '../../components';

import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

var settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
};
const defaultData = [
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/s/m/sm-s908_galaxys22ultra_front_green_211119_2.jpg',
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/s/m/sm-s908_galaxys22ultra_front_phantomwhite_211119_1_1.jpg',
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/1/5/15.1_1.png',
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/1/5/15.3_1.png',
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/1/5/15.6_1.png',
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/s/m/sm-s908_galaxys22ultra_front_green_211119_2.jpg',
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/s/m/sm-s908_galaxys22ultra_front_phantomwhite_211119_1_1.jpg',
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/1/5/15.1_1.png',
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/1/5/15.3_1.png',
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/1/5/15.6_1.png',
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/s/m/sm-s908_galaxys22ultra_front_green_211119_2.jpg',
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/s/m/sm-s908_galaxys22ultra_front_phantomwhite_211119_1_1.jpg',
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/1/5/15.1_1.png',
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/1/5/15.3_1.png',
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/1/5/15.6_1.png',
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/s/m/sm-s908_galaxys22ultra_front_green_211119_2.jpg',
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/s/m/sm-s908_galaxys22ultra_front_phantomwhite_211119_1_1.jpg',
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/1/5/15.1_1.png',
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/1/5/15.3_1.png',
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/1/5/15.6_1.png',
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/s/m/sm-s908_galaxys22ultra_front_green_211119_2.jpg',
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/s/m/sm-s908_galaxys22ultra_front_phantomwhite_211119_1_1.jpg',
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/1/5/15.1_1.png',
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/1/5/15.3_1.png',
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/1/5/15.6_1.png',
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/s/m/sm-s908_galaxys22ultra_front_green_211119_2.jpg',
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/s/m/sm-s908_galaxys22ultra_front_phantomwhite_211119_1_1.jpg',
    ,
];

function Carousel({ data = defaultData, onDoubleClick = () => {} }) {
    const [viewMode, setViewMode] = useState(false);
    const [active, setActive] = useState(0);
    const sliderRef = useRef(null);

    const nextSlide = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };

    const prevSlide = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };

    const goToSlide = (slideNumber) => {
        if (sliderRef.current) {
            sliderRef.current.slickGoTo(slideNumber);
        }
    };

    return (
        <div className=" w-full group overflow-hidden relative">
            <>
                <Slider
                    ref={sliderRef}
                    slickGoTo={active}
                    {...settings}
                    className="border-none focus:border-none relative cursor-pointer p-4 rounded-xl  mb-4 bg-light-tiny dark:bg-dark-tiny "
                >
                    {data.map((item, index) => (
                        <motion.div
                            whileHover={{ scale: 1, transition: { duration: 0.3 } }}
                            whileTap={{
                                scale: 0.9,
                                transition: { duration: 0.3 },
                            }}
                            key={index}
                            onDoubleClick={() => {
                                onDoubleClick();
                            }}
                            className={'w-full rounded-xl '}
                        >
                            <motion.img
                                src={item}
                                alt={'sale'}
                                className=" rounded-xl max-h-[40rem] m-auto"
                            ></motion.img>
                        </motion.div>
                    ))}
                </Slider>
            </>
            <AnimateOpacity
                onClick={prevSlide}
                className="group-hover:flex hidden rounded-full absolute top-1/3 left-4  w-fit  justify-center  group items-center bg-btn-second p-2"
            >
                <IoIosArrowBack className="h-8 w-8 brightness-50 cursor-pointer group-hover:brightness-100"></IoIosArrowBack>
            </AnimateOpacity>
            <AnimateOpacity
                onClick={nextSlide}
                className="group-hover:flex hidden absolute top-1/3 right-4 rounded-full w-fit justify-center group items-center bg-btn-second p-2"
            >
                <IoIosArrowForward className="h-8 w-8 brightness-50 cursor-pointer  group-hover:brightness-100"></IoIosArrowForward>
            </AnimateOpacity>
            {/* navigate */}
            <div className="p-4 w-full rounded-md">
                <ScrollContainer ignoreElements=".ignore" style={{ overflow: 'auto' }}>
                    <div className="flex justify-start w-max flex-shrink-0 gap-4">
                        {data.map((img, index) => {
                            return (
                                <motion.div
                                    whileHover={{ scale: 1, transition: { duration: 0.3 } }}
                                    whileTap={{
                                        scale: 0.9,
                                        transition: { duration: 0.3 },
                                    }}
                                    onClick={() => {
                                        goToSlide(index);
                                        setActive(index);
                                    }}
                                    key={index}
                                    className="rounded-md h-24 w-24 p-2 bg-light-tiny dark:bg-dark-tiny hover:bg-btn-second cursor-pointer"
                                >
                                    <img src={img} alt="img" className="rounded-md"></img>
                                </motion.div>
                            );
                        })}
                    </div>
                </ScrollContainer>
            </div>
        </div>
    );
}

export default Carousel;
