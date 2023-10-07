import { motion } from 'framer-motion';
function AnimateText({ children, className, delay = 0 }) {
    return (
        <motion.h5
            className={className}
            initial={{ x: -10 }}
            animate={{
                x: 0,
            }}
            exit={{ x: -10 }}
            transition={{
                duration: 0.3,
                ease: 'easeInOut',
                delay: delay,
            }}
        >
            {children}
        </motion.h5>
    );
}

export default AnimateText;
