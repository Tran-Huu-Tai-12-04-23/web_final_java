import { useState } from 'react';
import toast from 'react-hot-toast';
import { Input, TextMain, Modal, ModalItem } from '../../../../../components';

import { request } from '../../../../../services';

function ModalAddNewCategory({
    onRemove = () => {},
    onCancel = () => {},
    onClose = () => {},
    onAddNewCategory = (value) => {},
}) {
    const [category, setCategory] = useState('');
    const [close, setClose] = useState(false);

    const handleAddNewCategory = () => {
        return request('POST', 'api/v1/admin/category/create', {
            nameCategory: category,
        })
            .then((response) => {
                const data = response.data;
                if (data) {
                    onAddNewCategory({
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
    const addNewCategory = async () => {
        if (category === '') {
            toast.error('Name branch is required!');
            return;
        }

        toast.promise(handleAddNewCategory(), {
            loading: 'Creating...',
            success: <b>Tạo thành công!</b>,
            error: <b>Tạo thất bại!</b>,
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
                        Thêm một phân loại mới
                    </TextMain>

                    <div className="flex flex-col mt-4">
                        <Input
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder="Enter category name..."
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
                                Hủy
                            </button>
                            <button
                                type="submit"
                                onClick={addNewCategory}
                                className="py-2 px-3 text-sm font-medium text-center text-white bg-green-700 rounded-md pl-4 pr-4 hover:bg-green-800 focus:outline-none  dark:bg-green-600 dark:hover:bg-green-700 "
                            >
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>
            </ModalItem>
        </Modal>
    );
}

export default ModalAddNewCategory;
