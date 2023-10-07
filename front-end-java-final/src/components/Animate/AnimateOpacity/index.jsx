import { motion } from 'framer-motion';
function AnimateOpacity({ children, className, onMouseEnter = () => {}, onMouseLeave = () => {} }) {
    return (
        <motion.div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
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
        </motion.div>
    );
}

export default AnimateOpacity;
