import { useState } from 'react';
import { Input, TextMain, Modal, ModalItem } from '../../../../../components';

function ModalAddNewColor({ onRemove = () => {}, onCancel = () => {}, onClose = () => {} }) {
    const [color, setColor] = useState('');
    const [close, setClose] = useState(false);

    return (
        <Modal onClose={() => setClose(true)}>
            <ModalItem onClose={onClose} close={close}>
                <div className="min-w-[30rem]">
                    <TextMain
                        className={
                            'font-bold text-xl border-b-[1px] border-dashed border-light-tiny dark:border-dark-tiny pb-4'
                        }
                    >
                        Add new color
                    </TextMain>

                    <div className="flex flex-col mt-4">
                        <Input
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            placeholder="Enter color name..."
                            label={'Color name'}
                            className={`mb-4 ${'bg-[' + [color] + ']'}`}
                        ></Input>

                        <TextMain>Choose color code</TextMain>
                        <input
                            type={'color'}
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            placeholder="Chosse code color..."
                            className="mb-4 h-12 bg-transparent w-full rounded-md"
                        ></input>

                        <div className="flex justify-end items-center border-t-[1px] border-dashed border-light-tiny dark:border-dark-tiny mt-5 pt-5 pb-5 gap-4">
                            <button
                                onClick={() => {
                                    setClose(true);
                                }}
                                type="button"
                                className="py-2 px-3 text-sm font-medium text-gray-500 bg-light-tiny  dark:bg-dark-tiny rounded-md pl-4 pr-4 hover:text-gray-900  dark:text-gray-300 dark:hover:text-white dark:hover:bg-btn-second "
                            >
                                Close
                            </button>
                            <button
                                type="submit"
                                className="py-2 px-3 text-sm font-medium text-center text-white bg-green-700 rounded-md pl-4 pr-4 hover:bg-green-800 focus:outline-none  dark:bg-green-600 dark:hover:bg-green-700 "
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </ModalItem>
        </Modal>
    );
}

export default ModalAddNewColor;
