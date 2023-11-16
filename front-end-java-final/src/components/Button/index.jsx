import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
function Button({ children, style = 'default', className = 'p-2', onClick = () => {}, id = '' }) {
    const [classStyle, setClassStyle] = useState('');

    useEffect(() => {
        switch (style) {
            case 'normal': {
                setClassStyle(
                    'bg-btn-second text-primary rounded-md flex p-2 justify-between items-center hover:brightness-125',
                );
                break;
            }
            case 'outline': {
                setClassStyle(
                    'flex justify-center items-center rounded-md text-primary border-2 border-solid border-primary bg-transparent p-2 hover:brightness-125',
                );
                break;
            }
            case 'submit': {
                setClassStyle('bg-submit text-white pl-4 pr-4 p-2 rounded-md flex justify-between items-center');
                break;
            }
            case 'default': {
            }
        }
    }, []);

    return (
        <motion.button
            id={id}
            onClick={onClick}
            whileTap={{
                scale: 0.8,
                transition: { duration: 0.3 },
            }}
            whileHover={{ scale: 1, transition: { duration: 0.3 } }}
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            exit={{
                opacity: 0,
            }}
            transition={{
                duration: 0.3,
                ease: 'easeInOut',
            }}
            className={`${classStyle}  ${className} `}
        >
            {children}
        </motion.button>
    );
}

export default Button;
