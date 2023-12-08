import { TextMain, TextSub, Button } from '../../../../components';

import { CiDeliveryTruck } from 'react-icons/ci';
import { IoCloseSharp } from 'react-icons/io5';
import { FaVoteYea } from 'react-icons/fa';
import { LiaFileInvoiceSolid } from 'react-icons/lia';
import Constants from '../../../../Constants';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { MdOutlineCancel, MdDone } from 'react-icons/md';
import { IoReceiptOutline } from 'react-icons/io5';
import { useLoading } from '../../../../context/loadingContext';
import { request } from '../../../../services';
import FormVoteProduct from '../include/FormVoteProduct';
import toast from 'react-hot-toast';

function OrderItem({ data = {}, setOrderMembers = () => {} }) {
    const { startLoading, stopLoading } = useLoading();
    const [voteOrder, setVoteOrder] = useState(false);

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
        <>
            {voteOrder && (
                <FormVoteProduct
                    setOrderMembers={setOrderMembers}
                    orderId={data?.id}
                    onClose={() => {
                        setVoteOrder(false);
                    }}
                    onCancel={() => {}}
                ></FormVoteProduct>
            )}
            <div
                on
                className="flex flex-col gap-4 bg-bg-light-menu dark:bg-bg-dark-menu rounded-md p-4  cursor-pointer"
            >
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
                        <Button
                            onClick={() => history(Constants.ACCOUNT_ORDER + '/' + data.id)}
                            className="flex p-2 text-sm justify-between text-blue-400 gap-4"
                        >
                            <LiaFileInvoiceSolid className="w-6 h-6  cursor-pointer"></LiaFileInvoiceSolid>
                            <span>Xem chi tiết hủy đơn</span>
                        </Button>
                    )}
                    {data?.isVote === false && data.stepOrder === 2 && (
                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                setVoteOrder(true);
                            }}
                            className="flex p-2 text-sm justify-between text-green-400 pl-4 pr-4 gap-4"
                        >
                            <FaVoteYea className="w-6 h-6  cursor-pointer"></FaVoteYea>
                            <span>Đánh giá</span>
                        </Button>
                    )}
                    {data.isPayment && (
                        <Button className="mr-2 flex justify-between  text-sm  items-center p-2 rounded-md w-fit pl-4 pr-4 text-green-600 gap-4">
                            <span>Đã thanh toán</span>
                        </Button>
                    )}
                    {data.isCancel === false && (
                        <Button
                            onClick={() => {
                                history(Constants.USER_ORDER + '/' + data.id);
                            }}
                            className="flex justify-between text-green-600 dark:text-white text-sm bg-status-complete items-center p-2 rounded-md w-fit pl-4 pr-4  gap-4"
                        >
                            <LiaFileInvoiceSolid className="w-6 h-6 cursor-pointer"></LiaFileInvoiceSolid>
                            <span>Xem chi tiết đơn hàng</span>
                        </Button>
                    )}
                    {data.isCancel === false && data.stepOrder === 0 && (
                        <Button
                            onClick={handleCancelOrder}
                            className="flex justify-between  text-sm bg-status-cancel items-center p-2 rounded-md w-fit pl-4 pr-4 text-red-400 gap-4"
                        >
                            <IoCloseSharp className="w-6 h-6 cursor-pointer"></IoCloseSharp>
                            <span>Hủy đơn hàng</span>
                        </Button>
                    )}
                </div>
            </div>
        </>
    );
}

export default OrderItem;
