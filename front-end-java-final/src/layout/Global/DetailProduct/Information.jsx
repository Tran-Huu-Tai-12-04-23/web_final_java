import { useState } from 'react';
import { Tabs } from '../../../components';
import Description from './Description';
import Specifications from './Specifications';
import Questions from './Questions';
import Reviews from './Reviews';

import { BiBookContent } from 'react-icons/bi';
import { BsPatchQuestion } from 'react-icons/bs';
import { GoCodeReview } from 'react-icons/go';

function Information({ data }) {
    const [activeTab, setActiveTab] = useState(0);
    const tabs = [
        {
            name: 'Mô tả',
            icon: (
                <BiBookContent className="w-6 h-6 brightness-50 group-hover:text-primary group-hover:brightness-100"></BiBookContent>
            ),
            tabContent: <Description data={data?.description} />,
        },
        {
            name: 'Thông tin chi tiết',
            icon: (
                <BiBookContent className="w-6 h-6 brightness-50 group-hover:text-primary group-hover:brightness-100"></BiBookContent>
            ),
            tabContent: <Specifications data={data?.productSpecification} />,
        },
        {
            name: 'Câu hỏi',
            tabContent: <Questions />,
            icon: (
                <BsPatchQuestion className="w-6 h-6 brightness-50 group-hover:text-primary group-hover:brightness-100"></BsPatchQuestion>
            ),
        },
        {
            name: 'Đánh giá',
            tabContent: <Reviews data={data?.reviewOrders} />,
            icon: (
                <GoCodeReview className="w-6 h-6 brightness-50 group-hover:text-primary group-hover:brightness-100"></GoCodeReview>
            ),
        },
    ];
    return (
        <div>
            <Tabs
                tabs={tabs}
                active={activeTab}
                setActive={(value) => {
                    setActiveTab(value);
                }}
            ></Tabs>
        </div>
    );
}

export default Information;
