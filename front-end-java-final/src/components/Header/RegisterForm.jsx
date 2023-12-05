import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Button, Input, TextMain, Toggle, Modal } from '../index';
import { CiMail, CiUser } from 'react-icons/ci';
import { LiaKeySolid } from 'react-icons/lia';
import { BsTelephone } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { requestSign } from '../../services/index';
import { Spinner } from 'flowbite-react';
import Util from '../../utils/Util';

function RegisterForm({ switchLogin = () => {} }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [policy, setPolicy] = useState(false);

    const handleRegister = async () => {
        const user = {
            username,
            password,
            confirmPassword,
            phoneNumber,
            email,
        };

        setLoading(true);
        await requestSign('POST', '/api/v1/auth/sign-up', user)
            .then((response) => {
                if (response.data) {
                    toast.success('Đăng ký tài khoản thành công!');
                    switchLogin();
                }
            })
            .catch((error) => {
                console.log(error);
                if (error.response) {
                    error.response.data.message && toast.error(error.response.data.message);
                }
            });

        setLoading(false);
    };

    const register = async () => {
        if (username === '') {
            toast('Please enter username!', {
                icon: '⚠️',
            });
            return;
        } else if (email === '') {
            toast('Please enter your email!', {
                icon: '⚠️',
            });
            return;
        } else if (phoneNumber === '') {
            toast('Please enter your phone! ', {
                icon: '⚠️',
            });
            return;
        } else if (password === '') {
            toast('Please enter your password! ', {
                icon: '⚠️',
            });
            return;
        } else if (password !== confirmPassword) {
            toast('Confirm password is not match! ', {
                icon: '⚠️',
            });
            return;
        } else if (!Util.validateEmail(email)) {
            toast('Email is not valid! ', {
                icon: '⚠️',
            });
            return;
        } else if (!Util.validatePhoneNumber(phoneNumber)) {
            toast('Phone number is not valid! ', {
                icon: '⚠️',
            });
            return;
        }

        if (policy) {
            await handleRegister();
        } else {
            toast.error('Bạn chưa đồng ý với điều khoản của chúng tôi!');
        }
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
            className="pt-10 w-full flex flex-col gap-4"
        >
            {loading && (
                <Modal>
                    <Spinner color="pink" aria-label="Pink spinner example" />
                </Modal>
            )}
            <TextMain className={'font-bold text-center text-xl mb-5'}>Tạo tài khoản</TextMain>
            <Input
                placeholder="Tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                iconLeft={<CiUser className="w-6 h-6 ml-2 text-gray-400"></CiUser>}
            ></Input>
            <Input
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                iconLeft={<CiMail className="w-6 h-6 ml-2 text-gray-400"></CiMail>}
            ></Input>
            <Input
                placeholder="Số điện thoại"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                iconLeft={<BsTelephone className="w-6 h-6 ml-2 text-gray-400"></BsTelephone>}
            ></Input>
            <Input
                placeholder="Mật khẩu"
                type={'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                iconLeft={<LiaKeySolid className="w-6 h-6 ml-2 text-gray-400"></LiaKeySolid>}
            ></Input>
            <Input
                placeholder="Xác thực mật khẩu"
                type={'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                iconLeft={<LiaKeySolid className="w-6 h-6 ml-2 text-gray-400"></LiaKeySolid>}
            ></Input>
            <Link to="" className="hover:text-primary text-sm w-full block text-right mt-2 ml-auto">
                Quên mật khẩu?
            </Link>
            <Toggle onChange={(e) => setPolicy(e.target.checked)} name="Tôi đồng ý với các điều khoản"></Toggle>
            <Button className={'w-full rounded-lg p-3 text-center mt-5 bg-primary text-white '} onClick={register}>
                Tạo tài khoản
            </Button>
        </motion.form>
    );
}

export default RegisterForm;
