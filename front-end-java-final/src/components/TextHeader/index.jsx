import { motion } from 'framer-motion';
function TextHeader({ children, className }) {
    return <motion.h1 className={`text-2xl ${className}`}>{children}</motion.h1>;
}

export default TextHeader;
