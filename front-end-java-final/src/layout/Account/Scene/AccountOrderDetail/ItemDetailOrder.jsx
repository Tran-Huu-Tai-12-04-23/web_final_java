import { TextMain } from '../../../../components';
function ItemDetailOrder({ data }) {
    return (
        <div className="flex justify-between items-center gap-4 border-b-primary pb-3">
            <img className="h-24 w-24 rounded-md" src={data.product.thumbnails} alt={data.product.name}></img>
            <div className="flex justify-start  flex-col">
                <TextMain className={'max-w-[20rem] truncate float-left'}>{data.product.name}</TextMain>
                <TextMain className={'max-w-[20rem] truncate float-left'}>x {data.subAmount}</TextMain>
            </div>
            <div className="w-full float-right text-[#ee4d2d] flex justify-end items-center gap-2 font-semibold">
                <span>₫ </span>
                <TextMain>{data.subTotal.toFixed(2)}</TextMain>
            </div>
        </div>
    );
}

export default ItemDetailOrder;
