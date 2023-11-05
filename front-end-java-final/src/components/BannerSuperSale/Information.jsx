import Button from '../Button';
import TextMain from '../TextMain';
import TextSub from '../TextSub';
import { AiFillStar } from 'react-icons/ai';

function Information() {
    return (
        <div className="flex flex-col h-full gap-4">
            <h1 className={'text-sale font-bold text-2xl'}>FLash Sale in month {new Date().getMonth()}</h1>

            <h1 className="text-3xl max-w-[25rem]">Macbook Pro 2022 M2 Generation</h1>

            <div className="flex justify-start items-center">
                <div className="flex justify-start items-center">
                    <AiFillStar className="h-6 w-6 text-yellow-400"></AiFillStar>
                    <TextMain>4.9</TextMain>
                </div>
                <span className="ml-4 mr-4">/</span>
                <TextMain>232 reviews</TextMain>
            </div>
            <div className="flex justify-start items-center">
                <TextMain className={'text-yellow-400'}>30$</TextMain>
                <TextMain className="line-through ml-4">35$</TextMain>
            </div>
            <Button style="" className="text-white font-bold bg-primary p-4 rounded-full pl-5 pr-5 max-w-[20rem]">
                Add to cart
            </Button>
        </div>
    );
}

export default Information;
