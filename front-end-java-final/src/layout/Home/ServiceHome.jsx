import { motion } from 'framer-motion';
import { HomeService } from '../../assets/data/index';
import { AnimateOpacity } from '../../components/Animate';

function ServiceHome() {
    const renderHomeService = () => {
        return HomeService.map((ser, index) => {
            return (
                <AnimateOpacity
                    key={index}
                    className={
                        'xl:w-1/3 lg:1/3 w-full xl:pt-0 xl:pb-0 lg:pt-0 lg:pb-0 pt-10 pb-10  scale-90 flex justify-center items-start'
                    }
                >
                    {ser.icon}
                    <motion.div className="">
                        <motion.h2 className="mb-4 font-bold text-xl ">{ser.name}</motion.h2>
                        <motion.h5 className={'h-32 text-lg'}>{ser.description}</motion.h5>
                    </motion.div>
                </AnimateOpacity>
            );
        });
    };
    return (
        <AnimateOpacity className={' -ml-10 flex-wrap -mr-10 min-h-[30rem] flex justify-between items-center'}>
            {renderHomeService()}
        </AnimateOpacity>
    );
}

export default ServiceHome;
