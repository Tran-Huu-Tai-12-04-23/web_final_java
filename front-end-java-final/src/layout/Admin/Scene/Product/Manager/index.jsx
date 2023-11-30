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

import { IoIosAdd } from 'react-icons/io';
import { IoSearchOutline } from 'react-icons/io5';
import { AiOutlineClose } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';

import { WrapperColumnsTableProduct } from '../../../../../assets/data';
import ModalConfirmRemove from '../../../Includes/ModalConfirmRemove';
import Constants from '../../../../../Constants';
import { request } from '../../../../../services/index';

import { useLoading } from '../../../../../context/loadingContext';

import MainFilter from './MainFilter';

function Manager({}) {
    const { startLoading, stopLoading } = useLoading();
    const history = useNavigate();
    const [filters, setFilters] = useState({});
    const [searchValue, setSearchValue] = useState('');
    const [data, setData] = useState([]);
    const [status, setStatus] = useState(2);
    // data
    // filter data
    const [confirmRemoveMember, setConfirmRemoveMember] = useState(false);
    const [editProduct, setEditProduct] = useState(false);
    const [memberSelected, setMemberSelected] = useState([]);
    const [productIdConfirmRemove, setProductIdConfirmRemove] = useState(null);
    const columnsProduct = WrapperColumnsTableProduct({
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

    const getProductByState = async (state) => {
        try {
            startLoading();
            await request('GET', `/api/v1/admin/product/all/state?state=${state}`)
                .then((response) => {
                    let data = response.data;
                    if (!data) return;
                    const newData = data.map((dt) => {
                        return {
                            ...dt,
                            category: dt?.category?.nameCategory,
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
        stopLoading();
    };

    const getData = async () => {
        try {
            startLoading();
            await request('GET', '/api/v1/admin/product/all')
                .then((response) => {
                    let data = response.data;
                    if (!data) return;
                    const newData = data.map((dt) => {
                        return {
                            ...dt,
                            category: dt?.category?.nameCategory,
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
        stopLoading();
    };

    useEffect(() => {
        switch (status) {
            case 0: {
                getProductByState(false);
                break;
            }
            case 1: {
                getProductByState(true);
                break;
            }
            case 2: {
                getData();
                break;
            }
            default: {
                getData();
            }
        }
    }, [status]);
    useEffect(() => {
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
            loading: 'Đang xóa ...',
            success: <b>Xóa thành công!</b>,
            error: <b>Xóa thất bại.</b>,
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

            {/* {editMember === true && (
                <ModalEditMember
                    onClose={() => {
                        setEditMember(false);
                    }}
                    onCancel={() => {}}
                ></ModalEditMember>
            )} */}
            {/* end modal */}
            <SubHeader nameHeader={'Products'} sub="Manager" main="Products"></SubHeader>

            <AnimateOpacity className={'flex justify-between gap-4'}>
                <div className="p-4 rounded-md bg-light dark:bg-dark mt-5 w-full">
                    <div className="flex mb-4 justify-between items-center border-b-[1px] border-dashed pb-4 dark:border-dark-tiny border-light-tiny">
                        <TextMain>Danh sách sản phẩm</TextMain>
                        <div className="flex justify-end items-center gap-4">
                            {memberSelected.length > 0 && (
                                <AnimateHover
                                    className={
                                        'p-2 rounded-md cursor-pointer bg-[rgba(221,75,78,0.1)] text-[rgb(221,75,78)]'
                                    }
                                >
                                    <BsTrash className="w-6 h-6"></BsTrash>
                                </AnimateHover>
                            )}
                            <Button style="normal" onClick={() => history(Constants.ADMIN_ADD_PRODUCT)}>
                                <IoIosAdd className="w-6 h-6 mr-2"></IoIosAdd>
                                <span>Thêm sản phẩm</span>
                            </Button>
                        </div>
                    </div>

                    <MainFilter filters={filters} setFilters={setFilters}></MainFilter>

                    {/* //feature filter */}
                    <div className="flex mb-4 2xl:flex-row xl:flex-row lg:flex-row flex-col justify-between items-center mt-5 gap-4  border-b-[1px] border-dashed pb-4 dark:border-dark-tiny border-light-tiny">
                        <Input
                            placeholder="Tìm kiếm tên, mô tả hoặc ... "
                            className="w-full"
                            iconRight={<IoSearchOutline className="w-6 h-6 mr-3"></IoSearchOutline>}
                        ></Input>

                        <div className="flex w-full justify-end items-center gap-5">
                            <PickedRangeDate></PickedRangeDate>
                            <Select
                                name="Trạng thái"
                                value={status}
                                onSelect={(value) => setStatus(value)}
                                className="bg-light-tiny dark:bg-dark-tiny rounded-md"
                                subMenu={[
                                    {
                                        name: 'Bản nháp',
                                        value: 0,
                                        id: 0,
                                    },
                                    {
                                        name: 'Xuất bản',
                                        value: 1,
                                        id: 1,
                                    },
                                    {
                                        name: 'All',
                                        value: 2,
                                        id: 2,
                                    },
                                ]}
                            ></Select>
                        </div>
                    </div>

                    {/* Table */}

                    <TableCustom
                        searchValue={searchValue}
                        columns={columnsProduct}
                        data={data}
                        checked={true}
                        numberRow={10}
                        pagination={true}
                        setCheckedData={setMemberSelected}
                    ></TableCustom>
                </div>
            </AnimateOpacity>
        </>
    );
}

export default Manager;
