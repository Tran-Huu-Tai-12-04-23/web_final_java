import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
function Button({
    children,
    style = 'default',
    className,
    clickAnimate = true,
    bgHover = '#ef819c',
    onClick = () => {},
    id = '',
}) {
    const [classStyle, setClassStyle] = useState('');

    useEffect(() => {
        switch (style) {
            case 'normal': {
                setClassStyle('bg-btn-second text-primary w-max rounded-md flex justify-between items-center');
                break;
            }
            case 'outline': {
                setClassStyle(
                    'flex justify-center items-center w-max rounded-md text-primary border-2 border-solid border-primary bg-transparent',
                );
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
                borderRadius: '10%',
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
            className={`${classStyle} pl-2 pr-2  ${className} p-2 text-sm  hover:bg-[${bgHover}] `}
        >
            {children}
        </motion.button>
    );
}

export default Button;
