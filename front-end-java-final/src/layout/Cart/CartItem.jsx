import { TextMain, TextSub, InputCountNumberCustom } from '../../components';
import { AnimateHover, AnimateOpacity } from '../../components/Animate';
import { CiDeliveryTruck } from 'react-icons/ci';
import { AiOutlineFileProtect } from 'react-icons/ai';
import { VscTrash } from 'react-icons/vsc';

function CartItem() {
    return (
        <AnimateOpacity
            className={
                'flex justify-between hover:bg-btn-second hover:brightness-125 cursor-pointer  dark:bg-dark-tiny gap-10 bg-light-tiny  p-2 rounded-md border-primary-style'
            }
        >
            <div className="h-[12rem] w-fit flex justify-center items-center rounded-md overflow-hidden">
                <img
                    src={
                        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-z-fold-5-256gb_1.png'
                    }
                    className="w-full h-full bg-contain"
                ></img>
            </div>

            <div className="flex w-full flex-col">
                <TextMain>MacBook Pro M2 MNEJ3 2022 LLA 13.3 inch</TextMain>
                <di className="flex justify-start items-center gap-4 mt-2">
                    <div className="p-2 rounded-full w-4 h-4 bg-black border-solid border-[1px] border-s-emerald-50"></div>
                    <span>Black</span>
                </di>

                <div className="flex mt-3 gap-4 justify-start items-center">
                    <CiDeliveryTruck className="h-6 w-6 text-primary"></CiDeliveryTruck>
                    <span>Free delivery</span>
                </div>
                <div className="flex mt-3 gap-4 justify-start items-center">
                    <AiOutlineFileProtect className="h-6 w-6 text-primary"></AiOutlineFileProtect>
                    <span>Guaranteed </span>
                </div>

                <div className="flex mt-4 justify-between items-center">
                    <div className="flex w-2/3 justify-start items-center gap-4">
                        <TextSub className={'line-through text-second'}>$ 124.26</TextSub>
                        <TextMain>$ 64.26</TextMain>
                    </div>

                    <div className="w-[10rem] flex justify-end items-center gap-4">
                        <AnimateHover>
                            {' '}
                            <VscTrash className="h-6 w-6 text-red-400"></VscTrash>
                        </AnimateHover>
                        <InputCountNumberCustom></InputCountNumberCustom>
                    </div>
                </div>
            </div>
        </AnimateOpacity>
    );
}

export default CartItem;
