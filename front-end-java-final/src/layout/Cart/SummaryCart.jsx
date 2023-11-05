import { TextMain, Button, TextSub } from '../../components';

function SummaryCart({ setActiveStep = () => {} }) {
    return (
        <div className="w-full rounded-md p-4 border-primary-style">
            <TextMain className={'text-xxl font-bold pb-4 border-b-primary'}>Payment Details</TextMain>
            <div className="flex mt-5 justify-between items-center">
                <TextSub className={''}>Subtotal</TextSub>
                <TextSub className={''}>@$ 519.52</TextSub>
            </div>

            <div className="flex justify-between mt-3 items-center">
                <TextSub className={''}>Discount</TextSub>
                <TextSub className={''}>-$ 19.52</TextSub>
            </div>

            <div className="flex justify-between mt-3 items-center pb-4 border-b-primary">
                <TextSub className={''}>Shipment cost</TextSub>
                <TextSub className={''}>$ 0</TextSub>
            </div>
            <div className="flex mt-3 justify-between items-center pb-4 border-b-primary">
                <TextSub className={'font-bold'}>Grand total</TextSub>
                <TextSub className={'font-bold'}>$ 800</TextSub>
            </div>

            <Button className="p-2 rounded-md w-full bg-primary" onClick={() => setActiveStep(1)}>
                Process to checkout
            </Button>
        </div>
    );
}

export default SummaryCart;
