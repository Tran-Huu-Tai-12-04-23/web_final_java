import { motion } from 'framer-motion';

import { CardNew, CardMain } from '../../components/index';
import Banner from './Banner';
import CategoryHome from './CategoryHome';
import ServiceHome from './ServiceHome';
import SaleProduct from './SaleProduct';
import NewItem from './NewItem';
import BannerSale from './BannerSale';
import BestSeller from './BestSeller';
import TopBranch from './TopBranch';
import SlideBannerProduct from './SlideBannerProduct';
import OurBlog from './OurBlog';
import { BannerSuperSale } from '../../components';

function Home() {
    const items = [
        {
            id: '1',
        },
        {
            id: '2',
        },
        {
            id: '3',
        },
        {
            id: '4',
        },
        {
            id: '5',
        },
        {
            id: '6',
        },
        {
            id: '7',
        },
        {
            id: '8',
        },
        {
            id: '9',
        },
        {
            id: '4',
        },
        {
            id: '5',
        },
        {
            id: '6',
        },
        {
            id: '7',
        },
        {
            id: '8',
        },
        {
            id: '9',
        },
    ];

    return (
        <motion.div className=" mt-header pt-20 pb-10 w-full overflow-hidden pl-10 pr-10 max-w-screen-xl m-auto">
            <Banner></Banner>
            <ServiceHome />
            <CategoryHome />
            <SaleProduct />
            <NewItem />
            <BannerSale />
            <BannerSuperSale />
            <TopBranch />
            <SlideBannerProduct />
            <OurBlog />
        </motion.div>
    );
}

export default Home;
