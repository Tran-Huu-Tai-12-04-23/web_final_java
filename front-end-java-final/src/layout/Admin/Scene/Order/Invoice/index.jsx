import { TextMain, TextSub, Button } from '../../../../../components';
import SubHeader from '../../../Includes/SubHeader';
import { AiOutlinePrinter } from 'react-icons/ai';

function Invoice() {
    return (
        <div>
            <SubHeader nameHeader={'Invoice details'} sub="Invoice" main="Orders"></SubHeader>

            <div className="p-6 mt-5  max-w-screen-xl h-fit m-auto rounded-md bg-light-tiny dark:bg-dark-tiny">
                <div className="flex justify-between items-start border-b-primary pb-3">
                    <TextMain className={'font-serif font-bold text-xl text-primary'}>GETTECH</TextMain>

                    <div className="flex flex-col min-w-[20rem] gap-1">
                        <div className="flex justify-between items-center">
                            <TextSub>Email : </TextSub>
                            <TextMain>Huuaitran201@gmail.com</TextMain>
                        </div>
                        <div className="flex justify-between items-center">
                            <TextSub>Website : </TextSub>
                            <TextMain>gettech.com.vn</TextMain>
                        </div>
                        <div className="flex justify-between items-center">
                            <TextSub>Contact no : </TextSub>
                            <TextMain>+ 012 000 929</TextMain>
                        </div>
                        <div className="flex justify-between items-center">
                            <TextSub>Address : </TextSub>
                            <TextMain>458/21 HCM city</TextMain>
                        </div>
                        <div className="flex justify-between items-center">
                            <TextSub>Zip code : </TextSub>
                            <TextMain>650000</TextMain>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between  mt-3 items-center pb-3">
                    <div className="flex flex-col gap-2">
                        <TextMain>Invoice code</TextMain>
                        <TextSub className={'text-second'}>#invo001</TextSub>
                    </div>
                    <div className="flex flex-col gap-2">
                        <TextMain>Date</TextMain>
                        <TextSub className={'text-second'}>12/04/2003</TextSub>
                    </div>
                    <div className="flex flex-col gap-2">
                        <TextMain>Payment status</TextMain>
                        <TextSub className={'text-second'}>paid</TextSub>
                    </div>
                    <div className="flex flex-col gap-2">
                        <TextMain>Total amount</TextMain>
                        <TextSub className={'text-second'}>$ 755.96</TextSub>
                    </div>
                </div>
                <div className="flex flex-col gap-1 border-t-primary pt-3">
                    <TextMain className={'mb-2'}>Shipping Address</TextMain>
                    <TextSub className={'text-second'}>TranHuu Tai</TextSub>
                    <TextSub className={'text-second'}>459/21 hynh tan phat HCM city</TextSub>
                    <TextSub className={'text-second'}>+ 843 76 100 548</TextSub>
                </div>

                <div className="flex flex-col pb-3 border-b-primary">
                    <div className="mt-10 border-t-primary pt-3 bg-bg-light-menu dark:bg-bg-dark-menu p-2 flex justify-between items-center">
                        <TextMain>#</TextMain>
                        <TextMain>Product Details</TextMain>
                        <TextMain>Quantity</TextMain>
                        <TextMain>Cost</TextMain>
                    </div>
                    <div className=" p-2 flex justify-between items-center">
                        <TextMain>01</TextMain>
                        <TextMain>Lap top dell</TextMain>
                        <TextMain>1</TextMain>
                        <TextMain>$ 2000</TextMain>
                    </div>
                </div>
                <div className="flex w-[20rem] gap-3 mt-3 ml-auto flex-col">
                    <div className="flex w-full justify-between items-center">
                        <TextMain>Sub Total : </TextMain>
                        <TextSub>$ 359.96</TextSub>
                    </div>
                    <div className="flex w-full justify-between items-center">
                        <TextMain>Discount : </TextMain>
                        <TextSub>$53</TextSub>
                    </div>
                    <div className="flex w-full justify-between pb-2 border-b-primary items-center">
                        <TextMain>Shipping : </TextMain>
                        <TextSub>$ 13</TextSub>
                    </div>
                    <div className="flex w-full justify-between items-center">
                        <TextMain>Total : </TextMain>
                        <TextSub>$ 359.96</TextSub>
                    </div>
                </div>

                <div className="p-2 rounded-sm bg-status-inprogress mt-10">
                    <TextSub>
                        NOTES: All accounts are to be paid within 7 days from receipt of invoice. To be paid by cheque
                        or credit card or direct payment online. If account is not paid within 7 days the credits
                        details supplied as confirmation of work undertaken will be charged the agreed quoted fee noted
                        above.
                    </TextSub>
                </div>

                <div className="justify-end flex mt-4 pt-4 border-t-primary items-center">
                    <Button className="flex p-2  justify-center items-center gap-3 rounded-md bg-submit">
                        <AiOutlinePrinter className="w-4 h-4"></AiOutlinePrinter>
                        <span>Print</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Invoice;
