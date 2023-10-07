import { motion } from 'framer-motion';
import { BlogItem } from '../../components';
function OurBlog() {
    return (
        <motion.div className="p-10">
            <motion.div className="flex justify-between items-center border-b-[1px] border-solid border-primary">
                <motion.h1 className="text-3xl font-bold">Our Blog</motion.h1>
                <motion.h4 className="underline cursor-pointer hover:text-primary">View All</motion.h4>
            </motion.div>
            <motion.div className="grid grid-cols-3 gap-4 mt-10 overflow-hidden">
                <motion.div className="grid gap-4 col-span-1">
                    <BlogItem className="col-span-1"></BlogItem>
                    <motion.h1 className="border-b-[1px] ml-auto cursor-pointer mr-auto hover:text-primary h-fit w-fit border-primary border-solid">
                        Watch More
                    </motion.h1>
                </motion.div>
                <motion.div className="grid gap-4 col-span-2">
                    <BlogItem className="col-span-2 " direction="horizontal"></BlogItem>
                    <BlogItem className="col-span-2 " direction="horizontal"></BlogItem>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default OurBlog;
