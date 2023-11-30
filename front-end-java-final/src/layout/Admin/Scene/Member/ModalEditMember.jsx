import { useEffect, useState } from 'react';
import { Input, Select, TextMain } from '../../../../components';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import { Modal, ModalItem } from '../../../../components';
import toast from 'react-hot-toast';
import { BsEarFill } from 'react-icons/bs';
import { request } from '../../../../services';

function ModalEditMember({
    onRemove = () => {},
    onCancel = () => {},
    onClose = () => {},
    data,
    setListMember = () => {},
}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [status, setStatus] = useState(false);
    const optionsStatus = [
        {
            name: 'Hoạt động',
            value: false,
            id: 0,
        },
        {
            name: 'Bị chặn',
            value: true,
            id: 1,
        },
    ];

    const [close, setClose] = useState(false);
    const handleUpdateMember = async () => {
        const dataReq = {
            username: name,
            email,
            phoneNumber,
            status: status === 0 ? 1 : 0,
        };

        if (name === '') {
            toast('Vui lòng nhập tên thành viên!', {
                icon: '⚠️',
            });
            return;
        } else if (email === '') {
            toast('Vui lòng nhập email!', {
                icon: '⚠️',
            });
            return;
        } else if (phoneNumber === '') {
            toast('Vui lòng nhập số điện thoại! ', {
                icon: '⚠️',
            });
            return;
        }

        try {
            const response = await request('PUT', '/api/v1/admin/member/' + data?.id, dataReq);

            if (!response) {
                return Promise.reject(false);
            }

            setListMember((prev) => {
                return prev.map((mem) => {
                    if (mem.id === data.id) {
                        return {
                            ...mem,
                            ...dataReq,
                        };
                    }
                    return mem;
                });
            });

            setClose(true);

            return Promise.resolve(true);
        } catch (error) {
            console.error(error);
            return Promise.reject(false);
        }
    };

    const updateMember = async () => {
        toast.promise(handleUpdateMember(), {
            loading: 'Đang cập nhật ...',
            success: <b>Cập nhật thành công!</b>,
            error: <b>Cập nhật thất bại.</b>,
        });
    };

    useEffect(() => {
        if (data) {
            setName(data?.username);
            setEmail(data?.email);
            setPhoneNumber(data?.phoneNumber);
            setStatus(data?.status === false ? 1 : 0);
        }
    }, [data]);

    return (
        <Modal onClose={() => setClose(true)}>
            <ModalItem onClose={onClose} close={close}>
                <div className="min-w-[30rem]">
                    <TextMain
                        className={
                            'font-bold text-xl border-b-[1px] border-dashed border-light-tiny dark:border-dark-tiny pb-4'
                        }
                    >
                        Edit Member
                    </TextMain>

                    <div className="flex flex-col mt-4">
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Tên thành viên"
                            label={'Name'}
                            className="mb-4"
                        ></Input>

                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email thành viên"
                            label={'Email'}
                            className="mb-4"
                        ></Input>

                        <Input
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Số điện thoại thành viên"
                            label={'Phone number'}
                            className="mb-4"
                        ></Input>

                        <label className="mb-2 ml-1">Status</label>
                        <Select
                            name="Status"
                            subMenu={optionsStatus}
                            onSelect={(value) => setStatus(value)}
                            value={status}
                            className={'p-2'}
                        ></Select>

                        <div className="flex justify-end items-center border-t-[1px] border-dashed border-light-tiny dark:border-dark-tiny mt-5 pt-5 pb-5 gap-4">
                            <button
                                onClick={() => {
                                    setClose(true);
                                }}
                                type="button"
                                className="py-2 px-3 text-sm font-medium text-gray-500 bg-light-tiny  dark:bg-dark-tiny rounded-md pl-4 pr-4 hover:text-gray-900  dark:text-gray-300 dark:hover:text-white dark:hover:bg-btn-second "
                            >
                                Hủy
                            </button>
                            <button
                                type="submit"
                                onClick={updateMember}
                                className="py-2 px-3 text-sm font-medium text-center text-white bg-green-700 rounded-md pl-4 pr-4 hover:bg-green-800 focus:outline-none  dark:bg-green-600 dark:hover:bg-green-700 "
                            >
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>
            </ModalItem>
        </Modal>
    );
}

export default ModalEditMember;
