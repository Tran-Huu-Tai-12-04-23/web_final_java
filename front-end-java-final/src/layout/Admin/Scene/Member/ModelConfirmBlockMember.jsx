import { useState } from 'react';
import { Modal, ModalItem } from '../../../../components';

function ModalConfirmBlockMember({ onConfirm = () => {}, onCancel = () => {}, onClose = () => {} }) {
    const [close, setClose] = useState(false);
    return (
        <Modal onClose={() => setClose(true)}>
            <ModalItem onClose={onClose} close={close}>
                <div className="relative w-full max-w-md min-w-[20rem] h-full md:h-auto">
                    <div className="relative text-center ">
                        <svg
                            className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        <p className="mb-4 text-gray-500 dark:text-gray-300">
                            Are you sure you want to block this member?
                        </p>
                        <div className="flex justify-center items-center space-x-4">
                            <button
                                onClick={() => {
                                    onCancel();
                                    setClose(true);
                                }}
                                type="button"
                                className="py-2 px-3 text-sm font-medium text-gray-500 bg-light-tiny  dark:bg-dark-tiny rounded-md pl-4 pr-4 hover:text-gray-900  dark:text-gray-300 dark:hover:text-white dark:hover:bg-btn-second "
                            >
                                Close
                            </button>
                            <button
                                onClick={() => {
                                    onConfirm();
                                    setClose(true);
                                }}
                                type="submit"
                                className="py-2 px-3 text-sm font-medium text-center text-white bg-blue-600 rounded-md pl-2 pr-2 hover:bg-blue-700 focus:outline-none  dark:bg-blue-500 dark:hover:bg-blue-600 "
                            >
                                Yes, Block Now
                            </button>
                        </div>
                    </div>
                </div>
            </ModalItem>
        </Modal>
    );
}

export default ModalConfirmBlockMember;
