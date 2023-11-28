import { useState } from 'react';
import { Button, Input, TextMain, TextSub } from '../../../../components';
import { MdModeEdit } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { VscSaveAs } from 'react-icons/vsc';
import toast from 'react-hot-toast';
import Util from '../../../../utils/Util';

function AccountInfo() {
    const [username, setUsername] = useState('Tran huu tai');
    const [email, setEmail] = useState('Tran huu tai');
    const [phoneNumber, setPhoneNumber] = useState('Tran huu tai');

    const [edit, setEdit] = useState(false);

    const saveProfile = async () => {
        if (username === '') {
            toast.error('Tên đăng nhập không được để trống!');
            return;
        } else if (phoneNumber === '') {
            toast.error('Số điện thoại không được để trống!');
            return;
        } else if (email === '') {
            toast.error('Email không được để trống!');
            return;
        } else if (!Util.validatePhoneNumber(phoneNumber)) {
            toast.error('Số điện thoại không hợp lệ!');
            return;
        } else if (!Util.validateEmail(email)) {
            toast.error('Email không hợp lệ!');
            return;
        }

        const data = {
            username,
            email,
            phoneNumber,
        };
    };
    return (
        <div className="p-4 flex flex-col gap-2 ">
            <div className="border-b-primary pb-2">
                <TextMain className={'text-md font-semibold'}>Hồ Sơ Của Tôi </TextMain>
                <TextSub>Quản lý thông tin hồ sơ để bảo mật tài khoản</TextSub>
            </div>
            <Input
                disabled={edit ? false : true}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                label="Tên đăng nhập"
                placeholder=" "
            ></Input>
            <Input
                disabled={edit ? false : true}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                label="Số điện thoại"
                placeholder=" "
            ></Input>
            <Input
                disabled={edit ? false : true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                placeholder=" "
            ></Input>

            <div className="w-full flex justify-start items-center gap-4">
                {!edit && (
                    <Button
                        onClick={() => setEdit(true)}
                        className=" dark:hover:brightness-125 pl-4 flex justify-center items-center pr-4 p-2 rounded-md bg-bg-light-menu dark:bg-bg-dark-menu"
                    >
                        <MdModeEdit className="w-6 h-6 mr-3" />
                        <span>Edit</span>
                    </Button>
                )}
                {edit && (
                    <>
                        <Button
                            onClick={() => setEdit(false)}
                            className="flex justify-center items-center py-2 px-3 text-sm font-medium text-gray-500 bg-bg-light-menu  dark:bg-bg-dark-menu rounded-md pl-4 pr-4 hover:text-gray-900  dark:text-gray-300 dark:hover:text-white dark:hover:brightness-125 "
                        >
                            <IoClose className="w-6 h-6 mr-3" />
                            <span>Hủy</span>
                        </Button>
                        <Button
                            onClick={saveProfile}
                            className="flex justify-center items-center py-2 px-3 text-sm font-medium text-center text-white bg-green-700 rounded-md pl-4 pr-4 hover:bg-green-800 focus:outline-none  dark:bg-green-600 dark:hover:bg-green-700 "
                        >
                            <VscSaveAs className="w-6 h-6 mr-3" />
                            <span>Lưu lại</span>
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}

export default AccountInfo;
