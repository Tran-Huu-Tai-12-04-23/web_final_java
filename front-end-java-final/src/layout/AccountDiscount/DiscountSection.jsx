import { DiscountItem, TextMain, TextSub } from "../../components";

function DiscountSection() {
  return (
    <div className="flex-col">
      <div className="mt-24 w-[450px] h-14 px-2 flex-col justify-start items-start gap-2 inline-flex">
        <div className="text-neutral-950 font-medium">
          <TextMain>Discounts & Voucher</TextMain>
        </div>
        <div className="text-neutral-500 font-light leading-normal">
          <TextSub>Add a discount code to apply a discount to your purchase</TextSub>
        </div>
      </div>
      <DiscountItem></DiscountItem>
      <div className="w-[306px] h-6 justify-start items-start gap-2 inline-flex">
        <div className="text-neutral-500 text-base font-light leading-normal">
          <TextMain>Where can I find the discount code?</TextMain>
        </div>
        <div className="w-6 h-6 justify-center items-center flex">
          <div className="w-6 h-6 relative"></div>
        </div>
      </div>
    </div>
  );
}

export default DiscountSection;
