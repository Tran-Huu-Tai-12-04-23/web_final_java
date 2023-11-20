import { TextMain, TextSub,OrderItem } from "../../components";
// import OrderItem from "../../components";
function OrderList(){
    return (
        <div className="flex-col">
        <div className="ml-4 mt-24 flex-col justify-start items-start gap-2 inline-flex">
                <div><TextMain>Order History</TextMain></div>
            <div className="font-light"><TextSub>Track, return or purchase items</TextSub></div>
        </div> 
        <div><OrderItem userName={"Nguyen Dat Khuong"}></OrderItem></div>
        <div><OrderItem userName={"Nguyen Dat Khuong"}></OrderItem></div>
        <div><OrderItem userName={"Nguyen Dat Khuong"}></OrderItem></div>
        </div>
    );
}
export default OrderList;