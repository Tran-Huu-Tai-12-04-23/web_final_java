import { NotificationItem, TextMain, TextSub } from "../../components";

function NotificationList(){
    return(
        <div className="flex-col">
            <div className="mt-24 w-[300px] h-20 px-2 flex-col justify-start items-start gap-2 inline-flex">
                <div className="text-neutral-950 font-medium "><TextMain>Notification</TextMain></div>
                <div className="text-neutral-500 font-light leading-normal"><TextSub>Manage your notification settings</TextSub></div>
            </div>
            <div>
                {renderNotiFiled}
            </div>
            <NotificationItem notiType={"Email"} notiContent={"We write emails to let you know what's important, like: new order, confirmations"}></NotificationItem>
            <NotificationItem notiType={"Delivery"} notiContent={"You will be noticed once the order is delivered"}></NotificationItem>
            <NotificationItem notiType={"Inbox"} notiContent={"Receive notifications about your order status, promotions and other updates"}></NotificationItem>
            <NotificationItem notiType={"Availibility"} notiContent={"You will be noticed when products gets available"}></NotificationItem>
        </div>
    );
}
function renderNotiFiled(){
    return (
        <NotificationItem></NotificationItem>
    );
}
export default NotificationList;