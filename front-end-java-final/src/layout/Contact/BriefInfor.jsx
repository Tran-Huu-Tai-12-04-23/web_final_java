import { FiMail } from 'react-icons/fi';
import { BiLocationPlus } from 'react-icons/bi';
import { FiPhoneIncoming } from 'react-icons/fi';

function InfoSection({ icon, title, content }) {
    return (
        <div className="mt-10 flex-col justify-start items-center gap-2 inline-flex">
            <div className="w-12 h-12 relative flex justify-center items-center">
                {icon}
            </div>
            <div className="text-neutral-950 text-xl font-medium font-['Inter']">{title}</div>
            <div className="text-center text-neutral-500 text-xl font-light font-['Inter'] leading-7">{content}</div>
        </div>
    );
}

function BriefInfor() {
    return (
        <div className="flex justify-center">
            <div className="mt-10 justify-start items-center gap-[170px] inline-flex">
            <InfoSection
                icon={<BiLocationPlus className='text-primary text-4xl' />}
                title="Office"
                content="123 Main Street, Anytown, USA"
            />
            <InfoSection
                icon={<FiMail className='text-primary text-4xl' />}
                title="Email"
                content="info@gettech.com"
            />
            <InfoSection
                icon={<FiPhoneIncoming className='text-primary text-4xl' />}
                title="Phone"
                content="+84 999 999 999"
            />
            </div>
        </div>
    );
}

export default BriefInfor;
