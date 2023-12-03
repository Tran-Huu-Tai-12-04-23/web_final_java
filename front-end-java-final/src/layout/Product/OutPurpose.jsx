import { OutPurpose as data } from '../../assets/data';
import { TextMain } from '../../components';
import { AnimateHover } from '../../components/Animate';

function OutPurpose() {
    return (
        <div className="mt-4 m-auto">
            <TextMain className={'text-bold mb-4 font-bold text-xl border-b-primary pb-2    '}>Out purpose</TextMain>
            <div className="flex justify-between items-center gap-8">
                {data.map((p, index) => {
                    return (
                        <AnimateHover
                            key={index}
                            className={`relative flex flex-col gap-4 rounded-md p-5 w-1/5 text-white font-bold text-xl ${p.classBackground}`}
                        >
                            <div className="absolute text-shadow-xl top-2 left-2"> {p.name}</div>
                            <img src={p.linkImg} alt="" className="h-32 w-full scale-150 mb-[30%] rounded-md"></img>
                        </AnimateHover>
                    );
                })}
            </div>
            <div className="flex justify-between items-center"></div>
        </div>
    );
}

export default OutPurpose;
