import { motion } from 'framer-motion';
import { useState } from 'react';
import { PiEyeSlashLight, PiEyeLight } from 'react-icons/pi';

function Input({
<<<<<<< HEAD
=======
    onKeyDown = () => {},
>>>>>>> main
    disabled = false,
    label = '',
    iconRight,
    placeholder = 'default',
    className = '',
    type = 'text',
    iconLeft,
    onChange = () => {},
    value,
}) {
    const [border, setBorder] = useState(false);

    const [password, setPassword] = useState(true);
    return (
        <>
            {label && <label className="ml-1 mb-2">{label}</label>}
            <div
                onFocus={(e) => setBorder(true)}
                onBlur={(e) => setBorder(false)}
                className={`${className} rounded-lg select-none relative flex justify-center items-center border-[1px] border-solid  ${
                    border
                        ? 'border-[rgba(251,111,146,0.5)] '
                        : ' dark:border-[rgba(255,255,255,0.1)] border-[rgba(0,0,0,0.1)] '
                } ${disabled ? 'brightness-50' : ''}`}
            >
                {iconLeft}
                <input
<<<<<<< HEAD
=======
                    onKeyDown={onKeyDown}
>>>>>>> main
                    disabled={disabled}
                    value={value}
                    onChange={onChange}
                    type={type === 'password' && password == true ? 'password' : 'text'}
                    placeholder={placeholder}
                    style={{
                        border: 'none',
                    }}
                    className="select-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-transparent w-full p-2 outline-none rounded-lg focus:ring-transparent focus:border-primary focus:outline-none border-none"
                />
                {iconRight}
                {type === 'password' && !password && (
                    <PiEyeSlashLight
                        onClick={(e) => setPassword(true)}
                        className="h-6 w-6 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 hover:text-primary cursor-pointer"
                    ></PiEyeSlashLight>
                )}
                {type === 'password' && password && (
                    <PiEyeLight
                        className="h-6 w-6 text-gray-400  absolute right-2 top-1/2 -translate-y-1/2 hover:text-primary cursor-pointer"
                        onClick={(e) => setPassword(false)}
                    ></PiEyeLight>
                )}
            </div>
        </>
    );
}

export default Input;
