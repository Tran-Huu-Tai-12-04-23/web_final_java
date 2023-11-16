import { useState } from 'react';

import { Button, Modal } from '../index';
import { motion } from 'framer-motion';
import { AiFillStar } from 'react-icons/ai';
import { BsSuitHeartFill } from 'react-icons/bs';
import { CiHeart } from 'react-icons/ci';
import { IoAdd } from 'react-icons/io5';

import { Spinner, Tooltip } from 'flowbite-react';

import { TextSub } from '../index';
import { useLogin } from '../../context/login';
import toast from 'react-hot-toast';
import { request } from '../../services';
import { LiaTrashRestoreAltSolid } from 'react-icons/lia';

function CardMain({ width = '', sale = true, data }) {
    const [hearted, setHearted] = useState(false);
    const { account } = useLogin();
    const [loading, setLoading] = useState(false);

    const handleAddToCart = async () => {
        const dataReq = {
            memberId: account?.memberId,
            productId: data?.id,
        };

        console.log(dataReq);

        try {
            await request('POST', '/api/v1/user/cart', dataReq)
                .then((response) => {
                    const data = response.data;
                    if (response.status === 200) {
                        toast.success('Add ' + data?.name + ' to cart successfully!');
                    } else {
                        toast.error(response.message);
                    }
                })
                .catch((error) => {
                    toast.error('add ' + data?.name + ' to cart failed');
                });
        } catch (error) {
            toast.error('add ' + data?.name + ' to cart failed');
        }
    };
    const addToCart = async () => {
        if (account === null) {
            toast('Please sign in to add product to cart!', {
                icon: '⚠️',
            });

            return;
        }

        setLoading(true);
        await handleAddToCart();
        setLoading(false);
    };
    return (
        <>
            {loading && (
                <Modal>
                    <Spinner color="pink"></Spinner>
                </Modal>
            )}
            <motion.div
                whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
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
                className={`${width} flex-shrink-0 dark:text-white bg-white dark:bg-dark-tiny text-black shadow-md relative cursor-pointer p-2 rounded-lg overflow-hidden`}
            >
                {sale && (
                    <div className="absolute top-[5%] left-0 rounded-r-md w-10 text-sm text-center text-sale bg-sale">
                        13%
                    </div>
                )}
                <div className="  w-full flex items-center justify-center ">
                    <img src={data?.thumbnails} className="max-w-[10rem] w-1/2 rounded-lg"></img>
                </div>
                <div className="flex p-2 flex-col ">
                    <h5 className="group-hover:text-primary text-md truncate">{data?.name}</h5>
                    <h5 className="group-hover:text-primary text-sm mt-2 text-second dark:text-white truncate">
                        {data?.productSpecification?.typeCPU}
                    </h5>
                    <div className="w-full mt-3 h-fit overflow-hidden">
                        <div initial={false} className="flex justify-between items-end w-full ">
                            <div className="flex flex-col">
                                <TextSub className="line-through">35$</TextSub>
                                <TextSub className={'text-[#9ea1db] dark:text-[#4d29a2]'}>{data?.price} $</TextSub>
                            </div>
                            {/* <div className="flex justify-end items-center">
                            <AiFillStar className="h-4 w-4 text-yellow-400"></AiFillStar>
                            <TextSub>4.9</TextSub>
                        </div> */}
                        </div>
                        <div className="flex mt-2 justify-between items-center w-full h-full">
                            {hearted && (
                                <BsSuitHeartFill
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setHearted(!hearted);
                                    }}
                                    className="w-6 h-6 text-primary"
                                ></BsSuitHeartFill>
                            )}
                            {!hearted && (
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
        </>
    );
}

export default CardMain;
