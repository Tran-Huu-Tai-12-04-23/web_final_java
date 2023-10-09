import { motion } from 'framer-motion';
import { Input, TextMain, Modal, Tabs } from '../index';
import { AiOutlineClose } from 'react-icons/ai';
import { AnimateHover } from '../Animate';
import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function ModalSign({ onClose = () => {} }) {
    const [y, setY] = useState(0);
    const [opacity, setOpacity] = useState(1);
    const [active, setActive] = useState(0);

    const handleClose = async () => {
        setY(-100);
        setOpacity(0);
        const waitClose = async () => {
            setTimeout(() => {
                onClose();
            }, 400);
        };
        await waitClose();
    };

    const tabs = [
        {
            name: 'LOGIN',
            tabContent: <LoginForm />,
        },
        {
            name: 'CREATE ACCOUNT',
            tabContent: <RegisterForm />,
        },
    ];
    return (
        <Modal>
            <motion.div
                initial={{
                    y: -100,
                    opacity: 0,
                }}
                animate={{
                    y: y,
                    opacity: opacity,
                }}
                exit={{
                    y: 100,
                    opacity: 0,
                }}
                transition={{
                    duration: 0.3,
                    ease: 'easeInOut',
                }}
                className="relative overflow-hidden p-10 min-h-[35rem] shadow-xl h-4/5  min-w-[30rem] bg-white dark:bg-dark w-1/3  rounded-xl flex flex-col "
            >
                <AnimateHover
                    onClick={handleClose}
                    className="absolute top-4 right-4 cursor-pointer hover:text-primary"
                >
                    <AiOutlineClose className="h-6 w-6" />
                </AnimateHover>
                <Tabs
                    tabs={tabs}
                    style="center"
                    classItem="w-1/2"
                    active={active}
                    setActive={(value) => setActive(value)}
                ></Tabs>
                {/* <Input className="w-[80%] bg-gray-100" placeholder="Enter keyword ... "></Input>

                <motion.div className="mt-5 flex justify-start items-center">
                    <TextMain className={'font-bold'}>The Most Searched Items</TextMain>
                    <AiOutlineFire className="w-6 h-6"></AiOutlineFire>
                </motion.div>
                <TextMain className={'hover:text-primary mt-2 underline m-auto'}>Watch More</TextMain> */}
            </motion.div>
        </Modal>
    );
}

export default ModalSign;
