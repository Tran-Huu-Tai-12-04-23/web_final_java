import { Button, TextMain } from '../../../../../components';

import { TbDeviceIpadHorizontalCancel } from 'react-icons/tb';
import { CiLocationOn } from 'react-icons/ci';

function ConfigStatusOrder() {
    return (
        <div className="p-4 rounded-md bg-light-tiny dark:bg-dark-tiny w-full">
            <div className="flex justify-between items-center border-b-primary pb-3">
                <TextMain className={'font-bold'}>Trạng thái đơn hàng</TextMain>

                <div className="flex justify-end items-center gap-3  ">
                    <Button className="flex justify-center bg-status-pending text-status-return p-2 p-w rounded-md pl-4 pr-4 gap-3 items-center">
                        <CiLocationOn className="w-4 h-4"></CiLocationOn>
                        <span>Thay đổi địa chỉ</span>
                    </Button>
                    <Button className="flex justify-center p-2 gap-3  rounded-md pl-4 pr-4 items-center text-status-cancel bg-status-cancel">
                        <TbDeviceIpadHorizontalCancel className="w-4 h-4"></TbDeviceIpadHorizontalCancel>
                        <span>Hủy đơn hàng</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ConfigStatusOrder;
