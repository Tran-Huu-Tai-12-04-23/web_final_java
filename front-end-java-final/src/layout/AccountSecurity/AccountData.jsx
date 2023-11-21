import { InformationCard, TextMain, TextSub } from "../../components";
function AccountData(){
    return(
        <div className="flex-col">
        <div className="mt-24 w-[300px] h-20 px-2 flex-col justify-start items-start gap-2 inline-flex">
            <div className="text-neutral-950 font-medium"><TextMain>Security settings</TextMain></div>
            <div className="text-neutral-500 font-light ] leading-normal"><TextSub>Change password and phone number</TextSub></div>
        </div>
        <InformationContainer></InformationContainer>
        </div>
    );
}
const InformationContainer =() =>{
    return (
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex-col w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 sm:mb-0">
            <InformationCard cardTitle={"Phone number"}></InformationCard>
          </div>
          <div className="flex-col w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 xl:pl-40 xl:ml-10">
            <InformationCard cardTitle={"Password"}></InformationCard>
          </div>
        </div>
      );
};
export default AccountData;