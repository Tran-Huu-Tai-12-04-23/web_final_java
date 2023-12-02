import { AnimateOpacity, AnimateText } from '../../components/Animate';
import { Slide } from '../../components';
import { Button } from '../../components';

import { CiShop } from 'react-icons/ci';
import bannerImg1 from '../../assets/img/banner.png';
import bannerImg2 from '../../assets/img/banner2.png';
import bannerImg3 from '../../assets/img/banner3.png';
import { useNavigate } from 'react-router-dom';
import Constants from '../../Constants';

const slides = [
    { id: 1, content: <img src={bannerImg1} alt="banner" className="w-[40rem]"></img> },
    { id: 2, content: <img src={bannerImg2} alt="banner" className="w-[40rem]"></img> },
    { id: 3, content: <img src={bannerImg3} alt="banner" className="w-[40rem]"></img> },
];
function Banner() {
    const history = useNavigate();
    return (
        <>
            <AnimateOpacity className="flex flex-col xl:flex-row lg:flex-row md:flex-row justify-between items-center p-4 m-auto xl:w-3/4 lg:w-2/3 w-full">
                <div className=" relative flex justify-center items-start flex-col">
                    <AnimateText className={'text-5xl font-bold'}>Java Tech</AnimateText>
                    <AnimateText className={'text-xl mt-5 mb-5'}>
                        "Tham gia vào thế giới <span className="ml-2 text-primary">cồng nghệ</span>"
                    </AnimateText>
                    <Button
                        onClick={() => {
                            history(Constants.PRODUCT);
                        }}
                        className={'rounded-xl flex justify-center items-center  pl-4 pr-4 p-2 bg-second'}
                    >
                        <CiShop className="h-8 w-8 text-primary"></CiShop>
                        <span className="ml-1 text-primary">KHÁM PHÁ NGAY</span>
                    </Button>
                </div>
                <AnimateOpacity className={'max-h-[40rem]'}>
                    <Slide slides={slides}></Slide>
                </AnimateOpacity>
            </AnimateOpacity>
        </>
    );
}

export default Banner;
