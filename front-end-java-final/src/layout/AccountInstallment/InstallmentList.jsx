import { InstallmentItem } from "../../components";
function InstallmentList(){
    return(
        <div className="mt-36">
        <div className="w-[1224px] h-[62px] relative bg-stone-50">
            <div className="left-[476px] top-[27px] absolute text-center text-zinc-800 text-base font-medium font-['Inter']">Due Date</div>
            <div className="left-[308px] top-[27px] absolute text-center text-zinc-800 text-base font-medium font-['Inter']">Due Amount </div>
            <div className="left-[609px] top-[27px] absolute text-center text-zinc-800 text-base font-medium font-['Inter']">Actual Amount </div>
            <div className="left-[766px] top-[27px] absolute text-center text-zinc-800 text-base font-medium font-['Inter']">Payment Date  </div>
            <div className="left-[992px] top-[27px] absolute text-center text-zinc-800 text-base font-medium font-['Inter']">Status</div>
            <div className="left-[1151px] top-[27px] absolute text-center text-zinc-800 text-base font-medium font-['Inter']">Total  </div>
            <div className="left-[71px] top-[27px] absolute text-center text-zinc-800 text-base font-medium font-['Inter']">Description</div>
        </div>
        <InstallmentItem></InstallmentItem>
        </div>
    );
}
export default InstallmentList;