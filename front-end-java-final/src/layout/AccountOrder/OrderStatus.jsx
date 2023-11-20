import React from 'react';
import { OrderDetailItem, TextMain,TextSub } from '../../components';
import { CiShoppingBasket,CiDeliveryTruck } from "react-icons/ci";
import { TbProgress } from "react-icons/tb";
import { BsHouseCheck } from "react-icons/bs";
const OrderStatus = () => (
  <div className="flex-col">
    <div className="ml-4 mt-24 flex-col justify-start items-start gap-2 inline-flex">
      <div><TextMain>Order History</TextMain></div>
      <div className="font-light"><TextSub>Track, return, or purchase items</TextSub></div>
    </div>
    <OrderCurrentStatus orderStatus={"Delivered"}></OrderCurrentStatus>
    <GetOrderInformation orderID="#1234213"></GetOrderInformation>
    <GetOrderItems className="mt-4"></GetOrderItems>
  </div>
);
const GetOrderItems = ({orderID}) =>{
    const productId = [];
    const items = [];
    for(let i = 0; i< 3;i++){
        items.push(<OrderDetailItem productId={i}></OrderDetailItem>)
    }
    return <>{items}</>
};
const GetOrderInformation = ({ orderID }) => {
    const date = "20/11/2023";
    const address = "District 7, Ho Chi Minh City";
    const paymentType = "Online banking";
    const transId = "23453477";
    const amountPaid = "$543.45";
    return (
      <>
        <OrderInfoField fieldName={"Order code:"} fieldContent={orderID} />
        <OrderInfoField fieldName={"Placed on:"} fieldContent={date} />
        <OrderInfoField fieldName={"Sent to:"} fieldContent={address} />
        <OrderInfoField fieldName={"Payment type:"} fieldContent={paymentType} />
        <OrderInfoField fieldName={"Transaction id:"} fieldContent={transId} />
        <OrderInfoField fieldName={"Amount Paid"} fieldContent={amountPaid} />
      </>
    );
};
  
const OrderInfoField = ({ fieldName, fieldContent }) => (
    <>
      <div className="w-[500px] h-14 pl-3 py-3.5 bg-stone-50 rounded-tl-lg rounded-bl-lg justify-start items-center gap-2.5 inline-flex mt-4">
        <div className="text-zinc-800 text-base font-medium font-['Inter']"><TextMain>{fieldName}</TextMain></div>
      </div>
      <div className="w-[496px] h-14 pl-3 py-4 justify-start items-center gap-2.5 inline-flex">
        <div className="text-neutral-700 text-base font-light font-['Inter'] leading-normal"><TextMain>{fieldContent}</TextMain></div>
      </div>
    </>
);
  const OrderCurrentStatus = ({ orderStatus }) => (
    <div className="w-[1000px] h-[300px] relative bg-stone-50 rounded-lg flex justify-center items-center mt-4">
      <OrderFinishedPercentage className="mt-0" orderStatus={orderStatus} />
      <GetOrderStatusSteps orderStatus={orderStatus}></GetOrderStatusSteps>
      <GetOrderMessage orderStatus={orderStatus}></GetOrderMessage>
    </div>
  );

  const GetOrderMessage =({orderStatus})=>{
    switch(orderStatus){
        case 'Order Placed':
            return(
                <div className="w-[484px] text-neutral-950 font-light mb-0 absolute bottom-4 text-center">
                    <TextMain />Your order has been recorded, we will process it soon.
                </div>
            );
        case 'Processing':
            return(
                <div className="w-[484px] text-neutral-950 font-light mb-0 absolute bottom-4 text-center">
                    <TextMain />Please wait, we are still processing your order.
                </div>
            );
        case 'On the way':
            return(
                <div className="w-[484px] text-neutral-950 font-light mb-0 absolute bottom-4 text-center">
                    <TextMain />Your order is on the way, it's comming soon.
                </div>
            );
        case "Delivered":
            return(
                <div className="w-[484px] text-neutral-950 font-light mb-0 absolute bottom-4 text-center">
                    <TextMain />Your order has been delivered successfully. Thank you.
                </div>
            );
        default:
            return null;
    }
}
const GetOrderStatusSteps =({orderStatus})=>{
    switch(orderStatus){
        case 'Order Placed':
            return(
                <div className="left-[120px] top-[100px] absolute justify-start items-center inline-flex">
                    <StatusStep color="rose-400" text="Order Placed" orderStatus={"Order Placed"} icon={<CiShoppingBasket size={100} className='text-white'></CiShoppingBasket>} />
                    <StatusStep color="neutral-400" text="Processing" orderStatus={"Processing"} icon ={<TbProgress size={100} className='text-white'></TbProgress>}/>
                    <StatusStep color="neutral-400" text="On the way" orderStatus={"On the way"} icon={<CiDeliveryTruck size={100} className='text-white'></CiDeliveryTruck>}/>
                    <StatusStep color="neutral-400" text="Delivered" orderStatus={"Delivered"} icon={<BsHouseCheck className='text-white' size={100}></BsHouseCheck>}/>
                 </div>
            );
        case 'Processing':
            return(
                <div className="left-[120px] top-[100px] absolute justify-start items-center inline-flex">
                    <StatusStep color="rose-100" text="Order Placed" orderStatus={"Order Placed"} icon={<CiShoppingBasket size={100} className='text-white'></CiShoppingBasket>} />
                    <StatusStep color="rose-400" text="Processing" orderStatus={"Processing"} icon ={<TbProgress size={100} className='text-white'></TbProgress>}/>
                    <StatusStep color="neutral-400" text="On the way" orderStatus={"On the way"} icon={<CiDeliveryTruck size={100} className='text-white'></CiDeliveryTruck>}/>
                    <StatusStep color="neutral-400" text="Delivered" orderStatus={"Delivered"} icon={<BsHouseCheck className='text-white' size={100}></BsHouseCheck>}/>
                </div>
            );
        case 'On the way':
            return(
                <div className="left-[120px] top-[100px] absolute justify-start items-center inline-flex">
                    <StatusStep color="rose-100" text="Order Placed" orderStatus={"Order Placed"} icon={<CiShoppingBasket size={100} className='text-white'></CiShoppingBasket>} />
                    <StatusStep color="rose-100" text="Processing" orderStatus={"Processing"} icon ={<TbProgress size={100} className='text-white'></TbProgress>}/>
                    <StatusStep color="rose-400" text="On the way" orderStatus={"On the way"} icon={<CiDeliveryTruck size={100} className='text-white'></CiDeliveryTruck>}/>
                    <StatusStep color="neutral-400" text="Delivered" orderStatus={"Delivered"} icon={<BsHouseCheck className='text-white' size={100}></BsHouseCheck>}/>
                </div>
            );
        case "Delivered":
            return(
                <div className="left-[120px] top-[100px] absolute justify-start items-center inline-flex">
                    <StatusStep color="rose-100" text="Order Placed" orderStatus={"Order Placed"} icon={<CiShoppingBasket size={100} className='text-white'></CiShoppingBasket>} />
                    <StatusStep color="rose-100" text="Processing" orderStatus={"Processing"} icon ={<TbProgress size={100} className='text-white'></TbProgress>}/>
                    <StatusStep color="rose-100" text="On the way" orderStatus={"On the way"} icon={<CiDeliveryTruck size={100} className='text-white'></CiDeliveryTruck>}/>
                    <StatusStep color="rose-400" text="Delivered" orderStatus={"Delivered"} icon={<BsHouseCheck className='text-white' size={100}></BsHouseCheck>}/>
                </div>
            );
        default:
            return null;
    }
}
const StatusStep = ({ color, text,icon }) => (
    <div className="flex-col justify-center items-center gap-1 inline-flex">
        <div className="justify-center items-center gap-0.5 inline-flex">
            <div className="w-14 h-[0px] relative" />
        <div className={`w-12 h-12 bg-${color} rounded-[100px] justify-center items-center gap-2.5 flex`}>
            {icon && (
            <div className="w-8 h-8 justify-center items-center flex">
                {icon}
            </div>
            )}
        </div>
        <div className="w-14 h-[0px] relative" /></div>  
        <div className="self-stretch justify-center items-center inline-flex">
            <div className={`grow shrink basis-0 text-center text-${color} text-sm font-medium font-['Inter']`}>
                {text}
            </div>
        </div>
    </div>
);
const OrderFinishedPercentage = ({orderStatus})=>(
    <div className="w-[200px] h-[45px] flex-col gap-4 inline-flex absolute top-10">
        <div className="justify-start items-start gap-2 inline-flex">
                {orderStatus === 'Order Placed' && (
                <div className="flex-col">
                    <div className="text-center text-neutral-700"><TextMain>25% Completed</TextMain></div>
                    <ProcessingBar percentage={100}></ProcessingBar>
                </div>
                )}
                {orderStatus === 'Processing' && (
                <div className="flex-col">
                    <div className="text-center text-neutral-700"><TextMain>50% Completed</TextMain></div>
                    <ProcessingBar percentage={50}></ProcessingBar>
                </div>
                )}
                {orderStatus === 'On the way' && (
                <div className="flex-col">
                    <div className="text-center text-neutral-700"><TextMain>75% Completed</TextMain></div>
                    <ProcessingBar percentage={75}></ProcessingBar>
                </div>
                )}
                {orderStatus === 'Delivered' && (
                <div className="flex-col">
                    <div className="text-center text-neutral-700"><TextMain>100% Completed</TextMain></div>
                    <ProcessingBar percentage={100}></ProcessingBar>
                </div>
                )}
        </div>
    </div>
);
const ProcessingBar = ({ percentage }) => (
    <div className="bg-neural-400 h-1 w-full">
      <div
        className="h-full bg-rose-100"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
  
export default OrderStatus;
