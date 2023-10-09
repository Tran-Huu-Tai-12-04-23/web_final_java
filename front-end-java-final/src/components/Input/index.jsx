import { motion } from 'framer-motion';
import { useState } from 'react';
import { PiEyeSlashLight, PiEyeLight } from 'react-icons/pi';

function Input({ icon, placeholder = 'default', className = '', type = 'text', iconLeft }) {
    const [border, setBorder] = useState(false);

    const [password, setPassword] = useState(true);
    return (
        <motion.div
            onFocus={(e) => setBorder(true)}
            onBlur={(e) => setBorder(false)}
            className={`${className} rounded-lg relative flex p-1  justify-center items-center border-[1px] border-solid  ${
                border && 'border-primary'
            }`}
        >
            {iconLeft}
            <input
                type={type === 'password' && password === true ? 'password' : 'text'}
                placeholder={placeholder}
                style={{
                    border: 'none',
                }}
                className="bg-transparent w-full outline-none rounded-lg focus:ring-transparent focus:border-primary focus:outline-none border-none"
            />
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
        </motion.div>
    );
}

export default Input;
