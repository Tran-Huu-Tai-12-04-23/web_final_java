import { motion } from 'framer-motion';
import { CardMain } from '../../components';
function BestSeller() {
    const items = [1, 2, 3, 4, 5, 6];
    return (
        <motion.div className="p-10">
            <motion.div className="flex justify-between items-center border-b-[1px] border-solid border-primary">
                <motion.h1 className="text-3xl font-bold">Best Seller</motion.h1>
                <motion.h4 className="underline cursor-pointer hover:text-primary">View All</motion.h4>
            </motion.div>
            <motion.div className="flex justify-between items-center mt-10 overflow-hidden">
                {items.map((item, index) => {
                    return (
                        <motion.div className="w-1/5 flex-shrink-0 scale-90" key={index}>
                            <CardMain></CardMain>
                        </motion.div>
                    );
                })}{' '}
            </motion.div>
        </motion.div>
    );
}

export default BestSeller;
