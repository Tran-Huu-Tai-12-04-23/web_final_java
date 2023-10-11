import { motion } from 'framer-motion';
import Slider from 'react-slick';
import Slide1 from '../../assets/img/slide1.png';
import Slide2 from '../../assets/img/slide2.png';
import Slide3 from '../../assets/img/slide3.png';
import Slide4 from '../../assets/img/slide4.png';
import Slide5 from '../../assets/img/slide5.png';

function SlideBannerProduct() {
    const items = [Slide1, Slide2, Slide3, Slide4, Slide5];
    var settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <Slider {...settings} className="relative p-10 rounded-xl ">
            {items.map((item, index) => (
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
    );
}

export default SlideBannerProduct;
