import { TextMain, Button } from '../../../components';
import { CiDiscount1 } from 'react-icons/ci';

function BuySummary() {
    return (
        <div className="min-w-[20rem] h-fit p-4 bg-light-tiny dark:bg-dark-tiny rounded-md ">
            <TextMain className={'text-xl font-bold'}>Pay now</TextMain>

            <div className="mt-2 pt-4 border-dashed border-t-[1px] border-light-tiny dark:border-dark-tiny">
                <div className="flex flex-col gap-4">
                    <Button className=" bg-primary text-center p-2 rounded-md">Buy now</Button>
                    <Button style={'outline'}>Add to cart</Button>
                </div>
            </div>
            <div className="font-bold text-primary mt-2 pt-4 border-dashed border-t-[1px] border-light-tiny dark:border-dark-tiny">
                $30.000
            </div>
            <div className="mt-2 pt-4 border-dashed border-t-[1px] border-light-tiny dark:border-dark-tiny">
                <TextMain>Last price</TextMain>
                <div className="flex justify-between items-center">
                    <span className="line-through">$30.000</span>
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
