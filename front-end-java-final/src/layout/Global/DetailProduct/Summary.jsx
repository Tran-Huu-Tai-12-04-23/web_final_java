import { motion } from 'framer-motion';
import { AnimateOpacity } from '../../../components/Animate';
import { Button, TextHeader, TextMain, TextSub } from '../../../components';

import { HiOutlineHomeModern } from 'react-icons/hi2';
import { BsPatchCheck } from 'react-icons/bs';
import { TbTruckDelivery } from 'react-icons/tb';
import { colorOptions } from '../../../assets/data';

function Summary({ data }) {
    console.log(data);
    const color = colorOptions.filter((cl) => cl?.name?.toLowerCase() === data?.color?.toLowerCase())[0];
    return (
        <AnimateOpacity className="w-full">
            <div className="flex gap-4 justify-start items-end">
                <TextHeader className={'font-bold max-w-[50rem] truncate overflow-hidden'}>{data?.name}</TextHeader>
                <TextSub className={'text-second max-w-[50rem] truncate overflow-hidden'}>
                    {data?.shortDescription}
                </TextSub>
            </div>

            <TextMain className={'text-xl text-primary font-bold'}>Đã bán : 33 sản phẩm</TextMain>

            <div className="flex mt-4 gap-4">
                <div className="flex justify-start items-center">
                    <HiOutlineHomeModern className="w-8 h-8 mr-2 text-primary"></HiOutlineHomeModern>
                    <TextMain> Còn hàng</TextMain>
                </div>
                <div className="flex justify-start items-center">
                    <BsPatchCheck className="w-8 h-8 mr-2 text-primary"></BsPatchCheck>
                    <TextMain>Uy tín</TextMain>
                </div>
                <div className="flex justify-start items-center">
                    <TbTruckDelivery className="w-8 h-8 mr-2 text-primary"></TbTruckDelivery>
                    <TextMain>Vận chuyển</TextMain>
                </div>
            </div>

            <div className="flex mt-4 flex-col gap-4">
                <div className="">
                    <TextMain className={'text-xl'}>Màu sắc</TextMain>

                    <div className="mt-2 flex justify-start items-center gap-2">
                        <div
                            className="rounded-full w-4 h-4 cursor-pointer hover:brightness-125 p-4 "
                            style={{
                                background: color?.hexCode,
                            }}
                        ></div>
                        <span> {color?.name}</span>
                    </div>
                </div>

                <ul className="flex flex-col gap-4 max-w-[26rem] m-4  rounded-md p-4 text-md list-disc">
                    <li className="flex justify-start items-center ">
                        <span className="min-w-[10rem]">Thương hiệu :</span>
<<<<<<< HEAD
                        <div className=" text-left font-bold">{data?.branch?.nameBranch}</div>
=======
                        <div className=" text-left font-bold">{data?.brand?.nameBrand}</div>
>>>>>>> main
                    </li>
                    <li className="flex justify-start items-center ">
                        <span className="min-w-[10rem]">Phân loại : </span>
                        <div className=" text-left font-bold">{data?.category?.nameCategory}</div>
                    </li>
                    <li className="flex justify-start items-center ">
                        <span className="min-w-[10rem]">Kích cỡ màn hình : </span>
                        <div className=" text-left font-bold">{data?.screenSize}</div>
                    </li>
                    <li className="flex justify-start items-center ">
                        <span className="min-w-[10rem]">Vi xử lý : </span>
                        <div className=" text-left font-bold">{data?.productSpecification?.typeCPU}</div>
                    </li>
                </ul>
                <div className="max-w-[28rem] p-4 pt-0">
                    <motion.div
                        whileHover={{ scale: 1, transition: { duration: 0.3 } }}
                        whileTap={{
                            scale: 0.99,
                            transition: { duration: 0.1 },
                        }}
                        className="rounded-md w-fit p-2 hover:bg-btn-second text-center cursor-pointer"
                    >
                        <Button className="m-auto" style={'outline'}>
                            {data?.productSpecification?.ramCapacity + ' - ' + data?.productSpecification?.hardDrive}
                        </Button>
                    </motion.div>
                </div>
            </div>
        </AnimateOpacity>
    );
}

export default Summary;
