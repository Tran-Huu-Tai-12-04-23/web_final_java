import CategoryProduct from '../Global/CategoryApp/CategoryProduct';
import MainFilter from '../Admin/Scene/Product/Manager/MainFilter';

import { MainScreenShowProduct, Button, BannerSuperSale } from '../../components';
import { useEffect, useState } from 'react';

import BannerSale from '../../layout/Home/BannerSale';
import { request } from '../../services';
import { Spinner } from 'flowbite-react';

function Product({ category }) {
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            await request('GET', '/api/v1/public/product?page=0&&size=30')
                .then((res) => {
                    const data = res.data;
                    if (!data) return;
                    setProducts(data);
                })
                .catch((err) => {
                    console.error(err);
                });

            setLoading(false);
        };

        getData();
    }, []);
    return (
        <div className="p-4 pt-[5rem] max-w-screen-xl m-auto">
            <CategoryProduct active={category}></CategoryProduct>
            {/* <OutPurpose></OutPurpose> */}

            <MainFilter setFilters={setFilters} filters={filters}></MainFilter>
            <div className="w-full mt-10 flex justify-center items-center flex-col gap-10">
                {loading ? (
                    <Spinner color={'pink'}></Spinner>
                ) : (
                    <MainScreenShowProduct data={products}></MainScreenShowProduct>
                )}
                <Button className="p-2 rounded-md bg-btn-second pl-4 pr-4 m-auto">More</Button>
            </div>
            <BannerSale></BannerSale>

            <BannerSuperSale></BannerSuperSale>
        </div>
    );
}

export default Product;
