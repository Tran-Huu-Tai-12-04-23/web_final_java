import { TextMain, TextSub, InputCountNumberCustom } from '../../components';
import { AnimateHover, AnimateOpacity } from '../../components/Animate';
import { CiDeliveryTruck } from 'react-icons/ci';
import { AiOutlineFileProtect } from 'react-icons/ai';
import { VscTrash } from 'react-icons/vsc';
import { useState } from 'react';
import { useLogin } from '../../context/login';

import { request } from '../../services';
import toast from 'react-hot-toast';

function CartItem({ data, setCartItems = () => {} }) {
    const { account } = useLogin();
    const removeItem = async () => {
        await request('DELETE', '/api/v1/user/cart?mId=' + account?.memberId + '&&proId=' + data?.id)
            .then((response) => {
                if (response.data) {
                    setCartItems((prev) => {
                        return prev.filter((item) => item.id !== data?.id);
                    });
                    console.log(response.data);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };
    return (
        <>
            <AnimateOpacity
                className={
                    'flex relative justify-between hover:bg-btn-second hover:brightness-125 cursor-pointer  dark:bg-dark-tiny gap-10 bg-light-tiny  p-2 rounded-md border-primary-style'
                }
            >
                <div className="h-[12rem] w-fit flex justify-center items-center rounded-md overflow-hidden">
                    <img src={data?.thumbnails} className="w-full h-full bg-contain"></img>
                </div>

                <div className="flex w-full flex-col">
                    <TextMain>{data?.name}</TextMain>
                    <div className="flex justify-start items-center gap-4 mt-2">
                        <div className="p-2 rounded-full w-4 h-4 bg-black border-solid border-[1px] border-s-emerald-50"></div>
                        <span>{data?.color}</span>
                    </div>

                    <div className="flex mt-3 gap-4 justify-start items-center">
                        <CiDeliveryTruck className="h-6 w-6 text-primary"></CiDeliveryTruck>
                        <span>Miễn phí vận chuyển</span>
                    </div>
                    <div className="flex mt-3 gap-4 justify-start items-center">
                        <AiOutlineFileProtect className="h-6 w-6 text-primary"></AiOutlineFileProtect>
                        <span>Hòa trả và bảo hành uy tín</span>
                    </div>

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
                    </div>
                </div>
            </AnimateOpacity>
        </>
    );
}

export default CartItem;
