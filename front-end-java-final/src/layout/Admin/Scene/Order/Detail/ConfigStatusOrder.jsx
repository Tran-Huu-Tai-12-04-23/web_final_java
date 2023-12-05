import { useState, useEffect } from 'react';
import { Button, TextMain, Select } from '../../../../../components';

import { IoSaveOutline } from 'react-icons/io5';
import { request } from '../../../../../services';
import { useLoading } from '../../../../../context/loadingContext';
import Constants from '../../../../../Constants';
import { useNavigate } from 'react-router-dom';
// order
const options = [
    {
        name: 'Cancel',
        value: 3,
        id: 3,
    },
    {
        name: 'Delivery',
        value: 1,
        id: 1,
    },
    {
        name: 'Pending',
        value: 0,
        id: 0,
    },

    {
        name: 'Completed',
        value: 2,
        id: 2,
    },
];
function ConfigStatusOrder({ data }) {
    const history = useNavigate();
    const { startLoading, stopLoading } = useLoading();
    const [status, setStatus] = useState(0);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        if (data) {
            setStatus(data.stepOrder);
        }
    }, [data]);

    useEffect(() => {
        setUpdate(status != data?.stepOrder);
    }, [status]);

    const updateOrder = async () => {
        startLoading();
        await request('GET', `/api/v1/admin/order/change-step/${data.id}?stepOrder=${status}`)
            .then((res) => {
                if (res.data) history(Constants.ADMIN_ORDER);
            })
            .catch((err) => {
                console.error(err);
            });
        stopLoading();
    };

    return (
        <div className="p-4 rounded-md bg-light-tiny dark:bg-dark-tiny w-full">
            <div className="flex justify-between items-center border-b-primary pb-3">
                <TextMain className={'font-bold'}>Trạng thái đơn hàng</TextMain>

                <div className="flex justify-end items-center gap-3  ">
                    <Select
                        position="top"
                        name="Status"
                        value={status}
                        onSelect={(value) => setStatus(value)}
                        className="bg-light-tiny dark:bg-dark-tiny rounded-md"
                        subMenu={options}
                    ></Select>
                    {update && (
                        <Button
                            onClick={updateOrder}
                            className="flex justify-center p-2 gap-3  rounded-md pl-4 pr-4 items-center text-green-800 bg-status-complete"
                        >
                            <IoSaveOutline className="w-4 h-4"></IoSaveOutline>
                            <span>Lưu lại trạng thái đơn hàng</span>
                        </Button>
                    )}
                </div>
            </div>
            {data && data.isCancel && (
                <div className="flex w-full mt-2 justify-end items-center gap-3  ">
                    <Button className="flex justify-center p-2 gap-3  rounded-md pl-4 pr-4 items-center text-status-cancel bg-status-cancel">
                        Đơn hàng đã bị hủy
                    </Button>
                </div>
            )}
        </div>
    );
}

export default ConfigStatusOrder;
