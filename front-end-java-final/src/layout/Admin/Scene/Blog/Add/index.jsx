import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as ID } from 'uuid';
import toast from 'react-hot-toast';

import { motion } from 'framer-motion';
import SubHeader from '../../../Includes/SubHeader';
import { AnimateOpacity } from '../../../../../components/Animate';
import { Button, Input, TextMain, Modal, Select, Editor } from '../../../../../components';
import SkeletonImage from './SkeletonImage';

import ModalAddNewCategory from './ModalAddNewCategory';

import { IoIosAdd } from 'react-icons/io';
import { PiImageSquareDuotone } from 'react-icons/pi';

// use fire base
import uploadImage from '../../../../../services/Firebase';
import { request } from '../../../../../services';
import { Spinner } from 'flowbite-react';
import Constants from '../../../../../Constants';

function AddBlog({ modeEdit = false, data }) {
    const history = useNavigate();
    // data state of blog
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [thumbnails, setThumbnails] = useState(null);
    const [category, setCategory] = useState(null);
    const [status, setStatus] = useState(true);
    // options for select
    const [categoryOptions, setCategoryOptions] = useState([]);
    // state load
    const [loadThumbnails, setLoadThumbnails] = useState(false);
    const inputRefThumbnails = useRef(null);
    // state active modal
    const [addNewCategoryModal, setAddNewCategoryModal] = useState(false);
    //
    const [active, setActive] = useState(null);
    const [loading, setLoading] = useState(false);

    // handle get option for category and branch
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

    //init data mode = edit

    const handleFileChangeThumbnails = async (e) => {
        const files = e.target.files;
        if (files[0]) {
            const img = await handleUploadIMG(files[0]);
            setThumbnails(img);
        }
    };

    const handleUploadIMG = async (imgData, name) => {
        setLoadThumbnails(true);
        const data = await uploadImage(imgData, name + ID());
        setLoadThumbnails(false);
        if (data === false) return;
        return data;
    };

    const handleAddBlog = async (data) => {
        try {
            await request('POST', '/api/v1/admin/blog', data)
                .then((response) => {
                    const dataRes = response.data;
                    toast.success('Thêm blog mới thành công!');
                    clearAllStates();
                })
                .catch((error) => {
                    console.log(error);
                    toast.error('Thêm blog mới thất bại!');
                });
        } catch (error) {
            toast.error('Thêm blog mới thất bại!');
        }
    };

    const AddBlog = async () => {
        let data = {
            title,
            content,
            category,
            thumbnails,
            status,
        };

        data = {
            ...data,
            category: {
                id: data.category,
            },
        };

        setLoading(true);
        await handleAddBlog(data);
        setLoading(false);
    };

    const clearAllStates = () => {
        setTitle('');
        setContent('');
        setCategory(null);
        setThumbnails(null);
    };

    const update = async () => {
        let dataReq = {
            title,
            content,
            category,
            thumbnails: thumbnails,
            status,
        };
        console.log(dataReq);
        console.log(thumbnails);
        dataReq = {
            ...dataReq,
            category: {
                id: dataReq.category,
            },
        };

        await request('PUT', '/api/v1/admin/blog/' + data?.id, dataReq)
            .then((res) => {
                if (res.status === 200) {
                    toast.success('Cập nhật blog thành công!');
                    history(Constants.ADMIN_BLOG);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    useEffect(() => {
        if (data) {
            setThumbnails(data?.thumbnails);
            setTitle(data?.title);
            setStatus(data?.status);
            setCategory(data?.category?.id);
            setContent(data?.content);
        }
    }, [data]);

    return (
        <div className="">
            {/* modal */}
            {addNewCategoryModal && (
                <ModalAddNewCategory onClose={() => setAddNewCategoryModal(false)}></ModalAddNewCategory>
            )}
            {loading && (
                <Modal>
                    <Spinner color={'pink'}></Spinner>
                </Modal>
            )}
            {/* end modal */}
            <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={inputRefThumbnails}
                onChange={handleFileChangeThumbnails}
            ></input>
            <SubHeader nameHeader={'Blogs'} sub={`${modeEdit ? 'Edit' : 'Add'}`} main="Blogs"></SubHeader>
            <AnimateOpacity>
                <motion.div className="p-4 rounded-md bg-light dark:bg-dark mt-10 shadow-xl">
                    <motion.div className="flex justify-between items-center border-b-[1px] border-dashed pb-4 dark:border-dark-tiny border-light-tiny">
                        {modeEdit && <TextMain>Chỉnh sửa blog</TextMain>}
                        {!modeEdit && <TextMain>Thêm blog</TextMain>}
                    </motion.div>
                </motion.div>

                <div className="w-full mt-5 flex flex-col gap-4">
                    {/* main property blog about */}
                    <div className="  flex flex-col bg-light dark:bg-dark rounded-md p-4 shadow-xl">
                        <div className="flex flex-col  gap-4">
                            <div className="flex  flex-col ">
                                <TextMain className={'mb-2 ml-2'}>Tựa đề</TextMain>
                                <Input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter title post..."
                                    className="bg-light-tiny dark:bg-dark-tiny rounded-md"
                                ></Input>
                            </div>
                            <div className="flex  flex-col ">
                                <TextMain className={'mb-2 ml-2'}>Nội dung</TextMain>
                                <Editor
                                    value={content}
                                    onChange={(value) => {
                                        setContent(value);
                                    }}
                                ></Editor>
                            </div>
                        </div>
                    </div>

                    {/* add thumbnails */}
                    <div className="  flex flex-col bg-light dark:bg-dark rounded-md p-4 shadow-xl">
                        <div className="flex  flex-col ">
                            <TextMain className={'mb-2 ml-2'}>Thumbnails</TextMain>
                            <div className="bg-light-tiny w-full dark:bg-dark-tiny p-4 rounded-md border-dashed border-[1px] border-light-tiny dark:border-dark-tiny">
                                <div className="relative w-fit m-auto ">
                                    {!thumbnails && !loadThumbnails && (
                                        <div className="bg-light-tiny dark:bg-dark-tiny rounded-md w-40 h-40 m-auto">
                                            <PiImageSquareDuotone className="w-full h-full brightness-50 m-auto "></PiImageSquareDuotone>
                                        </div>
                                    )}
                                    {loadThumbnails && <SkeletonImage></SkeletonImage>}
                                    {thumbnails && !loadThumbnails && (
                                        <img
                                            src={thumbnails}
                                            alt="thumbnails"
                                            className="bg-light-tiny shadow-md dark:bg-dark-tiny rounded-md w-40 h-40 m-auto"
                                        ></img>
                                    )}
                                    <div
                                        onClick={(e) => {
                                            if (inputRefThumbnails.current) {
                                                inputRefThumbnails.current.click();
                                            }
                                        }}
                                        className="absolute hover:bg-submit hover:text-white group -bottom-4 -right-4 rounded-full p-3 scale-75 hover:brightness-125 cursor-pointer bg-light-tiny dark:bg-dark-tiny w-fit"
                                    >
                                        <PiImageSquareDuotone className="w-8 h-8 brightness-50 group-hover:brightness-100"></PiImageSquareDuotone>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-fit mt-5 flex float-right justify-start items-center gap-4">
                            <Select
                                onActive={() => setActive(1)}
                                name="Phân loại"
                                position="top"
                                value={category}
                                onSelect={(value) => setCategory(value)}
                                className="bg-light-tiny dark:bg-dark-tiny rounded-md"
                                subMenu={[
                                    ...categoryOptions,
                                    {
                                        name: '',
                                        value: null,
                                        component: (
                                            <Button
                                                onClick={() => setAddNewCategoryModal(true)}
                                                className={'w-full flex justify-center items-center '}
                                            >
                                                <IoIosAdd className="w-8 h-8 hover:text-white brightness-75"></IoIosAdd>
                                                <span>Thêm phân loại mới</span>
                                            </Button>
                                        ),
                                    },
                                ]}
                                active={active == 1}
                            ></Select>
                            <Select
                                position="top"
                                active={active == 0}
                                onActive={() => setActive(0)}
                                name="Trạng thái"
                                value={status}
                                onSelect={(value) => setStatus(value)}
                                className="bg-light-tiny dark:bg-dark-tiny rounded-md"
                                subMenu={[
                                    {
                                        name: 'Bản nháp',
                                        id: false,
                                    },
                                    {
                                        name: 'Đã xuất bản',
                                        id: true,
                                    },
                                ]}
                            ></Select>
                        </div>
                    </div>
                </div>
            </AnimateOpacity>

            {!modeEdit ? (
                <div className="flex justify-start items-center mt-5">
                    <Button onClick={AddBlog} style="submit" className={''}>
                        Xác nhận
                    </Button>
                </div>
            ) : (
                <div className="flex justify-start items-center mt-5">
                    <Button onClick={update} style="submit" className={''}>
                        Cập nhật
                    </Button>
                </div>
            )}
        </div>
    );
}

export default AddBlog;
