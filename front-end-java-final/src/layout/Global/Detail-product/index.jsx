import { AnimateOpacity } from '../../../components/Animate';
import { Carousel, Modal, ModalItem } from '../../../components';
import Summary from './Summary';
import BuySummary from './BuySummary';
import Information from './Information';
import { useState } from 'react';

function DetailProduct() {
    const [viewModeSlide, setViewModeSlide] = useState(false);
    return (
        <AnimateOpacity className="p-4">
            {viewModeSlide && (
                <ModalItem className="max-w-[60rem] max-h-[40rem] w-max h-max" onClose={() => setViewModeSlide(false)}>
                    <Carousel></Carousel>
                </ModalItem>
            )}
            <div className="flex justify-between flex-wrap">
                <div className="2xl:w-3/5 xl:w-3/5 lg:w-full md:w-full sm:w-full w-full pl-10 pr-10">
                    <Carousel onDoubleClick={() => setViewModeSlide(true)}></Carousel>
                </div>
                <div className="2xl:w-2/5   xl:w-2/5 lg:w-full md:w-full w-full pl-10 pr-10">
                    <Summary></Summary>
                </div>
            </div>
            <div className="flex justify-between gap-10 border-t-[1px] border-dashed border-light-tiny dark:border-dark-tiny pt-5">
                <div className="w-3/5">
                    <Information></Information>
                </div>
                <div className="w-2/5 flex justify-center items-center">
                    <BuySummary></BuySummary>
                </div>
            </div>
        </AnimateOpacity>
    );
}

export default DetailProduct;
