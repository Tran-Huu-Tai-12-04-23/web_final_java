import { TextMain } from '../../../../components';
function ItemDetailOrder() {
    return (
        <div className="flex justify-between items-center gap-4 border-b-primary pb-3">
            <img
                className="h-24 w-24 rounded-md"
                src="https://down-vn.img.susercontent.com/file/sg-11134201-22100-a467jfaxvviv96_tn"
                alt="item"
            ></img>
            <div className="flex justify-start  flex-col">
                <TextMain className={'max-w-[20rem] truncate float-left'}>
                    Thåt Lung Nam Nato TAIGA Khöa Lö Kim Da Bö Thät Däy Nit Cao Cép Den Näu Bén Dep Cöng Sö Sang Trong
                    Di Hoc Di Läm Bån Nhå
                </TextMain>
                <TextMain className={'max-w-[20rem] truncate float-left'}>x1</TextMain>
            </div>
            <div className="w-full float-right text-[#ee4d2d] flex justify-end items-center gap-2 font-semibold">
                <span>₫ </span>
                <TextMain>148.000</TextMain>
            </div>
        </div>
    );
}

export default ItemDetailOrder;
