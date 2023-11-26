import { TextMain, TextSub } from '../../components';

function ItemOrderSummary({ data }) {
    console.log(data);
    return (
        <div className="flex p-4 cursor-pointer justify-between gap-4 border-primary-style rounded-md hover:brightness-125 bg-light-tiny dark:bg-dark-tiny">
            <div className="overflow-hidden w-[10rem] flex justify-center items-start rounded-md">
                <img className="rounded-md" src={data?.thumbnails}></img>
            </div>

            <div className="flex flex-col">
                <TextMain>{data?.name}</TextMain>
                <TextSub>{data?.color}</TextSub>
                <TextSub>x1</TextSub>

                <div className="w-full">
                    <TextMain className={'float-right'}> {data?.price} vnd</TextMain>
                </div>
            </div>
        </div>
    );
}

export default ItemOrderSummary;
