function DiscountItem(){
    return(
        <>
            <div className="w-[392px] h-[72px] px-4 py-6 bg-stone-50 rounded-lg border border-neutral-100 justify-between items-center inline-flex">
                <div className="h-6 justify-start items-center gap-2 flex">
                    <div className="justify-start items-start gap-1 flex">
                        <div></div>
                        <div className="w-[296px] text-neutral-500 text-base font-light leading-normal">label</div>
                    </div>
                </div>
                <div className="w-6 h-6 justify-center items-center flex">
                    <div className="w-6 h-6 relative">
                    </div>
                </div>
            </div>
        </>
    );
}
export default DiscountItem;