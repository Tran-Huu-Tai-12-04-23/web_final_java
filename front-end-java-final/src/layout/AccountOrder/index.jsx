import { AccountMenu } from "../../components";
import OrderList from "./OrderList";
import OrderNavBar from "./OrderNavBar";
import OrderStatus from "./OrderStatus";
function AccountOrder(){
    return(
        <>
        <div style={{display:'flex'}}>
            <AccountMenu></AccountMenu>
            <OrderList></OrderList>
            <OrderStatus></OrderStatus>
        </div>
        </>
    );
}
export default AccountOrder;