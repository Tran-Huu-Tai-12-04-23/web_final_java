import { AnimateOpacity } from '../../../components/Animate';
import { Carousel, Modal, ModalItem } from '../../../components';
import Summary from './Summary';
import BuySummary from './BuySummary';
import Information from './Information';
import { useEffect, useState } from 'react';
import { request } from '../../../services';
import { useParams } from 'react-router-dom';

function DetailProduct({ mode = 'user' }) {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [viewModeSlide, setViewModeSlide] = useState(false);

    useEffect(() => {
        const getData = async () => {
            await request('GET', '/api/v1/admin/product/' + id)
                .then((response) => {
                    const data = response?.data;
                    if (!data) return;
                    setData(data);
                })
                .catch((err) => console.error(err));
        };

        getData();
    }, []);

    console.log(data);
    return (
        <AnimateOpacity className="p-4">
            {viewModeSlide && (
                <Modal>
                    <ModalItem
                        className="max-w-[60rem] max-h-[40rem] w-max h-max"
                        onClose={() => setViewModeSlide(false)}
                    >
                        <Carousel data={data?.linkImages}></Carousel>
                    </ModalItem>
                </Modal>
            )}
            <div className="flex justify-between flex-wrap">
                <div className="2xl:w-3/5 xl:w-3/5 lg:w-full md:w-full sm:w-full w-full pl-10 pr-10">
                    <Carousel onDoubleClick={() => setViewModeSlide(true)} data={data?.linkImages}></Carousel>
                </div>
                <div className="2xl:w-2/5   xl:w-2/5 lg:w-full md:w-full w-full pl-10 pr-10">
                    <Summary data={data}></Summary>
                </div>
            </div>
            <div className="flex justify-between gap-10 border-t-[1px] border-dashed border-light-tiny dark:border-dark-tiny pt-5">
                <div className="w-3/5">
                    <Information data={data}></Information>
                </div>
                <div className="w-2/5 flex justify-center mt-14">
                    <BuySummary data={data}></BuySummary>
                </div>
            </div>
        </AnimateOpacity>
    );
}

export default DetailProduct;
