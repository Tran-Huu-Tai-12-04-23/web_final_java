import { AccountMenu } from "../../components";
import LoginForm from "../../components/Header/LoginForm";
import InforConfigForm from "./InforConfigForm";
import NameConfigForm from "./NameConfigForm";
import PersonalData from "./PersonalData";
import ModalName from "./ModalName";
import { useState } from "react";
function AccountInfo(){
    const [modalName,setModalName] = useState(false);
    return(
        <div style={{display:'flex'}}>
        <AccountMenu></AccountMenu>
        <PersonalData></PersonalData>
        {/* <LoginForm></LoginForm> */}
        {/* <NameConfigForm></NameConfigForm> */}
        {/* {modalName && <ModalName onclose={(e) => setModalName(!modalName)}></ModalName>} */}
        </div>
    );
}
export default AccountInfo;