import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextSub, TimeLine, TextMain, Button, Modal } from '../../components';
import { AnimateOpacity } from '../../components/Animate';

import CartItem from './CartItem';
import SummaryCart from './SummaryCart';
import Checkout from './Checkout';
import SummaryYourOrder from './SummaryYourOrder';

import { FaRegEdit } from 'react-icons/fa';
import { AiOutlineClear } from 'react-icons/ai';
import { request } from '../../services';
import { useLogin } from '../../context/login';
import toast from 'react-hot-toast';
import { Spinner } from 'flowbite-react';

function Cart() {
    const history = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState([]);
    const { account } = useLogin();
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const calculatedTotalPrice = cartItems.reduce((total, item) => total + item.price, 0);
        setTotalPrice(calculatedTotalPrice);
    }, [cartItems]);
    useEffect(() => {
        if (account == null) {
            toast("You don't have sign in!", {
                icon: '⚠️',
            });
            history('/');
        }
    }, []);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            await request('GET', '/api/v1/user/cart?mId=' + account?.memberId)
                .then((response) => {
                    console.log(response);
                    if (response.data) {
                        setCartItems(response.data.products);
                    }
                })
                .catch((err) => console.error(err));

            setLoading(false);
        };

        getData();
    }, []);
    return (
        <div className="pt-[10rem] m-auto max-w-screen-xl ">
            <TimeLine active={activeStep} setActive={setActiveStep}></TimeLine>

            {activeStep === 0 && (
                <div className="flex flex-col gap-10 items-start w-full mt-10">
                    <div className="flex justify-between gap-10 items-start w-full ">
                        <div className="flex gap-4 w-2/3 flex-col">
                            {loading ? (
                                <Modal>
                                    <Spinner color="pink"></Spinner>
                                </Modal>
                            ) : (
                                cartItems.map((item, index) => {
                                    return <CartItem setCartItems={setCartItems} key={index} data={item}></CartItem>;
                                })
                            )}
                        </div>
                        <div className="w-1/3  ">
                            <SummaryCart setActiveStep={setActiveStep}></SummaryCart>
                        </div>
                    </div>
                </div>
            )}

            {activeStep === 1 && (
                <AnimateOpacity className="flex justify-between gap-10 items-start w-full mt-10">
                    <div className="flex justify-between items-start gap-10 w-full">
                        <div className="w-2/3 flex justify-start flex-col">
                            <TextMain className={'w-fit font-bold'}>Full name</TextMain>
                            <div
                                className={
                                    ' border-primary-style mt-2 w-full p-2 rounded-md bg-light-tiny dark:bg-dark-tiny'
                                }
                            >
                                Tran Huu Tai
                            </div>

                            <TextMain className={'mt-4 w-fit font-bold'}>Address</TextMain>
                            <div
                                className={
                                    ' border-primary-style mt-2 w-full p-2 rounded-md bg-light-tiny dark:bg-dark-tiny'
                                }
                            >
                                Default
                            </div>

                            <TextMain className={'mt-4 w-fit font-bold'}>Shipping method</TextMain>
                            <div
                                className={
                                    ' border-primary-style gap-4 mt-2 w-full p-2 rounded-md bg-light-tiny dark:bg-dark-tiny flex flex-col'
                                }
                            >
                                <div class="flex hover:brightness-125 gap-4 rounded-md border-b-primary pb-3">
                                    <input
                                        checked
                                        type="radio"
                                        value=""
                                        name="disabled-radio"
                                        class="w-4 h-4 mt-2 text-primary bg-gray-100 border-gray-300 f dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <div className="flex w-full justify-between items-end">
                                        <div className="flex flex-col">
                                            <label for="disabled-radio" class="ml-2  text-md">
                                                Free shipping
                                            </label>
                                            <span className="ml-4">7-10 business day</span>
                                        </div>
                                        <span>$20</span>
                                    </div>
                                </div>
                                <div class="flex hover:brightness-125 rounded-md gap-4 border-b-primary pb-3 ">
                                    <input
                                        checked
                                        type="radio"
                                        value=""
                                        name="disabled-radio"
                                        class="w-4 h-4  mt-2 text-primary bg-gray-100 border-gray-300 f dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <div className="flex w-full justify-between items-end">
                                        <div className="flex flex-col">
                                            <label for="disabled-radio" class="ml-2  text-md">
                                                Regular shipping
                                            </label>
                                            <span className="ml-4">5-7 business day</span>
                                        </div>
                                        <span>$26</span>
                                    </div>
                                </div>
                                <div class="flex  w-full justify-between gap-4">
                                    <input
                                        checked
                                        type="radio"
                                        value=""
                                        name="disabled-radio"
                                        class="w-4 h-4 mt-2 text-primary bg-gray-100 border-gray-300 f dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <div className="flex w-full justify-between items-end">
                                        <div className="flex flex-col">
                                            <label for="disabled-radio" class="ml-2  text-md">
                                                Express delivery
                                            </label>
                                            <span className="ml-4">5-7 business day</span>
                                        </div>
                                        <span>$26</span>
                                    </div>
                                </div>
                            </div>

                            <Button className="rounded-md bg-btn-second mt-5 p-2 border-primary-style flex justify-center items-center gap-4">
                                <FaRegEdit className="w-8 h-8 text-primary"></FaRegEdit>
                                <span>Edit information to checkout</span>
                            </Button>

                            <Button className="rounded-md text-primary mt-4 w-fit float-left">
                                <span>Go Back</span>
                            </Button>
                        </div>
                        <div className="w-1/3">
                            <SummaryYourOrder setActiveStep={setActiveStep} totalPrice={totalPrice}></SummaryYourOrder>
                        </div>
                    </div>
                </AnimateOpacity>
            )}

            {activeStep === 2 && (
                <div className="flex justify-between gap-10 mt-10">
                    <div className="w-2/3">
                        <Checkout></Checkout>
                    </div>
                    <div className="w-1/3">
                        <SummaryYourOrder data={cartItems} setActiveStep={setActiveStep}></SummaryYourOrder>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;
