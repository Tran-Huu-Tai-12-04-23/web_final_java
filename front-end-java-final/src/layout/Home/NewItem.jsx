import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import React from 'react';
import Slider from 'react-slick';
import { CardNew } from '../../components';
import MediaQuery from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { request } from '../../services';
import Constants from '../../Constants';

export default function NewItem() {
    const history = useNavigate();
    const [data, setData] = useState([]);
    const items = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

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
<<<<<<< HEAD
                <motion.h4 className="underline cursor-pointer hover:text-primary">Xem tất cả</motion.h4>
=======
                <motion.h4
                    className="underline cursor-pointer hover:text-primary"
                    onClick={() => history(Constants.PRODUCT)}
                >
                    Xem tất cả
                </motion.h4>
>>>>>>> main
            </motion.div>
            <MediaQuery query="(min-width: 1024px)">
                <Slider {...settingLaptop}>
                    {data.map((item, index) => (
                        <div key={index} className=" scale-90">
                            <CardNew data={item}></CardNew>
                        </div>
                    ))}
                </Slider>
            </MediaQuery>
            <MediaQuery query="(min-width: 768px) and (max-width: 1023px)">
                <Slider {...settingTablet}>
                    {items.map((item, index) => (
                        <div key={index} className="scale-90">
                            <CardNew data={item}></CardNew>
                        </div>
                    ))}
                </Slider>
            </MediaQuery>

            <MediaQuery query="(max-width: 767px)">
                <Slider {...settingMobile}>
                    {items.map((item, index) => (
                        <div key={index} className="scale-90">
                            <CardNew data={item}></CardNew>
                        </div>
                    ))}
                </Slider>
            </MediaQuery>
        </div>
    );
}
