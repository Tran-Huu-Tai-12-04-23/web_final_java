import { useState, useRef, useEffect } from 'react';
import { v4 as ID } from 'uuid';
import toast from 'react-hot-toast';

import { motion } from 'framer-motion';
import SubHeader from '../../../Includes/SubHeader';
import { AnimateOpacity } from '../../../../../components/Animate';
import { Button, Input, TextMain, TextSub, Select, Editor, InputCountNumberCustom } from '../../../../../components';
import SkeletonImage from '../Add/SkeletonImage';

import ModalAddNewBrand from '../Add/ModalAddNewBrand';
import ModalAddNewCategory from '../Add/ModalAddNewCategory';
import SettingSaleProduct from '../Add/SettingSaleProduct';

import { IoIosAdd } from 'react-icons/io';
import { BsTrash } from 'react-icons/bs';
import { PiImageSquareDuotone } from 'react-icons/pi';

import { Datepicker } from 'flowbite-react';

import ProductSpecification from '../Add/ProductSpecification';
import { colorOptions } from '../../../../../assets/data';

// use fire base
import uploadImage from '../../../../../services/Firebase';
import { request } from '../../../../../services';
import { useLoading } from '../../../../../context/loadingContext';
import { useNavigate, useParams } from 'react-router-dom';
import Constants from '../../../../../Constants';

function EditProduct({}) {
    const { startLoading, stopLoading } = useLoading();
    const params = useParams();
    const history = useNavigate();
    // data state of product
    const [data, setData] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [thumbnails, setThumbnails] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [brand, setBrand] = useState(null);
    const [status, setStatus] = useState(null);
    const [category, setCategory] = useState(null);
    const [launchDate, setLaunchDate] = useState(new Date());
    const [price, setPrice] = useState(0);
    const [color, setColor] = useState('');
    const [productSpecification, setProductSpecification] = useState(null);

    // options for select
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [brandOptions, setBrandOptions] = useState([]);

    // state load
    const [loadThumbnails, setLoadThumbnails] = useState(false);
    const [linkImages, setLinkImages] = useState([]);
    const [loadLinkImages, setLoadLinkImages] = useState(false);
    const inputRefThumbnails = useRef(null);
    const inputReflinkImages = useRef(null);
    // state active modal
    const [addNewBrandModal, setAddNewBrandModal] = useState(false);
    const [addNewCategoryModal, setAddNewCategoryModal] = useState(false);
    //
    const [active, setActive] = useState(null);

    // handle get option for category and Brand
    useEffect(() => {
        const getCategoryOptions = async () => {
            try {
                await request('GET', '/api/v1/public/category/product')
                    .then((response) => {
                        if (!response.data) return;
                        const newData = response.data.map((data) => {
                            return {
                                ...data,
                                name: data.nameCategory,
                                value: data.id,
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

    useEffect(() => {
        const getBrandOptions = async () => {
            try {
                await request('GET', '/api/v1/public/brand')
                    .then((response) => {
                        if (!response.data) return;
                        const data = response.data;

                        const newData = data.map((data) => {
                            return {
                                ...data,
                                name: data.nameBrand,
                                value: data.id,
                            };
                        });
                        setBrandOptions(newData);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } catch (err) {
                console.log(err);
                return;
            }
        };
        getBrandOptions();
    }, []);

    //init data mode = edit
    useEffect(() => {
        if (data) {
            setName(data.name);
            setDescription(data.description);
            setQuantity(data.quantity ? data.quantity : 0);
            setThumbnails(data.thumbnails);
            setLinkImages(data.linkImages);
            setShortDescription(data.shortDescription);
            setBrand(data.brand.id);
            setPrice(data.price);
            setStatus(data.status);
            setCategory(data.category.id);
            setLaunchDate(new Date(data.launchDate));
            setProductSpecification(data.productSpecification);
            setColor(data.color);
        }
    }, [data]);
    const handleFileChangeLinkImages = async (e) => {
        const files = e.target.files;
        const selectedFilesArray = Array.from(files);

        selectedFilesArray.forEach(async (file) => {
            setLoadLinkImages(true);
            const data = await handleUploadIMG(file);
            setLoadLinkImages(false);

            if (data === false) {
                toast.error('Đăng file thất bại!');
                return;
            }
            setLinkImages((prev) => {
                return [...prev, data];
            });
        });
    };

    const handleFileChangeThumbnails = async (e) => {
        const files = e.target.files;
        if (files[0]) {
            const img = await handleUploadIMG(files[0]);
            setThumbnails(img);
            console.log(img);
        }
    };

    const handleUploadIMG = async (imgData, name) => {
        setLoadThumbnails(true);
        const data = await uploadImage(imgData, name + ID());
        setLoadThumbnails(false);
        if (data === false) return;
        return data;
    };

    const handleRemoveImgOfLinkImages = (idex) => {
        setLinkImages((prev) => {
            return prev.filter((img, index) => index !== idex);
        });
    };

    const handleEditProduct = async (dataReq) => {
        startLoading();
        await request('PUT', `/api/v1/admin/product/update/${data?.id}`, dataReq)
            .then((response) => {
                if (response.data) {
                    clearAllStates();
                    toast.success('Chỉnh sửa sản phẩm thành công!');
                    history(Constants.ADMIN_PRODUCT);
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error('Chỉnh sửa sản phẩm thất bại!');
            });
        stopLoading();
    };

    useEffect(() => {
        const id = params.id;
        const getData = async (id) => {
            startLoading();
            await request('GET', `/api/v1/admin/product/${id}`)
                .then((res) => {
                    if (res.data) {
                        setData(res.data);
                    }
                })
                .catch((err) => {
                    console.error(err);
                });

            stopLoading();
        };

        if (id) {
            getData(id);
        }
    }, []);

    const EditProduct = async () => {
        let data = {
            linkImages,
            color,
            linkVideo: 'updating...',
            thumbnails,
            description,
            shortDescription,
            name,
            price: +price,
            quantity,
            screenSize: productSpecification?.screenSize,
            chipSet: productSpecification?.typeCPU,
            launchDate,
            productSpecification,
            brand,
            category,
            status,
        };

        data = {
            ...data,
            category: {
                id: data.category,
            },
            brand: {
                id: data.brand,
            },
        };

        const resultCheck = verifyData(data);
        if (resultCheck.success === false) {
            toast.error(resultCheck?.message);
            return;
        }

        await handleEditProduct(data);
    };

    const clearAllStates = () => {
        setName('');
        setDescription('');
        setShortDescription('');
        setThumbnails(null);
        setQuantity(1);
        setBrand(null);
        setStatus(null);
        setCategory(null);
        setLaunchDate(new Date());
        setPrice(0);
        setColor('');
        setProductSpecification(null);
    };

    function verifyData(data) {
        if (!Array.isArray(data.linkImages) || data.linkImages.length === 0) {
            return { success: false, message: 'Đường link hình ảnh là không được bỏ trống.' };
        }

        if (typeof data.name !== 'string' || data.name.trim() === '') {
            return { success: false, message: 'Vui lòng nhập tên sản phẩm!' };
        }

        if (typeof data.description !== 'string' || data.description.trim() === '') {
            return { success: false, message: 'Vui lòng nhập mô tả sản phẩm!' };
        }

        if (typeof data.color !== 'string' || data.color.trim() === '') {
            return { success: false, message: 'Màu sản phẩm không được bỏ trống.' };
        }

        // Kiểm tra screenSize
        if (typeof data.screenSize !== 'string' || data.screenSize.trim() === '') {
            return { success: false, message: 'Kích cỡ màn hình sản phẩm không được bỏ trống.' };
        }

        // Kiểm tra chipSet
        if (typeof data.chipSet !== 'string' || data.chipSet.trim() === '') {
            return { success: false, message: 'Vi xử lý sản phẩm không được bỏ trống.' };
        }

        // Kiểm tra launchDate
        if (!(data.launchDate instanceof Date) || isNaN(data.launchDate.getTime())) {
            return { success: false, message: 'Ngày ra mắt không hợp lệ.' };
        }

        // Kiểm tra productSpecification
        if (!data.productSpecification || typeof data.productSpecification !== 'object') {
            return { success: false, message: 'Mô tả sản phẩm phải là một đối tượng.' };
        }

        // Kiểm tra Brand
        if (!data.brand || typeof data.brand !== 'object') {
            return { success: false, message: 'Thương hiệu phải là một đối tượng.' };
        }
        // Kiểm tra Brand properties (tùy thuộc vào loại dữ liệu và các yêu cầu cụ thể)

        // Kiểm tra category
        if (!data.category || typeof data.category !== 'object') {
            return { success: false, message: 'Phân loại sản phẩm phải là một đối tượng.' };
        }
        return { success: true };
    }

    return (
        <>
            {data && (
                <div className="">
                    {/* modal */}
                    {addNewBrandModal && (
                        <ModalAddNewBrand
                            onAddNewBrand={(value) => setBrandOptions((prev) => [...prev, value])}
                            onClose={() => setAddNewBrandModal(false)}
                        ></ModalAddNewBrand>
                    )}
                    {addNewCategoryModal && (
                        <ModalAddNewCategory onClose={() => setAddNewCategoryModal(false)}></ModalAddNewCategory>
                    )}
                    {/* end modal */}
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        ref={inputReflinkImages}
                        onChange={handleFileChangeLinkImages}
                    ></input>
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={inputRefThumbnails}
                        onChange={handleFileChangeThumbnails}
                    ></input>
                    <SubHeader nameHeader={'Products'} sub={`Edit`} main="Products"></SubHeader>
                    <AnimateOpacity>
                        <div className="p-4 rounded-md bg-light dark:bg-dark mt-10 shadow-xl">
                            <div className="flex justify-between items-center border-b-[1px] border-dashed pb-4 dark:border-dark-tiny border-light-tiny">
                                <TextMain>Chỉnh sửa sản phẩm</TextMain>
                            </div>
                        </div>

                        <div className="flex flex-shrink-0 gap-4 mt-5">
                            <div className="w-2/3 flex flex-col gap-4">
                                {/* main property product about */}
                                <div className="  flex flex-col bg-light dark:bg-dark rounded-md p-4 shadow-xl">
                                    <div className="flex flex-col  gap-4">
                                        <div className="flex  flex-col ">
                                            <TextMain className={'mb-2 ml-2'}>Tên</TextMain>
                                            <Input
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Enter product name..."
                                                className="bg-light-tiny dark:bg-dark-tiny rounded-md"
                                            ></Input>
                                        </div>
                                        <div className="flex  flex-col ">
                                            <TextMain className={'mb-2 ml-2'}>Mô tả</TextMain>
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
                                            Hình ảnh sản phẩm
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
                                            <TextMain className={'mb-2 ml-2'}>Hình ảnh sản phẩm</TextMain>
                                            <TextSub className={'mb-2 ml-2 text-second'}>
                                                Thêm đường dẫn hình ảnh sản phẩm.
                                            </TextSub>
                                            <div className="relative p-4 w-full bg-light-tiny dark:bg-dark-tiny mt-2 rounded-md border-dashed border-[1px] border-light-tiny dark:border-dark-tiny h-fit gap-4 grid 2xl:grid-cols-6  xl:grid-cols-5 lg:grid-cols-5 md:grid-col-4 grid-col-3  flex-wrap">
                                                {/* render item linkImages */}

                                                {linkImages &&
                                                    linkImages.map((imgIt, index) => {
                                                        return (
                                                            <div key={index} className="shadow-md  relative scale-90">
                                                                <div className="w-40 bg-contain hover:brightness-125 cursor-pointer h-40 gap-4 flex justify-center items-center bg-light-tiny dark:bg-dark-tiny rounded-md">
                                                                    <img
                                                                        className="w-40 h-40  p-2"
                                                                        src={imgIt}
                                                                        alt="src"
                                                                    ></img>
                                                                </div>
                                                                <div
                                                                    onClick={() => {
                                                                        handleRemoveImgOfLinkImages(index);
                                                                    }}
                                                                    className="absolute -bottom-4 -right-4 rounded-full p-3 scale-75 hover:bg-btn-second hover:brightness-125 cursor-pointer bg-light-tiny dark:bg-dark-tiny w-fit"
                                                                >
                                                                    <BsTrash className="w-6 h-6 brightness-50 hover:text-red-500 hover:brightness-100"></BsTrash>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}

                                                {loadLinkImages && <SkeletonImage></SkeletonImage>}
                                                <div className="scale-90">
                                                    <div className="relative w-40 h-40 rounded-md p-3 hover:brightness-125 cursor-pointer bg-light-tiny dark:bg-dark-tiny ">
                                                        <PiImageSquareDuotone className="w-full h-full brightness-50 m-auto "></PiImageSquareDuotone>

                                                        {/* add action */}
                                                        <div
                                                            onClick={(e) => {
                                                                if (inputReflinkImages.current) {
                                                                    inputReflinkImages.current.click();
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
                                        <TextMain className={'mb-2 ml-2'}>Mô tả ngắn</TextMain>
                                        <Input
                                            value={shortDescription}
                                            onChange={(e) => setShortDescription(e.target.value)}
                                            placeholder="Enter short description..."
                                            className="bg-light-tiny dark:bg-dark-tiny rounded-md"
                                        ></Input>
                                    </div>

                                    <div className="flex  flex-col ">
                                        <TextMain className={'mb-2 ml-2'}>Giá tiền (vnd)</TextMain>
                                        <InputCountNumberCustom
                                            onDecrease={() => {
                                                if (price > 1) {
                                                    setPrice(+price - 1);
                                                }
                                            }}
                                            onIncrease={() => {
                                                setPrice(+price + 1);
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
                                        <TextMain className={'mb-2 ml-2'}>Số lướng (Number) </TextMain>
                                        <InputCountNumberCustom
                                            onChange={(e) => {
                                                setQuantity(e.target.value);
                                            }}
                                            center={false}
                                            value={quantity}
                                            type="number"
                                            onDecrease={() => {
                                                if (quantity > 1) {
                                                    setQuantity(+quantity - 1);
                                                }
                                            }}
                                            onIncrease={() => {
                                                setQuantity(+quantity + 1);
                                            }}
                                            placeholder="Nhập số lượng..."
                                            className="bg-light-tiny dark:bg-dark-tiny rounded-md"
                                        ></InputCountNumberCustom>
                                    </div>

                                    <div className="w-full border-dashed border-b-[1px] border-light-tiny dark:border-dark-tiny"></div>
                                    <Select
                                        active={active == 0}
                                        onActive={() => setActive(0)}
                                        name="Trạng thái"
                                        value={status}
                                        onSelect={(value) => setStatus(value)}
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
                                    <Select
                                        onActive={() => setActive(1)}
                                        name="Phân loại"
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
                                                        <span>Add new category</span>
                                                    </Button>
                                                ),
                                            },
                                        ]}
                                        active={active == 1}
                                    ></Select>
                                    <Select
                                        onSelect={(value) => setBrand(value)}
                                        active={active == 2}
                                        onActive={() => setActive(2)}
                                        name="Thương hiệu"
                                        value={brand}
                                        className="bg-light-tiny dark:bg-dark-tiny rounded-md"
                                        subMenu={[
                                            ...brandOptions,
                                            {
                                                name: '',
                                                value: null,
                                                component: (
                                                    <Button
                                                        onClick={() => setAddNewBrandModal(true)}
                                                        className={'w-full flex justify-center items-center '}
                                                    >
                                                        <IoIosAdd className="w-8 h-8 hover:text-white brightness-75"></IoIosAdd>
                                                        <span>Add new Brand</span>
                                                    </Button>
                                                ),
                                            },
                                        ]}
                                    ></Select>

                                    <Select
                                        onSelect={(value) => setColor(value)}
                                        active={active == 3}
                                        onActive={() => setActive(3)}
                                        name="Màu sắc"
                                        value={color}
                                        type="color"
                                        className="bg-light-tiny dark:bg-dark-tiny rounded-md"
                                        subMenu={colorOptions}
                                    ></Select>

                                    <div className="flex  flex-col ">
                                        <TextMain className={'mb-2 ml-2'}>Ngày ra mắt</TextMain>

                                        <Datepicker
                                            defaultDate={launchDate ? launchDate : new Date(Date.now())}
                                            className=" bg-transparent w-full mb-4 outline-none rounded-lg focus:ring-transparent focus:border-primary focus:outline-none border-none"
                                            onSelectedDateChanged={(date) => setLaunchDate(date)}
                                        />
                                    </div>
                                </div>

                                <SettingSaleProduct></SettingSaleProduct>
                            </div>
                        </div>
                    </AnimateOpacity>

                    <ProductSpecification
                        onSelectData={(value) => setProductSpecification(value)}
                        value={productSpecification}
                    ></ProductSpecification>

                    <div className="flex justify-start items-center mt-5">
                        <Button onClick={EditProduct} style="submit" className={''}>
                            Cập nhật
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}

export default EditProduct;
