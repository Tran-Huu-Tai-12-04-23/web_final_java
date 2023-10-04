import { motion } from 'framer-motion';
function AnimateText({ children, className }) {
    return (
        <motion.h3
            className={className}
            initial={{ opacity: 0 }}
            animate={{
                opacity: 1,
            }}
            exit={{ opacity: 0 }}
            transition={{
                duration: 0.3,
                ease: 'easeInOut',
            }}
        >
            {children}
        </motion.h3>
    );
}

export default AnimateText;
