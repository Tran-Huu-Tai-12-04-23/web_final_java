import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TextMain, MultiSelect, InputCountNumberCustom, TextSub } from '../../../../../components';

import { AiOutlineClose } from 'react-icons/ai';

function MainFilter({ filters = {}, setFilters = () => {} }) {
    const [dataBranch, setDataBranch] = useState([
        {
            name: 'test1',
            value: '0',
        },
        {
            name: 'test2',
            value: '1',
        },
        {
            name: 'test1',
            value: '2',
        },
        {
            name: 'test2',
            value: '3',
        },
        {
            name: 'test1',
            value: '4',
        },
        {
            name: 'test2',
            value: '5',
        },
        {
            name: 'test1',
            value: '6',
        },
        {
            name: 'test2',
            value: '7',
        },
        {
            name: 'test1',
            value: '8',
        },
    ]);
    const [discountList, setDiscountList] = useState(['50%', '40%', '30%', '20%', '10%', 'Less than 10%']);
    const [activeMultiSelect, setActiveMultiSelect] = useState(null);

    useEffect(() => {
        if (filters && filters.branchList) {
            const dataSelectedValue = filters.branchList.map((data) => {
                return data.value;
            });
            let newData = dataBranch.filter((dt) => {
                return !dataSelectedValue.includes(dt.value);
            });

            // setDataPresent(newData);
            setDataBranch(newData);
        }
    }, [filters]);

    const handleRemove = (branch) => {
        if (filters && filters.branchList) {
            const newBranchList = filters.branchList.filter((br) => br.value != branch.value);
            console.log(newBranchList);
            setFilters((prev) => {
                return {
                    ...prev,
                    branchList: prev.branchList.filter((br) => br.value !== branch.value),
                };
            });
            setDataBranch((prev) => {
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
        <div className="gap-2 flex flex-col">
            <TextMain className={''}>Select branch</TextMain>
            <MultiSelect
                active={activeMultiSelect === 1}
                onActive={() => {
                    setActiveMultiSelect(1);
                }}
                data={dataBranch}
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
            {filters.branchList && filters.branchList.length > 0 && (
                <div className="border-dashed border-[1px] border-light-tiny p-2 dark:border-dark-tiny rounded-md bg-light-tiny dark:bg-dark-tiny">
                    {filters.branchList.map((branch, index) => {
                        return (
                            <div
                                key={index}
                                className="rounded-md mt-2 mb-2 hover:text-primary cursor-pointer hover:bg-btn-second bg-light-tiny dark:bg-dark-tiny p-2 flex justify-between items-center"
                            >
                                <span>{branch.name}</span>
                                <AiOutlineClose
                                    className="w-4 h-4 hover:scale-125 brightness-50 hover:brightness-100 cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemove(branch);
                                    }}
                                ></AiOutlineClose>
                            </div>
                        );
                    })}
                </div>
            )}

            <div className="border-t-[1px] border-dashed border-light-tiny dark:border-dark-tiny"></div>
            <TextMain className={''}>Select category</TextMain>
            <MultiSelect
                active={activeMultiSelect === 2}
                onActive={() => {
                    setActiveMultiSelect(2);
                }}
                data={dataBranch}
                name={'Category'}
                onSelect={(value) => {
                    if (filters) {
                        setFilters((prev) => {
                            return {
                                ...prev,
                                branchList: prev.categoryList ? [...prev.categoryList, value] : [value],
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
            {filters.categoryList && filters.categoryList.length > 0 && (
                <div className="border-dashed border-[1px] border-light-tiny p-2 dark:border-dark-tiny rounded-md bg-light-tiny dark:bg-dark-tiny">
                    {filters.categoryList.map((branch, index) => {
                        return (
                            <div
                                key={index}
                                className="rounded-md mt-2 mb-2 hover:text-primary cursor-pointer hover:bg-btn-second bg-light-tiny dark:bg-dark-tiny p-2 flex justify-between items-center"
                            >
                                <span>{branch.name}</span>
                                <AiOutlineClose
                                    className="w-4 h-4 hover:scale-125 brightness-50 hover:brightness-100 cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemove(branch);
                                    }}
                                ></AiOutlineClose>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* price  */}
            <TextMain className={'uppercase border-dashed border-b-[1px] border-light-tiny dark:border-dark-tiny pb-2'}>
                PRICE
            </TextMain>
            <label for="minmax-range" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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

            <label for="minmax-range" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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

            <TextMain
                className={
                    'uppercase border-dashed border-b-[1px] border-t-[1px] pt-2 border-light-tiny dark:border-dark-tiny pb-2'
                }
            >
                DISCOUNT
            </TextMain>

            <ul className="flex flex-col gap-4">
                {discountList.map((discount, index) => {
                    return (
                        <li key={index} className="justify-start flex items-center">
                            <input
                                id="default-checkbox"
                                type="checkbox"
                                value=""
                                className="w-4 h-4 text-primary mr-3 bg-gray-100 border-gray-300 rounded focus:ring-transparent dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <TextMain>{discount} or more</TextMain>
                        </li>
                    );
                })}{' '}
            </ul>
        </div>
    );
}

export default MainFilter;
