import { Button, TextMain } from '../../components';

import { FaRegEdit } from 'react-icons/fa';
import { PiCreditCardLight } from 'react-icons/pi';
import { HiOutlineHomeModern } from 'react-icons/hi2';

function Checkout({ setActiveStep, setPaymentCash, paymentCash }) {
    const handlePaymentChange = (e) => {
        setPaymentCash(e.target.value);
    };
    return (
        <div className="flex flex-col">
            <div className="flex flex-col gap-4 rounded-md p-4 border-primary-style">
                <TextMain className={'text-xl font-bold mb-4 pb-3 border-b-primary'}>
                    Chọn hình thức thanh toán
                </TextMain>

                <div className="flex hover:brightness-125 items-center rounded-md gap-4 border-b-primary pb-3">
                    <input
                        checked={paymentCash == 1}
                        type="radio"
                        value={1}
                        onChange={handlePaymentChange}
                        id="onlinePayment"
                        name="paymentMethod"
                        className="w-4 h-4 text-primary bg-gray-100 border-gray-300 f dark:bg-gray-700 dark:border-gray-600"
                    />
                    <PiCreditCardLight className="h-6 w-6" />

                    <div className="flex w-full justify-between">
                        <label htmlFor="onlinePayment" className="ml-2 text-md">
                            Thanh toán online
                        </label>
                        <FaRegEdit className="w-8 h-8 text-primary"></FaRegEdit>
                    </div>
                </div>

                <div className="flex hover:brightness-125 items-center rounded-md gap-4 border-b-primary pb-3">
                    <input
                        checked={paymentCash == 0}
                        type="radio"
                        value={0}
                        onChange={handlePaymentChange}
                        id="cashPayment"
                        name="paymentMethod"
                        className="w-4 h-4 text-primary bg-gray-100 border-gray-300 f dark:bg-gray-700 dark:border-gray-600"
                    />
                    <HiOutlineHomeModern className="h-6 w-6" />
                    <div className="flex w-full justify-between">
                        <label htmlFor="cashPayment" className="ml-2 text-md">
                            Thanh toán khi nhận hàng
                        </label>
                    </div>
                </div>
            </div>

            <Button onClick={() => setActiveStep(1)} className="mt-4 text-primary w-fit">
                Quay lại
            </Button>
        </div>
    );
}

export default Checkout;
