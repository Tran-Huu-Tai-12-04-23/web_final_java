import CategoryApp from '../Global/CategoryApp';
import OutPurpose from './OutPurpose';
import MainFilter from '../Admin/Scene/Product/Manager/MainFilter';

import { MainScreenShowProduct, Pagination, BannerSuperSale } from '../../components';
import { useState } from 'react';

import BannerSale from '../../layout/Home/BannerSale';
import SaleProduct from '../../layout/Home/SaleProduct';

function Product() {
    const [filters, setFilters] = useState({});
    return (
        <div className="p-4 pt-[5rem] max-w-screen-xl m-auto">
            <CategoryApp></CategoryApp>
            <OutPurpose></OutPurpose>

            <div className="flex justify-between gap-20 mt-20 border-t-primary pt-20 w-full">
                <MainFilter setFilters={setFilters} filters={filters}></MainFilter>

                <div className="w-full">
                    <MainScreenShowProduct></MainScreenShowProduct>

                    <div className="mt-10 flex justify-center items-center w-full">
                        <Pagination></Pagination>
                    </div>
                </div>
            </div>
            <BannerSale></BannerSale>

            <BannerSuperSale></BannerSuperSale>
        </div>
    );
}

export default Product;
