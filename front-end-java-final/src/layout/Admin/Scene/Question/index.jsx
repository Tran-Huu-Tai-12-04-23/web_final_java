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
            name: 'Tất cả',
            icon: (
                <DiGhostSmall className="w-6 h-6 brightness-50 group-hover:text-primary group-hover:brightness-100"></DiGhostSmall>
            ),
            tabContent: <ViewQuestion type={'all'}></ViewQuestion>,
        },
        {
            name: 'Đợi phản hồi',
            icon: (
                <BsReplyAll className="w-6 h-6 brightness-50 group-hover:text-primary group-hover:brightness-100"></BsReplyAll>
            ),
            tabContent: <ViewQuestion type={'waiting'}></ViewQuestion>,
        },
        {
            name: 'Đã phản hồi',
            icon: (
                <VscSend className="w-6 h-6 brightness-50 group-hover:text-primary group-hover:brightness-100"></VscSend>
            ),
            tabContent: <ViewQuestion type={'sent'}></ViewQuestion>,
        },
        {
            name: 'Thùng rác',
            tabContent: <ViewQuestion type={'trash'}></ViewQuestion>,
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
                    <TextMain>Câu hỏi</TextMain>
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
