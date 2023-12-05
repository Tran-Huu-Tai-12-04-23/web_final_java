import { TextMain, TextSub, InputCountNumberCustom } from '../../../../../components';
import { AnimateHover, AnimateOpacity } from '../../../../../components/Animate';

import { CiDeliveryTruck } from 'react-icons/ci';
import { VscTrash } from 'react-icons/vsc';
import { AiOutlineFileProtect } from 'react-icons/ai';

function ItemOrder({ data }) {
    return (
        <>
            {data && (
                <AnimateOpacity
                    className={
                        'flex justify-between items-center hover:bg-btn-second hover:brightness-125 cursor-pointer  dark:bg-dark-tiny gap-10 bg-light-tiny  p-2 rounded-md'
                    }
                >
                    <div className="h-full w-fit flex justify-center items-center rounded-md overflow-hidden">
                        <img src={data.product.thumbnails} className="mm-auto w-full h-[5rem] bg-contain"></img>
                    </div>
                    <TextMain className={'w-[20rem] truncate'}>{data.product.name}</TextMain>
                    <di className="flex justify-start gap-4">
                        <div
                            style={{
                                backgroundColor: data.product.color,
                            }}
                            className="p-2 rounded-full w-4 h-4  border-solid border-[1px] border-s-emerald-50"
                        ></div>
                        <span>{data.product.color}</span>
                    </di>
                    <TextMain>x{data.subAmount}</TextMain>
                    <TextMain className={'text-orange-500 italic '}>đ {data.subTotal.toFixed(2)}</TextMain>
                </AnimateOpacity>
            )}
        </>
    );
}

export default ItemOrder;
