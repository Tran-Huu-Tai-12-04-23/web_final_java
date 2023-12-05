import { useEffect, useState } from 'react';
import { TextMain, TextSub, Button } from '../../components';
import ItemOrderSummary from './ItemOrderSummary';

function SummaryYourOrder({ setActiveStep = () => {}, totalPrice, data = [], onOrder = () => {} }) {
    const [total, setTotal] = useState(0);
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        if (data) {
            const amount = data.reduce((acc, item) => acc + +item.quantity, 0);
            let total = data.reduce((acc, item) => acc + +item.product.price * +item.quantity, 0);

            setTotal(total);
            setAmount(amount);
        }
    }, [data]);
    return (
        <div className="flex flex-col p-4 rounded-md border-primary-style">
            <TextMain className={'font-bold pb-3 text-xl border-b-primary'}>Tóm tắt đơn hàng</TextMain>

            <div className="flex flex-col mt-5 gap-4">
                {data.map((item, index) => {
                    if (item.product.quantity >= item.quantity) {
                        return <ItemOrderSummary data={item} key={index}></ItemOrderSummary>;
                    }
                })}
            </div>

            <div className="flex mt-5 justify-between items-center border-t-primary pt-3">
                <TextSub>Tổng tiền sản phẩm</TextSub>
                <TextSub> ₫ {total}</TextSub>
            </div>

            <div className="flex justify-between mt-3 items-center">
                <TextSub>Mã giảm giá</TextSub>
                <TextSub>- ₫ 0</TextSub>
            </div>

            <div className="flex justify-between mt-3 items-center pb-4 border-b-primary">
                <TextSub>Phí vận chuyển</TextSub>
                <TextSub>+0 ₫</TextSub>
            </div>
            <div className="flex mt-3 justify-between items-center pb-4 border-b-primary">
                <TextSub className={'font-bold'}>Tổng tiền đơn hàng</TextSub>
                <TextSub className={'font-bold'}>₫ {total}</TextSub>
            </div>

            <Button
                className="p-2 rounded-md text-white w-full bg-primary"
                onClick={() => {
                    setActiveStep(2);
                    onOrder();
                }}
            >
                Xác nhận đặt hàng
            </Button>
        </div>
    );
}

export default SummaryYourOrder;
