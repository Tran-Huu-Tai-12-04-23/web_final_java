import { motion } from 'framer-motion';

function Main({ children, className }) {
    return (
        <motion.div className={`${className} overflow-hidden  pl-10 pr-10 dark:bg-dark-header bg-light-header `}>
            {children}
        </motion.div>
    );
}

export default Main;
