import TextMain from "../TextMain";
import TextSub from "../TextSub";

function OrderDetailItem({productId}){
    const productName = "Inateck 12.3-13 Inch Laptop Case Sleeve 360° Protection Compatible with 13 inch MacBook";
    const productPrice = "$63.26";
    const productColor = "blue";
    const productQuantity = 1;
    return (
        <>
            <div className="w-[1020px] h-[100px] pl-1.5 pr-3 py-1.5 bg-white border-b border-stone-300 justify-center items-center gap-1.5 inline-flex">
                <img className="w-[100px] h-[80px] relative rounded" src="https://via.placeholder.com/87x74" />
                <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                    <div className="self-stretch font-light"><TextMain>{productName}</TextMain></div>
                    <div className="self-stretch h-7 flex-col justify-start items-start gap-1 flex">
                        <div className=" text-[10px] "><TextSub>{productColor}</TextSub></div>
                        <div className=" text-[10px] "><TextSub>x{productQuantity}</TextSub></div>
                    </div>
                    <div className="self-stretch text-right text-zinc-800 font-light "><TextSub>{productPrice}</TextSub></div>
                </div>
            </div>
        </>
    );
}
export default OrderDetailItem;