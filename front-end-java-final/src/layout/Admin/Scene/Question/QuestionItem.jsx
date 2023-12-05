import React, { useState } from 'react';
import { Tooltip } from 'flowbite-react';
import { TextMain, Button, ReplyModal } from '../../../../components';
import { CiChat2 } from 'react-icons/ci';
import { LiaTrashAlt } from 'react-icons/lia';
import { FaTrashCanArrowUp } from "react-icons/fa6";
import { request } from '../../../../services';
import { useLoading } from '../../../../context/loadingContext';
import toast from 'react-hot-toast';

function QuestionItem({ index = 0, data }) {
    const [isDeleted, setIsDeleted] = useState(data.isDeleted);
    const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
    const { startLoading, stopLoading } = useLoading();

    const handleReplyClick = () => {
        setIsReplyModalOpen(true);
    };

    const handleDeleteClick = async () => {
        startLoading();
        try {
            const res = await request('DELETE', `api/v1/admin/question/delete-soft?id=${data.id}`);
            if (res.data) {
                setIsDeleted(true);
                toast.success('Xóa câu hỏi thành công!');
            }
        } catch (err) {
            toast.error('Xóa câu hỏi thất bại!');
        }
        stopLoading();
    };

    const handlePutBackQuestion = async () => {
        startLoading();
        try {
            const res = await request('DELETE', `api/v1/admin/question/put-back?id=${data.id}`);
            if (res.data) {
                setIsDeleted(false);
                toast.success('Khôi phục câu hỏi thành công!');
            }
        } catch (err) {
            toast.error('Khôi phục câu hỏi thất bại!');
        }
        stopLoading();
    };

    return (
        <div
            className={`${
                index % 2 === 0 ? 'hover:brightness-125' : 'brightness-125 hover:brightness-150'
            } bg-light-tiny dark:bg-dark-tiny p-2 rounded-md flex justify-between items-center mt-5 `}
        >
            <div className="flex justify-start items-center gap-4">
                <input
                    onChange={(e) => {
                        // Handle checkbox change if needed
                    }}
                    type="checkbox"
                    className="input-no"
                />
                <TextMain>{data?.member?.account?.username}</TextMain>
                <p className="text-second block max-w-[50rem] truncate overflow-clip">
                    {data?.content}
                </p>
            </div>

            <div className="flex justify-end items-center gap-1">
                {data?.isReplied ? (
                    <Tooltip content="Cập nhật câu trả lời">
                        <Button
                            onClick={handleReplyClick}
                            disabled={data?.isReplied}
                        >
                            <CiChat2 className="w-6 h-6 text-status-complete" />
                        </Button>
                    </Tooltip>
                ) : (
                    <Tooltip content="Trả lời">
                        <Button
                            onClick={handleReplyClick}
                            disabled={data?.isReplied}
                        >
                            <CiChat2 className="w-6 h-6 text-status-complete" />
                        </Button>
                    </Tooltip>
                )}

                {isDeleted ? (
                    <Tooltip content="Khôi phục">
                        <Button onClick={handlePutBackQuestion}>
                            <FaTrashCanArrowUp className="w-6 h-6 text-status-cancel" />
                        </Button>
                    </Tooltip>
                ) : (
                    <Tooltip content="Xóa">
                        <Button onClick={handleDeleteClick}>
                            <LiaTrashAlt className="w-6 h-6 text-status-cancel" />
                        </Button>
                    </Tooltip>
                )}
                    <ReplyModal
                        isOpen={isReplyModalOpen}
                        onClose={() => setIsReplyModalOpen(false)}
                        onReply={""}
                />
            </div>
        </div>
    );
}

export default QuestionItem;
