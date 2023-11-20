import TextMain from "../TextMain";
import TextSub from "../TextSub";
import { MdOutlinePersonOutline,MdOutlineEmail } from "react-icons/md";
import { FaRegPenToSquare } from "react-icons/fa6";
import { FiPhone } from "react-icons/fi";
import { BsHouse } from "react-icons/bs";
import { IoKeyOutline } from "react-icons/io5";
import { BsSignpost2 } from "react-icons/bs";
function InformationCard({ userID,cardTitle }) {
  return (
    <>
      <RenderTitle cardTitle={cardTitle} />
      <RenderInformation cardTitle={cardTitle}></RenderInformation>
    </>
  );
}

function RenderTitle({ cardTitle }) {
  return <div className="text-neutral-500 ml-5 mt-4"><TextSub>{cardTitle}</TextSub></div>;
}
function RenderInformation({userID,cardTitle}){
    const getIcon = () => {
        switch (cardTitle.toLowerCase()){
            case "full name":
                return <MdOutlinePersonOutline size={24}></MdOutlinePersonOutline>;
            case "phone number":
                return <FiPhone size={24}></FiPhone>;
            case "address":
                return <BsHouse size={24}></BsHouse>;
            case "email address":
                return <MdOutlineEmail size={24}></MdOutlineEmail>;
            case "password":
                return <IoKeyOutline size={24}></IoKeyOutline>;
            case "postal":
                return <BsSignpost2 size={24}></BsSignpost2>
            default:
                return null;
        }
    };
    return(
        <>
        <div className="w-[400px] h-[80px] bg-stone-50 rounded-lg border border-neutral-100 justify-between items-center inline-flex">
            <div className="justify-start items-center ml-4">
                <div className="gap-4 flex">
                    <div>
                        {getIcon()}
                    </div>
                    <div className="w-[300px] text-neutral-500">
                        <TextMain>Nguyen Dat Khuong</TextMain>
                    </div>
                    <div>
                        <FaRegPenToSquare className="text-primary"></FaRegPenToSquare>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default InformationCard;
