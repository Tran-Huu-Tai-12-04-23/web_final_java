import { motion } from 'framer-motion';
import { Input, Button } from '../index';
import { AiOutlineClose } from 'react-icons/ai';
import { AnimateHover } from '../Animate';
import { useState } from 'react';
import { useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useSearch } from '../../context/search';
import Constants from '../../Constants';
import { useLocation, useNavigate } from 'react-router-dom';

function ModalSearch({ onClose = () => {} }) {
    const history = useNavigate();
    const location = useLocation();
    const { key, search } = useSearch();
    const [y, setY] = useState(0);
    const [opacity, setOpacity] = useState(1);
    const [searchInput, setSearchInput] = useState('');

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

    useEffect(() => {
        window.addEventListener('click', handleClose);

        return () => {
            window.removeEventListener('click', handleClose);
        };
    }, []);
    return (
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
            onClick={(e) => e.stopPropagation()}
            className="fixed  z-[1000000] top-0 left-0 right p-4 w-full h-[header] shadow-xl  bg-white dark:bg-dark flex flex-col "
        >
            <div className="flex  select-none justify-between gap-2 items-center">
                <Input
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            if (!location.pathname.includes(Constants.PRODUCT)) {
                                history(Constants.PRODUCT);
                            }
                            search(searchInput);
                            handleClose();
                        }
                    }}
                    className="w-full"
                    placeholder="Enter keyword ... "
                ></Input>
                <Button
                    className="bg-primary text-white flex-shrink-0 rounded-md ml-5 p-2 flex justify-center items-center"
                    style=""
                    onClick={() => {
                        if (!location.pathname.includes(Constants.PRODUCT)) {
                            history(Constants.PRODUCT);
                        }
                        search(searchInput);
                    }}
                >
                    <AiOutlineSearch className="w-6 h-6" />
                    <div>Tìm kiếm</div>
                </Button>
                <AnimateHover onClick={handleClose} className="cursor-pointer hover:text-primary">
                    <AiOutlineClose className="h-6 w-6" />
                </AnimateHover>
            </div>
        </motion.div>
    );
}

export default ModalSearch;
