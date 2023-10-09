import { motion } from 'framer-motion';
import { Button, Input, TextMain, Toggle } from '../index';
import { CiMail } from 'react-icons/ci';
import { LiaKeySolid } from 'react-icons/lia';
import { Link } from 'react-router-dom';

import { RiFacebookLine } from 'react-icons/ri';
import { PiGoogleLogoLight } from 'react-icons/pi';

function LoginForm() {
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
            <TextMain className={'font-bold text-center text-xl mb-5'}>Login To Get Tech Device</TextMain>
            <Input
                placeholder="E-mail"
                className="mb-3 "
                iconLeft={<CiMail className="w-6 h-6 ml-2 text-gray-400"></CiMail>}
            ></Input>
            <Input
                placeholder="Password"
                type={'password'}
                iconLeft={<LiaKeySolid className="w-6 h-6 ml-2 text-gray-400"></LiaKeySolid>}
            ></Input>
            <Link to="" className="hover:text-primary text-sm w-full block text-right mt-2 ml-auto">
                Forgot password?
            </Link>
            <Toggle name="Save Me"></Toggle>

            <Button className={'w-full rounded-lg p-3 text-center mt-5 bg-primary text-white '}>LOGIN</Button>
            <motion.div className="flex justify-between items-center mt-5 ">
                <motion.div className="h-[1px] bg-gray-300 w-1/3"></motion.div>
                <TextMain>Or Login With</TextMain>
                <motion.div className="h-[1px] bg-gray-300 w-1/3"></motion.div>
            </motion.div>

            <motion.div className="flex justify-between items-center mt-3">
                <Button style="outline" className={'w-1/2 mr-4 p-3'}>
                    <PiGoogleLogoLight className="w-6 h-6 mr-1"></PiGoogleLogoLight>
                    <motion.span>Google</motion.span>
                </Button>
                <Button style="outline" className={'w-1/2 ml-4 p-3'}>
                    <RiFacebookLine className="w-6 h-6 mr-1"></RiFacebookLine>
                    <motion.span>Facebook</motion.span>
                </Button>
            </motion.div>
        </motion.div>
    );
}

export default LoginForm;
