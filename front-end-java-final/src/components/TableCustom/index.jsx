import { useEffect, useState } from 'react';
import { Button, Input, Pagination } from '../../components';

function getPaginatedData(page, numberRowShow, data) {
    const startIndex = (page - 1) * numberRowShow;
    const endIndex = startIndex + numberRowShow;
    const paginatedData = data.slice(startIndex, endIndex);
    return paginatedData;
}
export default function TableCustom({
    columns,
    data = [],
    checked = false,
    setCheckedData = () => {},
    searchBy = '',
    pagination = false,
    numberRow = 5,
}) {
    const [numberRowShow, setNumberRowShow] = useState(numberRow);
    const [page, setPage] = useState(0);
    const [activePage, setActivePage] = useState(1);
    const [dataShow, setDataShow] = useState([]);
    const [checkedItems, setCheckedItems] = useState([]);
    const [checkAll, setCheckAll] = useState(false);
    const [search, setSearch] = useState('');
    const [filteredItems, setFilteredItems] = useState(dataShow);

    useEffect(() => {
        if (search) {
            const filtered = dataShow.filter((item) => item[searchBy].toLowerCase().includes(search.toLowerCase()));
            setFilteredItems(filtered);
        }
    }, [search, dataShow]);

    useEffect(() => {
        setCheckedData(checkedItems);
        if (dataShow.length === checkedItems.length) {
            setCheckAll(true);
        } else {
            setCheckAll(false);
        }
    }, [checkedItems]);

    useEffect(() => {
        const newData = getPaginatedData(activePage, numberRowShow, data);
        setDataShow(newData);
        handleUncheckAllItems();
    }, [page, numberRowShow, activePage]);

    useEffect(() => {
        setPage(Math.ceil(data.length / numberRowShow));
    }, [data, numberRowShow]);

    const renderColumns = () => {
        return columns.map((col, index) => {
            return (
                <th key={index} scope="col" className="px-6 py-3">
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
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
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
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
            {searchBy && (
                <div className="pb-4 ml-2">
                    <label htmlFor="table-search" className="sr-only">
                        Search
                    </label>
                    <div className="relative mt-1">
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search ..."
                            className="w-fit"
                            iconRight={
                                <div className="mr-3 inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg
                                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                        />
                                    </svg>
                                </div>
                            }
                        />
                    </div>
                </div>
            )}
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
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                            </th>
                        )}

                        {renderColumns()}
                    </tr>
                </thead>
                <tbody>{renderRowsData()}</tbody>
            </table>

            {pagination && (
                <div className="mt-3 float-right flex justify-end items-center">
                    <div className="flex justify-start items-center mr-3">
                        <label
                            htmlFor="countries"
                            className="block mr-3 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Rows
                        </label>
                        <select
                            defaultValue={numberRow}
                            onChange={(e) => {
                                setNumberRowShow(parseInt(e.target.value));
                            }}
                            id="countries"
                            className="dark:bg-gray-800 light:bg-light  border border-light-tiny dark:border-dark-tiny text-gray-900 text-sm rounded-lg block w-fit p-1 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            {renderOptionNumberRowShows()}
                        </select>
                    </div>

                    <Pagination page={page} activePage={activePage} setActivePage={setActivePage}></Pagination>
                </div>
            )}
        </div>
    );
}
