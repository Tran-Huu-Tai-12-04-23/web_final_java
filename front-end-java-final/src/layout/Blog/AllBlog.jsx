import { motion } from 'framer-motion';
import { BlogItem } from '../../components';

function AllBlog() {
    return (
        <motion.div className="2xl:p-10 xl:p-10 lg:p-10">
            <motion.div className="flex justify-between items-center">
                <motion.h1 className="text-3xl font-bold">All blog posts</motion.h1>
            </motion.div>
            <motion.div className="grid grid-cols-6 gap-4 mt-10 grid-rows-2 overflow-hidden">
                <motion.div className="hidden gap-4 xl:grid 2xl:col-span-2 lg:grid col-span-3 row-span-2">
                    <BlogItem className="col-span-1 "></BlogItem>
                    <BlogItem className="col-span-1 "></BlogItem>
                </motion.div>
                <motion.div className="hidden gap-4 xl:grid 2xl:col-span-2 lg:grid col-span-3 row-span-2">
                    <BlogItem className="col-span-2 "></BlogItem>
                    <BlogItem className="col-span-2 "></BlogItem>
                </motion.div>
                <motion.div className="hidden gap-4 xl:grid 2xl:col-span-2 lg:hidden col-span-2 row-span-2">
                    <BlogItem className="col-span-2 "></BlogItem>
                    <BlogItem className="col-span-2 "></BlogItem>
                </motion.div>
                <motion.div className="grid gap-4 xl:hidden 2xl:hidden lg:hidden col-span-6 row-span-2">
                    <BlogItem className="col-span-3 "></BlogItem>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default AllBlog;
