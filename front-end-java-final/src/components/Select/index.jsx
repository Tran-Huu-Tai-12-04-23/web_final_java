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
    position = 'bottom',
    type = 'default',
    name = 'Default',
    subMenu = [
        {
            name: 'test1',
            id: 'Text1',
        },
        {
            name: 'test2',
            id: 'Text2',
        },
        {
            name: 'test3',
            id: 'Text3',
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
        if (value != null && type !== 'color') {
            setSelectValue(
                subMenu.filter((mn) => {
                    return mn.value == value || mn.id == value;
                })[0]?.name,
            );
        } else {
            setSelectValue(null);
        }
    }, [value]);

    useEffect(() => {
        if (type === 'color') {
            setSelectValue(
                subMenu.filter((mn) => {
                    return mn.name == value;
                })[0]?.name,
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
        <div
            onClick={(e) => {
                e.stopPropagation();
                setOpen(!open);
                onActive();
            }}
            style={{ zIndex: open ? 1000 : 'auto' }}
            className={`${
                open ? 'border-[rgba(251,111,146,0.5)]' : 'border-light-tiny dark:border-dark-tiny'
            }  flex relative min-w-[10rem] justify-between items-center border-[1px] border-solid p-2 rounded-md hover:bg-btn-second cursor-pointer ${className}`}
        >
            <TextMain className={'mr-3'}>{selectValue ? selectValue : name}</TextMain>
            <div variants={variants} animate={open ? 'active' : 'inActive'}>
                <MdOutlineKeyboardArrowDown className="w-4 h-4"> </MdOutlineKeyboardArrowDown>
            </div>

            {open && (active || active == null) && (
                <div
                    variants={variantsSubmenu}
                    transition={{
                        duration: 0.3,
                    }}
                    animate={open ? 'active' : 'inActive'}
                    className={` ${
                        position === 'bottom' ? ' top-11' : 'bottom-11'
                    } absolute z-[100000] pt-2 pb-2 w-full right-0 bg-bg-light-menu backdrop-blur-xl  dark:bg-bg-dark-menu rounded-md shadow-xl`}
                >
                    <ul className="flex flex-col justify-center w-full items-start">
                        {type !== 'color' &&
                            subMenu.map((menu, index) => {
                                return (
                                    <li
                                        className="w-full text-sm p-2 hover:bg-btn-second"
                                        key={index}
                                        onClick={() => {
                                            if (menu.id) {
                                                handleSelectOption(menu.id);
                                            } else {
                                                handleSelectOption(menu?.value);
                                            }
                                        }}
                                    >
                                        {menu.name}
                                        {menu.component}
                                    </li>
                                );
                            })}
                        {type === 'color' &&
                            subMenu.map((menu, index) => {
                                return (
                                    <li
                                        style={{
                                            background: menu.hexCode,
                                        }}
                                        className={`w-full brightness-75 text-sm p-2 hover:bg-btn-second`}
                                        key={index}
                                        onClick={() => handleSelectOption(menu.name)}
                                    >
                                        {menu.name}
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Select;
