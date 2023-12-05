import { LiaFileInvoiceSolid } from 'react-icons/lia';
import { TbTruckDelivery } from 'react-icons/tb';
import { MdDone } from 'react-icons/md';
<<<<<<< HEAD
function TimeLineOrder() {
=======
import { IoReceiptOutline } from 'react-icons/io5';

function TimeLineOrder({ active }) {
>>>>>>> main
    return (
        <div className="p-4 w-full justify-center items-center flex">
            <ol className="items-center w-full flex justify-between">
                <li className="relative mb-6 sm:mb-0 w-1/3">
                    <div className="flex items-center">
<<<<<<< HEAD
                        <div className="z-10 flex items-center justify-center p-2 bg-status-pending rounded-full text-status-pending ">
                            <LiaFileInvoiceSolid className="w-8 h-8" />
=======
                        <div
                            className={`z-10 flex items-center justify-center p-2 bg-status-pending rounded-full ${
                                active === 0 ? 'text-status-complete' : 'text-status-pending'
                            }`}
                        >
                            <LiaFileInvoiceSolid className="w-8 h-8" />
                            {active == 0 && <MdDone className="w-8 h-8" />}
>>>>>>> main
                        </div>
                        <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                    </div>
                    <div className="mt-3 sm:pe-8 text-sm">Đang chuẩn bị hàng</div>
                </li>
                <li className="relative mb-6 sm:mb-0 w-1/3">
                    <div className="flex items-center">
<<<<<<< HEAD
                        <div className="z-10 flex items-center justify-center p-2 bg-status-inprogress rounded-full text-status-inprogress ">
                            <TbTruckDelivery className="w-8 h-8" />
=======
                        <div
                            className={`z-10 flex items-center justify-center p-2 bg-status-pending rounded-full ${
                                active === 1 ? 'text-status-complete' : 'text-status-pending'
                            }`}
                        >
                            <TbTruckDelivery className="w-8 h-8" />
                            {active == 1 && <MdDone className="w-8 h-8" />}
>>>>>>> main
                        </div>
                        <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                    </div>
                    <div className="mt-3 sm:pe-8 text-sm">Đang giao hàng</div>
                </li>
                <li className="relative mb-6 sm:mb-0 w-1/3 ">
<<<<<<< HEAD
                    <div className="z-10 w-fit flex items-center justify-center p-2 bg-status-complete rounded-full text-status-complete ">
                        <MdDone className="w-8 h-8" />
=======
                    <div
                        className={`z-10  w-fit  p-3 flex items-center justify-center rounded-full ${
                            active === 2
                                ? 'text-status-complete  bg-status-complete'
                                : 'text-status-pending bg-status-pending '
                        }`}
                    >
                        <IoReceiptOutline className="w-6 h-6" />
>>>>>>> main
                    </div>
                    <div className="mt-3 sm:pe-8 text-sm ">Hoàn thành đơn hàng</div>
                </li>
            </ol>
        </div>
    );
}

export default TimeLineOrder;
