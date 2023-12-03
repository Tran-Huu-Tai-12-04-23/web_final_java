import { FiMail } from 'react-icons/fi';
import { BiLocationPlus } from 'react-icons/bi';
import { FiPhoneIncoming } from 'react-icons/fi';
import { TextMain } from '../../components';
import { TextReveal } from '../../components/Animate';
function InfoSection({ icon, title, content }) {
    return (
        <div className="mt-10 flex-col justify-start items-center gap-2 inline-flex">
            <div className="w-12 h-12 relative flex justify-center items-center">
                {icon}
            </div>
            <TextMain className={'text-neural-950 font-medium'}>
                <TextReveal text={title}></TextReveal>
            </TextMain>
            <TextMain className={'text-center text-neutral-500 font-light'}>
                <TextReveal text={content}></TextReveal>
            </TextMain>
        </div>
    );
}

function BriefInfor() {
    return (
        <div className="flex justify-center">
            <div className="mt-10 justify-start items-center gap-[170px] inline-flex">
            <InfoSection
                icon={<BiLocationPlus className='text-primary text-4xl' />}
                title="Văn phòng"
                content="Tân Hưng, Tân Phong, Quận 7, Thành phố HCM"
            />
            <InfoSection
                icon={<FiMail className='text-primary text-4xl' />}
                title="Email"
                content="info@gettech.com"
            />
            <InfoSection
                icon={<FiPhoneIncoming className='text-primary text-4xl' />}
                title="Điện thoại"
                content="+84 999 999 999"
            />
            </div>
        </div>
    );
}


export default BriefInfor;
