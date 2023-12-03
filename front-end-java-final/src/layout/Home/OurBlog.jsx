import { useNavigate } from 'react-router-dom';
import { BlogItem } from '../../components';
import Constants from '../../Constants';

function OurBlog() {
    const history = useNavigate();
    return (
        <div className="2xl:p-10 xl:p-10 lg:p-10">
            <div className="flex justify-between items-center border-b-[1px] border-solid border-primary">
                <h1 className="text-3xl font-bold">Blog của tôi</h1>
                <h4 className="underline cursor-pointer hover:text-primary" onClick={() => history(Constants.BLOGS)}>
                    Xem tất cả
                </h4>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-10 grid-rows-2 overflow-hidden">
                <div className="grid gap-4 2xl:col-span-1 xl:col-span-1 lg:col-span-1 col-span-3 row-span-2">
                    <BlogItem className="col-span-1 "></BlogItem>
                    <h1 className="2xl:block xl:block lg:block hidden border-b-[1px] ml-auto cursor-pointer mr-auto hover:text-primary h-fit w-fit border-primary border-solid">
                        Xem thêm
                    </h1>
                </div>
                <div className="hidden gap-4 xl:grid 2xl:grid lg:grid col-span-2 row-span-2">
                    <BlogItem className="col-span-2 " direction="horizontal"></BlogItem>
                    <BlogItem className="col-span-2 " direction="horizontal"></BlogItem>
                </div>
                <div className="grid gap-4 xl:hidden 2xl:hidden lg:hidden col-span-3 row-span-2">
                    <BlogItem className="col-span-2 "></BlogItem>
                    <BlogItem className="col-span-2 "></BlogItem>
                </div>
                <h1 className="2xl:hidden xl:hidden lg:hidden block border-b-[1px] ml-auto cursor-pointer mr-auto hover:text-primary h-fit w-fit border-primary border-solid">
                    Xem thêm
                </h1>
            </div>
        </div>
    );
}

export default OurBlog;
