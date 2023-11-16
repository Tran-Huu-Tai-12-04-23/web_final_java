import { useEffect, useState } from 'react';
import { TextMain, MultiSelect } from '../../../../../components';

import {
    typeCardOptions,
    typeRamOptions,
    ramCapacityOptions,
    typeCPUOptions,
    hardDriveOptions,
    materialOptions,
    touchScreenOptions,
    screenSizeOptions,
    resolutionOptions,
    webcamOptions,
    OSOptions,
    wifiOptions,
    bluetoothOptions,
    powerCapacityOptions,
    portSupportOptions,
} from '../../../../../assets/data';
import { data } from 'autoprefixer';

const laptopData = {
    typeCard: 'Integrated',
    typeCPU: 'Intel Core i5',
    ramCapacity: '8GB',
    typeRam: 'DDR4',
    hardDrive: '256GB SSD',
    material: 'Aluminum',
    touchScreen: true,
    screenSize: '14 inches',
    resolution: '1920x1080',
    webcam: 'HD Webcam',
    OS: 'Windows 10',
    wifi: 'Wi-Fi 6',
    bluetooth: 'Bluetooth 5.0',
    powerCapacity: '45Wh',
    portSupport: 'USB-C, HDMI, USB 3.0',
};
const formatFieldName = (fieldName) => {
    // Split the camelCase and capitalize each word
    const words = fieldName.replace(/([a-z])([A-Z])/g, '$1 $2').split(' ');
    return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

// Component for a single row

// Component for the entire table
const ProductSpecification = ({ data = laptopData, onSelectData = () => {} }) => {
    const [activeMultiSelect, setActiveMultiSelect] = useState(null);
    const [selectedData, setSelectedData] = useState({});

    const optionData = [
        [...typeCardOptions],
        [...typeCPUOptions],
        [...ramCapacityOptions],
        [...typeRamOptions],
        [...hardDriveOptions],
        [...materialOptions],
        [...touchScreenOptions],
        [...screenSizeOptions],
        [...resolutionOptions],
        [...webcamOptions],
        [...OSOptions],
        [...wifiOptions],
        [...bluetoothOptions],
        [...powerCapacityOptions],
        [...portSupportOptions],
    ];
    const handleSelect = (index, value) => {
        setSelectedData((prevData) => ({
            ...prevData,
            [Object.keys(laptopData)[index]]: value,
        }));
    };

    const renderTable = () => {
        return Object.entries(data).map(([fieldName, fieldValue], index) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {formatFieldName(fieldName)}
                </th>
                <td className="px-6 py-4">
                    <MultiSelect
                        active={activeMultiSelect === index}
                        onActive={() => {
                            setActiveMultiSelect(index);
                        }}
                        data={optionData[index]}
                        name={''}
                        onSelect={(value) => {
                            handleSelect(index, value);
                        }}
                        value={selectedData[fieldName]}
                    ></MultiSelect>
                </td>
            </tr>
        ));
    };
    useEffect(() => {
        onSelectData(selectedData);
    }, [selectedData]);

    return (
        <div className="relative overflow-x-auto rounded-md mt-5 bg-light-tiny dark:bg-dark-tiny p-4 ">
            <TextMain className={'mb-5 border-b-primary'}>Enter Product Specification</TextMain>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Field
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Value
                        </th>
                    </tr>
                </thead>
                <tbody>{renderTable()}</tbody>
            </table>
        </div>
    );
};

export default ProductSpecification;
