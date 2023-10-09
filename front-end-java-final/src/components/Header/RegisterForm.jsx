import { motion } from 'framer-motion';
import { Button, Input, TextMain, Toggle } from '../index';
import { CiMail, CiUser } from 'react-icons/ci';
import { LiaKeySolid } from 'react-icons/lia';
import { Link } from 'react-router-dom';

function RegisterForm() {
    return (
        <motion.div
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
            <TextMain className={'font-bold text-center text-xl mb-5'}>Create Your Account</TextMain>
            <Input
                placeholder="Full Name"
                className="mb-3 "
                iconLeft={<CiUser className="w-6 h-6 ml-2 text-gray-400"></CiUser>}
            ></Input>
            <Input
                placeholder="E-mail"
                className="mb-3 "
                iconLeft={<CiMail className="w-6 h-6 ml-2 text-gray-400"></CiMail>}
            ></Input>
            <Input
                placeholder="Password"
                type={'password'}
                className=" mb-3 "
                iconLeft={<LiaKeySolid className="w-6 h-6ml-2 text-gray-400"></LiaKeySolid>}
            ></Input>
            <Input
                placeholder="Confirm password"
                type={'password'}
                iconLeft={<LiaKeySolid className="w-6 h-6 ml-2 text-gray-400"></LiaKeySolid>}
            ></Input>
            <Link to="" className="hover:text-primary text-sm w-full block text-right mt-2 ml-auto">
                Forgot password?
            </Link>
            <Toggle name="I agree to all Term & Conditions"></Toggle>
            <Button className={'w-full rounded-lg p-3 text-center mt-5 bg-primary text-white '}>Create Account</Button>
        </motion.div>
    );
}

export default RegisterForm;
