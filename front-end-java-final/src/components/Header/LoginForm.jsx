import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Button, Input, TextMain, Toggle } from '../index';
import { FiUser } from 'react-icons/fi';
import { LiaKeySolid } from 'react-icons/lia';
import { Link } from 'react-router-dom';
import Utils from '../../utils/Util';
import { requestSign, setAuthHeader, setRefreshToken } from '../../services/index';

import { RiFacebookLine } from 'react-icons/ri';
import { PiGoogleLogoLight } from 'react-icons/pi';

function LoginForm({ onClose = () => {}, setAccount = () => {} }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const user = {
            username: username,
            password: password,
        };

        try {
            await requestSign('POST', '/api/v1/auth/sign-in', user)
                .then((response) => {
                    const data = response.data;
                    if (data == null) return Promise.reject(false);
                    setAuthHeader(data.jwtAuthenticationResponse.token);
                    setRefreshToken(data.jwtAuthenticationResponse.refreshToken);

                    const member = data.data;
                    const userData = {
                        memberId: member?.id,
                        accountId: member?.account?.id,
                        username: member?.account?.username,
                    };
                    Utils.addLoginStorage(userData);
                    setAccount(userData);
                    onClose();
                    return Promise.resolve(true);
                })
                .catch((error) => {
                    setAuthHeader(null);
                    console.log(error);
                    if (error.response) {
                        if (error.response.data.message) toast.error(error.response.data.message);
                    }
                    return Promise.reject(error);
                });
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const login = async () => {
        if (username === '') {
            toast('Please enter username ', {
                icon: '⚠️',
            });
            return;
        }
        if (password === '') {
            toast('Please enter your password ', {
                icon: '⚠️',
            });
            return;
        }

        toast.promise(handleLogin(), {
            loading: 'Logging in...',
            success: <b>Login successful!</b>,
            error: <b>Login failed.</b>,
        });
    };
    return (
        <motion.form
            onSubmit={(e) => {
                e.preventDefault();
            }}
            initial={{
                opacity: 0,
                y: 100,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 0.3,
                ease: 'easeInOut',
            }}
            className="pt-10 w-full"
        >
            <TextMain className={'font-bold text-center text-xl mb-5'}>Đăng nhập vào GetTech</TextMain>
            <Input
                placeholder="Tên đăng nhập"
                className="mb-3 "
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                iconLeft={<FiUser className="w-6 h-6 ml-2 text-gray-400"></FiUser>}
            ></Input>
            <Input
                placeholder="Mật khẩu"
                type={'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                iconLeft={<LiaKeySolid className="w-6 h-6 ml-2 text-gray-400"></LiaKeySolid>}
            ></Input>
            <Link to="" className="hover:text-primary text-sm w-full block text-right mt-2 ml-auto">
                Quên mật khẩu?
            </Link>
            <Toggle name="Lưu mật khẩu"></Toggle>

            <Button className={'w-full rounded-lg p-3 text-center mt-5 bg-primary text-white '} onClick={login}>
                ĐĂNG NHẬP
            </Button>
            <div className="flex justify-between items-center mt-5 ">
                <div className="h-[1px] bg-gray-300 w-1/3"></div>
                <TextMain>hoặc đăng nhập với</TextMain>
                <div className="h-[1px] bg-gray-300 w-1/3"></div>
            </div>
            <div className="flex justify-between items-center mt-3 w-full select-none">
                <Button style="outline" className={'w-1/2 mr-4 p-3'}>
                    <PiGoogleLogoLight className="w-6 h-6 mr-1"></PiGoogleLogoLight>
                    <span>Google</span>
                </Button>
                <Button style="outline" className={'w-1/2 ml-4 p-3'}>
                    <RiFacebookLine className="w-6 h-6 mr-1"></RiFacebookLine>
                    <span>Facebook</span>
                </Button>
            </div>
        </motion.form>
    );
}

export default LoginForm;
