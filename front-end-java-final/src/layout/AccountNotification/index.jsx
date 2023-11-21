import { AccountMenu } from "../../components";
import NotificationList from "./NotificationList";

function AccountNotification(){
    return (
        <div style={{display:"flex"}}>
            <AccountMenu></AccountMenu>
            <NotificationList></NotificationList>
        </div>
    );
}
export default AccountNotification;