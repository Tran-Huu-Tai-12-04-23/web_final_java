import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { AiOutlineClose } from 'react-icons/ai';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

const variants = {
    active: { rotate: 0 },
    inActive: { rotate: 180 },
};

const variantsSubmenu = {
    active: { y: 0, opacity: 1 },
    inActive: { y: -200, opacity: 0 },
};

function MultiSelect({
    data = [
        {
            name: 'test1',
            value: '0',
        },
        {
            name: 'test2',
            value: '1',
        },
        {
            name: 'test1',
            value: '2',
        },
        {
            name: 'test2',
            value: '3',
        },
        {
            name: 'test1',
            value: '4',
        },
    ],

    className,
    value,
    onSelect = (value) => {},
    active = null,
    onActive = () => {},
}) {
    const [open, setOpen] = useState(false);
    const [border, setBorder] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [dataPresent, setDataPresent] = useState(data);

    useEffect(() => {
        const newData = data.filter((data) => {
            return data.name.includes(inputValue);
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
        const handleWindowClick = () => {
            setOpen(false);
            setBorder(false);
        };

        window.addEventListener('click', handleWindowClick);

        return () => {
            window.removeEventListener('click', handleWindowClick);
        };
    }, []);
    return (
        <div
            className={`${className} 
            ${
                border
                    ? 'border-[rgba(251,111,146,0.5)] '
                    : ' dark:border-[rgba(255,255,255,0.1)] border-[rgba(0,0,0,0.1)] '
            }
            rounded-md  flex gap-1 relative justify-start  items-center border-[1px] border-solid bg-light-tiny dark:bg-dark-tiny`}
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
                placeholder="Enter keyword..."
                className="w-full min-w-[10rem] h-full bg-transparent outline-none rounded-lg focus:ring-transparent focus:border-primary focus:outline-none border-none"
            ></input>

            {/* options */}
            {open && (active || active == null) && (
                <motion.div
                    variants={variantsSubmenu}
                    transition={{
                        duration: 0.3,
                    }}
                    animate={open ? 'active' : 'inActive'}
                    className="absolute border-primary custom-scroll  overflow-y-scroll overflow-x-hidden max-h-[20rem] border-[0.2px] z-[100000] top-11 pt-2 pb-2 w-full right-0 bg-light dark:bg-dark rounded-md shadow-xl"
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
                                    {menu.name}
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
