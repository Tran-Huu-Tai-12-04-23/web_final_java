import { motion } from 'framer-motion';

function Modal({ children }) {
    return (
        <motion.div className="fixed bg-[rgba(0,0,0,0.4)] z-[1000000000] top-0 left-0 bottom-0 right-0 flex justify-center items-center">
            {children}
        </motion.div>
    );
}

export default Modal;
