import { useNavigate } from 'react-router-dom';
import { TextMain, TextSub, Button } from '../../components';
import { Avatar } from 'flowbite-react';

import { CiEdit } from 'react-icons/ci';
import Constants from '../../Constants';
import { MdManageAccounts } from 'react-icons/md';
import { IoReceiptOutline, IoNotifications } from 'react-icons/io5';

const itemSideBar = [
    {
        name: 'Tài khoản của tôi',
        path: Constants.ACCOUNT_INFO,
        icon: <MdManageAccounts className="w-6 h-6" />,
        subMenu: [
            {
                name: 'Hồ sơ',
                path: Constants.ACCOUNT_INFO,
            },
            {
                name: 'Địa chỉ',
                path: Constants.ACCOUNT_ADDRESS,
            },
            {
                name: 'Đổi mật khẩu',
                path: Constants.ACCOUNT_CHANGE_PASSWORD,
            },
        ],
    },
    {
        name: 'Đơn mua',
        path: Constants.ACCOUNT_ORDER,
        icon: <IoReceiptOutline className="w-6 h-6" />,
    },
    {
        name: 'Thông báo',
        path: Constants.ACCOUNT_NOTIFICATION,
        icon: <IoNotifications className="w-6 h-6" />,
    },
];
function Sidebar({ active }) {
    const history = useNavigate();

    return (
        <div className="sticky flex flex-col gap-1 w-fit flex-shrink-0 min-w-[10rem] items-start">
            <div className="flex justify-start border-b-primary ">
                <Avatar img="" alt="avatar of Jese" rounded />
                <div className="flex ml-3 flex-col justify-start items-center">
                    <TextMain>Tran huu Tai</TextMain>
                    <Button className="pl-4 pr-4 rounded-md hover:bg-bg-light-menu hover:dark:bg-bg-dark-menu p-2 flex justify-center items-center">
                        <CiEdit className="mr-3 h-6 w-6"></CiEdit>
                        <TextSub className={'text-sm'}>Chỉnh sửa hồ sơ</TextSub>
                    </Button>
                </div>
            </div>

            {itemSideBar.map((it, index) => {
                return (
                    <div className="flex p-2 flex-col w-full" key={index}>
                        <Button
                            onClick={() => {
                                history(it.path);
                            }}
                            className={`${
                                index === active.menu && active.subMenu == null && 'text-sale'
                            } flex p-2 hover:bg-bg-light-menu  dark:hover:bg-bg-dark-menu w-full rounded-md justify-start items-center`}
                        >
                            {it.icon}
                            <span className="ml-3">{it.name}</span>
                        </Button>
                        {it.subMenu && (
                            <div className="flex justify-start  items-start flex-col gap-1 ml-[20%] text-sm">
                                {it.subMenu.map((sIt, index) => {
                                    return (
                                        <Button
                                            onClick={() => history(sIt.path)}
                                            className={`${active.subMenu === index && 'text-sale'}  p-1`}
                                            key={index}
                                        >
                                            {sIt.name}
                                        </Button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default Sidebar;
