import { motion } from 'framer-motion';
import sony from '../../assets/img/sony.png';
import samsung from '../../assets/img/samsung.png';
import apple from '../../assets/img/apple.png';
import asus from '../../assets/img/asus.png';
import microsoft from '../../assets/img/microsoft.png';
function TopBranch() {
    return (
        <motion.div className="p-10">
            <motion.div className="flex justify-start items-center border-b-[1px] border-solid border-primary">
                <motion.h1 className="text-3xl font-bold">Top Branch</motion.h1>
            </motion.div>
            <motion.div className="flex justify-between items-center mt-10">
                <motion.img className="h-32" src={sony}></motion.img>
                <motion.img className="h-32" src={samsung}></motion.img>
                <motion.img className="h-32" src={apple}></motion.img>
                <motion.img className="h-32" src={microsoft}></motion.img>
                <motion.img className="h-32" src={asus}></motion.img>
            </motion.div>
        </motion.div>
    );
}

export default TopBranch;
