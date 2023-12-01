import { motion } from 'framer-motion';
import { BsMinecartLoaded } from 'react-icons/bs';
import { MdOutlinePayments } from 'react-icons/md';
import { CiDeliveryTruck } from 'react-icons/ci';

const variants = {
    inActive: { width: 0 },
    active: { width: '100%' },
};

const variantsStep = {
    inActive: { scale: 1, rotate: 0 },
    active: { scale: 1.1, rotate: 360 },
};
function TimeLine({ active = 0, setActive = () => {} }) {
    const step = [
        {
            name: 'Giỏ hàng',
            icon: <BsMinecartLoaded className="w-6 h-6 "></BsMinecartLoaded>,
            step: 0,
        },
        {
            name: 'Thanh toán',
            icon: <CiDeliveryTruck className="w-6 h-6"></CiDeliveryTruck>,
            step: 1,
        },
        {
            name: 'Thanh toán',
            step: 2,
            icon: <MdOutlinePayments className="w-6 h-6 "></MdOutlinePayments>,
        },
    ];
    return (
        <div className="flex justify-center items-center">
            {step.map((st, index) => {
                return (
                    <div className="flex justify-start items-center cursor-pointer" key={index}>
                        <motion.div
                            onClick={() => setActive(index)}
                            variants={variantsStep}
                            animate={index <= active ? 'active' : 'inActive'}
                            className={`${
                                active === index ? 'bg-primary scale-125 text-white' : 'bg-light-tiny dark:bg-dark-tiny'
                            } rounded-full p-2  border-primary-style `}
                        >
                            {st.icon}
                        </motion.div>
                        {index < step.length - 1 && (
                            <div className="h-1 min-w-[20rem] border-b-primary">
                                <motion.div
                                    variants={variants}
                                    animate={index < active ? 'active' : 'inActive'}
                                    className="h-1  ww-full bg-primary"
                                ></motion.div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default TimeLine;
