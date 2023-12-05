import { useEffect, useState } from 'react';
import nores from '../../assets/img/no-res.png';
import { Pagination } from 'flowbite-react';

export default function TableCustom({
    columns,
    data = [],
    checked = false,
    setCheckedData = () => {},
    pagination = false,
    numberRow = 5,
    totalRow = 0,
    currentPage,
    onChangePage = () => {},
    onSelectRowShow = () => {},
}) {
    const [numberRowShow, setNumberRowShow] = useState(numberRow);
    const [page, setPage] = useState(0);
    const [dataShow, setDataShow] = useState(data);
    const [checkedItems, setCheckedItems] = useState([]);
    const [checkAll, setCheckAll] = useState(false);
    const [search, setSearch] = useState('');
    const [filteredItems, setFilteredItems] = useState(dataShow);

    useEffect(() => {
        setDataShow(data);
    }, [data]);

    useEffect(() => {
        setCheckedData(checkedItems);
        if (dataShow.length === checkedItems.length) {
            setCheckAll(true);
        } else {
            setCheckAll(false);
        }
    }, [checkedItems]);

    useEffect(() => {
        const totalPage = Math.ceil(totalRow / numberRowShow);
        setPage(totalPage);
    }, [numberRowShow, totalRow]);

    const renderColumns = () => {
        return columns.map((col, index) => {
            return (
                <th key={index} scope="col" className={`px-6 py-3  ${col.center ? 'text-center' : ''}`}>
                    {col.title}
                </th>
            );
        });
    };
    const renderDataEachCol = (data) => {
        return columns.map((col, index) => {
            const colName = col.filed;
            const pre = data[colName];
            if (col.render) {
                // console.log(col.render(pre));
            }

            return (
                <th
                    key={index}
                    scope="row"
                    className={`${
                        col.center ? 'text-center' : ''
                    } px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white`}
                >
                    {col.render ? <>{col.render && col.render(pre)}</> : pre}
                </th>
            );
        });
    };

    const renderRowsData = () => {
        const data = search ? filteredItems : dataShow;
        return data.map((row, index) => {
            const check = checkedItems.includes(row.id);
            return (
                <tr
                    onClick={() => {
                        handleCheckItem(row.id);
                    }}
                    key={index}
                    className={`${
                        check ? 'bg-btn-second' : 'bg-white  dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600'
                    }  border-b dark:border-dark-tiny cursor-pointer border-light-tiny `}
                >
                    {checked && (
                        <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                            <input
                                id="checkbox-all-search"
                                onChange={(e) => {
                                    if (!e.target.checked) {
                                        unCheckItem(row.id);
                                    } else {
                                        checkedItem(row.id);
                                    }
                                }}
                                type="checkbox"
                                checked={check}
                                className="input-no"
                            />
                        </th>
                    )}
                    {renderDataEachCol(row)}
                </tr>
            );
        });
    };
    const options = [5, 10, 15, 20];

    const renderOptionNumberRowShows = () => {
        return options.map((op, index) => {
            return (
                <option key={index} value={op}>
                    {op}
                </option>
            );
        });
    };

    const handleCheckAllItems = () => {
        setCheckedItems(
            dataShow.map((data) => {
                return data.id;
            }),
        );
        setCheckAll(true);
    };

    const handleUncheckAllItems = () => {
        setCheckedItems([]);
        setCheckAll(false);
    };

    function unCheckItem(valueId) {
        setCheckedItems((prev) => {
            return prev.filter((item) => item !== valueId);
        });
    }

    function checkedItem(valueId) {
        setCheckedItems((prev) => {
            return [...prev, valueId];
        });
    }

    function handleCheckItem(id) {
        if (id === undefined || id === null) {
            return;
        }

        if (checkedItems.includes(id)) {
            setCheckedItems((prev) => {
                return prev.filter((item) => item != id);
            });
        } else {
            setCheckedItems((prev) => {
                return [...prev, id];
            });
        }
    }

    return (
        <div className="relative overflow-x-auto shadow-xl sm:rounded-lg pt-5 pb-5">
            <table className="w-full  rounded-md overflow-hidden text-sm text-left  text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {checked && (
                            <th scope="col" className="px-6 py-3">
                                <input
                                    checked={checkAll}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            handleCheckAllItems();
                                        } else {
                                            handleUncheckAllItems();
                                        }
                                    }}
                                    id="checkbox-all-search"
                                    type="checkbox"
                                    className="input-no"
                                />
                            </th>
                        )}

                        {renderColumns()}
                    </tr>
                </thead>
                <tbody>{renderRowsData()}</tbody>
            </table>
            {dataShow.length === 0 && (
                <div className="w-full flex justify-center p-4 items-center">
                    <img src={nores} className="w-40 h-40" alt="no-result"></img>
                </div>
            )}
            {pagination && (
                <div className="mt-3 float-right flex justify-end items-center">
                    <div className="flex justify-start items-center mr-3 mt-3">
                        <label
                            htmlFor="countries"
                            className="block mr-3  text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Dòng
                        </label>
                        <select
                            defaultValue={numberRow}
                            onChange={(e) => {
                                onSelectRowShow(parseInt(e.target.value));
                            }}
                            id="countries"
                            className="h-8 dark:bg-gray-800 light:bg-light  border border-light-tiny dark:border-dark-tiny text-gray-900 text-sm rounded-lg block w-fit p-1 dark:placeholder-gray-400 dark:text-white dark:focus:ring-transparent dark:focus:border-primary"
                        >
                            {renderOptionNumberRowShows()}
                        </select>
                    </div>

                    {page > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            onPageChange={(value) => {
                                onChangePage(value);
                            }}
                            totalPages={page}
                        ></Pagination>
                    )}
                </div>
            )}
        </div>
    );
}
