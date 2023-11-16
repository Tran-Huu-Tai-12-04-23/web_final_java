import { TextMain, TextSub, InputCountNumberCustom } from '../../../../../components';
import { AnimateHover, AnimateOpacity } from '../../../../../components/Animate';

import { CiDeliveryTruck } from 'react-icons/ci';
import { VscTrash } from 'react-icons/vsc';
import { AiOutlineFileProtect } from 'react-icons/ai';

function ItemOrder() {
    return (
        <AnimateOpacity
            className={
                'flex justify-between items-center hover:bg-btn-second hover:brightness-125 cursor-pointer  dark:bg-dark-tiny gap-10 bg-light-tiny  p-2 rounded-md'
            }
        >
            <div className="h-full w-fit flex justify-center items-center rounded-md overflow-hidden">
                <img
                    src={
                        'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-z-fold-5-256gb_1.png'
                    }
                    className="mm-auto w-full h-[5rem] bg-contain"
                ></img>
            </div>
            <TextMain>MacBook Pro M2 MNEJ3 2022 LLA 13.3 inch</TextMain>
            <di className="flex justify-start gap-4">
                <div className="p-2 rounded-full w-4 h-4 bg-black border-solid border-[1px] border-s-emerald-50"></div>
                <span>Black</span>
            </di>
            <TextMain>$ 64.26</TextMain>
        </AnimateOpacity>
    );
}

export default ItemOrder;
