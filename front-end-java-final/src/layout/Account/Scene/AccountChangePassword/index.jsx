<<<<<<< HEAD
import { useState } from 'react';
=======
import { useState, useEffect } from 'react';
>>>>>>> main
import { Button, Input, TextMain, TextSub } from '../../../../components';
import { MdModeEdit } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { IoMdSend } from 'react-icons/io';
import { VscSaveAs } from 'react-icons/vsc';
<<<<<<< HEAD
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
=======
import { IoIosCheckmark } from 'react-icons/io';
import toast from 'react-hot-toast';
import { useLogin } from '../../../../context/login';
import { useLoading } from '../../../../context/loadingContext';
import { request } from '../../../../services';

function AccountChangPassword() {
    const { account } = useLogin();
    const { startLoading, stopLoading } = useLoading();
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [OTP, setOTP] = useState('');
    const [confirmOtp, setConfirmOtp] = useState(false);
    const [changePassword, setChangePassword] = useState(false);
    const [resend, setResend] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(0);

    const resetForm = () => {
        setOldPassword('');
        setConfirmOtp('');
        setConfirmPassword('');
        setPassword('');
    };
    const sendOTP = async () => {
        if (oldPassword === '') {
            toast.error('Vui lòng nhập mật khẩu cũ!');
            return;
        }

        const data = {
            accountId: account?.accountId,
            password: oldPassword,
        };

        startLoading();
        await request('POST', '/api/v1/user/verify/verify-change-pass', data)
            .then((res) => {
                console.log(res);
                if (res.data) {
                    toast.success('Hệ thống đã gửi cho bạn email xác nhận! Vui lòng kiểm tra và nhập mã Code !');
                    setConfirmOtp(true);
                    setSecondsLeft(60);
                } else {
                    toast.error('Mật khẩu không chính xác!');
                }
            })
            .catch((err) => {
                console.error(err);
                toast.error('Mật khẩu không chính xác!');
            });
        stopLoading();
    };
    const verifyOTP = async () => {
        if (OTP === '') {
            toast.error('Mã OTP không được để trống!');
            return;
        }

        startLoading();
        await request('GET', `http://localhost:8099/api/v1/user/verify/verify-code/${account?.accountId}?code=${OTP}`)
            .then((res) => {
                if (res.data) {
                    toast.success('Xác thực thành công vui lòng thay đổi mật khẩu mới của bạn !');
                    setChangePassword(true);
                    setConfirmOtp(false);
                }
            })
            .catch((err) => {
                console.error(err);
                toast.error('OTP không chính xác hoặc hết hiệu lực!');
            });
        stopLoading();
    };
    const commitChangePassword = async () => {
        if (password === '') {
            toast.error('Mật khẩu mới không được để trống!');
            return;
        } else if (confirmPassword === '') {
            toast.error('Xác nhạn mật khẩu không được để trống!');
            return;
        } else if (password !== confirmPassword) {
            toast.error('Xác nhạn mật khẩu không khớp!');
            return;
        }

        const data = {
            password,
            confirmPassword,
        };

        startLoading();
        await request('PUT', `/api/v1/user/member/change-password/${account?.memberId}`, data)
            .then((res) => {
                if (res.data) {
                    toast.success('Change password was successfully!');
                    resetForm();
                    setConfirmOtp(false);
                    setChangePassword(false);
                } else {
                }
            })
            .catch((err) => {
                console.error(err);
            });
        stopLoading();
>>>>>>> main
    };
    const cancel = async () => {
        setChangePassword(false);
        setConfirmOtp(false);
        // if (username === '') {
        //     toast.error('Tên đăng nhập không được để trống!');
        //     return;
        // }
    };
<<<<<<< HEAD
=======

    useEffect(() => {
        const timer = setInterval(() => {
            if (secondsLeft <= 0) {
                clearInterval(timer);
                setResend(true);
            } else {
                setSecondsLeft((prevSeconds) => prevSeconds - 1);
            }
        }, 1000);

        // Clean up the interval when the component is unmounted
        return () => clearInterval(timer);
    }, [secondsLeft]);
>>>>>>> main
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
<<<<<<< HEAD
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label="Email xác nhận"
                        placeholder=" "
                    ></Input>
=======

>>>>>>> main
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
<<<<<<< HEAD
                    <Button
                        onClick={verifyOTP}
                        className="flex justify-center items-center py-2 px-3 text-sm font-medium text-gray-500 bg-bg-light-menu  dark:bg-bg-dark-menu rounded-md pl-4 pr-4 hover:text-gray-900  dark:text-gray-300 dark:hover:text-white dark:hover:brightness-125 "
                    >
                        <FaCheck className="w-6 h-6 mr-3" />
                        <span>Kiểm tra</span>
                    </Button>
=======
                    <div className="flex justify-start items-center gap-3">
                        <Button
                            onClick={verifyOTP}
                            className="flex justify-center items-center py-2 px-3 text-sm font-medium text-gray-500 bg-bg-light-menu  dark:bg-bg-dark-menu rounded-md pl-4 pr-4 hover:text-gray-900  dark:text-gray-300 dark:hover:text-white dark:hover:brightness-125 "
                        >
                            <IoIosCheckmark className="w-6 h-6 mr-3" />
                            <span>Kiểm tra</span>
                        </Button>

                        {resend && secondsLeft <= 0 && (
                            <Button
                                onClick={sendOTP}
                                className=" dark:hover:brightness-125 pl-4 w-fit flex justify-center items-center pr-4 p-2 rounded-md bg-primary dark:bg-primary"
                            >
                                <IoMdSend className="w-6 h-6 mr-3" />
                                <span>Gửi lại mã xác nhận</span>
                            </Button>
                        )}
                        {secondsLeft > 0 && <TextMain>Còn lại {secondsLeft}s</TextMain>}
                    </div>
>>>>>>> main
                </>
            )}

            {changePassword && (
                <>
                    <Input
<<<<<<< HEAD
=======
                        type="password"
>>>>>>> main
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Nhập mật khẩu mới"
                        placeholder=" "
                    ></Input>
                    <Input
<<<<<<< HEAD
=======
                        type="password"
>>>>>>> main
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
