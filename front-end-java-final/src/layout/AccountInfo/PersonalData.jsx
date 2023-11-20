import { InformationCard, TextMain, TextSub } from "../../components";

function PersonalData(){
    return(
        <div className="flex-col">
            <div className="w-[141px] mt-24 h-14 flex-col justify-start items-start gap-2 inline-flex">
                <div className="text-neutral-950 "><TextMain>Identification</TextMain></div>
                <div className="text-neutral-500 leading-normal"><TextSub>Verify your identity</TextSub></div>
            </div>
            <InfomationContainer></InfomationContainer>
        </div>
    );
}
function InfomationContainer() {
    return (
      <div className="flex flex-wrap gap-4 mt-4">
        <div className="flex-col w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 sm:mb-0 mt-4">
          <InformationCard cardTitle={"Full name"}></InformationCard>
          <InformationCard cardTitle={"Phone number"}></InformationCard>
          <InformationCard cardTitle={"Address"}></InformationCard>
        </div>
        <div className="flex-col w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 xl:pl-40 xl:ml-10">
          <InformationCard cardTitle={"Email Address"}></InformationCard>
          <InformationCard cardTitle={"Password"}></InformationCard>
          <InformationCard cardTitle={"Postal"}></InformationCard>
        </div>
      </div>
    );
  }  
export default PersonalData;