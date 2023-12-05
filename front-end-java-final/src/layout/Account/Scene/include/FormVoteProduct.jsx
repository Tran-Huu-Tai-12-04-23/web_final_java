import { useEffect, useState } from 'react';
import { Input, TextMain } from '../../../../components';
import { Modal, ModalItem } from '../../../../components';
import toast from 'react-hot-toast';
import { request } from '../../../../services';
import { useLoading } from '../../../../context/loadingContext';

import { Rating } from 'flowbite-react';
import { Label, Textarea } from 'flowbite-react';

function FormVoteProduct({
    setOrderMembers = () => {},
    orderId,
    onCancel = () => {},
    onClose = () => {},
    setListMember = () => {},
    onComplete = (value) => {},
}) {
    const { startLoading, stopLoading } = useLoading();
    const [content, setContent] = useState('');
    const [star, setStar] = useState(5);

    const [close, setClose] = useState(false);
    const handleAddNewMember = async () => {
        const data = {
            star,
            content,
        };

        if (content === '') {
            toast('Vui lòng nhập nội dung!', {
                icon: '⚠️',
            });
            return;
        }

        startLoading();
        if (!orderId) return;
        await request('POST', `/api/v1/user/order/vote-order/${orderId}`, data)
            .then((response) => {
                if (response.data) {
                    onComplete(response.data);
                    setOrderMembers((prev) => {
                        return prev.map((orderMember) => {
                            if ((orderMember.id = response.data.id)) {
                                return { ...response.data };
                            }
                            return orderMember;
                        });
                    });
                    toast.success('Thêm đánh giá thành công!');
                    onClose();
                }
            })
            .catch((error) => {
                console.log(error);
                if (error.response) {
                    error.response.data.message && toast.error(error.response.data.message);
                }
            });

        stopLoading();
    };

    return (
        <Modal onClose={() => setClose(true)}>
            <ModalItem onClose={onClose} close={close}>
                <div className="min-w-[30rem]">
                    <TextMain
                        className={
                            'font-bold text-xl border-b-[1px] border-dashed border-light-tiny dark:border-dark-tiny pb-4'
                        }
                    >
                        Thêm đánh giá
                    </TextMain>
                    <TextMain className={' text-sm '}>Mức độ hài lòng của bạn?</TextMain>
                    <Rating>
                        <Rating.Star filled={star > 0} onClick={(e) => setStar(1)} />
                        <Rating.Star filled={star > 1} onClick={(e) => setStar(2)} />
                        <Rating.Star filled={star > 2} onClick={(e) => setStar(3)} />
                        <Rating.Star filled={star > 3} onClick={(e) => setStar(4)} />
                        <Rating.Star filled={star > 4} onClick={(e) => setStar(5)} />
                    </Rating>
                    <div className="ư-full">
                        <div className="mb-2 block">
                            <Label htmlFor="comment" value="Nội dung" />
                        </div>
                        <Textarea
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                            id="comment"
                            placeholder="Nội dung đánh giá..."
                            required
                            rows={4}
                        />
                    </div>

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
                            onClick={handleAddNewMember}
                            className="py-2 px-3 text-sm font-medium text-center text-white bg-green-700 rounded-md pl-4 pr-4 hover:bg-green-800 focus:outline-none  dark:bg-green-600 dark:hover:bg-green-700 "
                        >
                            Đánh giá
                        </button>
                    </div>
                </div>
            </ModalItem>
        </Modal>
    );
}

export default FormVoteProduct;
