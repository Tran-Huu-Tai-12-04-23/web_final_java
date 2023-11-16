import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Button, Input, TextMain, Toggle, Modal } from '../index';
import { CiMail, CiUser } from 'react-icons/ci';
import { LiaKeySolid } from 'react-icons/lia';
import { BsTelephone } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { request, setAuthHeader } from '../../services/index';
import { Spinner } from 'flowbite-react';

function RegisterForm({ switchLogin = () => {} }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        const user = {
            username,
            password,
            confirmPassword,
            phoneNumber,
            email,
        };

        setLoading(true);
        await request('POST', '/api/v1/auth/sign-up', user)
            .then((response) => {
                console.log(response);
                // toast.promise(handleRegister(), {
                //     loading: 'Registering in...',
                //     success: <b>Register successful!</b>,
                //     error: <b>Register failed.</b>,
                // });
            })
            .catch((error) => {
                console.log(error);
                throw new Error(error);
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
        }

        await handleRegister();
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
            {loading && (
                <Modal>
                    <Spinner color="pink" aria-label="Pink spinner example" />
                </Modal>
            )}
            <TextMain className={'font-bold text-center text-xl mb-5'}>Create Your Account</TextMain>
            <Input
                placeholder="Username"
                className="mb-3 "
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                iconLeft={<CiUser className="w-6 h-6 ml-2 text-gray-400"></CiUser>}
            ></Input>
            <Input
                placeholder="E-mail"
                className="mb-3 "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                iconLeft={<CiMail className="w-6 h-6 ml-2 text-gray-400"></CiMail>}
            ></Input>
            <Input
                placeholder="Phone number"
                className="mb-3 "
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                iconLeft={<BsTelephone className="w-6 h-6 ml-2 text-gray-400"></BsTelephone>}
            ></Input>
            <Input
                placeholder="Password"
                type={'password'}
                className=" mb-3 "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                iconLeft={<LiaKeySolid className="w-6 h-6ml-2 text-gray-400"></LiaKeySolid>}
            ></Input>
            <Input
                placeholder="Confirm password"
                type={'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                iconLeft={<LiaKeySolid className="w-6 h-6 ml-2 text-gray-400"></LiaKeySolid>}
            ></Input>
            <Link to="" className="hover:text-primary text-sm w-full block text-right mt-2 ml-auto">
                Forgot password?
            </Link>
            <Toggle name="I agree to all Term & Conditions"></Toggle>
            <Button className={'w-full rounded-lg p-3 text-center mt-5 bg-primary text-white '} onClick={register}>
                Create Account
            </Button>
        </motion.form>
    );
}

export default RegisterForm;
