import { motion } from 'framer-motion';
function AnimateHover({ children }) {
    return (
        <motion.div
            whileHover={{ scale: 1.2, rotate: 360, transition: { duration: 0.3 } }}
            whileTap={{
                scale: 0.8,
                rotate: -360,
                borderRadius: '100%',
                transition: { duration: 0.3 },
            }}
        >
            {children}
        </motion.div>
    );
}

export default AnimateHover;
