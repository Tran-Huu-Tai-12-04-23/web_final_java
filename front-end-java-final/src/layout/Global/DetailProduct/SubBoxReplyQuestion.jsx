import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { Button } from '../../../components';
import { LiaCommentAltSolid } from 'react-icons/lia';
import { MdKeyboardArrowDown } from 'react-icons/md';

const variantsSubmenu = {
    active: { y: 0, scaleY: 1, opacity: 1 },
    inActive: { y: -200, scaleY: 0, opacity: 0 },
};
const variants = {
    active: { rotate: 0 },
    inActive: { rotate: 180 },
};
function SubBoxReplyQuestion({ data }) {
    const [modeFull, setModeFull] = useState(false);
    const [dataPres, setDataPres] = useState(data);

    useEffect(() => {
        if (modeFull) {
            setDataPres(data);
        } else {
            setDataPres(data.slice(0, 1));
        }
    }, [modeFull]);
    return (
        <>
            {data.map((rl, index) => {
                return (
                    <motion.div
                        variants={variantsSubmenu}
                        animate={modeFull || (index == 0 && !modeFull) ? 'active' : 'inActive'}
                        transition={{
                            duration: 0.3,
                        }}
                        key={index}
                    >
                        <div className="flex justify-between items-center">
                            <div className="flex justify-start items-center gap-4">
                                <img className="w-8 h-8 rounded-full" src={rl.avatar} alt="avatar user"></img>
                                <span>{rl.name}</span>
                            </div>
                            <span className="brightness-50">{rl.createAt}</span>
                        </div>
                        <div className="flex  p-4 mt-3 rounded-md justify-between items-end bg-light-tiny dark:bg-dark-tiny">
                            <span>{rl.content}</span>
                            <Button className="flex justify-start ml-4 items-center brightness-75 hover:text-primary cursor-pointer">
                                <LiaCommentAltSolid className="mr-1 w-6 h-6 "></LiaCommentAltSolid>

                                <span>Reply</span>
                            </Button>
                        </div>
                    </motion.div>
                );
            })}

            {data.length > 1 && (
                <div className="w-full">
                    <Button
                        onClick={() => setModeFull(!modeFull)}
                        className="float-right group  brightness-50 hover:text-primary hover:brightness-100 cursor-pointer flex justify-center items-center"
                    >
                        <motion.div variants={variants} animate={modeFull ? 'inActive' : 'active'}>
                            <MdKeyboardArrowDown className="w-6 h-6"></MdKeyboardArrowDown>
                        </motion.div>
                        <span>{modeFull ? 'Thu gọn' : 'Xem thêm'}</span>
                    </Button>
                </div>
            )}
        </>
    );
}

export default SubBoxReplyQuestion;
