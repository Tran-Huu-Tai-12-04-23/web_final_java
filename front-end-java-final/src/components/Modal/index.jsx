function Modal({ children, onClose = () => {} }) {
    return (
        <div
            onClick={onClose}
            className="fixed bg-[rgba(0,0,0,0.2)] z-[1000000000] h-screen w-screen top-0 left-0 bottom-0 right-0 flex justify-center items-center"
        >
            {children}
        </div>
    );
}

export default Modal;
