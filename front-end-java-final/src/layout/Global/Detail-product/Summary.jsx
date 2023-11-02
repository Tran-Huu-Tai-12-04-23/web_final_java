import { motion } from 'framer-motion';
import { AnimateOpacity } from '../../../components/Animate';
import { Button, TextHeader, TextMain } from '../../../components';

import { HiOutlineHomeModern } from 'react-icons/hi2';
import { BsPatchCheck } from 'react-icons/bs';
import { TbTruckDelivery } from 'react-icons/tb';
import Slider from 'react-slick';

var settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    arrows: true,
    slidesToScroll: 1,
};

const listOptions = ['8GB ram - 512gb ssd', '16GB ram - 512gb ssd', '16GB ram - 1TB ssd'];
function Summary() {
    return (
        <AnimateOpacity className="w-full">
            <TextHeader className={'font-bold max-w-[50rem] truncate overflow-hidden'}>
                MacBook Pro M2 MNEJ3 2022 LLA 13.3 inch
            </TextHeader>

            <TextMain className={'text-xl text-primary font-bold'}>Sold : 33 item</TextMain>

            <div className="flex mt-4 gap-4">
                <div className="flex justify-start items-center">
                    <HiOutlineHomeModern className="w-8 h-8 mr-2 text-primary"></HiOutlineHomeModern>
                    <TextMain> In Stock</TextMain>
                </div>
                <div className="flex justify-start items-center">
                    <BsPatchCheck className="w-8 h-8 mr-2 text-primary"></BsPatchCheck>
                    <TextMain>Guaranteed</TextMain>
                </div>
                <div className="flex justify-start items-center">
                    <TbTruckDelivery className="w-8 h-8 mr-2 text-primary"></TbTruckDelivery>
                    <TextMain>Delivery</TextMain>
                </div>
            </div>

            <div className="flex mt-4 flex-col gap-4">
                <div className="">
                    <TextMain className={'text-xl'}>Select color</TextMain>

                    <div className="mt-2 flex justify-start items-center gap-2">
                        <div className="rounded-full cursor-pointer hover:brightness-125 p-4 bg-red-500"></div>
                        <div className="rounded-full cursor-pointer hover:brightness-125 p-4 bg-green-500"></div>
                        <div className="rounded-full cursor-pointer hover:brightness-125 p-4 bg-gray-500"></div>
                    </div>
                </div>

                <ul className="flex flex-col gap-4 max-w-[26rem] m-4  rounded-md p-4 text-md list-disc">
                    <li className="flex justify-start items-center ">
                        <span className="min-w-[10rem]">Branch :</span>
                        <div className=" text-left font-bold">Apple</div>
                    </li>
                    <li className="flex justify-start items-center ">
                        <span className="min-w-[10rem]">Category : </span>
                        <div className=" text-left font-bold">Laptop</div>
                    </li>
                    <li className="flex justify-start items-center ">
                        <span className="min-w-[10rem]">Modern : </span>
                        <div className=" text-left font-bold">Apple m1</div>
                    </li>
                    <li className="flex justify-start items-center ">
                        <span className="min-w-[10rem]">Screen size : </span>
                        <div className=" text-left font-bold">13.3 inches</div>
                    </li>
                    <li className="flex justify-start items-center ">
                        <span className="min-w-[10rem]">CPU model : </span>
                        <div className=" text-left font-bold">m2</div>
                    </li>
                </ul>
                <div className="max-w-[28rem] p-4 pt-0">
                    <Slider
                        {...settings}
                        className="border-none  focus:border-none relative cursor-pointer p-4 rounded-xl  mb-4  "
                    >
                        {listOptions.map((option, index) => {
                            return (
                                <motion.div
                                    whileHover={{ scale: 1, transition: { duration: 0.3 } }}
                                    whileTap={{
                                        scale: 0.99,
                                        transition: { duration: 0.1 },
                                    }}
                                    key={index}
                                    className="rounded-md w-fit p-2 hover:bg-btn-second text-center cursor-pointer"
                                >
                                    <Button className="m-auto" style={'outline'}>
                                        {option}
                                    </Button>
                                </motion.div>
                            );
                        })}
                    </Slider>
                </div>
            </div>
        </AnimateOpacity>
    );
}

export default Summary;
