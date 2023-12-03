import { Button } from '../index';
import { motion } from 'framer-motion';
import { RiShoppingCart2Fill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import Constants from '../../Constants';
import { request } from '../../services';
import { useLogin } from '../../context/login';
import { useLoading } from '../../context/loadingContext';
import toast from 'react-hot-toast';

function CardNew({ width, data }) {
    const history = useNavigate();
    const { account } = useLogin();
    const { startLoading, stopLoading } = useLoading();

    const handleAddToCart = async () => {
        const dataReq = {
            memberId: account?.memberId,
            productId: data?.id,
        };

        startLoading();
        await request('POST', '/api/v1/user/cart', dataReq)
            .then((response) => {
                const data = response.data;
                if (response.status === 200) {
                    toast.success('Thêm ' + data?.name + ' vào giỏ hàng thành công!');
                } else {
                    console.error(response.message);
                    toast.error('Thêm ' + data?.name + ' vào giỏ hàng thất bại, vui lòng thử lại');
                }
            })
            .catch((error) => {
                toast.error('Thêm vào ' + data?.name + 'giỏ hàng thất bại');
            });
        stopLoading();
    };

    return (
        <motion.div
            onClick={() => history(`${Constants.PRODUCT}/${data?.id}`)}
            whileHover={{ scale: 1, transition: { duration: 0.3 } }}
            whileTap={{
                scale: 0.9,
                borderRadius: '10%',
                transition: { duration: 0.3 },
            }}
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            exit={{
                opacity: 0,
            }}
            transition={{
                duration: 0.3,
                ease: 'easeInOut',
            }}
            className={`${width}  cursor-pointer hover:brightness-125 dark:bg-btn-second bg-btn-second p-2 min-w-[15rem] rounded-lg overflow-hidden`}
        >
            <div className=" bg-[#ffffff] w-full rounded-lg flex items-center justify-center">
                <img src={data?.thumbnails} alt={data?.name} className="max-w-[10rem] w-1/2 rounded-lg"></img>
            </div>
            <div className="flex justify-center items-center flex-col">
                <h3 className="text-gray-400">{data?.category?.nameCategory}</h3>
                <h1 className="text-md font-medium w-[80%] truncate">{data?.name}</h1>

                <h5 className="text-md font-medium text-orange-400 mb-4 mt-2">₫ {data?.price.toFixed(2)}</h5>
                <Button
                    onClick={async (e) => {
                        e.stopPropagation();
                        if (account) {
                            await handleAddToCart();
                        } else {
                            toast.error('Vui lòng đăng nhập! Trước khi thêm.');
                        }
                    }}
                    className={'rounded-md p-2  text-white'}
                >
                    <RiShoppingCart2Fill className="w-6 text-primary dark:text-white h-6 hover:text-primary"></RiShoppingCart2Fill>
                </Button>
            </div>
        </motion.div>
    );
}

export default CardNew;
