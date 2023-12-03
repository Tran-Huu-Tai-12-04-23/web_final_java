import { TextMain, TextSub, Button } from '../../../../components';

import { CiDeliveryTruck } from 'react-icons/ci';
import { BiSolidUserDetail } from 'react-icons/bi';
import { IoCloseSharp } from 'react-icons/io5';
import { FaVoteYea } from 'react-icons/fa';
import { LiaFileInvoiceSolid } from 'react-icons/lia';
import Constants from '../../../../Constants';
import { useNavigate } from 'react-router-dom';

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
            </div>
        </div>
    );
}

export default OrderItem;
