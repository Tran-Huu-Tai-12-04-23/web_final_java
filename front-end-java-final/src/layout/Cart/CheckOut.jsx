import { Button, TextMain } from '../../components';
import { FaRegEdit } from 'react-icons/fa';
import { PiCreditCardLight } from 'react-icons/pi';
import { HiOutlineHomeModern } from 'react-icons/hi2';

function Checkout({ setActiveStep, setPaymentCash, paymentCash }) {
    return (
        <div className="flex flex-col">
            <div className="flex flex-col gap-4 rounded-md p-4 border-primary-style">
                <TextMain className={'text-xl font-bold mb-4 pb-3 border-b-primary'}>
                    Chọn hình thức thanh toán
                </TextMain>

                <div class="flex hover:brightness-125 items-center rounded-md gap-4 border-b-primary pb-3 ">
                    <input
                        checked={paymentCash}
                        type="radio"
                        value=""
                        onChange={(e) => setPaymentCash(e.target.checked)}
                        name="disabled-radio"
                        class="w-4 h-4  text-primary bg-gray-100 border-gray-300 f dark:bg-gray-700 dark:border-gray-600"
                    />
                    <PiCreditCardLight className="h-6 w-6"></PiCreditCardLight>

                    <div className="flex w-full justify-between">
                        <label for="disabled-radio" class="ml-2  text-md">
                            Thanh toán online
                        </label>
                        <FaRegEdit className="w-8 h-8 text-primary"></FaRegEdit>
                    </div>
                </div>

                <div class="flex hover:brightness-125 items-center rounded-md gap-4 border-b-primary pb-3 ">
                    <input
                        checked={!paymentCash}
                        type="radio"
                        value=""
                        onChange={(e) => setPaymentCash(!e.target.checked)}
                        name="disabled-radio"
                        class="w-4 h-4  text-primary bg-gray-100 border-gray-300 f dark:bg-gray-700 dark:border-gray-600"
                    />
                    <HiOutlineHomeModern className="h-6 w-6"></HiOutlineHomeModern>
                    <div className="flex w-full justify-between">
                        <label for="disabled-radio" class="ml-2  text-md">
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
