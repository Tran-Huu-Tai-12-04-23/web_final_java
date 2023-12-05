import { useState } from 'react';

import { motion } from 'framer-motion';
import { Button } from '../../../components';

import { FiTrash2 } from 'react-icons/fi';
import { MdEditNote } from 'react-icons/md';
import { BsEye } from 'react-icons/bs';
import { Rating } from 'flowbite-react';

const variantsTool = {
    active: { y: 0, scaleY: 1, opacity: 1 },
    inActive: { y: 50, scaleY: 0, opacity: 0 },
};
function ReviewItems({ data = {} }) {
    const [openTool, setOpenTool] = useState(false);
    console.log(data);
    return (
        <div
            onMouseLeave={(e) => setOpenTool(false)}
            onMouseEnter={(e) => setOpenTool(true)}
            className=" overflow-hidden bg-light-tiny p-2 rounded-md dark:bg-dark-tiny cursor-pointer"
        >
            <div className="flex justify-between items-center">
                <div className="flex justify-start items-center gap-4">
                    <img
                        className="w-8 h-8 rounded-full"
                        src={'https://themesbrand.com/velzon/html/default/assets/images/users/avatar-3.jpg'}
                        alt="avatar user"
                    ></img>
                    <span>{data.member.name}</span>
                </div>
                <span className="brightness-50">{new Date(data.createAt).toLocaleDateString()}</span>
            </div>
            <div class="flex mt-4 mb-2 items-center space-x-1">
                <Rating>
                    <Rating.Star filled={data.star > 0} />
                    <Rating.Star filled={data.star > 1} />
                    <Rating.Star filled={data.star > 2} />
                    <Rating.Star filled={data.star > 3} />
                    <Rating.Star filled={data.star > 4} />
                </Rating>
            </div>

            <div className="flex  border-t-primary justify-between items-end">
                <p>{data.content}</p>
            </div>
        </div>
    );
}

export default ReviewItems;
