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
    const [data, setData] = useState([]);
    const [numberProduct, setNumberProduct] = useState(0);

    ///
    const [managerPageProduct, setManagerPageProduct] = useState({
        currentPage: 1,
        size: 10,
        status: true,
        brand: [],
        category: [],
        key: '',
        sortType: 'ASC',
        minPrice: '',
        maxPrice: '',
        category: '',
        brand: '',
    });
    // data
    // filter data
    const [confirmRemoveMember, setConfirmRemoveMember] = useState(false);
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

    const getData = async () => {
        const URL =
            `/api/v1/admin/product/search?` +
            [
                managerPageProduct.key && `key=${managerPageProduct.key}`,
                `status=${managerPageProduct.status}`,
                managerPageProduct.currentPage && `page=${+managerPageProduct.currentPage - 1}`,
                managerPageProduct.size && `size=${managerPageProduct.size}`,
                managerPageProduct.minPrice && `minPrice=${managerPageProduct.minPrice}`,
                managerPageProduct.maxPrice && `maxPrice=${managerPageProduct.maxPrice}`,
                managerPageProduct.sortType && `sortType=${managerPageProduct.sortType}`,
                managerPageProduct.brand && `brandId=${managerPageProduct.brand}`,
                managerPageProduct.category && `categoryId=${managerPageProduct.category}`,
            ]
                .filter(Boolean)
                .join('&');

        await request('GET', URL)
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
    };

    useEffect(() => {
        getData();
    }, [managerPageProduct]);

    useEffect(() => {
        const countNumberProduct = async () => {
            startLoading();
            const URL =
                `/api/v1/admin/product/count?` +
                [
                    managerPageProduct.key && `key=${managerPageProduct.key}`,
                    `status=${managerPageProduct.status}`,
                    managerPageProduct.currentPage && `page=${+managerPageProduct.currentPage - 1}`,
                    managerPageProduct.size && `size=${managerPageProduct.size}`,
                    managerPageProduct.minPrice && `minPrice=${managerPageProduct.minPrice}`,
                    managerPageProduct.maxPrice && `maxPrice=${managerPageProduct.maxPrice}`,
                    managerPageProduct.sortType && `sortType=${managerPageProduct.sortType}`,
                    managerPageProduct.brand && `brandId=${managerPageProduct.brand}`,
                    managerPageProduct.category && `categoryId=${managerPageProduct.category}`,
                ]
                    .filter(Boolean) // Filter out falsy values (undefined, null, empty strings)
                    .join('&');

            await request('GET', URL)
                .then((res) => {
                    if (res.data == 0 || res.data) {
                        setNumberProduct(res.data);
                    }
                })
                .catch((err) => console.log(err));
            stopLoading();
        };

        countNumberProduct();
    }, [managerPageProduct]);

    // handle get option for category and branch
    const handleRemoveProduct = async () => {
        startLoading();
        await request('DELETE', '/api/v1/admin/product/delete-soft?id=' + productIdConfirmRemove)
            .then((response) => {
                if (response.data) {
                    setData((prev) => prev.filter((dt) => dt.id !== productIdConfirmRemove));
                    setProductIdConfirmRemove(null);
                    setNumberProduct((prev) => prev - 1);
                    toast.success('Đưa sản phẩm về bản nháp!');
                } else {
                    toast.error('Thất bại!');
                }
            })
            .catch((err) => {
                toast.error('Thất bại!');
            });
        stopLoading();
    };

    useEffect(() => {
        setManagerPageProduct((prev) => {
            return {
                ...prev,
                sortType: filters?.selectedSort,
                minPrice: filters?.minPrice,
                maxPrice: filters?.maxPrice,
                brand: filters?.brand,
                category: filters?.category,
                currentPage: 1,
            };
        });
    }, [filters]);

    return (
        <>
            {/* modal */}
            {confirmRemoveMember && (
                <ModalConfirmRemove
                    onRemove={handleRemoveProduct}
                    onClose={() => {
                        setConfirmRemoveMember(false);
                    }}
                    onCancel={() => {}}
                ></ModalConfirmRemove>
            )}

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
                            value={managerPageProduct.key}
                            onChange={(e) =>
                                setManagerPageProduct((prev) => {
                                    return {
                                        ...prev,
                                        key: e.target.value,
                                    };
                                })
                            }
                            placeholder="Tìm kiếm tên, mô tả hoặc ... "
                            className="w-full"
                            iconRight={<IoSearchOutline className="w-6 h-6 mr-3"></IoSearchOutline>}
                        ></Input>
                        <Select
                            name="Trạng thái"
                            value={managerPageProduct.status}
                            onSelect={(value) => {
                                setManagerPageProduct((prev) => {
                                    return {
                                        ...prev,
                                        status: value,
                                    };
                                });
                            }}
                            className="bg-light-tiny dark:bg-dark-tiny rounded-md"
                            subMenu={[
                                {
                                    name: 'Bản nháp',
                                    value: false,
                                },
                                {
                                    name: 'Xuất bản',
                                    value: true,
                                },
                            ]}
                        ></Select>
                    </div>

                    {/* Table */}

                    <TableCustom
                        currentPage={+managerPageProduct.currentPage}
                        totalRow={+numberProduct}
                        columns={columnsProduct}
                        data={data}
                        checked={true}
                        numberRow={managerPageProduct.size}
                        pagination={true}
                        setCheckedData={setMemberSelected}
                        onSelectRowShow={(value) => {
                            setManagerPageProduct((prev) => {
                                return {
                                    ...prev,
                                    size: value,
                                    currentPage: 1,
                                };
                            });
                        }}
                        onChangePage={(value) => {
                            setManagerPageProduct((prev) => {
                                return {
                                    ...prev,
                                    currentPage: value,
                                };
                            });
                        }}
                    ></TableCustom>
                </div>
            </AnimateOpacity>
        </>
    );
}

export default Manager;
