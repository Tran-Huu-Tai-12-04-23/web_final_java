import Button from '../Button';
import TextMain from '../TextMain';
import { useLoading } from '../../context/loadingContext';
import { request } from '../../services';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
function AddressItem({
    setAddressUpdate = () => {},
    data = {},
    setListAddress = () => {},
    setEditAddress = () => {},
    setAddressIdForRemove = () => {},
    setAddressDefault = () => {},
}) {
    const { startLoading, stopLoading } = useLoading();
    const [address, setAddress] = useState(data);

    const handleSetDefaultAddress = async () => {
        startLoading();
        await request('PUT', '/api/v1/user/order/address/set-default', {
            ...data,
            account: {
                id: data?.account?.id,
            },
        })
            .then((res) => {
                if (res.data) {
                    // setAddress(res.data);
                    setListAddress((prev) => {
                        return prev.map((add) => {
                            if (add.id !== res.data.id) {
                                add.isDefault = false;
                            } else {
                                add.isDefault = true;
                                setAddressDefault(add);
                            }
                            return add;
                        });
                    });
                }
            })
            .catch((err) => {
                toast.error('Đặt địa chỉ mặc định thất bại!');
            });
        stopLoading();
    };

    useEffect(() => {
        setAddress(data);
    }, [data]);
    return (
        <>
            <div className="flex justify-between items-start gap-20 p-4 rounded-md hover:brightness-125 backdrop-blur-3xl bg-bg-light-menu dark:bg-bg-dark-menu">
                <div className="flex flex-col gap-4 items-start justify-start">
                    <div className="flex gap-4">
                        <TextMain>{address?.fullName}</TextMain>
                        <div>|</div>
                        <TextMain>{address?.phoneNumberTakeOrder}</TextMain>
                    </div>
                    <TextMain>{address?.detailAddress + ' , ' + address?.address}</TextMain>
                    {address?.isDefault && <Button className="border-style-primary text-sale">Mặc định</Button>}
                </div>
                <div className="flex flex-col items-end justify-end gap-4">
                    <Button className="text-blue-500" onClick={() => setAddressUpdate(address)}>
                        Cập nhật
                    </Button>
                    <Button
                        onClick={handleSetDefaultAddress}
                        className="text-red-400 bg-bg-light-menu dark:bg-bg-dark-menu p-2 rounded-md"
                    >
                        Chọn làm mặc định
                    </Button>
                    <Button
<<<<<<< HEAD
                        onClick={() => setModalConfirmRemove(true)}
=======
                        onClick={() => setAddressIdForRemove(address.id)}
>>>>>>> main
                        className="text-red-500 bg-status-cancel bg-btn-second pl-5 pr-5 p-2 rounded-md"
                    >
                        <BsFillTrashFill className="ư-6 h-6"></BsFillTrashFill>
                    </Button>
                </div>
            </div>
        </>
    );
}

export default AddressItem;
