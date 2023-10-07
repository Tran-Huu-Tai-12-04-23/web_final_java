import { motion } from 'framer-motion';
import { HomeService } from '../../assets/data/index';
import { AnimateOpacity } from '../../components/Animate';

function ServiceHome() {
    const renderHomeService = () => {
        return HomeService.map((ser, index) => {
            return (
                <AnimateOpacity key={index} className={'w-1/3  scale-90 flex justify-center items-start'}>
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
        <AnimateOpacity className={'mt-20 -ml-10 -mr-10 h-[30rem] bg-second flex justify-between items-center'}>
            {renderHomeService()}
        </AnimateOpacity>
    );
}

export default ServiceHome;
