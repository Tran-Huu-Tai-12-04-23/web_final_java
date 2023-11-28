import { TextMain, TextSub } from '../index';
import { BsCalendar4Week } from 'react-icons/bs';
import { GiAlarmClock } from 'react-icons/gi';
import Constants from '../../Constants';
import { useNavigate } from 'react-router-dom';
function BlogItem({ data = {}, width, className, direction = 'vertical' }) {
    const history = useNavigate();
    return (
        <div
            whileHover={{ scale: 1, transition: { duration: 0.3 } }}
            whileTap={{
                scale: 0.8,
                borderRadius: '10%',
                transition: { duration: 0.3 },
            }}
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            exit={{
                opacity: 0,
            }}
            transition={{
                duration: 0.3,
                ease: 'easeInOut',
            }}
            onClick={() => history(Constants.BLOGS + '/' + data?.id)}
            className={`${width} ${
                direction == 'horizontal' && 'flex justify-start'
            } shadow-lg cursor-pointer hover:bg-hover p-2 min-w-[15rem] max-w-[25rem] max-h-[20rem] rounded-lg overflow-hidden ${className}`}
        >
            <img src={data?.thumbnails} className="w-full max-h-52 h-52 rounded-lg"></img>
            <div className="flex p-4 justify-center items-center flex-col">
                <div className="flex w-3/4 justify-between items-center">
                    <div className="flex w-fit justify-start items-center">
                        <BsCalendar4Week className=" mr-2 h-4 w-4"></BsCalendar4Week>
                        <TextSub>August, 8, 2023</TextSub>
                    </div>
                    <div className="flex  w-fit justify-end items-center">
                        <GiAlarmClock className="mr-2 h-4 w-4"></GiAlarmClock>
                        <TextSub>3 hours ago</TextSub>
                    </div>
                </div>
                <div className="w-full">
                    <TextMain className={' truncate mt-2 text-ellipsis font-bold'}>
                        Hé lộ những thông tin đầu tiên về dòng Google Pixel 9
                    </TextMain>
                    <TextSub className="text-md brightness-75 font-medium h-32 line-clamp-2 truncate">
                        Chỉ vài ngày sau khi dòng Pixel 8 ra mắt, leaker đáng tin cậy Ross Young đã chia sẻ cho chúng ta
                        những thông tin rò rỉ đầu tiên về Pixel 9 series.
                    </TextSub>
                </div>
            </div>
        </div>
    );
}

export default BlogItem;
