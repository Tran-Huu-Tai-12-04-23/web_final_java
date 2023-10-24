function MessageUs() {
    return (
        <div className="mt-10 flex justify-center">
            <div className="w-[496px] p-6">
                <div className="text-neutral-950 text-2xl font-medium font-['Inter']">Message us</div>
                <div className="mt-5 text-justify text-neutral-500 text-xl font-light font-['Inter'] leading-7">
                    We're here to assist you every step of the way. Whether you have a question, need technical support, or simply want to share your feedback, our dedicated team is ready to listen and provide prompt assistance.
                </div>
            </div>

            <div className="w-[392px] p-6 flex flex-col">
                <div className="w-[350px] h-12 p-3 mb-4 rounded-lg border border-zinc-400 flex">
                    <div className="text-neutral-500 text-base font-light font-['Inter'] leading-normal">*</div>
                    <div className="text-neutral-500 text-base font-light font-['Inter'] leading-normal ml-2">Your name</div>
                </div>

                <div className="w-[350px] h-12 p-3 mb-4 rounded-lg border border-zinc-400 flex">
                    <div className="text-neutral-500 text-base font-light font-['Inter'] leading-normal">*</div>
                    <div className="text-neutral-500 text-base font-light font-['Inter'] leading-normal ml-2">Email</div>
                </div>

                <div className="w-[350px] h-[190px] p-6 rounded-lg border border-zinc-400">
                    <div className="text-neutral-500 text-base font-light font-['Inter'] leading-normal">Message</div>
                </div>

                <div className="ml-40 mt-10 w-[190px] h-12 p-2 bg-rose-400 rounded-lg flex items-center justify-center">
                    <div className="text-center text-white text-base font-normal font-['Inter']">Submit</div>
                </div>
            </div>
        </div>
    );
}
export default MessageUs;