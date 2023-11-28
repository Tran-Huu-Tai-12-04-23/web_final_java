import { TextMain, Button } from '../../../components';
import { CiDiscount1 } from 'react-icons/ci';
import { useLogin } from '../../../context/login';
import { request } from '../../../services';
import toast from 'react-hot-toast';
import { useLoading } from '../../../context/loadingContext';
import { useNavigate } from 'react-router-dom';

function BuySummary({ data }) {
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
            toast('Please sign in to add product to cart!', {
                icon: '⚠️',
            });

            return;
        }

        startLoading();
        await handleAddToCart();
        stopLoading();
    };
    return (
        <div className="min-w-[20rem] h-fit p-4 bg-light-tiny dark:bg-dark-tiny rounded-md ">
            <TextMain className={'text-xl font-bold'}>Pay now</TextMain>

            <div className="mt-2 pt-4 border-dashed border-t-[1px] border-light-tiny dark:border-dark-tiny">
                <div className="flex flex-col gap-4">
                    <Button
                        className=" bg-primary text-center p-2 rounded-md"
                        onClick={async () => {
                            await addToCart();
                            history('/cart');
                        }}
                    >
                        Buy now
                    </Button>
                    <Button style={'outline'} onClick={addToCart}>
                        Add to cart
                    </Button>
                </div>
            </div>
            <div className="font-bold text-primary mt-2 pt-4 border-dashed border-t-[1px] border-light-tiny dark:border-dark-tiny">
                ${data?.price}
            </div>
            <div className="mt-2 pt-4 border-dashed border-t-[1px] border-light-tiny dark:border-dark-tiny">
                <TextMain>Last price</TextMain>
                <div className="flex justify-between items-center">
                    <span className="line-through">${data?.price}</span>
                    <div className="text-sale flex justify-start items-center">
                        <CiDiscount1 className="w-8 h-8 brightness-75"></CiDiscount1>
                        <span>18%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BuySummary;