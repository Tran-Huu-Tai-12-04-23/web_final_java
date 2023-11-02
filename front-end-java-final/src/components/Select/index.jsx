import { motion } from 'framer-motion';

import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import TextMain from '../TextMain';
import { useEffect, useState } from 'react';

const variants = {
    active: { rotate: 0 },
    inActive: { rotate: 180 },
};

const variantsSubmenu = {
    active: { y: 0, opacity: 1 },
    inActive: { y: -200, opacity: 0 },
};

function Select({
    name = 'Default',
    subMenu = [
        {
            name: 'test1',
            value: 'Text1',
        },
        {
            name: 'test2',
            value: 'Text2',
        },
        {
            name: 'test3',
            value: 'Text3',
        },
    ],

    className,
    value,
    onSelect = (value) => {},
    active = null,
    onActive = (active) => {},
}) {
    const [open, setOpen] = useState(false);
    const [selectValue, setSelectValue] = useState(null);

    useEffect(() => {
        if (value != null) {
            setSelectValue(
                subMenu.filter((mn) => {
                    return mn.value == value || mn.id == value;
                })[0].name,
            );
        }
    }, [value]);

    const handleSelectOption = (option) => {
        onSelect(option);
    };

    useEffect(() => {
        const handleWindowClick = () => {
            setOpen(false);
        };

        window.addEventListener('click', handleWindowClick);

        return () => {
            window.removeEventListener('click', handleWindowClick);
        };
    }, []);

    useEffect(() => {
        if (active != null) {
            setOpen(active);
        }
    }, [active]);

    return (
        <motion.div
            onClick={(e) => {
                e.stopPropagation();
                console.log(open);
                setOpen(!open);
                onActive();
            }}
            style={{ zIndex: open ? 1000 : 'auto' }}
            className={`${
                open ? 'border-[rgba(251,111,146,0.5)]' : 'border-light-tiny dark:border-dark-tiny'
            }  flex relative min-w-[10rem] justify-between items-center border-[1px] border-solid p-2 rounded-md hover:bg-btn-second cursor-pointer ${className}`}
        >
            <TextMain className={'mr-3'}>{selectValue ? selectValue : name}</TextMain>
            <motion.div variants={variants} animate={open ? 'active' : 'inActive'}>
                <MdOutlineKeyboardArrowDown className="w-4 h-4"> </MdOutlineKeyboardArrowDown>
            </motion.div>

            {open && (active || active == null) && (
                <motion.div
                    variants={variantsSubmenu}
                    transition={{
                        duration: 0.3,
                    }}
                    animate={open ? 'active' : 'inActive'}
                    className="absolute border-primary border-[0.2px] z-[100000] top-11 pt-2 pb-2 w-full right-0 bg-light dark:bg-dark rounded-md shadow-xl"
                >
                    <ul className="flex flex-col justify-center w-full items-start">
                        {subMenu.map((menu, index) => {
                            return (
                                <li
                                    className="w-full text-sm p-2 hover:bg-btn-second"
                                    key={index}
                                    onClick={() => handleSelectOption(menu.value)}
                                >
                                    {menu.name}
                                    {menu.component}
                                </li>
                            );
                        })}
                    </ul>
                </motion.div>
            )}
        </motion.div>
    );
}

export default Select;
