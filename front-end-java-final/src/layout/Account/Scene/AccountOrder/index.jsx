import { useState } from 'react';
import { Tabs } from '../../../../components';

import ViewOrder from './ViewOrder';

function AccountOrder() {
    const [activeTab, setActiveTab] = useState(0);
    const tabs = [
        {
            name: 'Tất cả',
            tabContent: <ViewOrder></ViewOrder>,
        },
        {
            name: 'Chuẩn bị hàng',

            tabContent: <div>Hello</div>,
        },
        {
            name: 'Đang giao hàng',
            tabContent: <div>Hello</div>,
        },
        {
            name: 'Hoàn thành',
            tabContent: <div>Hello</div>,
        },
        {
            name: 'Đã hủy',
            tabContent: <div>Hello</div>,
        },
        {
            name: 'Trả hàng',
            tabContent: <div>Hello</div>,
        },
    ];
    return (
        <div>
            <Tabs
                classItem="w-full"
                tabs={tabs}
                active={activeTab}
                setActive={(value) => {
                    setActiveTab(value);
                }}
            ></Tabs>
        </div>
    );
}

export default AccountOrder;
