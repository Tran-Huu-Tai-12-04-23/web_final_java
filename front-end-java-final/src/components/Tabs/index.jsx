import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

function Tabs({ tabs = [], active = 0, style = 'default', classItem = '', setActive = () => {} }) {
    const [classStyle, setClassStyle] = useState('');

    useEffect(() => {
        switch (style) {
            case 'center': {
                setClassStyle('justify-center');
                break;
            }
            case 'end': {
                setClassStyle('justify-end');
                break;
            }
            case 'default': {
                setClassStyle('justify-start');
                break;
            }
        }
    }, []);
    return (
        <motion.div className="w-full">
            <motion.div className={`flex  items-center ${classStyle}`}>
                {tabs.map((item, index) => {
                    return (
                        <motion.div
                            onClick={() => setActive(index)}
                            key={index}
                            className={`${
                                index == active && 'text-primary border-primary'
                            } group flex justify-center gap-3 items-center text-sm pl-5 min-w-[10rem] pr-5 cursor-pointer rounded-t-lg pt-2 pb-2 text-center border-b-[1px] border-solid hover:border-primary hover:text-primary ${classItem}`}
                        >
                            {item.icon}
                            <span>{item.name}</span>
                        </motion.div>
                    );
                })}
            </motion.div>
            <motion.div className="w-full">
                {tabs.map((item, index) => {
                    return <div key={index}>{index == active && item.tabContent}</div>;
                })}
            </motion.div>
        </motion.div>
    );
}

export default Tabs;
