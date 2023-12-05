import { useState, useEffect, memo } from 'react';

import { Button } from '../index';
import { motion } from 'framer-motion';
import { AiFillStar } from 'react-icons/ai';
import { BsSuitHeartFill } from 'react-icons/bs';
import { CiHeart } from 'react-icons/ci';
import { IoAdd } from 'react-icons/io5';

import { Tooltip } from 'flowbite-react';

import { TextSub } from '../index';
import { useLogin } from '../../context/login';
import toast from 'react-hot-toast';
import { request } from '../../services';
import { useLoading } from '../../context/loadingContext';
import { Skeleton } from '../index';
import Constants from '../../Constants';
import { useNavigate } from 'react-router-dom';

function CardMain({ width = undefined, sale = true, data }) {
    const { startLoading, stopLoading } = useLoading();
    const [hearted, setHearted] = useState(false);
    const { account } = useLogin();
    const [loading, setLoading] = useState(true);
    const history = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleAddToCart = async () => {
        const dataReq = {
            memberId: account?.memberId,
            productId: data?.id,
        };

        try {
            await request('POST', '/api/v1/user/cart', dataReq)
                .then((response) => {
                    const data = response.data;
                    if (response.data) {
                        toast.success('Thêm ' + data?.name + ' vào giỏ hàng thành công!');
                    } else {
                        toast.error('Thêm  vào giỏ hàng thất bại, sản phẩm  không đủ cung cấp cho bạn!');
                    }
                })
                .catch((error) => {
                    toast.error('Thêm vào giỏ hàng thất bại');
                });
        } catch (error) {
            toast.error('Thêm vào giỏ hàng thất bại, sản phẩm  không đủ cung cấp cho bạn!');
        }
    };
    const addToCart = async (e) => {
        e.stopPropagation();
        if (account === null) {
            toast('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!', {
                icon: '⚠️',
            });

            return;
        }

        startLoading();
        await handleAddToCart();
        stopLoading();
    };
    return (
        <div>
            {loading ? (
                <Skeleton></Skeleton>
            ) : (
                <motion.div
                    onClick={() => history(Constants.PRODUCT + '/' + data?.id)}
                    whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                    whileTap={{
                        scale: 1,
                        transition: { duration: 0.3 },
                    }}
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    exit={{
                        opacity: 0,
                    }}
                    transition={{
                        duration: 0.3,
                        ease: 'easeInOut',
                    }}
                    className={`${width}  border-gray-200  dark:border-gray-700 flex-shrink-0 dark:text-white bg-white dark:bg-dark-tiny text-black shadow-md relative cursor-pointer p-2 rounded-lg overflow-hidden`}
                >
                    {/* {sale ? (
                        <div className="absolute top-[5%] left-0 rounded-r-md w-10 text-sm text-center text-sale bg-sale">
                            13%
                        </div>
                    ) : (
                        <></>
                    )} */}
                    <div className="  w-full flex items-center justify-center ">
                        <img src={data?.thumbnails} className="max-w-[10rem] w-1/2 rounded-lg"></img>
                    </div>
                    <div className="flex gap-2 flex-col ">
                        <h5 className="group-hover:text-primary text-md truncate">{data?.name}</h5>
                        <h5 className="group-hover:text-primary text-sm  text-second dark:text-white truncate">
                            {data?.productSpecification?.typeCPU}
                        </h5>
                        <div className="w-full mt-3 h-fit overflow-hidden">
                            <div className="flex justify-between items-end w-full ">
                                <div className="flex flex-col">
                                    <TextSub className="line-through">35$</TextSub>
                                    <TextSub className={'text-orange-500'}>đ{data?.price.toFixed(2)}</TextSub>
                                </div>
                                {/* <div className="flex justify-end items-center">
                            <AiFillStar className="h-4 w-4 text-yellow-400"></AiFillStar>
                            <TextSub>4.9</TextSub>
                        </div> */}
                            </div>
                            <div className="flex mt-2 justify-between items-center w-full h-full">
                                {hearted ? (
                                    <BsSuitHeartFill
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setHearted(!hearted);
                                        }}
                                        className="w-6 h-6 text-primary"
                                    ></BsSuitHeartFill>
                                ) : (
                                    <CiHeart
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setHearted(!hearted);
                                        }}
                                        className="w-6 text-primary h-6"
                                    ></CiHeart>
                                )}
                                <Tooltip content="Add your cart">
                                    <Button
                                        onClick={addToCart}
                                        className="rounded-full bg-light-tiny dark:bg-dark-tiny p-2 brightness-125"
                                    >
                                        <IoAdd className="w-6 h-6"></IoAdd>
                                    </Button>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}

export default memo(CardMain);
