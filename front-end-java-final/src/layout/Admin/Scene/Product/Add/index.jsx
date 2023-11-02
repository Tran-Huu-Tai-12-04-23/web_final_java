import { useState, useRef, useEffect } from 'react';
import { v4 as ID } from 'uuid';

import UploadImgAPI from '../../../../../services/UploadImgAPI';

import { motion } from 'framer-motion';
import SubHeader from '../../../Includes/SubHeader';
import { AnimateOpacity } from '../../../../../components/Animate';
import { Button, Input, TextMain, TextSub, Select, Editor, InputCountNumberCustom } from '../../../../../components';
import SkeletonImage from './SkeletonImage';

import ModalAddNewBranch from './ModalAddNewBranch';
import ModalAddNewCategory from './ModalAddNewCategory';
import ModalAddNewColor from './ModalAddNewColor';
import SettingSaleProduct from './SettingSaleProdcut';

import { IoIosAdd } from 'react-icons/io';
import { BsTrash } from 'react-icons/bs';
import { PiImageSquareDuotone } from 'react-icons/pi';

import { Datepicker } from 'flowbite-react';

function AddProduct({ mode = 'add', data = null }) {
    // data state of product
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [thumbnails, setThumbnails] = useState(null);
    const [screenSize, setScreenSize] = useState(16.9);
    const [quantity, setQuantity] = useState(1);
    const [chipSet, setChipSet] = useState('');
    const [branch, setBranch] = useState(null);
    const [status, setStatus] = useState(null);
    const [category, setCategory] = useState(null);
    const [datePublished, setDatePublished] = useState(null);
    const [price, setPrice] = useState(0);
    const [color, setColor] = useState('');

    // state load
    const [loadThumbnails, setLoadThumbnails] = useState(false);
    const [gallery, setGallery] = useState([]);
    const [loadGallery, setLoadGallery] = useState(false);
    const inputRefThumbnails = useRef(null);
    const inputRefGallery = useRef(null);
    // state active modal
    const [addNewBranchModal, setAddNewBranchModal] = useState(false);
    const [addNewCategoryModal, setAddNewCategoryModal] = useState(false);
    const [addNewColor, setAddNewColor] = useState(false);
    //
    const [active, setActive] = useState(null);

    const formData = new FormData();

    // console.log('text' + process.env.BASE_URL_API);

    //init data mode = edit
    useEffect(() => {
        if (data) {
            setName(data.name);
            setDescription(data.description);
            setScreenSize(data.screenSize);
            setChipSet(data.chipSet ? data.chipSet : '');
            setQuantity(data.quantity ? data.quantity : 0);
            setScreenSize(data.screenSize ? data.screenSize : 0);
            setThumbnails(data.thumbnails);
            setGallery(data.gallery);
            setShortDescription(data.shortDescription);
            setBranch(data.branch);
            setStatus(data.status);
            setCategory(data.category);
            setDatePublished(new Date(data.datePublished));
            setColor(data.color);
        }
    }, [data]);
    const handleFileChangeGallery = async (e) => {
        const files = e.target.files;
        const selectedFilesArray = Array.from(files);

        selectedFilesArray.forEach(async (file, index) => {
            setLoadGallery(true);
            const data = await UploadImgAPI.uploadImg(file, name + ID());
            if (data.status === 200 && data.success) {
                setGallery((prev) => {
                    return [
                        ...prev,
                        {
                            id: ID(),
                            link: data.data.display_url,
                        },
                    ];
                });
            }
            setLoadGallery(false);
        });
    };

    const handleFileChangeThumbnails = async (e) => {
        const files = e.target.files;
        if (files[0]) {
            const img = await handleUploadIMG(files[0]);
            setThumbnails(img);
        }
    };

    const handleUploadIMG = async (imgData, name) => {
        setLoadThumbnails(true);
        const data = await UploadImgAPI.uploadImg(imgData, name + ID());
        setLoadThumbnails(false);
        if (data.status === 200 && data.success) {
            return data.data.display_url;
        } else {
            return null;
        }
    };
    const handleSave = async () => {
        console.log('save');
    };

    const handleRemoveImgOfGallery = (id) => {
        setGallery((prev) => {
            return prev.filter((img) => img.id !== id);
        });
    };

    return (
        <motion.div className="">
            {/* modal */}
            {addNewBranchModal && <ModalAddNewBranch onClose={() => setAddNewBranchModal(false)}></ModalAddNewBranch>}
            {addNewCategoryModal && (
                <ModalAddNewCategory onClose={() => setAddNewCategoryModal(false)}></ModalAddNewCategory>
            )}
            {addNewColor && <ModalAddNewColor onClose={() => setAddNewColor(false)}></ModalAddNewColor>}
            {/* end modal */}
            <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                ref={inputRefGallery}
                onChange={handleFileChangeGallery}
            ></input>
            <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={inputRefThumbnails}
                onChange={handleFileChangeThumbnails}
            ></input>
            <SubHeader nameHeader={'Products'} sub={`${(mode = 'edit' ? 'Edit' : 'Add')}`} main="Products"></SubHeader>
            <AnimateOpacity>
                <motion.div className="p-4 rounded-md bg-light dark:bg-dark mt-10 shadow-xl">
                    <motion.div className="flex justify-between items-center border-b-[1px] border-dashed pb-4 dark:border-dark-tiny border-light-tiny">
                        {mode == 'edit' && <TextMain>Edit product</TextMain>}
                        {mode != 'edit' && <TextMain>Edit product</TextMain>}
                    </motion.div>
                </motion.div>

                <div className="flex flex-shrink-0 gap-4 mt-5">
                    <div className="w-2/3 flex flex-col gap-4">
                        {/* main property product about */}
                        <div className="  flex flex-col bg-light dark:bg-dark rounded-md p-4 shadow-xl">
                            <div className="flex flex-col  gap-4">
                                <div className="flex  flex-col ">
                                    <TextMain className={'mb-2 ml-2'}>Name</TextMain>
                                    <Input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter product name..."
                                        className="bg-light-tiny dark:bg-dark-tiny rounded-md"
                                    ></Input>
                                </div>
                                <div className="flex  flex-col ">
                                    <TextMain className={'mb-2 ml-2'}>Description</TextMain>
                                    <Editor
                                        placeholder="Enter product name..."
                                        value={description}
                                        onChange={(value) => {
                                            setDescription(value);
                                        }}
                                    ></Editor>
                                </div>
                            </div>
                        </div>

                        <div className="  flex flex-col bg-light dark:bg-dark rounded-md p-4 shadow-xl">
                            <div className="flex flex-col  gap-4">
                                <TextMain
                                    className={
                                        ' ml-2 border-dashed mt-5 pb-5 text-xl border-light-tiny dark:border-dark-tiny border-b-[1px]'
                                    }
                                >
                                    Product gallery
                                </TextMain>
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

                                <div className="flex  flex-col ">
                                    <TextMain className={'mb-2 ml-2'}>Product Gallery</TextMain>
                                    <TextSub className={'mb-2 ml-2 text-second'}>Add Product Gallery Images.</TextSub>
                                    <div className="relative p-4 w-full bg-light-tiny dark:bg-dark-tiny mt-2 rounded-md border-dashed border-[1px] border-light-tiny dark:border-dark-tiny h-fit gap-4 grid 2xl:grid-cols-6  xl:grid-cols-5 lg:grid-cols-5 md:grid-col-4 grid-col-3  flex-wrap">
                                        {/* render item gallery */}

                                        {gallery &&
                                            gallery.map((imgIt, index) => {
                                                return (
                                                    <div key={index} className="shadow-md  relative scale-95">
                                                        <div className="w-40 hover:brightness-125 cursor-pointer h-40 gap-4 flex justify-center items-center bg-light-tiny dark:bg-dark-tiny rounded-md">
                                                            <img className="w-40  p-2" src={imgIt.link} alt="src"></img>
                                                        </div>
                                                        <div
                                                            onClick={() => {
                                                                handleRemoveImgOfGallery(imgIt.id);
                                                            }}
                                                            className="absolute -bottom-4 -right-4 rounded-full p-3 scale-75 hover:bg-btn-second hover:brightness-125 cursor-pointer bg-light-tiny dark:bg-dark-tiny w-fit"
                                                        >
                                                            <BsTrash className="w-6 h-6 brightness-50 hover:text-red-500 hover:brightness-100"></BsTrash>
                                                        </div>
                                                    </div>
                                                );
                                            })}

                                        {loadGallery && <SkeletonImage></SkeletonImage>}
                                        <div className="">
                                            <div className="relative w-40 h-40 rounded-md p-3 hover:brightness-125 cursor-pointer bg-light-tiny dark:bg-dark-tiny ">
                                                <PiImageSquareDuotone className="w-full h-full brightness-50 m-auto "></PiImageSquareDuotone>

                                                {/* add action */}
                                                <div
                                                    onClick={(e) => {
                                                        if (inputRefGallery.current) {
                                                            inputRefGallery.current.click();
                                                        }
                                                    }}
                                                    className="absolute hover:bg-submit hover:text-white group -bottom-4 -right-4 rounded-full p-3 scale-75 hover:brightness-125 cursor-pointer bg-light-tiny dark:bg-dark-tiny w-fit"
                                                >
                                                    <IoIosAdd className="w-8 h-8 brightness-50 group-hover:brightness-100"></IoIosAdd>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-1/3  flex flex-col gap-4">
                        {/* normal property */}
                        <div className=" flex flex-col gap-4 bg-light dark:bg-dark rounded-md p-4 shadow-xl">
                            <div className="flex  flex-col ">
                                <TextMain className={'mb-2 ml-2'}>Short description</TextMain>
                                <Input
                                    value={shortDescription}
                                    onChange={(e) => setShortDescription(e.target.value)}
                                    placeholder="Enter short description..."
                                    className="bg-light-tiny dark:bg-dark-tiny rounded-md"
                                ></Input>
                            </div>

                            <div className="flex  flex-col ">
                                <TextMain className={'mb-2 ml-2'}>Price</TextMain>
                                <InputCountNumberCustom
                                    onDecrease={() => {
                                        if (price >= 1) {
                                            setPrice(price - 1);
                                        }
                                    }}
                                    onIncrease={() => {
                                        setPrice(price + 1);
                                    }}
                                    value={price}
                                    onChange={(e) => {
                                        setPrice(e.target.value);
                                    }}
                                    center={false}
                                    type="number"
                                    placeholder="Enter price..."
                                    className="bg-light-tiny dark:bg-dark-tiny rounded-md"
                                ></InputCountNumberCustom>
                            </div>
                            <div className="flex  flex-col ">
                                <TextMain className={'mb-2 ml-2'}>Chipset</TextMain>
                                <Input
                                    value={chipSet}
                                    onChange={(e) => setChipSet(e.target.value)}
                                    placeholder="Enter chip set..."
                                    className="bg-light-tiny dark:bg-dark-tiny rounded-md"
                                ></Input>
                            </div>

                            <div className="flex  flex-col ">
                                <TextMain className={'mb-2 ml-2'}>Screen size (Inch) </TextMain>
                                <InputCountNumberCustom
                                    onDecrease={() => {
                                        if (screenSize - 1) {
                                            setScreenSize(screenSize - 1);
                                        }
                                    }}
                                    onIncrease={() => {
                                        setScreenSize(screenSize + 1);
                                    }}
                                    value={screenSize}
                                    onChange={(e) => {
                                        setScreenSize(e.target.value);
                                    }}
                                    center={false}
                                    type="number"
                                    placeholder="Enter screen size..."
                                    className="bg-light-tiny dark:bg-dark-tiny rounded-md"
                                ></InputCountNumberCustom>
                            </div>

                            <div className="flex  flex-col ">
                                <TextMain className={'mb-2 ml-2'}>Quantity (Number) </TextMain>
                                <InputCountNumberCustom
                                    onChange={(e) => {
                                        setQuantity(e.target.value);
                                    }}
                                    center={false}
                                    value={quantity}
                                    type="number"
                                    onInCrease={(e) => {}}
                                    onDecrease={(e) => {}}
                                    placeholder="Enter quantity..."
                                    className="bg-light-tiny dark:bg-dark-tiny rounded-md"
                                ></InputCountNumberCustom>
                            </div>

                            <div className="w-full border-dashed border-b-[1px] border-light-tiny dark:border-dark-tiny"></div>
                            <Select
                                active={active == 0}
                                onActive={() => setActive(0)}
                                name="Status"
                                value={status ? status : 0}
                                className="bg-light-tiny dark:bg-dark-tiny rounded-md"
                                subMenu={[
                                    {
                                        name: 'Draft',
                                        id: 0,
                                    },
                                    {
                                        name: 'Published',
                                        id: 1,
                                    },
                                ]}
                            ></Select>
                            <Select
                                onActive={() => setActive(1)}
                                name="Category"
                                value={category ? category.id : 0}
                                className="bg-light-tiny dark:bg-dark-tiny rounded-md"
                                subMenu={[
                                    {
                                        name: 'Category 1',
                                        id: 0,
                                    },
                                    {
                                        name: 'Category 2',
                                        id: 1,
                                    },
                                    {
                                        name: '',
                                        value: null,
                                        component: (
                                            <Button
                                                onClick={() => setAddNewCategoryModal(true)}
                                                className={'w-full flex justify-center items-center '}
                                            >
                                                <IoIosAdd className="w-8 h-8 hover:text-white brightness-75"></IoIosAdd>
                                                <span>Add new category</span>
                                            </Button>
                                        ),
                                    },
                                ]}
                                active={active == 1}
                            ></Select>
                            <Select
                                active={active == 2}
                                onActive={() => setActive(2)}
                                name="Branch"
                                value={branch ? branch.id : 0}
                                className="bg-light-tiny dark:bg-dark-tiny rounded-md"
                                subMenu={[
                                    {
                                        name: 'Branch 1',
                                        id: 0,
                                    },
                                    {
                                        name: 'Branch 2',
                                        id: 1,
                                    },
                                    {
                                        name: '',
                                        value: null,
                                        component: (
                                            <Button
                                                onClick={() => setAddNewBranchModal(true)}
                                                className={'w-full flex justify-center items-center '}
                                            >
                                                <IoIosAdd className="w-8 h-8 hover:text-white brightness-75"></IoIosAdd>
                                                <span>Add new branch</span>
                                            </Button>
                                        ),
                                    },
                                ]}
                            ></Select>

                            <Select
                                active={active == 3}
                                onActive={() => setActive(3)}
                                name="Color"
                                value={color ? color.id : 0}
                                className="bg-light-tiny dark:bg-dark-tiny rounded-md"
                                subMenu={[
                                    {
                                        // name: 'Green 1',
                                        id: 0,
                                        component: (
                                            <div
                                                className="h-6 rounded-md"
                                                style={{
                                                    background: '#48e99a',
                                                }}
                                            ></div>
                                        ),
                                    },
                                    {
                                        component: (
                                            <div
                                                className="h-6 rounded-md"
                                                style={{
                                                    background: 'Red',
                                                }}
                                            ></div>
                                        ),
                                        id: 1,
                                    },
                                    {
                                        name: '',
                                        value: null,
                                        component: (
                                            <Button
                                                onClick={() => setAddNewColor(true)}
                                                className={'w-full flex justify-center items-center '}
                                            >
                                                <IoIosAdd className="w-8 h-8 hover:text-white brightness-75"></IoIosAdd>
                                                <span>Add new color</span>
                                            </Button>
                                        ),
                                    },
                                ]}
                            ></Select>

                            <div className="flex  flex-col ">
                                <TextMain className={'mb-2 ml-2'}>Date published</TextMain>

                                <Datepicker
                                    defaultDate={datePublished ? datePublished : new Date(Date.now())}
                                    className=" bg-transparent w-full mb-4 outline-none rounded-lg focus:ring-transparent focus:border-primary focus:outline-none border-none"
                                    // onSelectedDateChanged={(date) => setCreateAt(date)}
                                />
                            </div>
                        </div>

                        {/* sale mode */}
                        <SettingSaleProduct></SettingSaleProduct>
                    </div>
                </div>
            </AnimateOpacity>

            {mode != 'edit' && (
                <div className="flex justify-start items-center mt-5">
                    <Button onClick={handleSave} style="submit" className={''}>
                        Submit
                    </Button>
                </div>
            )}

            {mode == 'edit' && (
                <div className="flex justify-start items-center mt-5">
                    <Button onClick={handleSave} style="submit" className={''}>
                        Update
                    </Button>
                </div>
            )}
        </motion.div>
    );
}

export default AddProduct;
