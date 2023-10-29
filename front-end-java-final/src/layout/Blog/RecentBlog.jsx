import { motion } from 'framer-motion';
import { BlogItem } from '../../components';

function RecentBlog() {
    return (
        <motion.div className="2xl:p-10 xl:p-10 lg:p-10">
            <motion.div className="flex justify-between items-center">
                <motion.h1 className="text-3xl font-bold">Recent blog posts</motion.h1>
            </motion.div>
            <motion.div className="grid grid-cols-2 gap-4 mt-10 grid-rows-2 overflow-hidden">
                <motion.div className="grid gap-4 2xl:col-span-1 xl:col-span-1 lg:col-span-1 col-span-2 row-span-2">
                    <BlogItem className="col-span-2 "></BlogItem>
                </motion.div>
                <motion.div className="hidden gap-4 xl:grid 2xl:grid lg:grid col-span-1 row-span-2">
                    <BlogItem className="col-span-2 " direction="horizontal"></BlogItem>
                    <BlogItem className="col-span-2 " direction="horizontal"></BlogItem>
                </motion.div>
                <motion.div className="grid gap-4 xl:hidden 2xl:hidden lg:hidden col-span-2 row-span-2">
                    <BlogItem className="col-span-2 "></BlogItem>
                    <BlogItem className="col-span-2 "></BlogItem>
                </motion.div>
            </motion.div>
            <motion.div className="hidden gap-4 xl:grid 2xl:grid lg:grid col-span-2 row-span-2 mt-4">
                <BlogItem className="col-span-2 " direction="horizontal"></BlogItem>
            </motion.div>
            <motion.div className="grid gap-4 xl:hidden 2xl:hidden lg:hidden col-span-2 row-span-2 mt-4">
                <BlogItem className="col-span-2 "></BlogItem>
            </motion.div>
        </motion.div>
    );
}

export default RecentBlog;
