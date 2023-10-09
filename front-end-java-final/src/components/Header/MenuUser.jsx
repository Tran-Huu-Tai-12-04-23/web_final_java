import { motion } from 'framer-motion';
import { AnimateText } from '../Animate';
function MenuUser({ handleOpen, handleClose, items }) {
    return (
        <motion.div
            initial={{ height: 0 }}
            animate={{
                height: '100%',
            }}
            exit={{
                height: 0,
            }}
            transition={{
                ease: 'easeInOut',
                duration: 0.3,
            }}
            className="fixed shadow-md top-[3.1rem] bottom-0 right-0 left-0 bg-[rgba(0,0,0,0.4)] dark:bg-[rgba(0,0,0,0.4)]"
        >
            <AnimateText className=" absolute right-[2%] min-w-[8rem] dark:bg-dark-header bg-light-header rounded-b-lg top-0">
                <ul onMouseEnter={handleOpen} onMouseLeave={handleClose}>
                    {items}
                </ul>
            </AnimateText>
        </motion.div>
    );
}

export default MenuUser;
