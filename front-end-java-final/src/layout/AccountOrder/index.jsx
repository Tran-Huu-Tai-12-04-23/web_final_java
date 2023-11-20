import { AccountMenu } from "../../components";
import OrderList from "./OrderList";
function AccountOrder(){
    return(
        <>
        <div style={{display:'flex'}}>
            <AccountMenu></AccountMenu>
            <OrderList></OrderList>
        </div>
        </>
    );
}
export default AccountOrder;