import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TextMain, Select, InputCountNumberCustom, TextSub, Button } from '../../../../../components';

import { AiOutlineClose, AiOutlineClear } from 'react-icons/ai';
import { request } from '../../../../../services';

function MainFilter({ filters = {}, setFilters = () => {}, hideCategory = false }) {
    const [brandOptions, setBranchOptions] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [sortType, setSortType] = useState([
        {
            name: 'Giá thấp đến cao',
            value: 'ASC',
        },
        {
            name: 'Giá cao đến thấp',
            value: 'DESC',
        },
    ]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(4000);
    const [selectedSort, setSelectedSort] = useState('ASC');

    // handle get option for category and branch
    useEffect(() => {
        const getCategoryOptions = async () => {
            try {
                await request('GET', '/api/v1/public/category/product')
                    .then((response) => {
                        if (!response.data) return;
                        setCategoryOptions(
                            response.data.map((cate) => {
                                return {
                                    ...cate,
                                    name: cate.nameCategory,
                                };
                            }),
                        );
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
                        setBranchOptions(
                            response.data.map((brand) => {
                                return {
                                    ...brand,
                                    name: brand.nameBrand,
                                };
                            }),
                        );
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

    useEffect(() => {
        setFilters((prev) => {
            return {
                ...prev,
                selectedSort,
            };
        });
    }, [selectedSort]);

    console.log(filters);
    return (
        <div className="flex flex-col w-full">
            <div className="flex justify-between items-center">
                <TextMain className={'mb-2 font-bold text-lg'}>Bộ lọc</TextMain>
            </div>
            <div className="gap-4 flex w-full mb-4 h-fit border-primary-style p-4 rounded-md items-center">
                <Select
                    name="Chọn thương hiệu"
                    value={filters.brand}
                    onSelect={(value) => {
                        setFilters((prev) => {
                            return {
                                ...prev,
                                brand: value,
                            };
                        });
                    }}
                    className="bg-light-tiny dark:bg-dark-tiny rounded-md"
                    subMenu={brandOptions}
                ></Select>

                {!hideCategory && (
                    <Select
                        name="Chọn phân loại"
                        value={filters.category}
                        onSelect={(value) => {
                            setFilters((prev) => {
                                return {
                                    ...prev,
                                    category: value,
                                };
                            });
                        }}
                        className="bg-light-tiny dark:bg-dark-tiny rounded-md"
                        subMenu={categoryOptions}
                    ></Select>
                )}

                <div className="relative group">
                    <Button className="bg-btn-second p-2 rounded-md pl-4 pr-4">Sắp xếp</Button>
                    <div className="h-10 w-full bg-transparent absolute top-[90%] group"></div>
                    <ul className="hidden group-hover:flex top-[110%] flex-col gap-4 p-4 rounded-md absolute z-50 min-w-[15rem] dark:bg-bg-dark-menu bg-bg-light-menu backdrop-blur-3xl">
                        {sortType.map((sort, index) => {
                            return (
                                <li
                                    key={index}
                                    className="justify-start flex items-center hover:bg-btn-second p-2 rounded-md cursor-pointer"
                                >
                                    <input
                                        id={'default-discount-' + index}
                                        type="radio"
                                        name="sort"
                                        value={sort.value}
                                        onChange={(event) => {
                                            setSelectedSort(event.target.value);
                                        }}
                                        checked={selectedSort === sort.value}
                                        className="w-4 h-4 text-primary mr-3 bg-gray-100 border-gray-300 rounded focus:ring-transparent dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label htmlFor={`default-discount-${index}`}>{sort.name}</label>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="relative group">
                    <Button className="bg-status-pending text-blue-600 p-2 rounded-md pl-4 pr-4 w-[10rem]">
                        Chọn giá
                    </Button>
                    <div className="h-10 w-full bg-transparent absolute top-[90%] group"></div>
                    <div className="group-hover:flex hidden justify-start flex-col backdrop-blur-3xl bg-bg-light-menu dark:bg-bg-dark-menu p-4 rounded-md min-w-[18rem] absolute top-[110%] z-[10000]">
                        <label
                            htmlFor="minmax-range"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Giá thấp nhất
                        </label>
                        <input
                            type="range"
                            min="1"
                            max="10000"
                            value={minPrice}
                            onChange={(e) => {
                                setMinPrice(+e.target.value);
                            }}
                            className="range-thumb-color w-full h-2 mb-2 bg-gray-200 rounded-lg appearance-none cursor-pointer  dark:bg-gray-700"
                        />

                        <InputCountNumberCustom
                            value={minPrice}
                            onChange={(e) => {
                                if (+e.target.value > 1 && +e.target.value < +maxPrice) {
                                    setMinPrice(+e.target.value);
                                }
                            }}
                            onIncrease={() => {
                                if (+minPrice + 1 < +maxPrice) {
                                    setMinPrice((prev) => prev + 1);
                                }
                            }}
                            onDecrease={() => {
                                if (+minPrice >= 1) {
                                    setMinPrice((prev) => prev - 1);
                                }
                            }}
                        ></InputCountNumberCustom>

                        <label
                            htmlFor="minmax-range"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Giá cao nhất
                        </label>
                        <input
                            type="range"
                            min="1"
                            max="10000"
                            value={maxPrice}
                            onChange={(e) => {
                                setMaxPrice(+e.target.value);
                            }}
                            className="   range-thumb-color w-full h-2 bg-gray-200 mb-2 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />

                        <InputCountNumberCustom
                            value={maxPrice}
                            onChange={(e) => {
                                if (+e.target.value > +minPrice) {
                                    setMaxPrice(+e.target.value);
                                }
                            }}
                            onIncrease={() => {
                                if (+maxPrice + 1 <= 10000) {
                                    setMaxPrice((prev) => prev + 1);
                                }
                            }}
                            onDecrease={() => {
                                if (+maxPrice - 1 > +minPrice) {
                                    setMaxPrice((prev) => prev - 1);
                                }
                            }}
                        ></InputCountNumberCustom>
                        <Button
                            className="p-2 rounded-md mt-2 pl-4 pr-4 bg-primary"
                            onClick={() => {
                                setFilters((prev) => {
                                    return {
                                        ...prev,
                                        minPrice: +minPrice,
                                        maxPrice: +maxPrice,
                                    };
                                });
                            }}
                        >
                            Áp dụng
                        </Button>
                    </div>
                </div>

                <Button
                    onClick={() => setFilters({})}
                    className="bg-status-cancel text-status-cancel p-2 rounded-md pl-4 pr-4"
                >
                    Làm mới
                </Button>
            </div>
        </div>
    );
}

export default MainFilter;
