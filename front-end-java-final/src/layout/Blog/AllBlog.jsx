import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BlogItem, Button } from '../../components';
import { request } from '../../services';
import { useLoading } from '../../context/loadingContext';

function AllBlog() {
    const { startLoading, stopLoading } = useLoading();
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        const getBlogs = async () => {
            await request('GET', '/api/v1/public/blog')
                .then((res) => {
                    res.data && setBlogs(res.data);
                })
                .catch((err) => console.error(err));
        };

        getBlogs();
    }, []);

    return (
        <div className="2xl:p-10 xl:p-10 lg:p-10">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Tất cả Blogs</h1>
            </div>
            <div className="flex justify-center items-center gap-4">
                {blogs &&
                    blogs.map((blg, index) => {
                        return <BlogItem key={index} data={blg}></BlogItem>;
                    })}
            </div>

            <div className="w-full flex justify-center items-center mt-5">
                <Button className="text-blue-500 m-auto w-fit">Xem thêm</Button>
            </div>
        </div>
    );
}

export default AllBlog;
