import { useState } from 'react';
import { AnimateOpacity } from '../../../components/Animate';
import { Button, Input, TextMain, TextSub } from '../../../components';

import { LiaCommentAltSolid } from 'react-icons/lia';
import { VscSend } from 'react-icons/vsc';

import SubBoxReplyQuestion from './SubBoxReplyQuestion';
import { useEffect } from 'react';
import { useLoading } from '../../../context/loadingContext';
import { request } from '../../../services';
import { useLogin } from '../../../context/login';
import { Label, Textarea } from 'flowbite-react';

function Questions({ productId }) {
    const [questions, setQuestions] = useState(null);
    const [newQuestion, setNewQuestion] = useState('');
    const { startLoading, stopLoading } = useLoading();
    const { account } = useLogin();

    const getQuestions = async () => {
        startLoading();
        try {
            const res = await request('GET', `/api/v1/public/product/questions/${productId}`);
            if (res.data) {
                setQuestions(res.data);
            }
        } catch (err) {
            console.error(err);
        }
        stopLoading();
    };

    const handleSendQuestion = async () => {
        try {
            if (!newQuestion.trim()) {
                console.error('Question cannot be empty');
                return;
            }
            const questionPayload = {
                member: { id: account?.memberId },
                product: {
                    id: productId,
                },
                content: newQuestion,
                createAt: new Date().toISOString(),
            };

            const response = await request('POST', '/api/v1/user/question/add-question', questionPayload);

            getQuestions();
            setNewQuestion('');
        } catch (error) {
            console.error('Error sending question:', error);

            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
            }
        }
    };

    useEffect(() => {
        if (productId) {
            getQuestions();
        }
    }, [productId]);
    return (
        <AnimateOpacity className={'p-4 rounded-md'}>
            <TextMain className={'border-b-primary pb-3'}>Q&A</TextMain>

            <div className="border-primary-style rounded-md mt-4 p-3">
                {questions &&
                    questions.map((boxQues, index) => {
                        return (
                            <div className="bg-status-pending pl-4 pr-4 p-2 rounded-md" key={index}>
                                <div className="flex flex-col">
                                    <div className="flex justify-between items-center">
                                        <div className="flex justify-start items-center gap-4">
                                            <img
                                                className="w-8 h-8 rounded-full"
                                                src={
                                                    'https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg'
                                                }
                                                alt="avatar user"
                                            ></img>
                                            <span>{boxQues?.account?.username}</span>
                                        </div>
                                        <span className="brightness-50">
                                            {new Date(boxQues.createAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="flex  p-4 mt-1 rounded-md justify-between items-end bg-light-tiny dark:bg-dark-tiny">
                                        <span>{boxQues.content}</span>
                                    </div>
                                    <div className="ml-8 mt-2 flex flex-col gap-4">
                                        <SubBoxReplyQuestion questionId={boxQues?.id}></SubBoxReplyQuestion>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                {account ? (
                    <div className="flex justify-between gap-4 mt-3 items-center pt-3 pl-2 pr-2 border-t-primary">
                        <div className="w-full">
                            <div className="mb-2 block">
                                <Label htmlFor="question" value="Câu hỏi của bạn" />
                            </div>
                            <Textarea
                                value={newQuestion}
                                onChange={(e) => setNewQuestion(e.target.value)}
                                id="question"
                                placeholder="Nhập câu hỏi của bạn..."
                                required
                                rows={4}
                            />
                        </div>
                        <Button
                            className="pl-4 mt-10 flex justify-center p-2 rounded-md items-center pr-4 cursor-pointer bg-primary"
                            onClick={handleSendQuestion}
                        >
                            <VscSend className="w-4 h-4 mr-2" />
                            <span>Gửi</span>
                        </Button>
                    </div>
                ) : (
                    <Button className="pl-4 flex justify-center p-2 rounded-md items-center pr-4 cursor-pointer bg-primary">
                        <VscSend className="w-4 h-4 mr-2" />
                        <span>Đăng nhập để hỏi với nhân viên tư vấn</span>
                    </Button>
                )}
            </div>
        </AnimateOpacity>
    );
}

export default Questions;
