import { motion } from 'framer-motion';
function TextHeader({ children }) {
    return <motion.h1 className="text-xl">{children}</motion.h1>;
}

export default TextHeader;
