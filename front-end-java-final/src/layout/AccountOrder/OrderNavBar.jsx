import { TextMain } from "../../components";

function OrderNavBar(){
    const currentOrder = 0;
    const deliveredOrder = 0;
    const canceledOrder = 0;
    const returnOrder = 0;
    return (
        <>
        {/* <div class="w-[114px] h-8 flex-col justify-start items-start gap-2.5 inline-flex"> */}
                {/* <div class="pb-1 justify-center items-center gap-2 inline-flex">
                    <div class="hover:text-primary text-center text-neutral-500 text-xl font-light font-inter leading-7 border-b border-neutral-500">Returned</div>
                    <div className="w-5 h-5 bg-rose-400 rounded-[32px] flex-col justify-center items-center gap-2.5 inline-flex">
                        <div className="text-center text-white text-base font-light font-inter leading-normal">0</div>
                    </div>
                </div>
        </div> */}
        <ul class="flex border-b mt-4">
            <li className="-mb-px mr-1 flex">
                <a className="bg-white border-l border-t border-r rounded-t py-2 px-4 text-primary flex items-center">
                    <TextMain>Current</TextMain>
                    <div className="h-5 bg-rose-400 rounded-[40px] flex-col justify-center items-center gap-2.5 inline-flex ml-2">
                        <div className="text-center text-white leading-normal"><TextMain>{currentOrder}</TextMain></div>
                    </div>
                </a>
            </li>

            <li class="mr-1">
                <a class="bg-white inline-block py-2 px-4 text-gray-400 hover:text-primary" href="#">
                    <TextMain>Delivered</TextMain></a>
                    <div className="w-5 h-5 bg-stone-50 rounded-[32px] flex-col justify-center items-center gap-2.5 inline-flex">
                        <div className="text-center text-neutral-500 text-base font-light font-['Inter'] leading-normal">0</div>
                    </div>
            </li>
            <li class="mr-1">
                <a class="bg-white inline-block py-2 px-4 text-gray-400 hover:text-primary" href="#"><TextMain>Canceled</TextMain></a>
                <div className="w-5 h-5 bg-stone-50 rounded-[32px] flex-col justify-center items-center gap-2.5 inline-flex">
                        <div className="text-center text-neutral-500 text-base font-light font-['Inter'] leading-normal">0</div>
                </div>
            </li>
            <li class="mr-1">
                <a class="bg-white inline-block py-2 px-4 text-gray-400 hover:text-primary font-semibold" href="#"><TextMain>Return</TextMain></a>
                <div className="w-5 h-5 bg-stone-50 rounded-[32px] flex-col justify-center items-center gap-2.5 inline-flex">
                        <div className="text-center text-neutral-500 text-base font-light font-['Inter'] leading-normal">0</div>
                </div>
            </li>
        </ul>
        </>
    );
}
export default OrderNavBar;