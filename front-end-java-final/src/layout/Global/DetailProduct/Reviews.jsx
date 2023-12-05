import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { AnimateOpacity } from '../../../components/Animate';
import { Button, TextMain } from '../../../components';
import { LiaCommentAltSolid } from 'react-icons/lia';
import { MdKeyboardArrowDown } from 'react-icons/md';
import ReviewItems from './ReviewItem';

const variants = {
    active: { rotate: 0 },
    inActive: { rotate: 180 },
};
function Reviews({ data }) {
    // const data = [
    //     {
    //         name: 'Tran huu tai',
    //         rating: 5,
    //         content: 'Dien thoai dep qua',
    //         createAt: '22/10/2023',
    //     },
    //     {
    //         name: 'Tran huu tai',
    //         rating: 5,
    //         content: 'Dien thoai dep qua',
    //         createAt: '22/10/2023',
    //     },
    //     {
    //         name: 'Tran huu tai',
    //         rating: 5,
    //         content: 'Dien thoai dep qua',
    //         createAt: '22/10/2023',
    //     },
    // ];
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
        <AnimateOpacity className={'p-4 rounded-md'}>
            <TextMain className={'border-b-primary pb-3'}>Đánh giá</TextMain>

            <div className="flex flex-col gap-4 mt-5 border-primary-style rounded-md p-4">
                {data && (
                    <>
                        {dataPres.map((rv, index) => {
                            return <ReviewItems key={index} data={rv}></ReviewItems>;
                        })}

                        {data.length > 1 && (
                            <div className="w-full pr-5">
                                <Button
                                    onClick={() => setModeFull(!modeFull)}
                                    className="float-right group  brightness-50 hover:text-primary hover:brightness-100 cursor-pointer flex justify-center items-center"
                                >
                                    <motion.div variants={variants} animate={modeFull ? 'inActive' : 'active'}>
                                        <MdKeyboardArrowDown className="w-6 h-6"></MdKeyboardArrowDown>
                                    </motion.div>
                                    <span>{modeFull ? 'Less' : 'More'}</span>
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </AnimateOpacity>
    );
}

export default Reviews;
