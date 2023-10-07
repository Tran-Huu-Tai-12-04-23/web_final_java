import { motion } from 'framer-motion';
import { useState } from 'react';

function Input({ icon, placeholder = 'default', className = '' }) {
    const [border, setBorder] = useState(false);
    return (
        <motion.div
            onFocus={(e) => setBorder(true)}
            onBlur={(e) => setBorder(false)}
            className={`${className} p-2 rounded-lg  border-[1px] border-solid  ${
                border ? 'border-primary' : 'border-transparent'
            }`}
        >
            <motion.input
                placeholder={placeholder}
                className="bg-transparent w-full p-1 pl-2 pr-2 outline-none border-none"
            ></motion.input>
        </motion.div>
    );
}

export default Input;
