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
                    Everyone realizes why a new common language would be desirable: one could refuse to pay expensive
                    translators. To achieve this, it would be necessary to have uniform grammar pronunciation.
                </p>
            </div>

            <div className="flex justify-end items-center gap-1">
                <Tooltip content="Reply question">
                    <Button>
                        <CiChat2 className="w-6 h-6 text-status-complete" />
                    </Button>
                </Tooltip>
                <Tooltip content="Reply question">
                    <Button>
                        <LiaTrashAlt className="w-6 h-6 text-status-cancel" />
                    </Button>
                </Tooltip>
            </div>
        </div>
    );
}

export default QuestionItem;
