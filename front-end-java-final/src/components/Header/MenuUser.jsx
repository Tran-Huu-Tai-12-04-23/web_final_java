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
            }}
            onMouseEnter={handleOpen}
            onMouseLeave={handleClose}
            className="fixed top-[3rem] bottom-0 right-0 left-0 bg-[rgba(255,255,255,0.4)] dark:bg-[rgba(0,0,0,0.4)] backdrop-blur-sm"
        >
            <AnimateText className=" absolute right-[2%] min-w-[8rem] dark:bg-dark-header bg-light-header rounded-b-lg top-0">
                <ul>{items}</ul>
            </AnimateText>
        </motion.div>
    );
}

export default MenuUser;
