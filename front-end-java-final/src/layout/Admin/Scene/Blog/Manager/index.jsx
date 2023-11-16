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

import { WrapperColumnsTableBlog } from '../../../../../assets/data';
import ModalConfirmRemove from '../../../Includes/ModalConfirmRemove';
import Constants from '../../../../../Constants';
import { request } from '../../../../../services/index';

function Manager({}) {
    const history = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const [data, setData] = useState([]);
    const [category, setCategory] = useState(0);
    const [categoryOptions, setCategoryOptions] = useState([]);
    // data

    // filter data
    const [confirmRemoveBlog, setConfirmRemoveBlog] = useState(false);
    const [editBlog, setEditBlog] = useState(false);
    const [blogSelected, setBlogSelected] = useState([]);
    const [blogIdForConfirm, setBlogIdForConfirm] = useState(null);

    const columnsBlog = WrapperColumnsTableBlog({
        onRemove: (value) => {
            setConfirmRemoveBlog(true);
            setBlogIdForConfirm(value);
        },
        onEdit: (value) => {
            history(Constants.ADMIN_EDIT_BLOG + '/' + value);
        },
        onView: (value) => {
            history(Constants.ADMIN_DETAIL_BLOG + '/' + value);
        },
    });

    // handle get option for category and branch
    const handleRemoveSoftBlog = async () => {
        try {
            await request('DELETE', '/api/v1/admin/product/delete-soft?id=' + blogIdForConfirm)
                .then((response) => {
                    console.log(response);

                    if (!response) {
                        return Promise.reject(false);
                    }
                    setData((prev) => prev.filter((dt) => dt.id !== blogIdForConfirm));
                    setBlogIdForConfirm(null);
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

    const removeSoftBlog = async () => {
        if (blogIdForConfirm == null) return;

        toast.promise(handleRemoveSoftBlog(), {
            loading: 'Deleting ...',
            success: <b>Delete successful!</b>,
            error: <b>Delete failed.</b>,
        });
    };

    useEffect(() => {
        const getData = async () => {
            try {
                await request('GET', '/api/v1/admin/blog')
                    .then((response) => {
                        let data = response.data;
                        if (!data) return;
                        const newData = data.map((dt) => {
                            return {
                                ...dt,
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

    useEffect(() => {
        const getCategoryOptions = async () => {
            try {
                await request('GET', '/api/v1/public/category/blog')
                    .then((response) => {
                        const data = response.data;
                        if (!data) return;
                        const newData = data.map((data) => {
                            return {
                                ...data,
                                name: data.nameCategory,
                            };
                        });
                        setCategoryOptions(newData);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } catch (err) {
                console.log(err);
                return;
            }
        };
        getCategoryOptions();
    }, []);
    return (
        <>
            {/* modal */}
            {confirmRemoveBlog && (
                <ModalConfirmRemove
                    onRemove={removeSoftBlog}
                    onClose={() => {
                        setConfirmRemoveBlog(false);
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
            <SubHeader nameHeader={'Blogs'} sub="Manager" main="Blogs"></SubHeader>

            <AnimateOpacity className={'flex justify-between gap-4'}>
                <div className="p-4 rounded-md bg-light dark:bg-dark mt-5 w-full">
                    <div className="flex mb-4 justify-between items-center border-b-[1px] border-dashed pb-4 dark:border-dark-tiny border-light-tiny">
                        <TextMain>Post blog list</TextMain>
                        <div className="flex justify-end items-center gap-4">
                            {blogSelected.length > 0 && (
                                <AnimateHover
                                    className={
                                        'p-2 rounded-md cursor-pointer bg-[rgba(221,75,78,0.1)] text-[rgb(221,75,78)]'
                                    }
                                >
                                    <BsTrash className="w-6 h-6"></BsTrash>
                                </AnimateHover>
                            )}
                            <Button style="normal" onClick={() => history(Constants.ADMIN_ADD_BLOG)}>
                                <IoIosAdd className="w-6 h-6 mr-2"></IoIosAdd>
                                <span>Add Blog</span>
                            </Button>
                        </div>
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
                                name="Category"
                                value={category}
                                onSelect={(value) => setCategory(value)}
                                className="bg-light-tiny dark:bg-dark-tiny rounded-md"
                                subMenu={categoryOptions}
                            ></Select>
                        </div>
                    </div>

                    {/* Table */}

                    <TableCustom
                        searchValue={searchValue}
                        columns={columnsBlog}
                        data={data}
                        checked={true}
                        numberRow={10}
                        pagination={true}
                        setCheckedData={setBlogSelected}
                    ></TableCustom>
                </div>
            </AnimateOpacity>
        </>
    );
}

export default Manager;
