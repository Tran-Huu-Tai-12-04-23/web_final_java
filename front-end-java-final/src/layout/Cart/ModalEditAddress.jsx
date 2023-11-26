import { useEffect, useState } from 'react';
import { Input, TextMain, Modal, ModalItem, Button, AddressItem } from '../../components';

import { IoIosAdd } from 'react-icons/io';
import { IoArrowBack } from 'react-icons/io5';
import toast from 'react-hot-toast';
import Util from '../../utils/Util';
import { request } from '../../services';
import { useLoading } from '../../context/loadingContext';
import { useLogin } from '../../context/login';
import { data } from 'autoprefixer';

function ModalEditAddress({
    setAddressDefault = () => {},
    onRemove = () => {},
    onCancel = () => {},
    onClose = () => {},
    onAddress = (value) => {},
}) {
    const { account } = useLogin();
    const { startLoading, stopLoading } = useLoading();
    const [close, setClose] = useState(false);
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [listAddress, setListAddress] = useState([]);

    const [addNew, setAddNew] = useState(false);

    const addNewAddress = async () => {
        if (username === '') {
            toast.error('Vui lòng nhập đầy đủ họ tên!');
            return;
        } else if (phoneNumber === '') {
            toast.error('Vui lòng nhập số điện thoại nhận hàng!');
            return;
        } else if (address === '') {
            toast.error('Vui lòng nhập địa chỉ nhận hàng!');
            return;
        } else if (detailAddress === '') {
            toast.error('Vui lòng nhập địa chỉ cụ thể!');
            return;
        } else if (!Util.validatePhoneNumber(phoneNumber)) {
            toast.error('Số điện thoại không đúng định dạng!');
            return;
        }

        const data = {
            fullName: username,
            phoneNumberTakeOrder: phoneNumber,
            address,
            detailAddress,
            account: {
                id: account?.accountId,
            },
        };

        startLoading();
        await request('POST', '/api/v1/user/order/address', data)
            .then((response) => {
                if (response.data) {
                    toast.success('Thêm địa chỉ thành công!');

                    clearData();
                    setAddNew(false);
                }
            })
            .catch((err) => {
                console.error(err);
                toast.error('Thêm địa chỉ thất bại!');
            });
        stopLoading();
    };

    const clearData = () => {
        setUsername('');
        setPhoneNumber('');
        setAddress('');
        setDetailAddress('');
    };

    useEffect(() => {
        const getAddress = async () => {
            startLoading();
            await request('GET', '/api/v1/user/order/address?accountId=' + account?.accountId)
                .then((response) => {
                    response.data && setListAddress(response.data);
                })
                .catch((err) => {
                    console.error(err);
                    toast.error('Thêm địa chỉ thất bại!');
                });
            stopLoading();
        };

        getAddress();
    }, [addNew]);
    return (
        <Modal
            onClose={() => {
                setClose(true);
            }}
        >
            <ModalItem onClose={onClose} close={close}>
                {!addNew && (
                    <div className="min-w-[30rem]">
                        <div className="flex justify-end pb-3 mb-4  border-b-primary">
                            <Button style="normal" onClick={() => setAddNew(true)}>
                                <IoIosAdd className="w-6 h-6 mr-2"></IoIosAdd>
                                <span>Thêm địa chỉ mới</span>
                            </Button>
                        </div>
                        {listAddress.length <= 0 ? (
                            <div className="flex flex-col gap-4">
                                <img
                                    src="https://i.ibb.co/WxSg9tS/Pngtree-no-result-search-icon-6511543-removebg-preview.png"
                                    alt="no address"
                                ></img>
                                <TextMain>Bạn chưa có địa chỉ nào</TextMain>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                {listAddress.map((address, index) => {
                                    return (
                                        <AddressItem
                                            setAddressDefault={setAddressDefault}
                                            key={index}
                                            data={address}
                                            setListAddress={setListAddress}
                                        ></AddressItem>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}
                {addNew && (
                    <div className="min-w-[30rem] ">
                        <Button onClick={() => setAddNew(false)} className="flex justify-between text-blue-400 gap-4">
                            <IoArrowBack className="w-6 h-6 mb-4 cursor-pointer"></IoArrowBack>
                            <span>Quay lại</span>
                        </Button>
                        <TextMain
                            className={
                                'font-bold text-xl border-b-[1px] border-dashed border-light-tiny dark:border-dark-tiny pb-4'
                            }
                        >
                            Chỉnh sửa thông tin nhận hàng
                        </TextMain>

                        <div className="flex flex-col mt-4">
                            <div className="flex flex-col gap-4">
                                <Input
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Nhập họ tên"
                                    label={'Họ và tên'}
                                    className="mb-4"
                                ></Input>
                                <Input
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="Nhập số điện thoại "
                                    label={'Số điện thoai'}
                                    className="mb-4"
                                ></Input>
                                <Input
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Nhập địa chỉ của bạn "
                                    label={'Địa chỉ của bạn'}
                                    className="mb-4"
                                ></Input>
                                <Input
                                    value={detailAddress}
                                    onChange={(e) => setDetailAddress(e.target.value)}
                                    placeholder="Nhập địa chỉ cụ thể của bạn "
                                    label={'Địa chỉ cụ thể của bạn'}
                                    className="mb-4"
                                ></Input>
                            </div>

                            <div className="flex justify-end items-center border-t-[1px] border-dashed border-light-tiny dark:border-dark-tiny mt-5 pt-5 pb-5 gap-4">
                                <button
                                    onClick={() => {
                                        setClose(true);
                                    }}
                                    type="button"
                                    className="py-2 px-3 text-sm font-medium text-gray-500 bg-bg-light-menu  dark:bg-bg-dark-menu rounded-md pl-4 pr-4 hover:text-gray-900  dark:text-gray-300 dark:hover:text-white dark:hover:bg-btn-second "
                                >
                                    Close
                                </button>
                                <button
                                    onClick={addNewAddress}
                                    className="py-2 px-3 text-sm font-medium text-center text-white bg-green-700 rounded-md pl-4 pr-4 hover:bg-green-800 focus:outline-none  dark:bg-green-600 dark:hover:bg-green-700 "
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </ModalItem>
        </Modal>
    );
}

export default ModalEditAddress;
