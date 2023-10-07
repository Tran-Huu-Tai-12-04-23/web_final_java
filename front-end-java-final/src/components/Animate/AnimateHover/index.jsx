import { motion } from 'framer-motion';
function AnimateHover({ children, className, onClick = () => {} }) {
    return (
        <motion.div
            onClick={onClick}
            className={className}
            whileHover={{ scale: 1.2, transition: { duration: 0.3 } }}
            whileTap={{
                scale: 0.8,
                transition: { duration: 0.3 },
            }}
        >
            {children}
        </motion.div>
    );
}

export default AnimateHover;
