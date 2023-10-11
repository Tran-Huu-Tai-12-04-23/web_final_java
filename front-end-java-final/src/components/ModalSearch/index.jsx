import { motion } from 'framer-motion';
import { Input, TextMain, Modal } from '../index';
import { AiOutlineClose } from 'react-icons/ai';
import { AnimateHover } from '../Animate';
import { useState } from 'react';
import { AiOutlineFire } from 'react-icons/ai';
import ItemSearch from './ItemSearch';

function ModalSearch({ onClose = () => {} }) {
    const [y, setY] = useState(0);
    const [opacity, setOpacity] = useState(1);

    const handleClose = async () => {
        setY(-100);
        setOpacity(0);
        const waitClose = async () => {
            setTimeout(() => {
                onClose();
            }, 400);
        };
        await waitClose();
    };
    return (
        <Modal>
            <motion.div
                initial={{
                    y: -100,
                    opacity: 0,
                }}
                animate={{
                    y: y,
                    opacity: opacity,
                }}
                exit={{
                    y: 100,
                    opacity: 0,
                }}
                transition={{
                    duration: 0.3,
                    ease: 'easeInOut',
                }}
                className="relative p-6 min-h-[20rem] w-4/5 ml-10 mr-10 max-w-40rem h-4/5 max-h-[22rem]  shadow-xl  min-w-[20rem] bg-white dark:bg-dark  rounded-xl flex flex-col "
            >
                <AnimateHover
                    onClick={handleClose}
                    className="absolute top-4 right-4 cursor-pointer hover:text-primary"
                >
                    <AiOutlineClose className="h-6 w-6" />
                </AnimateHover>
                <Input className="w-[80%] bg-gray-100" placeholder="Enter keyword ... "></Input>

                <motion.div className="mt-5 flex justify-start items-center">
                    <TextMain className={'font-bold'}>The Most Searched Items</TextMain>
                    <AiOutlineFire className="w-6 h-6"></AiOutlineFire>
                </motion.div>
                <motion.div className="mt-2 overflow-y-scroll max-h-[18rem] flex w-full flex-wrap justify-between items-center">
                    <ItemSearch></ItemSearch>
                    <ItemSearch></ItemSearch>
                    <ItemSearch></ItemSearch>
                    <ItemSearch></ItemSearch>
                </motion.div>
                <TextMain className={'hover:text-primary mt-2 underline m-auto'}>Watch More</TextMain>
            </motion.div>
        </Modal>
    );
}

export default ModalSearch;
