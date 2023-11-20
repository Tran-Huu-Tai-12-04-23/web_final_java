import { TextMain, TextSub,OrderItem } from "../../components";
import OrderNavBar from "./OrderNavBar";
// import OrderItem from "../../components";
function OrderList(){
    return (
        <div className="flex-col">
            <div className="ml-4 mt-24 flex-col justify-start items-start gap-2 inline-flex">
                <div><TextMain>Order History</TextMain></div>
                <div className="font-light"><TextSub>Track, return or purchase items</TextSub></div>
            </div> 
            <OrderNavBar></OrderNavBar>
            <div><OrderItem userName={"Nguyen Dat Khuong"}></OrderItem></div>
            <div><OrderItem userName={"Nguyen Dat Khuong"}></OrderItem></div>
            <div><OrderItem userName={"Nguyen Dat Khuong"}></OrderItem></div> 
        </div>
    );
}
function EmptyOrderList(){
    return(
        <div className="w-full sm:w-[496px] h-[338.57px] mx-auto px-3 py-8 rounded-[11.18px] shadow flex-col justify-center items-center gap-3 inline-flex">
            <img className="w-full h-full object-cover object-center rounded-[11.18px]" src="https://via.placeholder.com/400x400" alt="Placeholder Image" />
            <div className="text-center text-neutral-950 leading-7"><TextMain>You have not placed any orders yet</TextMain></div>
        </div>
    );
}
export default OrderList;