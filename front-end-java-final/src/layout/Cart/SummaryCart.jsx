import { useState, useEffect } from 'react';
import { TextMain, Button, TextSub } from '../../components';

function SummaryCart({ data, setActiveStep = () => {} }) {
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
        <div className="w-full rounded-md p-4 border-primary-style">
            <TextMain className={'text-xxl font-bold pb-4 border-b-primary'}>Chi tiết thanh toán</TextMain>

            {data && (
                <>
                    <div className="flex mt-5 justify-between items-center">
                        <TextSub className={''}>Tạm tính</TextSub>
                        <TextSub className={''}>đ {total.toFixed(2)}</TextSub>
                    </div>

                    <div className="flex justify-between mt-3 items-center">
                        <TextSub className={''}>Giảm giá</TextSub>
                        <TextSub className={''}>đ 0</TextSub>
                    </div>

                    <div className="flex justify-between mt-3 items-center pb-4 border-b-primary">
                        <TextSub className={''}>Phí giao hàng</TextSub>
                        <TextSub className={''}>đ 0</TextSub>
                    </div>
                    <div className="flex mt-3 justify-between items-center pb-4 border-b-primary">
                        <TextSub className={'font-bold'}>Tổng cộng</TextSub>
                        <TextSub className={'font-bold'}>đ {total.toFixed(2)}</TextSub>
                    </div>
                </>
            )}

            <Button className="p-2 text-white rounded-md w-full bg-primary" onClick={() => setActiveStep(1)}>
                Thanh toán
            </Button>
        </div>
    );
}

export default SummaryCart;
