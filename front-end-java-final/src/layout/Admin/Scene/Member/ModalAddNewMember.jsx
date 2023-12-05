import { useEffect, useState } from 'react';
import { Input, Select, TextMain } from '../../../../components';
import { Modal, ModalItem } from '../../../../components';
import toast from 'react-hot-toast';
import { requestSign } from '../../../../services';
import { useLoading } from '../../../../context/loadingContext';

function ModalAddNewMember({ onAdd = () => {}, onCancel = () => {}, onClose = () => {}, setListMember = () => {} }) {
    const { startLoading, stopLoading } = useLoading();
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [close, setClose] = useState(false);
    const handleAddNewMember = async () => {
        const user = {
            username: userName,
            password,
            confirmPassword,
            phoneNumber,
            email,
        };

        if (userName === '') {
            toast('Vui lòng nhập tên thành viên!', {
                icon: '⚠️',
            });
            return;
        } else if (email === '') {
            toast('Vui lòng nhập email!', {
                icon: '⚠️',
            });
            return;
        } else if (phoneNumber === '') {
            toast('Vui lòng nhập số điện thoại! ', {
                icon: '⚠️',
            });
            return;
        } else if (password === '') {
            toast('Vui lòng nhập mật khẩu! ', {
                icon: '⚠️',
            });
            return;
        } else if (confirmPassword != password) {
            toast('Xác nhận mật khẩu không khớp! ', {
                icon: '⚠️',
            });
            return;
        }

        startLoading();
        await requestSign('POST', '/api/v1/auth/sign-up', user)
            .then((response) => {
                if (response.data) {
                    toast.success('Thêm thành viên thành công!');
                    setListMember((prev) => {
                        return [
                            ...prev,
                            {
                                ...response.data,
                                username: response?.data?.account?.username,
                            },
                        ];
                    });
                    onClose();
                }
            })
            .catch((error) => {
                console.log(error);
                if (error.response) {
                    error.response.data.message && toast.error(error.response.data.message);
                }
            });

        stopLoading();
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
                        Thêm thành viên
                    </TextMain>

                    <div className="flex flex-col mt-4">
                        <Input
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="Tên thành viên"
                            label={'Tên thành viên'}
                            className="mb-4"
                        ></Input>
                        <Input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Mật khẩu"
                            label={'Mật khẩu'}
                            type="password"
                            className="mb-4"
                        ></Input>
                        <Input
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Xác nhận mật khẩu"
                            label={'Xác nhận mật khẩu'}
                            type="password"
                            className="mb-4"
                        ></Input>
                        <Input
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Số điện thoại thành viên"
                            label={'Phone number'}
                            className="mb-4"
                        ></Input>

                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email thành viên"
                            label={'Email'}
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
                                onClick={handleAddNewMember}
                                className="py-2 px-3 text-sm font-medium text-center text-white bg-green-700 rounded-md pl-4 pr-4 hover:bg-green-800 focus:outline-none  dark:bg-green-600 dark:hover:bg-green-700 "
                            >
                                Thêm
                            </button>
                        </div>
                    </div>
                </div>
            </ModalItem>
        </Modal>
    );
}

export default ModalAddNewMember;
