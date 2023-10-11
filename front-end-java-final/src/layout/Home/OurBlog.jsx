import { motion } from 'framer-motion';
import { BlogItem } from '../../components';

function OurBlog() {
    return (
        <motion.div className="2xl:p-10 xl:p-10 lg:p-10">
            <motion.div className="flex justify-between items-center border-b-[1px] border-solid border-primary">
                <motion.h1 className="text-3xl font-bold">Our Blog</motion.h1>
                <motion.h4 className="underline cursor-pointer hover:text-primary">View All</motion.h4>
            </motion.div>
            <motion.div className="grid grid-cols-3 gap-4 mt-10 grid-rows-2 overflow-hidden">
                <motion.div className="grid gap-4 2xl:col-span-1 xl:col-span-1 lg:col-span-1 col-span-3 row-span-2">
                    <BlogItem className="col-span-1 "></BlogItem>
                    <motion.h1 className="2xl:block xl:block lg:block hidden border-b-[1px] ml-auto cursor-pointer mr-auto hover:text-primary h-fit w-fit border-primary border-solid">
                        Watch More
                    </motion.h1>
                </motion.div>
                <motion.div className="hidden gap-4 xl:grid 2xl:grid lg:grid col-span-2 row-span-2">
                    <BlogItem className="col-span-2 " direction="horizontal"></BlogItem>
                    <BlogItem className="col-span-2 " direction="horizontal"></BlogItem>
                </motion.div>
                <motion.div className="grid gap-4 xl:hidden 2xl:hidden lg:hidden col-span-3 row-span-2">
                    <BlogItem className="col-span-2 "></BlogItem>
                    <BlogItem className="col-span-2 "></BlogItem>
                </motion.div>
                <motion.h1 className="2xl:hidden xl:hidden lg:hidden block border-b-[1px] ml-auto cursor-pointer mr-auto hover:text-primary h-fit w-fit border-primary border-solid">
                    Watch More
                </motion.h1>
            </motion.div>
        </motion.div>
    );
}

export default OurBlog;
