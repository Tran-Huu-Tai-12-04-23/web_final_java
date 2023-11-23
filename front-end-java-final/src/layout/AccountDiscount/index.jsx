import { AccountMenu } from "../../components";
import DiscountSection from "./DiscountSection";

function AccountDiscount(){
    return(
        <div style={{display:"flex"}}>
            <AccountMenu></AccountMenu>
            <DiscountSection></DiscountSection>
        </div>
    );
}
export default AccountDiscount;