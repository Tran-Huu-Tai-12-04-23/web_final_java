import { useState } from 'react';
import OrderItem from './OrderItem';
import { useLogin } from '../../../../context/login';
import { useLoading } from '../../../../context/loadingContext';
import { useEffect } from 'react';
import { request } from '../../../../services';

function ViewOrder() {
    const { account } = useLogin();
    const { startLoading, stopLoading } = useLoading();
    const [orders, setOrders] = useState(null);

    useEffect(() => {
        const getOrders = async () => {
            startLoading();
            await request('GET', `/api/v1/user/order/all/${account?.memberId}`)
                .then((res) => {
                    if (res.data) {
                        setOrders([...res.data]);
                    }
                })
                .catch((err) => console.error(err));
            stopLoading();
        };

        if (account) {
            getOrders();
        }
    }, [account]);

    return (
        <div className="flex flex-col gap-4 p-4">
            {orders === null ||
                (orders.length == 0 && (
                    <div className="w-full flex justify-center items-center flex-col gap-3">
                        <img
                            src="https://i.ibb.co/FW4MfWH/Screenshot-2023-12-03-095539-removebg-preview.png"
                            className="w-30 h-30 rounded-md w-fit "
                        />
                        <span>Bạn chưa đặt hàng</span>
                    </div>
                ))}
            {orders &&
                orders.map((order, index) => {
                    return <OrderItem key={index} data={order} setOrderMembers={setOrders}></OrderItem>;
                })}
        </div>
    );
}

export default ViewOrder;
