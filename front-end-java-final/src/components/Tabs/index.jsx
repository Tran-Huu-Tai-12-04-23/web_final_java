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
                            } text-sm cursor-pointer p-2 pl-4 pr-4 rounded-t-lg text-center border-b-[1px] border-solid hover:border-primary hover:text-primary ${classItem}`}
                        >
                            {item.name}
                        </motion.div>
                    );
                })}
            </motion.div>
            <motion.div className="w-full">
                {tabs.map((item, index) => {
                    return <>{index == active && item.tabContent}</>;
                })}
            </motion.div>
        </motion.div>
    );
}

export default Tabs;
