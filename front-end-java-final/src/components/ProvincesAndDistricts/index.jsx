import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../Modal';
import Input from '../Input';
import Select from '../Select';

const ProvincesAndDistricts = ({ setAddress }) => {
    const [placeholderAddress, setPlaceholderAddress] = useState('');
    const [provinces, setProvinces] = useState([]);
    const [district, setDistrict] = useState(null);
    const [commune, setCommune] = useState(null);
    const [provincesSelected, setProvincesSelected] = useState(null);
    const [districtSelected, setDistrictSelected] = useState(null);
    const [districtFollowProvince, setDistrictFollowProvince] = useState([]);
    const [communeSelected, setCommuneSelected] = useState('');
    const [communeFollowDistrict, setCommuneFollowDistrict] = useState('');
    const [openSelect, setOpenSelect] = useState(false);

    const [loadProvinceSearch, setLoadProvinceSearch] = useState(true);
    const [loadDistrictSearch, setLoadDistrictSearch] = useState(true);
    const [loadCommuneSearch, setLoadCommuneSearch] = useState(true);

    // useEffect(() => {
    //     const fetchProvinces = async () => {
    //         try {
    //             const response = await axios.get(
    //                 'https://nominatim.openstreetmap.org/search?country=Vietnam&format=json&limit=63',
    //             );
    //             const provinceData = response.data.map((item) => ({
    //                 name: item.display_name,
    //                 latitude: item.lat,
    //                 longitude: item.lon,
    //             }));
    //             setProvinces(provinceData);
    //         } catch (error) {
    //             console.error('Error fetching provinces:', error.message);
    //         }
    //     };

    //     fetchProvinces();
    // }, []);

    // const fetchDistricts = async (provinceName) => {
    //     try {
    //         const response = await axios.get(
    //             `https://nominatim.openstreetmap.org/search?country=Vietnam&state=${provinceName}&format=json&limit=50`,
    //         );
    //         const districtData = response.data.map((item) => ({
    //             name: item.display_name,
    //             latitude: item.lat,
    //             longitude: item.lon,
    //         }));
    //         setDistricts(districtData);
    //     } catch (error) {
    //         console.error('Error fetching districts:', error.message);
    //     }
    // };

    return (
        <Modal>
            <div className="flex flex-col gap-4 p-4 rounded-md bg-black w-[40rem]">
                {/* thanh pho */}

                <form>
                    <div className="flex">
                        <label
                            for="search-dropdown"
                            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                        >
                            Email của bạn
                        </label>
                        <button
                            id="dropdown-button"
                            data-dropdown-toggle="dropdown"
                            className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                            type="button"
                        >
                            All categories{' '}
                            <svg
                                className="w-2.5 h-2.5 ms-2.5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="m1 1 4 4 4-4"
                                />
                            </svg>
                        </button>
                        <div
                            id="dropdown"
                            className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                        >
                            <ul
                                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                aria-labelledby="dropdown-button"
                            >
                                <li>
                                    <button
                                        type="button"
                                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        Mockups
                                    </button>
                                </li>
                                <li>
                                    <button
                                        type="button"
                                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        Templates
                                    </button>
                                </li>
                                <li>
                                    <button
                                        type="button"
                                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        Design
                                    </button>
                                </li>
                                <li>
                                    <button
                                        type="button"
                                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        Logos
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div className="relative w-full">
                            <input
                                type="search"
                                id="search-dropdown"
                                className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                                placeholder="Search Mockups, Logos, Design Templates..."
                                required
                            />
                            <button
                                type="submit"
                                className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                <svg
                                    className="w-4 h-4"
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
                                <span className="sr-only">Tìm kiếm</span>
                            </button>
                        </div>
                    </div>
                </form>

                <Select name="Tỉnh/Thành Phố"></Select>
                <Input label="Quận/huyện"></Input>
                <Input label="Xã/Phường"></Input>
            </div>
        </Modal>
    );
};

export default ProvincesAndDistricts;
