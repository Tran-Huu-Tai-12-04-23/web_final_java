import { useState } from 'react';
import { Toggle, TextMain, PickedRangeDate, Input } from '../../../../../components';
import { CiDiscount1 } from 'react-icons/ci';

function SettingSaleProduct() {
    const [active, setActive] = useState(false);
    return (
        <div className=" flex flex-col gap-4 bg-light dark:bg-dark rounded-md p-4 shadow-xl">
            <div className="flex-col flex gap-2">
                <TextMain className={'ml-2'}>Active sale for product</TextMain>
                <Toggle name={''} value={active} onChange={(e) => setActive(e.target.checked)}></Toggle>
            </div>

            <div className="flex-col flex gap-2">
                <TextMain className={'ml-2'}>Choose start date - end date for sale</TextMain>
                <PickedRangeDate disabled={!active}></PickedRangeDate>
            </div>

            <div className="flex-col flex gap-2">
                <TextMain className={'ml-2'}>Disscount</TextMain>
                <Input
                    disabled={!active}
                    type="number"
                    placeholder="Enter discount..."
                    iconLeft={
                        <div className="p-2 ">
                            <CiDiscount1 className="w-6 h-6"></CiDiscount1>
                        </div>
                    }
                ></Input>
            </div>
        </div>
    );
}

export default SettingSaleProduct;
