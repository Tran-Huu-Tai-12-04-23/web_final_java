import { motion } from 'framer-motion';

function Modal({ children, onClose = () => {} }) {
    return (
        <div
            onClick={onClose}
            className="fixed z-500000 bg-[rgba(0,0,0,0.4)] z-[1000000000] top-0 left-0 bottom-0 right-0 flex justify-center items-center"
        >
            {children}
        </div>
    );
}

export default Modal;
