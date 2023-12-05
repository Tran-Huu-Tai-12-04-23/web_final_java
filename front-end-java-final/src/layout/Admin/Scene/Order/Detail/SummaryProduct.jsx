import { TextMain, TextSub } from '../../../../../components';
import ItemOrder from './ItemOrder';
function SummaryProduct({ data }) {
    return (
        <div className="p-4 border-primary-style rounded-md bg-light-tiny dark:bg-dark-tiny w-full">
            <div className="flex flex-col gap-4 border-b-primary mb-4 pb-4">
                {data &&
                    data.orderDetails.map((order, index) => {
                        return <ItemOrder key={index} data={order}></ItemOrder>;
                    })}
            </div>

            {data && (
                <div className="flex w-[20rem] gap-4 float-right flex-col">
                    <div className="flex w-full justify-between items-center">
                        <TextMain>Tạm tính : </TextMain>
                        <TextSub>đ {data.total.toFixed(2)}</TextSub>
                    </div>
                    <div className="flex w-full justify-between items-center">
                        <TextMain>Giảm giá : </TextMain>
                        <TextSub>đ 0</TextSub>
                    </div>
                    <div className="flex w-full justify-between pb-2 border-b-primary items-center">
                        <TextMain>Phí giao hàng : </TextMain>
                        <TextSub>đ 0</TextSub>
                    </div>
                    <div className="flex w-full justify-between items-center">
                        <TextMain>Tổng : </TextMain>
                        <TextSub>đ {data.total.toFixed(2)}</TextSub>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SummaryProduct;
