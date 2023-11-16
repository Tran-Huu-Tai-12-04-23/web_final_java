import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { motion } from 'framer-motion';
import SubHeader from '../../../Includes/SubHeader';
import { AnimateHover, AnimateOpacity } from '../../../../../components/Animate';
import {
    Button,
    Input,
    TextMain,
    PickedRangeDate,
    Select,
    TableCustom,
    Editor,
    MultiSelect,
} from '../../../../../components';

import { IoSearchOutline } from 'react-icons/io5';
import { AiOutlineClose } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';

import { orderDataFake, statusOption, WrapperColumnOrder } from '../../../../../assets/data';
import ModalConfirmRemove from '../../../Includes/ModalConfirmRemove';
import Constants from '../../../../../Constants';
import { request } from '../../../../../services/index';

function Manager({}) {
    const history = useNavigate();
    const [filters, setFilters] = useState({});
    const [searchValue, setSearchValue] = useState('');
    const [data, setData] = useState([]);
    const [status, setStatus] = useState(0);

    // data

    // filter data
    const [confirmRemoveMember, setConfirmRemoveMember] = useState(false);
    const [editProduct, setEditProduct] = useState(false);
    const [orderSelected, setOrderSelected] = useState([]);
    const [productIdConfirmRemove, setProductIdConfirmRemove] = useState(null);
    const columnsOrder = WrapperColumnOrder({
        onRemove: (value) => {
            setConfirmRemoveMember(true);
            setProductIdConfirmRemove(value);
        },
        onEdit: (value) => {
            history(Constants.ADMIN_EDIT_PRODUCT + '/' + value);
        },
        onView: (value) => {
            history(Constants.ADMIN_DETAIL_PRODUCT + '/' + value);
        },
    });

    useEffect(() => {
        const getData = async () => {
            try {
                await request('GET', '/api/v1/admin/product/all')
                    .then((response) => {
                        let data = response.data;
                        if (!data) return;
                        const newData = data.map((dt) => {
                            return {
                                ...dt,
                                branch: dt?.nameBranch,
                                category: dt?.nameCategory,
                            };
                        });
                        setData(newData);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } catch (err) {
                console.log(err);
                return;
            }
        };

        getData();
    }, []);

    // handle get option for category and branch
    const handleRemoveProduct = async () => {
        try {
            await request('DELETE', '/api/v1/admin/product/delete-soft?id=' + productIdConfirmRemove)
                .then((response) => {
                    console.log(response);

                    if (!response) {
                        return Promise.reject(false);
                    }
                    setData((prev) => prev.filter((dt) => dt.id !== productIdConfirmRemove));
                    setProductIdConfirmRemove(null);
                    return Promise.resolve(true);
                })
                .catch((err) => {
                    return Promise.reject(false);
                });
        } catch (error) {
            console.error(error);
            return Promise.reject(false);
        }
    };

    const removeProduct = async () => {
        if (productIdConfirmRemove == null) return;

        toast.promise(handleRemoveProduct(), {
            loading: 'Deleting ...',
            success: <b>Delete successful!</b>,
            error: <b>Delete failed.</b>,
        });
    };
    return (
        <>
            {/* modal */}
            {confirmRemoveMember && (
                <ModalConfirmRemove
                    onRemove={removeProduct}
                    onClose={() => {
                        setConfirmRemoveMember(false);
                    }}
                    onCancel={() => {}}
                ></ModalConfirmRemove>
            )}

            <SubHeader nameHeader={'Orders'} sub="Manager" main="Orders"></SubHeader>
            <AnimateOpacity className={'flex justify-between gap-4'}>
                <div className="p-4 rounded-md bg-light dark:bg-dark mt-10 w-full">
                    {/* header */}
                    <div className="flex justify-between items-center border-b-[1px] border-dashed pb-4 dark:border-dark-tiny border-light-tiny">
                        <TextMain>Order list</TextMain>
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
                            placeholder="Search for name, description, something ... "
                            className="w-full"
                            iconRight={<IoSearchOutline className="w-6 h-6 mr-3"></IoSearchOutline>}
                        ></Input>

                        <div className="flex w-full justify-end items-center gap-5">
                            <PickedRangeDate></PickedRangeDate>
                            <Select
                                name="Status"
                                value={status}
                                onSelect={(value) => setStatus(value)}
                                className="bg-light-tiny dark:bg-dark-tiny rounded-md"
                                subMenu={statusOption}
                            ></Select>
                        </div>
                    </div>
                    {/* Table */}
                    <TableCustom
                        searchValue={searchValue}
                        columns={columnsOrder}
                        data={orderDataFake}
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
