import { AccountMenu } from "../../components";
import AccountData from "./AccountData";

function AccountSecurity(){
    return(
        <div style={{display:"flex"}}>
            <AccountMenu></AccountMenu>
            <AccountData></AccountData>
        </div>
    );
}
export default AccountSecurity;