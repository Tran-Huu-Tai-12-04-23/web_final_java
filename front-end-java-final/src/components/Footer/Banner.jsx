import { motion } from 'framer-motion';
import { Button, TextMain } from '../index';
function Banner() {
    return (
        <motion.div className="bg-[#f9b9c4] text-primary translate-y-1/2 m-auto p-4  xl:w-[70%] lg-w-[70%] md:w-[80%] w-full rounded-xl">
            <motion.h1 className="font-mono text-5xl mb-3 font-bold">Mua hàng với voucher giảm 20% cho đơn hàng đầu tiên</motion.h1>
            <TextMain className={'font-medium brightness-75'}>Đăng nhập đê nhập voucher ngáy.</TextMain>
            <motion.div className="h-[1px] w-full bg-btn-primary mt-5 mb-5"></motion.div>
            <Button className={'rounded-3xl p-2 pl-4 pr-4 '}>ĐĂNG NHẬP NGAY</Button>
        </motion.div>
    );
}

export default Banner;
