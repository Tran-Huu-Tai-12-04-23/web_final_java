import { motion } from 'framer-motion';
import { AnimateHover, AnimateOpacity } from '../../components/Animate';
import { CardMain, Button } from '../../components';
import { IoIosArrowForward } from 'react-icons/io';
import { useState, useEffect, useRef } from 'react';
import { CiShop } from 'react-icons/ci';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { request } from '../../services/index';
const sliderSettings = {
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoPlay: true,
};

function SaleProduct() {
    const [arrow, setArrow] = useState(false);
    const [x, setX] = useState(0);
    const [data, setData] = useState([]);
    const wrapperContent = useRef(null);

    const moveItemUp = (fromIndex, toIndex) => {
        const updatedItems = [...data]; // Tạo một bản sao mới của mảng items
        const [movedItem] = updatedItems.splice(fromIndex, 1); // Xóa phần tử từ vị trí fromIndex và lấy nó ra
        updatedItems.splice(toIndex, 0, movedItem); // Chèn phần tử vào vị trí toIndex
        setData(updatedItems); // Cập nhật state với mảng mới
    };

    const handleNextItem = () => {};

    useEffect(() => {
        const getData = async () => {
            await request('GET', '/api/v1/public/product?page=0&&size=20')
                .then((res) => {
                    const data = res.data;
                    if (!data) return;
                    setData(data);
                })
                .catch((err) => {
                    console.error(err);
                });
        };

        getData();
    }, []);

    return (
        <AnimateOpacity
            onMouseEnter={() => setArrow(true)}
            onMouseLeave={() => setArrow(false)}
            className={
                'w-full relative p-10 flex justify-between  items-center rounded-lg bg-second dark:bg-bg-dark-menu'
            }
        >
            <div className="w-1/5 xl:flex lg:flex 2xl:flex md:flex hidden justify-start items-start flex-col">
                <h1 className="font-bold text-3xl ">Product On Sale</h1>
                <Button className="p-2 text-white bg-primary mt-4 rounded-md flex justify-center items-center">
                    <CiShop className="w-6 h-6"></CiShop>
                    <span>Shop Now</span>
                </Button>
            </div>

            <motion.div className="2xl:w-4/5 xl:w-4/5 lg:w-4/5 md:w-4/5 w-full overflow-hidden ">
                <Slider {...sliderSettings}>
                    {data.map((card, index) => (
                        <div key={index} className="scale-90 flex justify-center items-center">
                            <CardMain data={card} key={index}></CardMain>
                        </div>
                    ))}
                </Slider>
            </motion.div>
        </AnimateOpacity>
    );
}

export default SaleProduct;
