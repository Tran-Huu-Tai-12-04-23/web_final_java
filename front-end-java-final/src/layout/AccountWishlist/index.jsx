import { AccountMenu } from "../../components"
import WishlistList from "./WishlistList";

function AccountWishlist(){
    return (
        <div style={{display:"flex"}}>
            <AccountMenu></AccountMenu>
            <WishlistList></WishlistList>
        </div>
    );
}
export default AccountWishlist;