import CategoryProduct from '../Global/CategoryApp/CategoryProduct';
import MainFilter from '../Admin/Scene/Product/Manager/MainFilter';

import { MainScreenShowProduct, Button, BannerSuperSale } from '../../components';
import { useEffect, useState, useLayoutEffect } from 'react';

import BannerSale from '../../layout/Home/BannerSale';
import { request } from '../../services';
import { Spinner } from 'flowbite-react';
import { useSearch } from '../../context/search';
import { useLocation } from 'react-router-dom';

function Product() {
    const { key, search } = useSearch();
    const [products, setProducts] = useState([]);
    const [productsSearch, setProductsSearch] = useState([]);
    const [filters, setFilters] = useState({});
    const [pageSearch, setPageSearch] = useState(0);
    const [page, setPage] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const location = useLocation();
    // Use URLSearchParams to parse the query parameters
    const queryParams = new URLSearchParams(location.search);
    // Get the value of the 'category' parameter
    const category = queryParams.get('category');

    const loadMoreData = async () => {
        if (key) {
            await getDataSearch(pageSearch);
        } else {
            await getProduct(page);
        }
    };

    const getDataSearch = async (pageData) => {
        const URL =
            `/api/v1/public/product/search?` +
            [
                `size=${'28'}`,
                `status=${true}`,
                pageData && `page=${pageData}`,
                key && `page=${key}`,
                category && `categoryId=${category}`,
                filters.maxPrice && `maxPrice=${filters.maxPrice}`,
                filters.maxPrice && `maxPrice=${filters.maxPrice}`,
                filters.brand && `brandId=${filters.brand}`,
                filters.selectedSort && `sortType=${filters.selectedSort}`,
            ]
                .filter(Boolean)
                .join('&');

        try {
            const res = await request('GET', URL);
            if (!res.data || res.data.length === 0) {
                setLoaded(true);
            } else {
                if (pageSearch === 0) {
                    setProductsSearch([...res.data]);
                } else {
                    setProductsSearch((prev) => [...prev, ...res.data]);
                }
                setPageSearch(pageData + 1);
            }
        } catch (err) {
            console.error(err);
            setLoaded(true);
        }
    };

    const getProduct = async (pageData) => {
        const URL =
            `/api/v1/public/product/search?` +
            [
                `size=${'28'}`,
                `status=${true}`,
                pageData && `page=${pageData}`,
                category && `categoryId=${category}`,
                filters.maxPrice && `maxPrice=${filters.maxPrice}`,
                filters.maxPrice && `maxPrice=${filters.maxPrice}`,
                filters.brand && `brandId=${filters.brand}`,
                filters.selectedSort && `sortType=${filters.selectedSort}`,
            ]
                .filter(Boolean)
                .join('&');

        try {
            const res = await request('GET', URL);
            if (!res.data || res.data.length === 0) {
                setLoaded(true);
            } else {
                if (page === 0) {
                    setProducts([...res.data]);
                } else {
                    setProducts((prev) => [...prev, ...res.data]);
                }

                setPage(pageData + 1);
            }
        } catch (err) {
            console.error(err);
            setLoaded(true);
        }
    };

    useEffect(() => {
        setProductsSearch([]);
        if (key) {
            getDataSearch(0);
        } else {
            getProduct(0);
        }
    }, [key]);

    useLayoutEffect(() => {
        if (category) {
            setPage(0);
            setPageSearch(0);
            setProducts([]);
            setProductsSearch([]);
            setLoaded(false);
            if (key) {
                getDataSearch(0);
            } else {
                getProduct(0);
            }
        }
    }, [category]);

    useLayoutEffect(() => {
        setPage(0);
        setPageSearch(0);
        setProducts([]);
        setProductsSearch([]);
        setLoaded(false);
        if (key) {
            getDataSearch(0);
        } else {
            getProduct(0);
        }
    }, [filters]);

    useLayoutEffect(() => {
        if (filters.selectedSort) {
            setPage(0);
            setPageSearch(0);
            setProducts([]);
            setProductsSearch([]);
            setLoaded(false);
            if (key) {
                getDataSearch(0);
            } else {
                getProduct(0);
            }
        }
    }, [filters.selectedSort]);

    return (
        <div className="p-4 pt-[5rem] max-w-screen-xl m-auto">
            <CategoryProduct active={category}></CategoryProduct>
            {key && (
                <>
                    <div className="flex justify-center items-center gap-1">
                        <span className=" w-max-content">
                            Tìm thấy {productsSearch && productsSearch.length} sản phẩm cho từ khoá
                        </span>
                        <span className="text-blue-600 italic">'{key}'</span>
                    </div>
                    <Button className="text-blue-500 ml-3 text-center w-full" onClick={() => search('')}>
                        Clear
                    </Button>
                </>
            )}

            <MainFilter
                // onApply={handleSearchFilter()}
                hideCategory
                setFilters={setFilters}
                filters={filters}
            ></MainFilter>
            <div className="w-full mt-10 flex justify-center items-center flex-col gap-10">
                <MainScreenShowProduct data={!key ? products : productsSearch}></MainScreenShowProduct>

                {!loaded && (
                    <Button
                        className="p-2 rounded-md bg-btn-second pl-4 pr-4 m-auto"
                        onClick={async (e) => {
                            e.preventDefault();
                            await loadMoreData();
                        }}
                    >
                        Xem thêm
                    </Button>
                )}
            </div>
            <BannerSale></BannerSale>

            <BannerSuperSale></BannerSuperSale>
        </div>
    );
}

export default Product;
