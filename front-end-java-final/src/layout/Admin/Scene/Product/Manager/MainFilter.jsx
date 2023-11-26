import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TextMain, MultiSelect, InputCountNumberCustom, TextSub, Button } from '../../../../../components';

import { AiOutlineClose, AiOutlineClear } from 'react-icons/ai';
import { request } from '../../../../../services';

function MainFilter({ filters = {}, setFilters = () => {} }) {
    const [branchOptions, setBranchOptions] = useState(['test1 ', 'test2 ', 'test3']);
    const [categoryOptions, setCategoryOptions] = useState(['test1 ', 'test2 ', 'test3']);
    const [branchOptionsDB, setBranchOptionsDB] = useState(['test1 ', 'test2 ', 'test3']);
    const [categoryOptionsDB, setCategoryOptionsDB] = useState(['test1 ', 'test2 ', 'test3']);
    const [discountList, setDiscountList] = useState(['50%', '40%', '30%', '20%', '10%', 'Less than 10%']);
    const [activeMultiSelect, setActiveMultiSelect] = useState(null);

    // handle get option for category and branch
    useEffect(() => {
        const getCategoryOptions = async () => {
            try {
                await request('GET', '/api/v1/public/category/product')
                    .then((response) => {
                        const data = response.data;
                        if (!data) return;
                        const newData = data.map((data) => {
                            return data.nameCategory;
                        });
                        setCategoryOptions(newData);
                        setCategoryOptionsDB(newData);
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
        const getBranchOptions = async () => {
            try {
                await request('GET', '/api/v1/public/branch')
                    .then((response) => {
                        const data = response.data;
                        if (!data) return;
                        const newData = data.map((data) => {
                            return data.nameBranch;
                        });
                        setBranchOptions(newData);
                        setBranchOptionsDB(newData);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } catch (err) {
                console.log(err);
                return;
            }
        };
        getBranchOptions();
    }, []);

    useEffect(() => {
        if (filters && filters.branchList) {
            const dataSelectedValue = filters.branchList.map((data) => {
                return data;
            });
            let newData = branchOptions.filter((dt) => {
                return !dataSelectedValue.includes(dt);
            });

            // setDataPresent(newData);
            setBranchOptions(newData);
        } else {
            setBranchOptions(branchOptionsDB);
        }

        if (filters && filters.categoryList) {
            const dataSelectedValue = filters.categoryList.map((data) => {
                return data;
            });
            let newData = categoryOptions.filter((dt) => {
                return !dataSelectedValue.includes(dt);
            });

            // setDataPresent(newData);
            setCategoryOptions(newData);
        } else {
            setCategoryOptions(categoryOptionsDB);
        }
    }, [filters]);

    const handleRemoveBranch = (branch) => {
        if (filters && filters.branchList) {
            setFilters((prev) => {
                return {
                    ...prev,
                    branchList: prev.branchList.filter((br) => br !== branch),
                };
            });
            setBranchOptions((prev) => {
                return [...prev, branch];
            });
        }
    };

    const handleRemoveCategory = (branch) => {
        if (filters && filters.categoryList) {
            setFilters((prev) => {
                return {
                    ...prev,
                    categoryList: prev.categoryList.filter((br) => br !== branch),
                };
            });
            setCategoryOptions((prev) => {
                return [...prev, branch];
            });
        }
    };

    const handleChangePrice = (value, type) => {
        if (filters) {
            if (type == 1) {
                setFilters((prev) => {
                    return {
                        ...prev,
                        maxPrice: value,
                    };
                });
            } else {
                setFilters((prev) => {
                    return {
                        ...prev,
                        minPrice: value,
                    };
                });
            }
        }
    };

    return (
        <div className="flex flex-col w-full">
            <div className="flex justify-between items-center">
                <TextMain className={'mb-2 font-bold text-lg'}>Filter</TextMain>
            </div>
            <div className="gap-4 flex w-full mb-4 h-fit border-primary-style p-4 rounded-md items-center">
                <MultiSelect
                    placeholder="Choose branch"
                    active={activeMultiSelect === 1}
                    onActive={() => {
                        setActiveMultiSelect(1);
                    }}
                    data={branchOptions}
                    name={'Branch'}
                    onSelect={(value) => {
                        if (filters) {
                            setFilters((prev) => {
                                return {
                                    ...prev,
                                    branchList: prev.branchList ? [...prev.branchList, value] : [value],
                                };
                            });
                        } else {
                            setFilters({
                                branchList: value,
                            });
                        }
                    }}
                    dataSelected={filters && filters.branchList && filters.branchList}
                ></MultiSelect>

                <MultiSelect
                    placeholder={'Choose category'}
                    active={activeMultiSelect === 2}
                    onActive={() => {
                        setActiveMultiSelect(2);
                    }}
                    data={categoryOptions}
                    name={'Category'}
                    onSelect={(value) => {
                        if (filters) {
                            setFilters((prev) => {
                                return {
                                    ...prev,
                                    categoryList: prev.categoryList ? [...prev.categoryList, value] : [value],
                                };
                            });
                        } else {
                            setFilters({
                                categoryList: value,
                            });
                        }
                    }}
                    dataSelected={filters && filters.categoryList && filters.categoryList}
                ></MultiSelect>

                <div className="relative group">
                    <Button className="bg-btn-second p-2 rounded-md pl-4 pr-4 w-[10rem]">Select price</Button>
                    <div className="h-10 w-full bg-transparent absolute top-[90%] group"></div>
                    <div className="group-hover:flex hidden justify-start flex-col backdrop-blur-3xl bg-bg-light-menu dark:bg-bg-dark-menu p-4 rounded-md min-w-[18rem] absolute top-[110%] z-[10000]">
                        <label
                            htmlFor="minmax-range"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Min price
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="10000"
                            value={filters.minPrice}
                            onChange={(e) => {
                                handleChangePrice(e.target.value, 0);
                            }}
                            className="range-thumb-color w-full h-2 mb-2 bg-gray-200 rounded-lg appearance-none cursor-pointer  dark:bg-gray-700"
                        />

                        <InputCountNumberCustom
                            value={filters.minPrice}
                            onChange={(e) =>
                                setFilters((prev) => {
                                    return {
                                        ...prev,
                                        minPrice: e.target.value,
                                    };
                                })
                            }
                            onIncrease={() => {
                                setFilters((prev) => {
                                    return {
                                        ...prev,
                                        minPrice: filters.minPrice ? prev.minPrice + 1 : 1,
                                    };
                                });
                            }}
                            onDecrease={() => {
                                if (filters.minPrice >= 1) {
                                    setFilters((prev) => {
                                        return {
                                            ...prev,
                                            minPrice: filters.minPrice ? prev.minPrice - 1 : 1,
                                        };
                                    });
                                }
                            }}
                        ></InputCountNumberCustom>

                        <label
                            htmlFor="minmax-range"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Max price
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="1000"
                            value={filters.maxPrice}
                            onChange={(e) => {
                                handleChangePrice(e.target.value, 1);
                            }}
                            className="   range-thumb-color w-full h-2 bg-gray-200 mb-2 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />

                        <InputCountNumberCustom
                            value={filters.maxPrice}
                            onChange={(e) =>
                                setFilters((prev) => {
                                    return {
                                        ...prev,
                                        maxPrice: e.target.value,
                                    };
                                })
                            }
                            onIncrease={() => {
                                setFilters((prev) => {
                                    return {
                                        ...prev,
                                        maxPrice: filters.maxPrice ? prev.maxPrice + 1 : 1,
                                    };
                                });
                            }}
                            onDecrease={() => {
                                if (filters.minPrice >= 1) {
                                    setFilters((prev) => {
                                        return {
                                            ...prev,
                                            maxPrice: filters.maxPrice ? prev.maxPrice - 1 : 1,
                                        };
                                    });
                                }
                            }}
                        ></InputCountNumberCustom>
                    </div>
                </div>
                <div className="relative group">
                    <Button className="bg-btn-second p-2 rounded-md pl-4 pr-4">Choose discount</Button>
                    <div className="h-10 w-full bg-transparent absolute top-[90%] group"></div>
                    <ul className="hidden group-hover:flex top-[110%] flex-col gap-4 p-4 rounded-md absolute z-50 min-w-[15rem] dark:bg-bg-dark-menu bg-bg-light-menu backdrop-blur-3xl">
                        {discountList.map((discount, index) => {
                            return (
                                <li
                                    key={index}
                                    className="justify-start flex items-center hover:bg-btn-second p-2 rounded-md cursor-pointer"
                                >
                                    <input
                                        id={'default-discount-' + index}
                                        type="radio"
                                        value=""
                                        name="discount"
                                        className="w-4 h-4 text-primary mr-3 bg-gray-100 border-gray-300 rounded focus:ring-transparent dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label htmlFor={'default-discount-' + index}>{discount} or more</label>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>

            {filters?.categoryList?.length > 0 ||
            filters?.branchList?.length > 0 ||
            filters.discount ||
            filters.price ? (
                <>
                    <TextMain className={'text-lg font-bold mb-2'}>Filter by</TextMain>
                    <div className="flex mb-3 border-primary-style justify-start border-dashed p-4 items-center gap-4 dark:border-dark-tiny rounded-md bg-light-tiny dark:bg-dark-tiny">
                        {filters &&
                            filters?.branchList &&
                            filters?.branchList.map((branch, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex justify-start items-center gap-4 p-2 rounded-md hover:bg-btn-second cursor-pointer"
                                    >
                                        <span>{branch}</span>
                                        <AiOutlineClose
                                            className="w-4 h-4 hover:scale-125 brightness-50 hover:brightness-100 cursor-pointer"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRemoveBranch(branch);
                                            }}
                                        ></AiOutlineClose>
                                    </div>
                                );
                            })}
                        {filters &&
                            filters?.categoryList &&
                            filters?.categoryList?.map((cate, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex justify-start items-center gap-4 p-2 rounded-md hover:bg-btn-second cursor-pointer"
                                    >
                                        <span>{cate}</span>
                                        <AiOutlineClose
                                            className="w-4 h-4 hover:scale-125 brightness-50 hover:brightness-100 cursor-pointer"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRemoveCategory(cate);
                                            }}
                                        ></AiOutlineClose>
                                    </div>
                                );
                            })}
                    </div>
                    <div className="flex justify-start items-center gap-10 ">
                        <Button className="p-2 w-[15rem]  bg-btn-second rounded-md">Find by filter</Button>
                        <Button className="p-2 h-fit rounded-md flex justify-center items-center bg-btn-second pl-4 pr-5 ">
                            <AiOutlineClear className="w-6 h-6 mr-2"></AiOutlineClear>
                            <span>Clear Filter</span>
                        </Button>
                    </div>
                </>
            ) : (
                ''
            )}
        </div>
    );
}

export default MainFilter;
