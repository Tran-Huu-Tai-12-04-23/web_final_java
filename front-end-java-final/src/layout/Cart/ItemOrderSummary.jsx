import { TextMain, TextSub } from '../../components';

function ItemOrderSummary({ data }) {
    console.log(data);
    return (
        <div className="flex p-4 cursor-pointer justify-between gap-4 border-primary-style rounded-md hover:brightness-125 bg-light-tiny dark:bg-dark-tiny">
            <div className="overflow-hidden w-[10rem] flex justify-center items-start rounded-md">
                <img className="rounded-md" src={data?.product.thumbnails}></img>
            </div>

            <div className="flex flex-col">
                <TextMain>{data?.product.name}</TextMain>
                <TextSub>{data?.product.color}</TextSub>
                <TextSub>x{data?.quantity}</TextSub>

                <div className="w-full">
                    <TextMain className={'float-right'}> ₫ {data?.product.price.toFixed(2)}</TextMain>
                </div>
            </div>
        </div>
    );
}

export default ItemOrderSummary;
