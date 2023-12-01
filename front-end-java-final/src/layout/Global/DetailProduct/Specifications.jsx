import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, TextMain } from '../../../components';
import { AnimateOpacity } from '../../../components/Animate';

import { MdKeyboardArrowDown } from 'react-icons/md';
const variants = {
    active: { rotate: 0 },
    inActive: { rotate: 180 },
};
function Specifications({ data = {} }) {
    const [showRow, setShowRow] = useState(4);
    return (
        <AnimateOpacity className="p-4 rounded-md">
            <TextMain className={'border-b-primary pb-3'}>Thông tin cấu hình chi tiết</TextMain>

            <div className="flex flex-col mt-3">
                {Object.entries(data).map(
                    ([key, value], index) =>
                        index !== 0 &&
                        index <= showRow && (
                            <div
                                className={`${
                                    index % 2 === 1 ? 'bg-bg-light-menu dark:bg-bg-dark-menu' : 'bg-transparent'
                                } p-2 flex rounded-md justify-between items-start`}
                                key={index}
                            >
                                <span className="mr-4">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                                <span>{value}</span>
                            </div>
                        ),
                )}

                <div className="w-full mt-4">
                    <Button
                        onClick={() => {
                            if (showRow === 4) {
                                setShowRow(Object.entries(data).length);
                            } else {
                                setShowRow(4);
                            }
                        }}
                        className="float-left group  brightness-50 hover:text-primary hover:brightness-100 cursor-pointer flex justify-center items-center"
                    >
                        <motion.div variants={variants} animate={showRow === 4 ? 'active' : 'inActive'}>
                            <MdKeyboardArrowDown className="w-6 h-6"></MdKeyboardArrowDown>
                        </motion.div>
                        <span>{showRow === 4 ? 'More' : 'Less'}</span>
                    </Button>
                </div>
            </div>
        </AnimateOpacity>
    );
}

export default Specifications;
