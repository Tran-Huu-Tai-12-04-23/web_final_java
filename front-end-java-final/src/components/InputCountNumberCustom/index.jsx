import { useState } from 'react';
import { RxDividerHorizontal } from 'react-icons/rx';
import { IoMdAdd } from 'react-icons/io';

function InputCountNumberCustom({
<<<<<<< HEAD
=======
    disabled = false,
>>>>>>> main
    center = true,
    className = 'bg-light-tiny dark:bg-dark-tiny',
    placeholder,
    onChange = () => {},
    onIncrease = () => {},
    onDecrease = () => {},
<<<<<<< HEAD
=======
    onBlur = () => {},
>>>>>>> main
    value,
}) {
    const [border, setBorder] = useState(false);
    return (
        <div
<<<<<<< HEAD
            className={`w-full overflow-hidden ${className} border-[1px] flex justify-between items-center rounded-md ${
=======
            className={` overflow-hidden ${className} ${
                disabled ? 'border-transparent' : ''
            } border-[1px] flex justify-between items-center rounded-md ${
>>>>>>> main
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
<<<<<<< HEAD
=======
                disabled={disabled}
>>>>>>> main
                onChange={onChange}
                value={value}
                placeholder={placeholder}
                onFocus={(e) => setBorder(true)}
<<<<<<< HEAD
                onBlur={(e) => setBorder(false)}
                type="number"
                className={`${
                    center ? 'text-center' : ''
                } [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-transparent text-md w-full p-2 outline-none rounded-lg focus:ring-transparent focus:border-primary focus:outline-none border-none`}
=======
                onBlur={(e) => {
                    setBorder(false);
                    onBlur();
                }}
                type="number"
                className={`${center ? 'text-center' : ''}  ${
                    disabled ? 'select-none' : ''
                }  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-transparent text-md w-full p-2 outline-none rounded-lg focus:ring-transparent focus:border-primary focus:outline-none border-none`}
>>>>>>> main
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
