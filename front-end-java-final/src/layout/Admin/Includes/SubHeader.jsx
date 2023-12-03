import { motion } from 'framer-motion';
import { TextMain } from '../../../components';

import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

function SubHeader({ nameHeader = 'Default', main = 'Default', sub = 'default', onClick }) {
    return (
        <motion.div className="w-full flex justify-between border-b-[1px] border-solid p-2 border-light-tiny dark:border-dark-tiny pb-2 items-center transition-all dark:text-dark text-light">
            <TextMain className={'text-xl font-bold'}>{nameHeader}</TextMain>
            <motion.div className="flex justify-end items-center cursor-pointer  hover:text-primary">
                <TextMain className={'text-md '}>{main}</TextMain>
                <MdOutlineKeyboardArrowRight className="h-6 w-6 ml-2 mr-2"></MdOutlineKeyboardArrowRight>
                <TextMain className={'text-md text-[#757575] '}>{sub}</TextMain>
            </motion.div>
        </motion.div>
    );
}

export default SubHeader;
