import { useState } from 'react';

import { motion } from 'framer-motion';
import { Button, TextMain } from '../../../components';

import { FiTrash2 } from 'react-icons/fi';
import { MdEditNote } from 'react-icons/md';
import { BsEye } from 'react-icons/bs';

const variantsTool = {
    active: { y: 0, scaleY: 1, opacity: 1 },
    inActive: { y: 50, scaleY: 0, opacity: 0 },
};
function ReviewItems({ data = {} }) {
    const [openTool, setOpenTool] = useState(false);
    return (
        <div
            onMouseLeave={(e) => setOpenTool(false)}
            onMouseEnter={(e) => setOpenTool(true)}
            className=" overflow-hidden bg-light-tiny p-2 rounded-md dark:bg-dark-tiny hover:brightness-125 cursor-pointer"
        >
            <div className="flex justify-between items-center">
                <div className="flex justify-start items-center gap-4">
                    <img className="w-8 h-8 rounded-full" src={data.avatar} alt="avatar user"></img>
                    <span>{data.name}</span>
                </div>
                <span className="brightness-50">{data.createAt}</span>
            </div>
            <div class="flex mt-4 mb-2 items-center space-x-1">
                <svg
                    class="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                    class="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                    class="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                    class="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                    class="w-4 h-4 text-gray-300 dark:text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
            </div>

            <div className="flex  border-t-primary justify-between items-end">
                <p>{data.content}</p>

                <motion.div
                    variants={variantsTool}
                    transition={{
                        duration: 0.2,
                    }}
                    animate={openTool ? 'active' : 'inActive'}
                    className="flex justify-end items-center gap-2"
                >
                    <Button>
                        <BsEye className=" w-6 h-6 brightness-75 hover:brightness-100 hover:primary"></BsEye>
                    </Button>
                    <Button>
                        <MdEditNote className="hover:text-blue-600  w-6 h-6 brightness-75 hover:brightness-100 hover:primary"></MdEditNote>
                    </Button>
                    <Button>
                        <FiTrash2 className="hover:text-primary w-6 h-6 brightness-75 hover:brightness-100 hover:primary"></FiTrash2>
                    </Button>
                </motion.div>
            </div>
        </div>
    );
}

export default ReviewItems;
