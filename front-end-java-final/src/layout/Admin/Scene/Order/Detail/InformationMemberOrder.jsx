import { Button, TextMain, TextSub } from '../../../../../components';
import { AiOutlinePhone, AiOutlineMail } from 'react-icons/ai';
import { CiLocationArrow1 } from 'react-icons/ci';
import { MdPayments } from 'react-icons/md';

function InformationMemberOrder() {
    return (
        <div className=" w-full flex flex-col gap-4">
            {/* information user */}
            <div className="bg-light-tiny dark:bg-dark-tiny w-full p-4  rounded-md">
                <div className="flex justify-between items-center pb-2 border-b-primary">
                    <TextMain>Customer Details</TextMain>

                    <Button className="underline text-blue-700">View profile</Button>
                </div>

                <div className="flex flex-col mt-4 gap-3">
                    <img
                        src="https://themesbrand.com/velzon/html/default/assets/images/users/avatar-3.jpg"
                        className="w-10 h-10 rounded-md"
                    ></img>
                    <div className="flex justify-start items-center gap-3">
                        <AiOutlineMail className="w-4 h-4"></AiOutlineMail>
                        <TextMain>huutaitran@gmail.com</TextMain>
                    </div>
                    <div className="flex justify-start items-center gap-3">
                        <AiOutlinePhone className="w-4 h-4"></AiOutlinePhone>
                        <TextMain>0376100548</TextMain>
                    </div>
                </div>
            </div>

            {/* address */}
            <div className="bg-light-tiny dark:bg-dark-tiny w-full p-4  rounded-md">
                <div className="flex justify-start items-center gap-3 pb-3 border-b-primary">
                    <CiLocationArrow1 className="w-4 h-4"></CiLocationArrow1>
                    <TextMain>Shipping address</TextMain>
                </div>

                <div className="flex flex-col gap-3">
                    <TextMain className={'font-bold'}>Tran Huu Tai</TextMain>
                    <TextSub className={''}>+84 376 100548</TextSub>
                    <TextSub className={''}>458/21 Huynh tan phat, Quan 7, Phuong binh thuan</TextSub>
                    <TextSub className={''}>Viet Nam</TextSub>
                </div>
            </div>

            <div className="bg-light-tiny dark:bg-dark-tiny w-full p-4  rounded-md">
                <div className="flex justify-start items-center gap-3 pb-3 border-b-primary">
                    <MdPayments className="w-4 h-4"></MdPayments>
                    <TextMain>Payment details</TextMain>
                </div>

                <div className="flex flex-col gap-3 mt-2">
                    <div className="flex justify-start items-center gap-3">
                        <TextSub className={''}>Payment method : </TextSub>
                        <TextSub className={'font-bold'}>Debit card</TextSub>
                    </div>
                    <div className="flex justify-start  items-center gap-3">
                        <TextSub className={''}>Total : </TextSub>
                        <TextSub className={'font-bold'}>$ 200</TextSub>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InformationMemberOrder;
