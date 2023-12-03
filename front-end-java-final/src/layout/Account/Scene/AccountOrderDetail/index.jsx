import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button, TextMain, TextSub, TimeLine } from '../../../../components';
import TimelineOder from './TimelineOrder';

import { CiDeliveryTruck } from 'react-icons/ci';
import { IoIosArrowBack } from 'react-icons/io';

import ItemDetailOrder from './ItemDetailOrder';

function AccountOrderDetail() {
    const history = useNavigate();
    const params = useParams();

    return (
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

            <TimelineOder></TimelineOder>

            <div className="flex justify-start flex-col items-start border-t-primary pt-2">
                <TextMain className={'ml-4'}>Địa chỉ nhận hàng</TextMain>

                <div className="flex justify-start items-start flex-col gap-2 mt-4 border-t-primary pt-2 w-full">
                    <div className="flex flex-col gap-4 ml-4">
                        <TextSub>Tran huu tai</TextSub>
                        <TextSub>0376100548</TextSub>
                        <TextSub>HCM city </TextSub>
                        <TextSub>458/21</TextSub>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-3 w-full p-2 mt-5">
                <ItemDetailOrder></ItemDetailOrder>
                <ItemDetailOrder></ItemDetailOrder>
                <ItemDetailOrder></ItemDetailOrder>
            </div>

            <div className="flex justify-end flex-col items-end pt-2">
                <TextSub className={''}>Tổng : Đ 100</TextSub>
                <TextSub className={''}>Ngày nhận : 12-04-2003</TextSub>
                <TextSub className={'text-sale'}>Thanh toán khi nhận hàng</TextSub>
            </div>
        </div>
    );
}

export default AccountOrderDetail;
