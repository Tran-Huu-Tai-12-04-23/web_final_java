import { useState } from 'react';
import { RxDividerHorizontal } from 'react-icons/rx';
import { IoMdAdd } from 'react-icons/io';

function InputCountNumberCustom({
    disabled = false,
    center = true,
    className = 'bg-light-tiny dark:bg-dark-tiny',
    placeholder,
    onChange = () => {},
    onIncrease = () => {},
    onDecrease = () => {},
    onBlur = () => {},
    value,
}) {
    const [border, setBorder] = useState(false);
    return (
        <div
            className={` overflow-hidden ${className} ${
                disabled ? 'border-transparent' : ''
            } border-[1px] flex justify-between items-center rounded-md ${
                border
                    ? 'border-[rgba(251,111,146,0.5)]'
                    : ' dark:border-[rgba(255,255,255,0.1)] border-[rgba(0,0,0,0.1)]'
            }`}
        >
            <div
                onClick={onDecrease}
                className="flex group cursor-pointer w-12 hover:brightness-125  justify-center items-center p-2  bg-light dark:bg-dark"
            >
                <RxDividerHorizontal className="w-6 h-6 group-hover:text-primary"></RxDividerHorizontal>
            </div>
            <input
                disabled={disabled}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
                onFocus={(e) => setBorder(true)}
                onBlur={(e) => {
                    setBorder(false);
                    onBlur();
                }}
                type="number"
                className={`${center ? 'text-center' : ''}  ${
                    disabled ? 'select-none' : ''
                }  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-transparent text-md w-full p-2 outline-none rounded-lg focus:ring-transparent focus:border-primary focus:outline-none border-none`}
            ></input>
            <div
                onClick={onIncrease}
                className=" w-12 cursor-pointer group hover:brightness-125 flex justify-center items-center p-2  bg-light dark:bg-dark"
            >
                <IoMdAdd className="w-6 h-6 group-hover:text-primary"></IoMdAdd>
            </div>
        </div>
    );
}

export default InputCountNumberCustom;
