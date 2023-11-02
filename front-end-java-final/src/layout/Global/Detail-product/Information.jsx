import { useState } from 'react';
import { Tabs } from '../../../components';
import Description from './Description';
import Questions from './Questions';
import Reviews from './Reviews';

import { BiBookContent } from 'react-icons/bi';
import { BsPatchQuestion } from 'react-icons/bs';
import { GoCodeReview } from 'react-icons/go';

function Information() {
    const [activeTab, setActiveTab] = useState(0);
    const tabs = [
        {
            name: 'Description',
            icon: (
                <BiBookContent className="w-6 h-6 brightness-50 group-hover:text-primary group-hover:brightness-100"></BiBookContent>
            ),
            tabContent: <Description />,
        },
        {
            name: 'Questions',
            tabContent: <Questions />,
            icon: (
                <BsPatchQuestion className="w-6 h-6 brightness-50 group-hover:text-primary group-hover:brightness-100"></BsPatchQuestion>
            ),
        },
        {
            name: 'Reviews',
            tabContent: <Reviews />,
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
