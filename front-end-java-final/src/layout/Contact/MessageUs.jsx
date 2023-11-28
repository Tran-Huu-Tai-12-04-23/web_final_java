import { Input, TextMain } from "../../components";
import {BsFillPersonFill} from 'react-icons/bs'
import { CiMail } from "react-icons/ci";
import {BiMessageAltDots} from "react-icons/bi"
import { TextReveal } from "../../components/Animate";
function MessageUs() {
    const msgText = "We're here to assist you every step of the way. Whether you have a question, need technical support, or simply want to share your feedback, our dedicated team is ready to listen and provide prompt assistance."
    return (
        <div className="mt-10 flex justify-center">
            <div className="w-[496px] p-6">
                <TextMain className="text-xl font-medium">
                    <TextReveal text={"Message Us"}></TextReveal>
                </TextMain>
                <TextMain className="mt-5 text-neutral-500 ">Chúng tôi ở đây để hỗ trợ bạn mỗi bước của hành trình. Cho dù bạn có một câu hỏi, cần hỗ trợ kỹ thuật, hoặc chỉ đơn giản muốn chia sẻ ý kiến của bạn, đội ngũ cam kết của chúng tôi sẵn sàng lắng nghe và cung cấp sự hỗ trợ nhanh chóng.
                </TextMain>
            </div>

            <div className="w-[392px] p-6 flex flex-col">
                <Input
                    placeholder="Your name"
                    className="mb-3"
                    iconLeft={<BsFillPersonFill className="ml-3 w-6 h-6 l-2 text-gray-400"></BsFillPersonFill>}
                ></Input>

                <Input
                    placeholder="E-mail"
                    className="mb-3"
                    iconLeft={<CiMail className="ml-3 w-6 h-6 l-2 text-gray-400"></CiMail>}
                ></Input>

                {/* dont know how to config postion of placeholder, help plssss */}
                <Input
                    placeholder="Message"
                    className="w-[350px] h-[190px] p-6 rounded-lg "
                    iconLeft={<BiMessageAltDots className="ml-3 w-6 h-6 l-2 text-gray-400"></BiMessageAltDots>}
                ></Input>
                <div className="ml-40 mt-10 w-[190px] h-12 p-2 bg-rose-400 rounded-lg flex items-center justify-center">
                    <div className="text-center text-white text-base font-normal font-['Inter']">Gửi</div>
                </div>
            </div>
        </div>
    );
}
export default MessageUs;