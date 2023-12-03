import { TextMain, TextSub, Button } from '../../components';
import ItemOrderSummary from './ItemOrderSummary';

function SummaryYourOrder({ setActiveStep = () => {}, totalPrice, data = [], onOrder = () => {} }) {
    return (
        <div className="flex flex-col p-4 rounded-md border-primary-style">
            <TextMain className={'font-bold pb-3 text-xl border-b-primary'}>Tóm tắt đơn hàng</TextMain>

            <div className="flex flex-col mt-5 gap-4">
                {data.map((item, index) => {
                    return <ItemOrderSummary data={item} key={index}></ItemOrderSummary>;
                })}
            </div>

            <div className="flex mt-5 justify-between items-center border-t-primary pt-3">
                <TextSub className={''}>Tổng tiền sản phẩm</TextSub>
                <TextSub className={''}> 519.52 vnd</TextSub>
            </div>

            <div className="flex justify-between mt-3 items-center">
                <TextSub className={''}>Mã giảm giá</TextSub>
                <TextSub className={''}>- 19.52 vnd</TextSub>
            </div>

            <div className="flex justify-between mt-3 items-center pb-4 border-b-primary">
                <TextSub className={''}>Phí vận chuyển</TextSub>
                <TextSub className={''}>+0 vnd</TextSub>
            </div>
            <div className="flex mt-3 justify-between items-center pb-4 border-b-primary">
                <TextSub className={'font-bold'}>Tổng tiền đơn hàng</TextSub>
                <TextSub className={'font-bold'}>$ {totalPrice}</TextSub>
            </div>

            <Button
                className="p-2 rounded-md w-full bg-primary"
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
