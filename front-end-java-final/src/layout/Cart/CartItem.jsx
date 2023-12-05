import { TextMain, TextSub, InputCountNumberCustom } from '../../components';
import { AnimateHover, AnimateOpacity } from '../../components/Animate';
import { CiDeliveryTruck } from 'react-icons/ci';
import { AiOutlineFileProtect } from 'react-icons/ai';
import { VscTrash } from 'react-icons/vsc';
import { useState } from 'react';
import { useLogin } from '../../context/login';
<<<<<<< HEAD

import { request } from '../../services';
import toast from 'react-hot-toast';

function CartItem({ data, setCartItems = () => {} }) {
    const { account } = useLogin();
    const removeItem = async () => {
        await request('DELETE', '/api/v1/user/cart?mId=' + account?.memberId + '&&proId=' + data?.id)
=======
import { Badge } from 'flowbite-react';

import { request } from '../../services';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useLoading } from '../../context/loadingContext';

function CartItem({ data, setCartItems = () => {} }) {
    const { account } = useLogin();
    const { startLoading, stopLoading } = useLoading();
    const [quantity, setQuantity] = useState(data?.quantity);
    const removeItem = async () => {
        startLoading();
        await request('DELETE', '/api/v1/user/cart?mId=' + account?.memberId + '&&proId=' + data?.product.id)
>>>>>>> main
            .then((response) => {
                if (response.data) {
                    setCartItems((prev) => {
                        return prev.filter((item) => item.id !== data?.id);
                    });
<<<<<<< HEAD
                    console.log(response.data);
=======
>>>>>>> main
                }
            })
            .catch((err) => {
                console.error(err);
            });
<<<<<<< HEAD
    };
=======
        stopLoading();
    };

    const handleUpdateQuantity = async (qu) => {
        startLoading();
        await request('PUT', '/api/v1/user/cart/update-quantity', {
            cartItemId: data?.id,
            quantity: qu,
        })
            .then((res) => {
                if (res.data) {
                    setCartItems((prev) => {
                        return prev.map((cartItem) => {
                            if (cartItem.id === data?.id) {
                                return res.data;
                            }
                            return cartItem;
                        });
                    });
                }
            })
            .catch((err) => console.error(err));
        stopLoading();
    };

    useEffect(() => {
        setQuantity(data?.quantity);
    }, [data]);
>>>>>>> main
    return (
        <>
            <AnimateOpacity
                className={
                    'flex relative justify-between hover:bg-btn-second hover:brightness-125 cursor-pointer  dark:bg-dark-tiny gap-10 bg-light-tiny  p-2 rounded-md border-primary-style'
                }
            >
                <div className="h-[12rem] w-fit flex justify-center items-center rounded-md overflow-hidden">
<<<<<<< HEAD
                    <img src={data?.thumbnails} className="w-full h-full bg-contain"></img>
                </div>

                <div className="flex w-full flex-col">
                    <TextMain>{data?.name}</TextMain>
                    <div className="flex justify-start items-center gap-4 mt-2">
                        <div className="p-2 rounded-full w-4 h-4 bg-black border-solid border-[1px] border-s-emerald-50"></div>
                        <span>{data?.color}</span>
=======
                    <img src={data?.product.thumbnails} className="w-full h-full bg-contain"></img>
                </div>

                <div className="flex w-full flex-col">
                    <TextMain>{data?.product.name}</TextMain>
                    <div className="flex justify-start items-center gap-4 mt-2">
                        <div className="p-2 rounded-full w-4 h-4 bg-black border-solid border-[1px] border-s-emerald-50"></div>
                        <span>{data?.product.color}</span>
>>>>>>> main
                    </div>

                    <div className="flex mt-3 gap-4 justify-start items-center">
                        <CiDeliveryTruck className="h-6 w-6 text-primary"></CiDeliveryTruck>
                        <span>Miễn phí vận chuyển</span>
                    </div>
                    <div className="flex mt-3 gap-4 justify-start items-center">
                        <AiOutlineFileProtect className="h-6 w-6 text-primary"></AiOutlineFileProtect>
                        <span>Hòa trả và bảo hành uy tín</span>
                    </div>

<<<<<<< HEAD
                    <div className="flex mt-4 justify-between items-center">
                        <div className="flex w-2/3 justify-start items-center gap-4">
                            <TextSub className={'line-through text-second'}>12.000 vnd</TextSub>
                            <TextMain>{data?.price} vnd</TextMain>
                        </div>

                        <div className="w-[10rem] flex justify-end items-center gap-4 absolute bottom-4 right-4">
                            <AnimateHover onClick={removeItem}>
                                <VscTrash className="h-6 w-6 text-red-400"></VscTrash>
                            </AnimateHover>
                        </div>
=======
                    <div className="flex mt-4 flex-col">
                        <div className="flex w-2/3 justify-start items-center gap-4">
                            <TextSub className={'line-through text-second'}>12.000 vnd</TextSub>
                            <TextMain>{data?.product.price} vnd</TextMain>
                        </div>
                        <InputCountNumberCustom
                            value={quantity}
                            disabled
                            onBlur={async (e) => {
                                if (+e.target.value > 0) {
                                    await handleUpdateQuantity(e.target.value);
                                }
                            }}
                            onDecrease={async () => {
                                if (+quantity - 1 === 0) {
                                    await removeItem();
                                } else if (quantity > 1) {
                                    await handleUpdateQuantity(quantity - 1);
                                }
                            }}
                            onIncrease={async () => {
                                await handleUpdateQuantity(quantity + 1);
                            }}
                            className="w-[10rem] mt-2 p-0"
                        />
                    </div>

                    <div className="w-[10rem] flex justify-end items-center gap-4 absolute bottom-4 right-4">
                        <AnimateHover onClick={removeItem}>
                            <VscTrash className="h-6 w-6 text-red-400"></VscTrash>
                        </AnimateHover>
>>>>>>> main
                    </div>
                </div>
            </AnimateOpacity>
        </>
    );
}

export default CartItem;
