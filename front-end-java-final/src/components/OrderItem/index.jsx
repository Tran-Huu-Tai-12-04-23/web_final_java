import TextMain from "../TextMain";
import TextSub from "../TextSub";

function OrderItem({userName,orderStatus}) {
  const orderStatsSec = () => {
    switch(orderStatus){
      case "Delivered":
        return renderOrderDoneSection();
      default:
        return renderOrderStatusSection();
    }
  }
  return (
    <div className="w-[1300px] h-[300px] p-4 bg-white rounded-lg flex-col justify-center items-center gap-6 inline-flex">
      <div className="self-stretch p-4 bg-neutral-100 rounded justify-between items-center inline-flex">
        {renderInfoSection("Order code", "#1050486")}
        {renderInfoSection("Placed on", "2023/04/15")}
        {renderInfoSection("Total", "$543.02")}
        {renderInfoSection("Sent to", userName, true)}
        {orderStatsSec()}
      </div>
      <div className="self-stretch py-0.5 bg-white justify-start items-center gap-5 inline-flex">
        {renderOrderImages()}
      </div>
    </div>
  );
}
  
  function renderInfoSection(title, value, isName = false) {
    return (
      <div className="grow shrink basis-0 flex-col justify-start items-center gap-6 inline-flex">
        <div className="text-center"><TextMain>{title}</TextMain></div>
        <div className={`${isName ? 'text-black' : ''}`}><TextSub>{value}</TextSub></div>
      </div>
    );
  }
  
  function renderOrderStatusSection() {
    return (
      <div className="w-[165px] h-12 px-2 py-1 rounded-lg justify-center items-center gap-2 flex">
        <div className="text-center hover:text-primary "><TextMain>See Order Status</TextMain></div>
        <div className="w-6 h-6 justify-center items-center flex">
          <div className="w-6 h-6 relative"></div>
        </div>
      </div>
    );
  }
  function renderOrderDoneSection(){
    return(
      <div className="w-[169.60px] h-[65px] flex-col justify-start items-center gap-6 inline-flex">
        <div className="self-stretch text-center text-neutral-950 "><TextMain>Delivered</TextMain></div>
        <div className="self-stretch text-center text-neutral-950 "><TextSub>2023/08/22</TextSub></div>
    </div>
    );
  }
  
  function renderOrderImages() {
    return [...Array(10)].map((_, index) => (
      <img key={index} className="w-[110px] h-[116px] relative rounded border border-neutral-100" src={`https://via.placeholder.com/105x116`} alt={`Order ${index + 1}`} />
    ));
  }
export default OrderItem;
  