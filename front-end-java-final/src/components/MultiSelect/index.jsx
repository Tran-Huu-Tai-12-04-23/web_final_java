import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { AiOutlineClose } from 'react-icons/ai';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { placeholder } from '@cloudinary/react';

const variants = {
    active: { rotate: 0 },
    inActive: { rotate: 180 },
};

const variantsSubmenu = {
    active: { y: 0, opacity: 1 },
    inActive: { y: -200, opacity: 0 },
};

function MultiSelect({
    data,
    className,
    value,
    onSelect = (value) => {},
    active = null,
    onActive = () => {},
    placeholder,
}) {
    const [open, setOpen] = useState(false);
    const [border, setBorder] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [dataPresent, setDataPresent] = useState(data);

    useEffect(() => {
        const newData = data.filter((dt) => {
            return !dt.toLowerCase().includes(inputValue.toLowerCase());
        });

        setDataPresent(newData);
    }, [inputValue]);

    useEffect(() => {
        setDataPresent(data);
    }, [data]);

    const handleSelect = (value) => {
        onSelect(value);
    };

    useEffect(() => {
        if (value !== undefined) {
            setInputValue(value);
        }
    }, [value]);
    useEffect(() => {
        if (dataPresent.length === 0) {
            setOpen(false);
            setBorder(false);
        }
    }, [dataPresent]);
    useEffect(() => {
        const handleWindowClick = () => {
            setOpen(false);
            setBorder(false);
        };

        window.addEventListener('click', handleWindowClick);

        return () => {
            window.removeEventListener('click', handleWindowClick);
        };
    }, []);

    useEffect(() => {
        setOpen(active);
        setBorder(active);
    }, [active]);
    return (
        <div
            className={`${className} 
            ${
                border
                    ? 'border-[rgba(251,111,146,0.5)] '
                    : ' dark:border-[rgba(255,255,255,0.1)] border-[rgba(0,0,0,0.1)] '
            }
            rounded-md  flex gap-1 relative justify-start  items-center border-[1px] border-solid dark:bg-bg-dark-menu bg-bg-light-menu`}
        >
            {/* options selected */}
            <input
                onClick={(e) => {
                    e.stopPropagation();
                    setOpen(true);
                    setBorder(true);
                    onActive();
                }}
                onFocus={(e) => {
                    e.stopPropagation();
                    setOpen(true);
                    setBorder(true);
                    onActive();
                }}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                type="text"
                placeholder={placeholder}
                className={` w-full min-w-[10rem] h-full bg-transparent outline-none rounded-lg focus:ring-transparent focus:outline-none border-none`}
            ></input>

            {/* options */}
            {open && (
                <motion.div
                    variants={variantsSubmenu}
                    transition={{
                        duration: 0.3,
                    }}
                    animate={open ? 'active' : 'inActive'}
                    className="absolute  custom-scroll  overflow-y-scroll overflow-x-hidden border-[0.2px] z-[100000] top-11 pt-2 pb-2 w-full right-0 dark:bg-bg-dark-menu bg-bg-light-menu  backdrop-blur-3xl  border-none rounded-md shadow-xl"
                >
                    <ul className="flex flex-col justify-center w-full items-start">
                        {dataPresent.map((menu, index) => {
                            return (
                                <li
                                    className="w-full text-sm p-2 hover:bg-btn-second"
                                    key={index}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        handleSelect(menu);
                                        console.log(menu);
                                    }}
                                >
                                    {menu}
                                    {menu.component}
                                </li>
                            );
                        })}
                        {dataPresent.length == 0 && (
                            <li
                                className="w-full text-sm p-2 hover:bg-btn-second "
                                onClick={() => {
                                    alert('asd');
                                }}
                            >
                                0 result
                            </li>
                        )}
                    </ul>
                </motion.div>
            )}

            {/* arrow */}
            <motion.div variants={variants} animate={open ? 'active' : 'inActive'}>
                <MdOutlineKeyboardArrowDown
                    className={`w-6 h-6 ${border ? 'text-primary' : ''} `}
                ></MdOutlineKeyboardArrowDown>
            </motion.div>
        </div>
    );
}

export default MultiSelect;
