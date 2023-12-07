import React, { useEffect, useState } from 'react';
import { Tooltip } from 'flowbite-react';
import { TextMain, Button, Input } from '../../../../components';
import { CiChat2 } from 'react-icons/ci';
import { LiaTrashAlt } from 'react-icons/lia';
import { FaTrashCanArrowUp } from 'react-icons/fa6';
import { request } from '../../../../services';
import { useLoading } from '../../../../context/loadingContext';
import toast from 'react-hot-toast';
import { VscSend } from 'react-icons/vsc';
import { MdModeEdit } from 'react-icons/md';
import { Label, Textarea } from 'flowbite-react';

function QuestionItem({ index = 0, data }) {
    const [question, setQuestions] = useState(data);
    const [replyQuestion, setReplyQuestion] = useState(data);
    const [isDeleted, setIsDeleted] = useState(data.isDeleted);
    const [replyQuestionContent, setReplyQuestionContent] = useState('');
    const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
    const [isUpdateReply, setIsUpdateReply] = useState(false);
    const { startLoading, stopLoading } = useLoading();

    const handleReplyClick = () => {
        setIsReplyModalOpen(true);
    };

    const handleDeleteClick = async () => {
        startLoading();
        try {
            const res = await request('DELETE', `api/v1/admin/question/delete-soft?id=${question.id}`);
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
            const res = await request('DELETE', `api/v1/admin/question/put-back?id=${question.id}`);
            if (res.data) {
                setIsDeleted(false);
                toast.success('Khôi phục câu hỏi thành công!');
            }
        } catch (err) {
            toast.error('Khôi phục câu hỏi thất bại!');
        }
        stopLoading();
    };

    const handleReplyQuestion = async () => {
        if (replyQuestionContent === '') {
            toast.error('Vui lòng nhập nội dung trả lời');
            return;
        }
        startLoading();
        await request('POST', `/api/v1/admin/reply-question/${question?.id}`, {
            content: replyQuestionContent,
        })
            .then((res) => {
                if (res.data) {
                    toast.success('Trả lời câu hỏi khách hàng thành công!');
                }
            })
            .catch((err) => {
                console.error(err);
                toast.error('Trả lời câu hỏi thất bại');
            });
        stopLoading();
    };

    const handleUpdateReplyQuestion = async () => {
        if (replyQuestionContent === '') {
            toast.error('Vui lòng nhập nội dung trả lời');
            return;
        }
        startLoading();
        await request('PUT', `/api/v1/admin/reply-question/update/${question?.id}`, {
            content: replyQuestionContent,
        })
            .then((res) => {
                if (res.data) {
                    toast.success('Chỉnh sửa câu trả lời thành công!');
                    setReplyQuestion(res.data);
                    setIsUpdateReply(false);
                }
            })
            .catch((err) => {
                console.error(err);
                toast.error('Chỉnh sửa câu trả lời thất bại');
            });
        stopLoading();
    };

    useEffect(() => {
        if (data) {
            setQuestions(data);
            setIsDeleted(data?.isDeleted);
        }
    }, [data]);
    const getReplyQuestion = async () => {
        startLoading();
        await request('GET', `/api/v1/admin/reply-question/${question?.id}`)
            .then((res) => {
                if (res.data) {
                    setReplyQuestion(res.data);
                    setReplyQuestionContent(res.data[0].content);
                }
            })
            .catch((err) => {
                console.error(err);
            });
        stopLoading();
    };
    useEffect(() => {
        if (data) {
            getReplyQuestion();
        }
    }, [data]);
    return (
        <>
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
                    <TextMain>{question?.member?.account?.username}</TextMain>
                    <p className="text-second block max-w-[50rem] truncate overflow-clip">{question?.content}</p>
                </div>

                <div className="flex justify-end items-center gap-1">
                    {question?.isReplied ? (
                        <Tooltip content="Cập nhật câu trả lời">
                            <Button onClick={() => setIsUpdateReply(true)} disabled={question?.isReplied}>
                                <MdModeEdit className="w-6 h-6 text-status-complete" />
                            </Button>
                        </Tooltip>
                    ) : (
                        <Tooltip content="Trả lời">
                            <Button onClick={handleReplyClick} disabled={question?.isReplied}>
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
                </div>
            </div>
            {isUpdateReply && (
                <div className="flex justify-between gap-4 mt-3 items-center pt-3 pl-2 pr-2 border-t-primary">
                    <div className="w-full">
                        <div className="mb-2 block">
                            <Label htmlFor="rply" value="Trả lời..." />
                        </div>
                        <Textarea
                            value={replyQuestionContent}
                            onChange={(e) => setReplyQuestionContent(e.target.value)}
                            id="rply"
                            placeholder="Nhập vào câu hỏi..."
                            required
                            rows={4}
                        />
                    </div>
                    <Button
                        className="pl-4 flex justify-center p-2 rounded-md items-center pr-4 cursor-pointer bg-status-cancel text-status-cancel"
                        onClick={() => setIsUpdateReply(false)}
                    >
                        <VscSend className="w-4 h-4 mr-2" />
                        <span>Hủy</span>
                    </Button>
                    <Button
                        className="pl-4 flex justify-center p-2 rounded-md items-center pr-4 cursor-pointer bg-status-complete text-status-complete w-max flex-shrink-0"
                        onClick={handleUpdateReplyQuestion}
                    >
                        <VscSend className="w-4 h-4 mr-2" />
                        <span>Cập nhật</span>
                    </Button>
                </div>
            )}
            {isReplyModalOpen && (
                <div className="flex justify-between gap-4 mt-3 items-center pt-3 pl-2 pr-2 border-t-primary">
                    <div className="w-full">
                        <div className="mb-2 block">
                            <Label htmlFor="rply" value="Trả lời..." />
                        </div>
                        <Textarea
                            value={replyQuestionContent}
                            onChange={(e) => setReplyQuestionContent(e.target.value)}
                            id="rply"
                            placeholder="Nhập vào câu hỏi..."
                            required
                            rows={4}
                        />
                    </div>

                    <Button
                        className="pl-4 flex justify-center p-2 rounded-md items-center pr-4 cursor-pointer bg-status-cancel text-status-cancel"
                        onClick={() => setIsReplyModalOpen(false)}
                    >
                        <VscSend className="w-4 h-4 mr-2" />
                        <span>Hủy</span>
                    </Button>
                    <Button
                        className="pl-4 flex justify-center p-2 rounded-md items-center pr-4 cursor-pointer bg-status-complete text-status-complete w-max flex-shrink-0"
                        onClick={handleReplyQuestion}
                    >
                        <VscSend className="w-4 h-4 mr-2" />
                        <span>Trả lời</span>
                    </Button>
                </div>
            )}
        </>
    );
}

export default QuestionItem;
