import { TextMain, Button } from '../../../components';
import { CiDiscount1 } from 'react-icons/ci';
import { useLogin } from '../../../context/login';
import { request } from '../../../services';
import toast from 'react-hot-toast';
import { useLoading } from '../../../context/loadingContext';
import { useLocation, useNavigate } from 'react-router-dom';

function BuySummary({ data }) {
    const location = useLocation();
    const history = useNavigate();
    const { account } = useLogin();
    const { stopLoading, startLoading } = useLoading();
    const handleAddToCart = async () => {
        const dataReq = {
            memberId: account?.memberId,
            productId: data?.id,
        };

        try {
            await request('POST', '/api/v1/user/cart', dataReq)
                .then((response) => {
                    const data = response.data;
                    if (response.status === 200) {
                        toast.success('Add ' + data?.name + ' to cart successfully!');
                    } else {
                        toast.error(response.message);
                    }
                })
                .catch((error) => {
                    toast.error('add ' + data?.name + ' to cart failed');
                });
        } catch (error) {
            toast.error('add ' + data?.name + ' to cart failed');
        }
    };
    const addToCart = async () => {
        if (account === null) {
            toast('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!', {
                icon: '⚠️',
            });
            return;
        }

        startLoading();
        await handleAddToCart();
        stopLoading();
    };
    const handleBuyNow = async () => {
        if (account === null) {
            toast('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!', {
                icon: '⚠️',
            });
            return;
        }

        startLoading();
        await handleAddToCart();
        stopLoading();
        history('/cart');
    };
    return (
        <>
            {!location.pathname.includes('admin') && (
                <div className="min-w-[20rem] h-fit p-4 bg-light-tiny dark:bg-dark-tiny rounded-md ">
                    <TextMain className={'text-xl font-bold'}>Thanh toán ngay</TextMain>

                    <div className="mt-2 pt-4 border-dashed border-t-[1px] border-light-tiny dark:border-dark-tiny">
                        {account ? (
                            <div className="flex flex-col gap-4">
                                <Button className=" bg-primary text-center p-2 rounded-md" onClick={handleBuyNow}>
                                    Mua ngay
                                </Button>
                                <Button style={'outline'} onClick={addToCart}>
                                    Thêm vào giỏ hàng
                                </Button>
                            </div>
                        ) : (
                            <Button style={'outline'} onClick={() => history('/home')}>
                                Đăng nhập ngay
                            </Button>
                        )}
                    </div>
                    <div className="font-bold text-primary mt-2 pt-4 border-dashed border-t-[1px] border-light-tiny dark:border-dark-tiny">
                        ${data?.price}
                    </div>
                    <div className="mt-2 pt-4 border-dashed border-t-[1px] border-light-tiny dark:border-dark-tiny">
                        <TextMain>Giá cuối cùng</TextMain>
                        <div className="flex justify-between items-center">
                            <span className="line-through">đ{data?.price.toFixed(2)}</span>
                            <div className="text-sale flex justify-start items-center">
                                <CiDiscount1 className="w-8 h-8 brightness-75"></CiDiscount1>
                                <span>18%</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default BuySummary;
