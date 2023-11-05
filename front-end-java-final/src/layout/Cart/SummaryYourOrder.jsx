import { TextMain, TextSub, Button } from '../../components';
import ItemOrderSummary from './ItemOrderSummary';

function SummaryYourOrder({ setActiveStep = () => {} }) {
    return (
        <div className="flex flex-col p-4 rounded-md border-primary-style">
            <TextMain className={'font-bold pb-3 text-xl border-b-primary'}>Your order</TextMain>

            <div className="flex flex-col mt-5 gap-4">
                <ItemOrderSummary></ItemOrderSummary>
                <ItemOrderSummary></ItemOrderSummary>
                <ItemOrderSummary></ItemOrderSummary>
                <ItemOrderSummary></ItemOrderSummary>
                <ItemOrderSummary></ItemOrderSummary>
            </div>

            <div className="flex mt-5 justify-between items-center border-t-primary pt-3">
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

            <Button className="p-2 rounded-md w-full bg-primary" onClick={() => setActiveStep(2)}>
                Continue to pay
            </Button>
        </div>
    );
}

export default SummaryYourOrder;
