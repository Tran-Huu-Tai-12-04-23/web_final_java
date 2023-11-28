import { BsMailbox } from "react-icons/bs";
import { CiDeliveryTruck } from "react-icons/ci";
import { GoInbox } from "react-icons/go";
import { TbBrandCodesandbox } from "react-icons/tb";
import TextMain from "../TextMain";
function NotificationItem({notiType,notiContent}) {
    const iconMap = {
        Email: <BsMailbox size={24}/>,
        Delivery: <CiDeliveryTruck size={24}/>,
        Inbox: <GoInbox size={24}/>,
        Availibility: <TbBrandCodesandbox size={24}/>,
      };
    const icon = iconMap[notiType] || <BsMailbox></BsMailbox>
    return (
      <div className="w-[400px] h-[110px] pl-2 flex-col justify-start items-start inline-flex">
        <div className="w-96 pr-2 justify-between items-center inline-flex">
          <div className="justify-start items-center gap-2 flex">
            <div className="w-6 h-6">
                {icon}
            </div>
            <div className="text-neutral-950 font-medium">
              <TextMain>{notiType}</TextMain>
            </div>
          </div>
  
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-rose-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-rose-500"></div>
          </label>
        </div>
        <div className="w-[300px] text-neutral-500 text-base font-light leading-normal">
            <TextMain>{notiContent}</TextMain>
        </div>
      </div>
    );
  }
  
  export default NotificationItem;
  