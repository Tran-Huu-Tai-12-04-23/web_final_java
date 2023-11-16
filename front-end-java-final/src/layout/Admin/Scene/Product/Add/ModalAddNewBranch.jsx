import { useState } from 'react';
import { Input, TextMain, Modal, ModalItem } from '../../../../../components';
import { request } from '../../../../../services';
import toast from 'react-hot-toast';

function ModalAddNewBranch({
    onRemove = () => {},
    onCancel = () => {},
    onClose = () => {},
    onAddNewBranch = (value) => {},
}) {
    const [branch, setBranch] = useState('');
    const [close, setClose] = useState(false);

    const handleAddNewBranch = () => {
        return request('POST', 'api/v1/admin/branch/create', {
            nameBranch: branch,
        })
            .then((response) => {
                const data = response.data;
                if (data) {
                    onAddNewBranch({
                        ...data,
                        name: data?.nameBranch,
                    });
                }
                setClose(true);
                return data;
            })
            .catch((errors) => {
                console.error(errors);
                // Re-throw the error to propagate it
                throw errors;
            });
    };
    const addNewBranch = async () => {
        if (branch === '') {
            toast.error('Name branch is required!');
            return;
        }

        toast.promise(handleAddNewBranch(), {
            loading: 'Creating...',
            success: <b>Create successful!</b>,
            error: <b>Create failed.</b>,
        });
    };

    return (
        <Modal onClose={() => setClose(true)}>
            <ModalItem onClose={onClose} close={close}>
                <div className="min-w-[30rem]">
                    <TextMain
                        className={
                            'font-bold text-xl border-b-[1px] border-dashed border-light-tiny dark:border-dark-tiny pb-4'
                        }
                    >
                        Add new branch
                    </TextMain>

                    <div className="flex flex-col mt-4">
                        <Input
                            value={branch}
                            onChange={(e) => setBranch(e.target.value)}
                            placeholder="Enter branch name..."
                            label={'Branch name'}
                            className="mb-4"
                        ></Input>

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
                                onClick={addNewBranch}
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

export default ModalAddNewBranch;
