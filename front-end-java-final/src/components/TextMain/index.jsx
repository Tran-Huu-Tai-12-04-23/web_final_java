import { motion } from 'framer-motion';
function TextMain({ children, className }) {
    return <motion.h1 className={`${className} text-md xl:text-xl 2xl:text-xl `}>{children}</motion.h1>;
}

export default TextMain;
