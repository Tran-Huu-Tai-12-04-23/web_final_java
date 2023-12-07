import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { Button } from '../../../components';
import { LiaCommentAltSolid } from 'react-icons/lia';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useLoading } from '../../../context/loadingContext';
import { request } from '../../../services';

const variantsSubmenu = {
    active: { y: 0, scaleY: 1, opacity: 1 },
    inActive: { y: -200, scaleY: 0, opacity: 0 },
};
const variants = {
    active: { rotate: 0 },
    inActive: { rotate: 180 },
};
function SubBoxReplyQuestion({ data, questionId }) {
    const { startLoading, stopLoading } = useLoading();
    const [dataPres, setDataPres] = useState(null);

    const getReplyQuestion = async () => {
        startLoading();
        await request('GET', `/api/v1/public/product/reply-question/${questionId}`)
            .then((res) => {
                res.data && setDataPres(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
        stopLoading();
    };

    useEffect(() => {
        if (questionId) {
            getReplyQuestion();
        }
    }, [questionId]);
    return (
        <>
            {dataPres &&
                dataPres.map((rl, index) => {
                    return (
                        <motion.div key={index} className="bg-status-pending pl-4 pr-4 rounded-md p-2">
                            <div className="flex justify-between items-center">
                                <div className="flex justify-start items-center gap-4">
                                    <span>{'ADMIN'}</span>
                                </div>
                                <span className="brightness-50">{new Date(rl.createAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex rounded-md justify-between items-end">
                                <span>{rl.content}</span>
                            </div>
                        </motion.div>
                    );
                })}
        </>
    );
}

export default SubBoxReplyQuestion;
