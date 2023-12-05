import { TextMain, TextSub, Button } from '../../../../components';

import { CiDeliveryTruck } from 'react-icons/ci';
<<<<<<< HEAD
import { BiSolidUserDetail } from 'react-icons/bi';
=======
>>>>>>> main
import { IoCloseSharp } from 'react-icons/io5';
import { FaVoteYea } from 'react-icons/fa';
import { LiaFileInvoiceSolid } from 'react-icons/lia';
import Constants from '../../../../Constants';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD

function OrderItem() {
    const history = useNavigate();
    return (
        <div
            onClick={() => history(Constants.ACCOUNT_ORDER + '/1')}
            className="flex flex-col gap-4 bg-bg-light-menu dark:bg-bg-dark-menu rounded-md p-4 hover:brightness-125 cursor-pointer"
        >
            <div className="border-b-primary pb-2 flex justify-between items-center">
                <TextSub>12-04-2003</TextSub>
                <div className="text-[#26aa99] flex justify-end items-center gap-2">
                    <CiDeliveryTruck className="w-6 h-6" />
                    <TextSub>Đang giao hàng</TextSub>
                </div>
            </div>

            <div className="flex justify-between items-center gap-4 border-b-primary pb-3">
                <img
                    className="h-24 w-24 rounded-md"
                    src="https://down-vn.img.susercontent.com/file/sg-11134201-22100-a467jfaxvviv96_tn"
                    alt="item"
                ></img>

                <TextMain className={'max-w-[20rem] truncate float-left'}>
                    Thåt Lung Nam Nato TAIGA Khöa Lö Kim Da Bö Thät Däy Nit Cao Cép Den Näu Bén Dep Cöng Sö Sang Trong
                    Di Hoc Di Läm Bån Nhå
                </TextMain>
                <div className="w-full float-right text-[#ee4d2d] flex justify-end items-center gap-2 font-semibold">
                    <span>₫ </span>
                    <TextMain>148.000</TextMain>
                </div>
            </div>

            <div className="flex justify-end items-center gap-4 pb-3">
                <Button className="flex p-2 text-sm justify-between text-blue-400 gap-4">
                    <LiaFileInvoiceSolid className="w-6 h-6  cursor-pointer"></LiaFileInvoiceSolid>
                    <span>Xem chi tiết hủy đơn</span>
                </Button>
                <Button className="flex p-2 text-sm justify-between text-green-400 pl-4 pr-4 gap-4">
                    <FaVoteYea className="w-6 h-6  cursor-pointer"></FaVoteYea>
                    <span>Đánh giá</span>
                </Button>
                <Button className="flex justify-between  text-sm bg-status-cancel items-center p-2 rounded-md w-fit pl-4 pr-4 text-red-400 gap-4">
                    <IoCloseSharp className="w-6 h-6 cursor-pointer"></IoCloseSharp>
                    <span>Hủy đơn hàng</span>
                </Button>
=======
import { useState } from 'react';
import { useEffect } from 'react';
import { MdOutlineCancel, MdDone } from 'react-icons/md';
import { IoReceiptOutline } from 'react-icons/io5';
import { useLoading } from '../../../../context/loadingContext';
import { request } from '../../../../services';
import toast from 'react-hot-toast';

function OrderItem({ data = {}, setOrderMembers = () => {} }) {
    const { startLoading, stopLoading } = useLoading();

    const history = useNavigate();
    const [color, setColor] = useState({
        text: '',
        bg: '',
        icon: '',
    });
    const handleCancelOrder = async (e) => {
        e.stopPropagation();

        if (data) {
            startLoading();
            await request('PUT', '/api/v1/user/order/cancel-order/' + data.id)
                .then((res) => {
                    if (res.data) {
                        toast.success('Hủy đơn hàng thành công!');
                        setOrderMembers((prev) => {
                            return prev.map((order) => {
                                if (order.id === data.id) {
                                    return { ...res.data };
                                }
                                return order;
                            });
                        });
                    }
                })
                .catch((err) => {
                    console.error(err);
                    toast.error('Hủy đơn hàng không thành công!');
                });
            stopLoading();
        }
    };
    useEffect(() => {
        if (data) {
            switch (data.stepOrder) {
                case 0: {
                    setColor({
                        text: 'text-status-pending',
                        bg: 'bg-status-pending',
                        icon: <IoReceiptOutline className="w-6 h-6" />,
                    });
                    break;
                }
                case 1: {
                    setColor({
                        text: 'text-status-delivery',
                        bg: 'bg-status-delivery',
                        icon: <CiDeliveryTruck className="w-6 h-6" />,
                    });
                    break;
                }
                case 2: {
                    setColor({
                        text: 'text-status-complete',
                        bg: 'bg-status-complete',
                        icon: <MdDone className="h-6 w-6" />,
                    });
                    break;
                }
                default: {
                    setColor({
                        text: 'text-status-cancel',
                        bg: 'bg-status-cancel',
                        icon: <MdOutlineCancel className="w-6 h-6" />,
                    });
                }
            }
        }

        if (data.isCancel) {
            setColor({
                text: 'text-status-cancel',
                bg: 'bg-status-cancel',
                icon: <MdOutlineCancel className="w-6 h-6" />,
            });
        }
    }, [data]);

    return (
        <div on className="flex flex-col gap-4 bg-bg-light-menu dark:bg-bg-dark-menu rounded-md p-4  cursor-pointer">
            <div className="border-b-primary pb-2 flex justify-between items-center">
                <TextSub>{new Date(data?.orderDate).toLocaleDateString()}</TextSub>
                <div className={`${color?.text}  flex justify-end items-center gap-2`}>
                    {color?.icon}
                    <TextSub>{data?.orderStatus}</TextSub>
                </div>
            </div>

            {data?.orderDetails.map((subOrder, index) => {
                return (
                    <div
                        onClick={() => history(Constants.PRODUCT + '/' + subOrder?.product.id)}
                        key={index}
                        className="hover:brightness-125 relative flex justify-between items-center gap-4 border-b-primary pb-3"
                    >
                        <img
                            className="h-24 w-24 rounded-md"
                            src={subOrder.product.thumbnails}
                            alt={subOrder.product.name}
                        ></img>

                        <TextMain className={'w-1/2 truncate float-left '}>{subOrder.product.name}</TextMain>
                        <div className="w-full float-right text-[#ee4d2d] flex justify-end items-center gap-2 font-semibold">
                            <span>₫ </span>
                            <TextMain>{subOrder.product.price.toFixed(2)}</TextMain>
                        </div>

                        <div className="w-full absolute top-1 right-1 float-right text-[#ee4d2d] flex justify-end items-center gap-2 font-semibold">
                            <span>x</span>
                            <TextMain>{subOrder.subAmount}</TextMain>
                        </div>
                    </div>
                );
            })}

            <div className="w-full flex justify-end items-center gap-4 border-b-primary pb-3">
                <TextMain className={'truncate float-left '}>Thành tiền : </TextMain>
                <div className="float-right text-[#ee4d2d] flex justify-end items-center gap-2 font-semibold">
                    <span>₫ </span>
                    <TextMain>{data.total.toFixed(2)}</TextMain>
                </div>
                <TextMain className={'truncate float-left '}>Số lượng : </TextMain>
                <TextMain>{data.amount}</TextMain>
            </div>
            <div className="flex justify-end items-center gap-4 pb-3">
                {data.isCancel && (
                    <Button className="flex p-2 text-sm justify-between text-blue-400 gap-4">
                        <LiaFileInvoiceSolid className="w-6 h-6  cursor-pointer"></LiaFileInvoiceSolid>
                        <span>Xem chi tiết hủy đơn</span>
                    </Button>
                )}
                {data.isCancel == false && data.stepOrder == 2 && (
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        className="flex p-2 text-sm justify-between text-green-400 pl-4 pr-4 gap-4"
                    >
                        <FaVoteYea className="w-6 h-6  cursor-pointer"></FaVoteYea>
                        <span>Đánh giá</span>
                    </Button>
                )}
                {data.isCancel == false && data.stepOrder == 0 && (
                    <Button
                        onClick={handleCancelOrder}
                        className="flex justify-between  text-sm bg-status-cancel items-center p-2 rounded-md w-fit pl-4 pr-4 text-red-400 gap-4"
                    >
                        <IoCloseSharp className="w-6 h-6 cursor-pointer"></IoCloseSharp>
                        <span>Hủy đơn hàng</span>
                    </Button>
                )}
>>>>>>> main
            </div>
        </div>
    );
}

export default OrderItem;
