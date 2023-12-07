import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button, TextMain, TextSub, TimeLine } from '../../../../components';
import TimelineOder from './TimelineOrder';

import { CiDeliveryTruck } from 'react-icons/ci';
import { IoIosArrowBack } from 'react-icons/io';
import { LiaFileInvoiceSolid } from 'react-icons/lia';
import { FaVoteYea } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';

import ItemDetailOrder from './ItemDetailOrder';
import { useLoading } from '../../../../context/loadingContext';
import { request } from '../../../../services';
import toast from 'react-hot-toast';
import FormVoteProduct from '../include/FormVoteProduct';

function AccountOrderDetail() {
    const { startLoading, stopLoading } = useLoading();
    const history = useNavigate();
    const params = useParams();
    const [orderMember, setOrderMember] = useState(null);
    const [voteOrder, setVoteOrder] = useState(false);

    useEffect(() => {
        const getDetailOrder = async () => {
            const id = params.id;
            startLoading();
            await request('GET', `/api/v1/user/order/detail-order/${id}`)
                .then((res) => {
                    if (res.data) {
                        setOrderMember(res.data);
                    }
                })
                .catch((err) => console.error(err));
            stopLoading();
        };
        if (params.id) {
            getDetailOrder();
        }
    }, [params]);

    const handleCancelOrder = async (e) => {
        e.stopPropagation();

        if (orderMember) {
            startLoading();
            await request('PUT', '/api/v1/user/order/cancel-order/' + orderMember.id)
                .then((res) => {
                    if (res.data) {
                        toast.success('Hủy đơn hàng thành công!');
                        setOrderMember(res.data);
                    }
                })
                .catch((err) => {
                    console.error(err);
                    toast.error('Hủy đơn hàng không thành công!');
                });
            stopLoading();
        }
    };

    return (
        <>
            {voteOrder && (
                <FormVoteProduct
                    onComplete={(value) => setOrderMember(value)}
                    orderId={orderMember?.id}
                    onClose={() => {
                        setVoteOrder(false);
                    }}
                    onCancel={() => {}}
                ></FormVoteProduct>
            )}
            <div className="p-4 w-full">
                <div className="border-b-primary pb-2 flex justify-between items-center p-4 w-full">
                    <Button onClick={() => history(-1)} className="flex text-sm justify-between text-blue-400">
                        <IoIosArrowBack className="w-6 h-6 cursor-pointer"></IoIosArrowBack>
                        <span>Quay lại</span>
                    </Button>
                    <div className="text-[#26aa99] flex justify-end items-center gap-2">
                        <CiDeliveryTruck className="w-6 h-6" />
                        <TextSub>Đang giao hàng</TextSub>
                    </div>
                </div>

                {orderMember && (
                    <div>
                        {orderMember.isCancel ? (
                            <div className="p-4 bg-status-cancel text-status-cancel">
                                <TextMain>Bạn đã hủy đơn hàng</TextMain>
                            </div>
                        ) : (
                            <TimelineOder active={orderMember.stepOrder}></TimelineOder>
                        )}

                        <div className="flex flex-col gap-3 w-full p-2 mt-5  border-t-primary ">
                            {orderMember.orderDetails.map((subOrder, index) => {
                                return <ItemDetailOrder key={index} data={subOrder}></ItemDetailOrder>;
                            })}
                        </div>

                        <div className="flex justify-start flex-col items-startpt-2">
                            <TextMain className={'ml-4'}>Địa chỉ nhận hàng</TextMain>
                            <div className="flex flex-col gap-2 mt-2 ml-4">
                                <TextSub>{orderMember?.fullName}</TextSub>
                                <TextSub>{orderMember?.phoneNumberTakeOrder}</TextSub>
                                <TextSub>{orderMember?.address} </TextSub>
                                <TextSub className={'text-second italic'}>{orderMember.detailAddress}</TextSub>
                            </div>
                        </div>
                        <div className="flex justify-end flex-col items-end gap-2 pt-2">
                            <TextSub>Tổng : ₫ {orderMember.total.toFixed(2)}</TextSub>
                            <TextSub>Số lượng : x {orderMember.amount}</TextSub>
                            <TextSub>Ngày đặt hàng : {new Date(orderMember.orderDate).toLocaleDateString()}</TextSub>
                            <TextSub className={'text-sale'}>
                                Thanh toán {orderMember.methodPayment === 'CASH' ? 'khi nhận hàng' : 'online'}
                            </TextSub>
                        </div>
                        <div className="flex justify-end mr-2 w-full items-center mt-2 border-t-primary pt-4">
                            {orderMember.isPayment && (
                                <Button className="mr-2 flex justify-between  text-sm  items-center p-2 rounded-md w-fit pl-4 pr-4 text-green-600 gap-4">
                                    <span>Đã thanh toán</span>
                                </Button>
                            )}
                            {!orderMember.isVote && orderMember.stepOrder == 2 && (
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
                            {orderMember.isCancel == false && orderMember.stepOrder == 0 && (
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
                )}
            </div>
        </>
    );
}

export default AccountOrderDetail;
