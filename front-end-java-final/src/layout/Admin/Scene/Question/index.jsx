import { Tabs, TextMain } from '../../../../components';
import SubHeader from '../../Includes/SubHeader';

import { DiGhostSmall } from 'react-icons/di';
import { BsReplyAll } from 'react-icons/bs';
import { VscSend } from 'react-icons/vsc';
import { LiaTrashAltSolid } from 'react-icons/lia';
import { useState } from 'react';
import ViewQuestion from './ViewQestion';

function Question() {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        {
            name: 'ALL',
            icon: (
                <DiGhostSmall className="w-6 h-6 brightness-50 group-hover:text-primary group-hover:brightness-100"></DiGhostSmall>
            ),
            tabContent: <ViewQuestion></ViewQuestion>,
        },
        {
            name: 'Wait for reply',
            icon: (
                <BsReplyAll className="w-6 h-6 brightness-50 group-hover:text-primary group-hover:brightness-100"></BsReplyAll>
            ),
            tabContent: <ViewQuestion></ViewQuestion>,
        },
        {
            name: 'Sended',
            icon: (
                <VscSend className="w-6 h-6 brightness-50 group-hover:text-primary group-hover:brightness-100"></VscSend>
            ),
            tabContent: <ViewQuestion></ViewQuestion>,
        },
        {
            name: 'Trash',
            tabContent: <ViewQuestion></ViewQuestion>,
            icon: (
                <LiaTrashAltSolid className="w-6 h-6 brightness-50 group-hover:text-primary group-hover:brightness-100"></LiaTrashAltSolid>
            ),
        },
    ];
    return (
        <div className="">
            <SubHeader nameHeader={'Question about product'} sub="Question" main="Customer"></SubHeader>

            <div className="mt-5 rounded-md p-4 bg-light-tiny dark:bg-dark-tiny">
                <div className="flex justify-between mb-5 border-b-primary items-center">
                    <TextMain>Question</TextMain>
                </div>

                <Tabs
                    tabs={tabs}
                    active={activeTab}
                    setActive={(value) => {
                        setActiveTab(value);
                    }}
                ></Tabs>
            </div>
        </div>
    );
}

export default Question;
