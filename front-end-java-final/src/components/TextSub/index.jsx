import { motion } from 'framer-motion';
function TextSub({ children, className }) {
    return <motion.h1 className={`${className} text-sm`}>{children}</motion.h1>;
}

export default TextSub;
