import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { motion } from 'framer-motion';
import SubHeader from '../../../Includes/SubHeader';
import { AnimateHover, AnimateOpacity } from '../../../../../components/Animate';
import { Input, TextMain, Select, TableCustom } from '../../../../../components';

import { IoSearchOutline } from 'react-icons/io5';
import { BsTrash } from 'react-icons/bs';

import { statusOption, WrapperColumnOrder } from '../../../../../assets/data';
import Constants from '../../../../../Constants';
import { request } from '../../../../../services/index';

function Manager({}) {
    const history = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const [data, setData] = useState([]);
    const [status, setStatus] = useState(0);
    const [managerPageOrder, setManagerPageOrder] = useState({
        currentPage: 1,
        size: 10,
        stepOrder: null,
        isCancel: null,
        key: '',
        startDate: null,
        endDate: null,
    });
    // filter data
    const [orderSelected, setOrderSelected] = useState([]);
    const columnsOrder = WrapperColumnOrder({
        onView: (value) => {
            history(Constants.ADMIN_ORDER + '/' + value);
        },
    });

    const getData = async () => {
        const URL =
            `/api/v1/admin/order/all?` +
            [
                managerPageOrder.key && `key=${managerPageOrder.key.trim()}`,
                managerPageOrder.isCancel && `isCancel=${managerPageOrder.isCancel}`,
                managerPageOrder.currentPage && `page=${+managerPageOrder.currentPage - 1}`,
                managerPageOrder.size && `size=${managerPageOrder.size}`,
                managerPageOrder.stepOrder && `stepOrder=${managerPageOrder.stepOrder}`,
            ]
                .filter(Boolean)
                .join('&');
        await request('GET', URL)
            .then((response) => {
                if (!response.data) return;
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getData();
        console.log(managerPageOrder);
    }, [managerPageOrder]);

    useEffect(() => {
        switch (status) {
            case 0: {
                setManagerPageOrder((prev) => {
                    return {
                        ...prev,
                        stepOrder: status,
                    };
                });
                break;
            }
            case 1: {
                setManagerPageOrder((prev) => {
                    return {
                        ...prev,
                        stepOrder: status,
                    };
                });
                break;
            }
            case 2: {
                setManagerPageOrder((prev) => {
                    return {
                        ...prev,
                        stepOrder: status,
                    };
                });
                break;
            }
            case 3: {
                setManagerPageOrder((prev) => {
                    return {
                        ...prev,
                        stepOrder: 3,
                    };
                });
                break;
            }
            case 4: {
                setManagerPageOrder((prev) => {
                    return {
                        ...prev,
                        stepOrder: null,
                        isCancel: null,
                    };
                });
                break;
            }
        }
    }, [status]);

    // handle get option for category and branch
    return (
        <>
            <SubHeader nameHeader={'Orders'} sub="Manager" main="Orders"></SubHeader>
            <AnimateOpacity className={'flex justify-between gap-4'}>
                <div className="p-4 rounded-md bg-light dark:bg-dark mt-10 w-full">
                    {/* header */}
                    <div className="flex justify-between items-center border-b-[1px] border-dashed pb-4 dark:border-dark-tiny border-light-tiny">
                        <TextMain>Danh sách đơn hàng</TextMain>
                        {orderSelected.length > 0 && (
                            <AnimateHover
                                className={
                                    'p-2 rounded-md cursor-pointer bg-[rgba(221,75,78,0.1)] text-[rgb(221,75,78)]'
                                }
                            >
                                <BsTrash className="w-6 h-6"></BsTrash>
                            </AnimateHover>
                        )}
                    </div>
                    {/* //feature filter */}
                    <div className="flex mb-4 2xl:flex-row xl:flex-row lg:flex-row flex-col justify-between items-center mt-5 gap-4  border-b-[1px] border-dashed pb-4 dark:border-dark-tiny border-light-tiny">
                        <Input
                            value={managerPageOrder.key}
                            onChange={(e) =>
                                setManagerPageOrder((prev) => {
                                    return {
                                        ...prev,
                                        key: e.target.value,
                                    };
                                })
                            }
                            placeholder="Tìm kiếm tên, mô tả, hoặc một thứ gì đó,... "
                            className="w-full"
                            iconRight={<IoSearchOutline className="w-6 h-6 mr-3"></IoSearchOutline>}
                        ></Input>

                        <Select
                            name="Status"
                            value={status}
                            onSelect={(value) => setStatus(value)}
                            className="bg-light-tiny dark:bg-dark-tiny rounded-md"
                            subMenu={statusOption}
                        ></Select>
                    </div>
                    {/* Table */}
                    <TableCustom
                        searchValue={searchValue}
                        columns={columnsOrder}
                        data={data ? data : []}
                        checked={true}
                        numberRow={10}
                        pagination={true}
                        setCheckedData={setOrderSelected}
                    ></TableCustom>
                </div>
            </AnimateOpacity>
        </>
    );
}

export default Manager;
