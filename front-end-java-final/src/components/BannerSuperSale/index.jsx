import { motion } from 'framer-motion';
import Slider from 'react-slick';

import Information from './Information';

const data = [
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/s/m/sm-s908_galaxys22ultra_front_green_211119_2.jpg',
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/s/m/sm-s908_galaxys22ultra_front_phantomwhite_211119_1_1.jpg',
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/1/5/15.1_1.png',
];

var settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow: true,
};
function BannerSuperSale() {
    return (
        <div className="shadow-xl rounded-xl bg-btn-second p-[5%] w-full flex justify-between items-center gap-10 mb-10">
            <Information></Information>
            <Slider
                {...settings}
                className="border-none  max-w-[50rem] w-1/2 focus:border-none relative cursor-pointer p-4 rounded-xl  mb-4 bg-light-tiny dark:bg-dark-tiny "
            >
                {data.map((item, index) => (
                    <motion.div
                        whileHover={{ scale: 1, transition: { duration: 0.3 } }}
                        whileTap={{
                            scale: 0.9,
                            transition: { duration: 0.3 },
                        }}
                        key={index}
                        className={'w-full rounded-xl '}
                    >
                        <motion.img src={item} alt={'sale'} className=" rounded-xl max-h-[40rem] m-auto"></motion.img>
                    </motion.div>
                ))}
            </Slider>
        </div>
    );
}

export default BannerSuperSale;
