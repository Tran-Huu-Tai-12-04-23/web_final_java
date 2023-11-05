import { TextMain, TextSub } from '../../components';

function ItemOrderSummary() {
    return (
        <div className="flex p-4 cursor-pointer justify-between gap-4 border-primary-style rounded-md hover:brightness-125 bg-light-tiny dark:bg-dark-tiny">
            <div className="overflow-hidden w-[10rem] flex justify-center items-start rounded-md">
                <img
                    className="rounded-md"
                    src={
                        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-z-fold-5-256gb_1.png'
                    }
                ></img>
            </div>

            <div className="flex flex-col">
                <TextMain>MacBook Pro M2 MNEJ3 2022 LLA 13.3 inch</TextMain>
                <TextSub>Black</TextSub>
                <TextSub>x1</TextSub>

                <div className="w-full">
                    <TextMain className={'float-right'}>$ 433</TextMain>
                </div>
            </div>
        </div>
    );
}

export default ItemOrderSummary;
