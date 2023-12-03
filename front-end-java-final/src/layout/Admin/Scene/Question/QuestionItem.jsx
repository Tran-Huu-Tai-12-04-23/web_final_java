import { Tooltip } from 'flowbite-react';
import { TextMain, Button } from '../../../../components';
import { CiChat2 } from 'react-icons/ci';
import { LiaTrashAlt } from 'react-icons/lia';

function QuestionItem({ index = 0 }) {
    return (
        <div
            className={`${
                index % 2 == 0 ? 'hover:brightness-125' : 'brightness-125 hover:brightness-150'
            } bg-light-tiny dark:bg-dark-tiny p-2  rounded-md flex justify-between items-center mt-5 `}
        >
            <div className="flex justify-start items-center gap-4">
                <input
                    onChange={(e) => {
                        // if (e.target.checked) {
                        //     handleCheckAllItems();
                        // } else {
                        //     handleUncheckAllItems();
                        // }
                    }}
                    type="checkbox"
                    className="input-no"
                />
                <TextMain>Tran Huu Tai</TextMain>
                <p className="text-second block max-w-[50rem] truncate overflow-clip">

                Mọi người đều nhận thức tại sao việc có một ngôn ngữ chung mới là điều đáng mong muốn: người ta có thể từ chối thanh toán cho các biên dịch đắt tiền. Để đạt được điều này, sẽ cần có ngữ pháp và cách phát âm đồng đều.
                </p>
            </div>

            <div className="flex justify-end items-center gap-1">
                <Tooltip content="Trả lời câu hỏi">
                    <Button>
                        <CiChat2 className="w-6 h-6 text-status-complete" />
                    </Button>
                </Tooltip>
                <Tooltip content="Xóa câu hỏi">
                    <Button>
                        <LiaTrashAlt className="w-6 h-6 text-status-cancel" />
                    </Button>
                </Tooltip>
            </div>
        </div>
    );
}

export default QuestionItem;
