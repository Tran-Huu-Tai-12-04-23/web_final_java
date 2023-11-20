import AccountMenu from "../../components/AccountMenu";
import InstallmentList from "./InstallmentList";
function AccountInstallment(){
    return(
        <div style={{display:'flex'}}>
            <AccountMenu></AccountMenu>
            <InstallmentList></InstallmentList>
        </div>
    );
}
export default AccountInstallment;