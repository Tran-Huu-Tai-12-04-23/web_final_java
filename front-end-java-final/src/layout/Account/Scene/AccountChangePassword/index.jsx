import { useState } from 'react';
import { Button, Input, TextMain, TextSub } from '../../../../components';
import { MdModeEdit } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { IoMdSend } from 'react-icons/io';
import { VscSaveAs } from 'react-icons/vsc';
import { FaCheck } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import Util from '../../../../utils/Util';

function AccountChangPassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [OTP, setOTP] = useState('');
    const [confirmOtp, setConfirmOtp] = useState(false);
    const [changePassword, setChangePassword] = useState(false);

    const [edit, setEdit] = useState(true);
    const sendOTP = async () => {
        // if (username === '') {
        //     toast.error('Tên đăng nhập không được để trống!');
        //     return;
        // }
        setConfirmOtp(true);
    };
    const verifyOTP = async () => {
        setChangePassword(true);
        setConfirmOtp(false);
        // if (username === '') {
        //     toast.error('Tên đăng nhập không được để trống!');
        //     return;
        // }
    };
    const commitChangePassword = async () => {
        // if (username === '') {
        //     toast.error('Tên đăng nhập không được để trống!');
        //     return;
        // }
    };
    const cancel = async () => {
        setChangePassword(false);
        setConfirmOtp(false);
        // if (username === '') {
        //     toast.error('Tên đăng nhập không được để trống!');
        //     return;
        // }
    };
    return (
        <div className="p-4 flex flex-col gap-2 ">
            <div className="border-b-primary pb-2 ">
                <TextMain className={'text-md font-semibold'}>Đổi mật khẩu </TextMain>
                <TextSub>Chỉnh sửa mật khẩu tài khoản của bạn</TextSub>
            </div>
            {!confirmOtp && !changePassword && (
                <>
                    <Input
                        value={oldPassword}
                        type="password"
                        onChange={(e) => setOldPassword(e.target.value)}
                        placeholder=""
                        label="Mật khẩu cũ"
                    ></Input>
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label="Email xác nhận"
                        placeholder=" "
                    ></Input>
                    <Button
                        onClick={sendOTP}
                        className="mt-4 dark:hover:brightness-125 pl-4 w-fit flex justify-center items-center pr-4 p-2 rounded-md bg-bg-light-menu dark:bg-bg-dark-menu"
                    >
                        <IoMdSend className="w-6 h-6 mr-3" />
                        <span>Gửi mã xác nhận</span>
                    </Button>
                </>
            )}

            {confirmOtp && (
                <>
                    <Input
                        value={OTP}
                        type="number"
                        onChange={(e) => setOTP(e.target.value)}
                        label="Nhập mã OTP"
                        placeholder=" "
                    ></Input>
                    <Button
                        onClick={verifyOTP}
                        className="flex justify-center items-center py-2 px-3 text-sm font-medium text-gray-500 bg-bg-light-menu  dark:bg-bg-dark-menu rounded-md pl-4 pr-4 hover:text-gray-900  dark:text-gray-300 dark:hover:text-white dark:hover:brightness-125 "
                    >
                        <FaCheck className="w-6 h-6 mr-3" />
                        <span>Kiểm tra</span>
                    </Button>
                </>
            )}

            {changePassword && (
                <>
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Nhập mật khẩu mới"
                        placeholder=" "
                    ></Input>
                    <Input
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        label="Xác nhận mật khẩu mới"
                        placeholder=" "
                    ></Input>
                    <div className="w-full flex justify-start items-center gap-4">
                        <Button
                            onClick={cancel}
                            className="flex justify-center items-center py-2 px-3 text-sm font-medium text-gray-500 bg-bg-light-menu  dark:bg-bg-dark-menu rounded-md pl-4 pr-4 hover:text-gray-900  dark:text-gray-300 dark:hover:text-white dark:hover:brightness-125 "
                        >
                            <IoClose className="w-6 h-6 mr-3" />
                            <span>Hủy</span>
                        </Button>
                        <Button
                            onClick={commitChangePassword}
                            className="flex justify-center items-center py-2 px-3 text-sm font-medium text-center text-white bg-green-700 rounded-md pl-4 pr-4 hover:bg-green-800 focus:outline-none  dark:bg-green-600 dark:hover:bg-green-700 "
                        >
                            <VscSaveAs className="w-6 h-6 mr-3" />
                            <span>Lưu lại</span>
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}

export default AccountChangPassword;
