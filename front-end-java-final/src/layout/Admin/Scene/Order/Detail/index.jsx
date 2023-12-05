import SubHeader from '../../../Includes/SubHeader';

import InformationMemberOrder from './InformationMemberOrder';
import ConfigStatusOrder from './ConfigStatusOrder';
import SummaryProduct from './SummaryProduct';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { request } from '../../../../../services';
import { useLoading } from '../../../../../context/loadingContext';

function OrderDetail() {
    const params = useParams();
    const { startLoading, stopLoading } = useLoading();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const id = params.id;
        const getOrderDetail = async () => {
            startLoading();
            await request('GET', `/api/v1/admin/order/${id}`)
                .then((res) => {
                    if (res.data) {
                        setOrder(res.data);
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
            stopLoading();
        };
        getOrderDetail();
    }, []);
    return (
        <div className="p-4">
            <SubHeader nameHeader={'Orders detail'} sub="Detail" main="Orders"></SubHeader>
            <div className="flex justify-between gap-10 mt-10 ">
                <div className="flex flex-col gap-10 w-2/3">
                    <SummaryProduct data={order}></SummaryProduct>
                    <ConfigStatusOrder data={order}></ConfigStatusOrder>
                </div>
                <div className="w-1/3">
                    <InformationMemberOrder data={order}></InformationMemberOrder>
                </div>
            </div>
        </div>
    );
}

export default OrderDetail;
