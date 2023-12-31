import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextSub, TimeLine, TextMain, Button, Modal, ModalItem } from '../../components';
import { AnimateOpacity } from '../../components/Animate';

import CartItem from './CartItem';
import SummaryCart from './SummaryCart';
import Checkout from './Checkout';
import SummaryYourOrder from './SummaryYourOrder';

import { FaRegEdit } from 'react-icons/fa';
import { request } from '../../services';
import { useLogin } from '../../context/login';
import toast from 'react-hot-toast';
import { useLoading } from '../../context/loadingContext';
import ModalEditAddress from './ModalEditAddress';
import Constants from '../../Constants';

function Cart() {
    const history = useNavigate();
    const { startLoading, stopLoading } = useLoading();
    const [activeStep, setActiveStep] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const { account } = useLogin();
    const [totalPrice, setTotalPrice] = useState(0);
    const [confirmInformation, setConfirmInformation] = useState(false);
    const [address, setAddress] = useState({});
    const [paymentCash, setPaymentCash] = useState(0);

    const verifyOrderRequest = (orderRequest) => {
        if (
            !orderRequest ||
            !orderRequest.address ||
            !orderRequest.member ||
            !orderRequest.total ||
            !orderRequest.amount ||
            !orderRequest.products
        ) {
            toast.error('Vui lòng nhập đủ thông tin nhận hàng!');
            return false;
        }
        return true;
    };

    const getPaymentPage = async (orderId, total) => {
        startLoading();
        await request('GET', `/api/v1/user/payment/online/create-payment?orderId=${orderId}&amount=${Math.ceil(total)}`)
            .then((res) => {
                if (res.data) {
                    console.log(res.data);
                    res.data && res.data.urlpayment && (window.location.href = res.data.urlpayment);
                }
            })
            .catch((err) => console.error(err));
        stopLoading();
    };

    const commitOrder = async () => {
        const productList = cartItems
            .filter((item) => item.product.quantity >= item.quantity)
            .map(({ product, quantity }) => ({
                id: product.id,
                price: product.price,
                quantity,
            }));

        const total = productList.reduce((acc, { price, quantity }) => acc + price * quantity, 0);

        const amount = productList.reduce((acc, { quantity }) => acc + quantity, 0);

        const orderRequest = {
            address: { id: address?.id },
            methodPayment: paymentCash,
            member: { id: account?.memberId },
            total,
            amount,
            products: productList,
        };

        let isCheckData = verifyOrderRequest(orderRequest);

        if (!isCheckData) return;

        console.log(orderRequest);
        startLoading();
        await request('POST', '/api/v1/user/order/add-order', orderRequest)
            .then(async (res) => {
                if (res.data) {
                    if (orderRequest.methodPayment == 1) {
                        await getPaymentPage(res.data.id, res.data.total);
                    } else {
                        toast.success('Đặt hàng thành công!');
                        res.data && history(Constants.USER_ORDER + '/' + res?.data.id);
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
        stopLoading();
    };

    useEffect(() => {
        if (cartItems) {
            const calculatedTotalPrice = cartItems.reduce((total, item) => total + item.price, 0);
            setTotalPrice(calculatedTotalPrice);
        }
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
            startLoading();
            await request('GET', '/api/v1/user/cart?mId=' + account?.memberId)
                .then((response) => {
                    console.log(response);
                    if (response.data) {
                        response.data.cartItems && setCartItems(response.data.cartItems);
                    }
                })
                .catch((err) => console.error(err));

            stopLoading();
        };

        getData();
    }, []);

    useEffect(() => {
        const getDefaultAddress = async () => {
            startLoading();
            await request('GET', '/api/v1/user/order/address/default-address?accountId=' + account?.accountId)
                .then((res) => {
                    if (res.data) {
                        setAddress(res.data);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });

            stopLoading();
        };

        getDefaultAddress();
    }, []);

    return (
        <div className="pt-[10rem] m-auto max-w-screen-xl p-4">
            {/* <ProvincesAndDistricts></ProvincesAndDistricts> */}

            {confirmInformation && (
                <ModalEditAddress
                    onAddress={(value) => {}}
                    onClose={() => setConfirmInformation(false)}
                    setAddressDefault={setAddress}
                ></ModalEditAddress>
            )}
            {cartItems && cartItems.length <= 0 ? (
                <div className="w-full flex justify-center items-center flex-col">
                    <img
                        src="https://i.ibb.co/WxSg9tS/Pngtree-no-result-search-icon-6511543-removebg-preview.png"
                        alt="no res"
                    />
                    <TextMain className={'text-2xl font-semibold'}>Chưa có sản phẩm nào</TextMain>
                    <Button
                        className="text-white p-2 rounded-md pl-4 pr-4 bg-primary mt-2"
                        onClick={() => history('/products')}
                    >
                        Mua ngay
                    </Button>
                </div>
            ) : (
                <>
                    <TimeLine active={activeStep} setActive={setActiveStep}></TimeLine>
                    {activeStep === 0 && (
                        <div className="flex flex-col gap-10 items-start w-full mt-10">
                            <div className="flex justify-between gap-10 items-start w-full ">
                                <div className="flex gap-4 w-2/3 flex-col">
                                    {cartItems &&
                                        cartItems.map((item, index) => {
                                            return (
                                                <CartItem
                                                    setCartItems={setCartItems}
                                                    key={index}
                                                    data={item}
                                                ></CartItem>
                                            );
                                        })}
                                </div>
                                <div className="w-1/3  ">
                                    <SummaryCart data={cartItems} setActiveStep={setActiveStep}></SummaryCart>
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
                                        {address?.fullName ? address?.fullName : 'Vui lòng thêm thông tin nhận hàng'}
                                    </div>

                                    <TextMain className={'mt-4 w-fit font-bold'}>Address</TextMain>
                                    <div
                                        className={
                                            ' border-primary-style mt-2 w-full p-2 rounded-md bg-light-tiny dark:bg-dark-tiny'
                                        }
                                    >
                                        {address?.detailAddress
                                            ? address?.detailAddress + ' , ' + address?.address
                                            : 'Chưa có địa chỉ'}
                                    </div>

                                    <TextMain className={'mt-4 w-fit font-bold'}>Shipping method</TextMain>
                                    <div
                                        className={
                                            ' border-primary-style gap-4 mt-2 w-full p-2 rounded-md bg-light-tiny dark:bg-dark-tiny flex flex-col'
                                        }
                                    >
                                        <div className="flex hover:brightness-125 gap-4 rounded-md border-b-primary pb-3">
                                            <input
                                                type="radio"
                                                name="disabled-radio"
                                                className="w-4 h-4 mt-2 text-primary bg-gray-100 border-gray-300 f dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <div className="flex w-full justify-between items-end">
                                                <div className="flex flex-col">
                                                    <label htmlFor="disabled-radio" className="ml-2  text-md">
                                                        Free shipping
                                                    </label>
                                                    <span className="ml-4">7-10 business day</span>
                                                </div>
                                                <span>$20</span>
                                            </div>
                                        </div>
                                        <div className="flex hover:brightness-125 rounded-md gap-4 border-b-primary pb-3 ">
                                            <input
                                                defaultChecked={true}
                                                type="radio"
                                                value=""
                                                name="disabled-radio"
                                                className="w-4 h-4  mt-2 text-primary bg-gray-100 border-gray-300 f dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <div className="flex w-full justify-between items-end">
                                                <div className="flex flex-col">
                                                    <label htmlFor="disabled-radio" className="ml-2  text-md">
                                                        Regular shipping
                                                    </label>
                                                    <span className="ml-4">5-7 business day</span>
                                                </div>
                                                <span>$26</span>
                                            </div>
                                        </div>
                                        <div className="flex  w-full justify-between gap-4">
                                            <input
                                                type="radio"
                                                name="disabled-radio"
                                                className="w-4 h-4 mt-2 text-primary bg-gray-100 border-gray-300 f dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <div className="flex w-full justify-between items-end">
                                                <div className="flex flex-col">
                                                    <label htmlFor="disabled-radio" className="ml-2  text-md">
                                                        Express delivery
                                                    </label>
                                                    <span className="ml-4">5-7 business day</span>
                                                </div>
                                                <span>$26</span>
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={() => setConfirmInformation(true)}
                                        className="rounded-md bg-btn-second mt-5 p-2 border-primary-style flex justify-center items-center gap-4"
                                    >
                                        <FaRegEdit className="w-8 h-8 text-primary"></FaRegEdit>
                                        <span>Edit information to checkout</span>
                                    </Button>

                                    <Button className="rounded-md text-primary mt-4 w-fit float-left">
                                        <span>Go Back</span>
                                    </Button>
                                </div>
                                <div className="w-1/3">
                                    <SummaryYourOrder
                                        data={cartItems}
                                        setActiveStep={setActiveStep}
                                        totalPrice={totalPrice}
                                    ></SummaryYourOrder>
                                </div>
                            </div>
                        </AnimateOpacity>
                    )}

                    {activeStep === 2 && (
                        <div className="flex justify-between gap-10 mt-10">
                            <div className="w-2/3">
                                <Checkout
                                    setActiveStep={setActiveStep}
                                    paymentCash={paymentCash}
                                    setPaymentCash={setPaymentCash}
                                ></Checkout>
                            </div>
                            <div className="w-1/3">
                                <SummaryYourOrder
                                    data={cartItems}
                                    setActiveStep={setActiveStep}
                                    onOrder={commitOrder}
                                ></SummaryYourOrder>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Cart;
