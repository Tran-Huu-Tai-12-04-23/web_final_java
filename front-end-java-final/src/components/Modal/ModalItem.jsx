import { motion } from 'framer-motion';
import { Modal } from '../index';
import { AiOutlineClose } from 'react-icons/ai';
import { AnimateHover } from '../Animate';
import { useEffect, useState } from 'react';

function ModalItem({ children, onClose = () => {}, close = false }) {
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

    useEffect(() => {
        if (close == true) {
            handleClose();
        }
    }, [close]);

    return (
        <Modal>
            <motion.div
                onClick={(e) => {
                    e.stopPropagation();
                }}
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
                className="relative overflow-hidden p-10 shadow-xl w-fit h-fit bg-white dark:bg-dark  rounded-xl flex flex-col "
            >
                <AnimateHover
                    onClick={handleClose}
                    className="absolute top-4 right-4 cursor-pointer hover:text-primary"
                >
                    <AiOutlineClose className="h-6 w-6" />
                </AnimateHover>
                {children}
            </motion.div>
        </Modal>
    );
}

export default ModalItem;
