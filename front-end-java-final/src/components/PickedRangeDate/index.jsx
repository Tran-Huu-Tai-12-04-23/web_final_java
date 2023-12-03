import React, { useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';

const PickedRangeDate = ({
    disabled = false,
    onSelect = (value) => {
        console.log(value);
    },
}) => {
    const [value, setValue] = useState({
        startDate: new Date(),
        endDate: new Date().setMonth(11),
    });

    const handleValueChange = (newValue) => {
        console.log('newValue:', newValue);
        setValue(newValue);
        onSelect(newValue);
    };

    return (
        <div className="border-[1px] w-full border-solid border-light-tiny dark:border-dark-tiny rounded-md">
            <Datepicker value={value} onChange={handleValueChange} disabled={disabled} />
        </div>
    );
};

export default PickedRangeDate;
