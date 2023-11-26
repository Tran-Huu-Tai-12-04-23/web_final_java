import { AnimateOpacity } from '../../../components/Animate';
import { Button, Input, TextMain, TextSub } from '../../../components';

import { LiaCommentAltSolid } from 'react-icons/lia';
import { VscSend } from 'react-icons/vsc';

import SubBoxReplyQuestion from './SubBoxReplyQuestion';

function Questions() {
    const questionsData = [
        {
            memberName: 'Tran huu tai',
            avatar: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/s/m/sm-s908_galaxys22ultra_front_burgundy_211119_3.jpg',
            content:
                'Giá con s23 ultra ở TP Long xuyên An Giang bây giờ bao nhiêu ạ Giá con s23 ultra ở TP Long xuyên An Giang bây giờ bao nhiêu ạGiá con s23 ultra ở TP Long xuyên An Giang bây giờ bao nhiêu ạ Giá con s23 ultra ở TP Long xuyên An Giang bây giờ bao nhiêu ạ Giá con s23 ultra ở TP Long xuyên An Giang bây giờ bao nhiêu ạ Giá con s23 ultra ở TP Long xuyên An Giang bây giờ bao nhiêu ạ Giá con s23 ultra ở TP Long xuyên An Giang bây giờ bao nhiêu ạ',
            createAt: '22/10/2023',

            reply: [
                {
                    name: 'ADMIN',
                    content: `CellphoneS xin chào chị Ngân
SAMSUNG GALAXY S23 ULTRA 12GB 512GB ĐEN (S918) giá hiện tại giảm còn 25.990.000
SAMSUNG GALAXY S23 ULTRA 8GB 256GB ĐEN (S918) giá hiện tại giảm còn 22.490.000
Dạ giá đã trừ phiếu mua hàng ạ
Dạ shop CellphoneS 912 Tôn Đức Thắng, P. Hòa Khánh Bắc, Q. Liên Chiểu, TP. Đà Nẵng còn hàng ạ
Dạ không biết khi nào mình ghé shop để em giữ hàng trong 24h cho mình ạ
Thân mến !`,
                    createAt: '22/10/2023',
                },
                {
                    name: 'ADMIN',
                    content: `CellphoneS xin chào chị Ngân
SAMSUNG GALAXY S23 ULTRA 12GB 512GB ĐEN (S918) giá hiện tại giảm còn 25.990.000
SAMSUNG GALAXY S23 ULTRA 8GB 256GB ĐEN (S918) giá hiện tại giảm còn 22.490.000
Dạ giá đã trừ phiếu mua hàng ạ
Dạ shop CellphoneS 912 Tôn Đức Thắng, P. Hòa Khánh Bắc, Q. Liên Chiểu, TP. Đà Nẵng còn hàng ạ
Dạ không biết khi nào mình ghé shop để em giữ hàng trong 24h cho mình ạ
Thân mến !`,
                    createAt: '22/10/2023',
                },
                {
                    name: 'ADMIN',
                    content: `CellphoneS xin chào chị Ngân
SAMSUNG GALAXY S23 ULTRA 12GB 512GB ĐEN (S918) giá hiện tại giảm còn 25.990.000
SAMSUNG GALAXY S23 ULTRA 8GB 256GB ĐEN (S918) giá hiện tại giảm còn 22.490.000
Dạ giá đã trừ phiếu mua hàng ạ
Dạ shop CellphoneS 912 Tôn Đức Thắng, P. Hòa Khánh Bắc, Q. Liên Chiểu, TP. Đà Nẵng còn hàng ạ
Dạ không biết khi nào mình ghé shop để em giữ hàng trong 24h cho mình ạ
Thân mến !`,
                    createAt: '22/10/2023',
                },
            ],
        },
    ];
    return (
        <AnimateOpacity className={'p-4 rounded-md'}>
            <TextMain className={'border-b-primary pb-3'}>Q&A</TextMain>

            <div className="border-primary-style rounded-md mt-4 p-3">
                {questionsData.map((boxQues, index) => {
                    return (
                        <div className="" key={index}>
                            <div className="flex flex-col">
                                <div className="flex justify-between items-center">
                                    <div className="flex justify-start items-center gap-4">
                                        <img
                                            className="w-8 h-8 rounded-full"
                                            src={boxQues.avatar}
                                            alt="avatar user"
                                        ></img>
                                        <span>{boxQues.memberName}</span>
                                    </div>
                                    <span className="brightness-50">{boxQues.createAt}</span>
                                </div>
                                <div className="flex  p-4 mt-3 rounded-md justify-between items-end bg-light-tiny dark:bg-dark-tiny">
                                    <span>{boxQues.content}</span>
                                    <Button className="flex justify-start ml-4 items-center brightness-75 hover:text-primary cursor-pointer">
                                        <LiaCommentAltSolid className="mr-1 w-6 h-6 "></LiaCommentAltSolid>
                                        <span>Reply</span>
                                    </Button>
                                </div>

                                <div className="ml-8 mt-4 flex flex-col gap-4">
                                    <SubBoxReplyQuestion data={questionsData}></SubBoxReplyQuestion>
                                </div>
                            </div>
                        </div>
                    );
                })}

                <div className="flex justify-between gap-4 mt-3 items-center pt-3 pl-2 pr-2 border-t-primary">
                    <Input className="w-full" placeholder="Enter your question..."></Input>
                    <Button
                        className="pl-4 flex justify-center p-2 rounded-md items-center pr-4 cursor-pointer bg-primary"
                        style=""
                    >
                        <VscSend className="w-4 h-4 mr-2"></VscSend>
                        <span>Send</span>
                    </Button>
                </div>
            </div>
        </AnimateOpacity>
    );
}

export default Questions;
