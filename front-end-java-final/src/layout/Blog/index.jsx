import Navigation from './Navigation';
import CategoryBlog from '../Global/CategoryApp/CategoryBlog';
import RecentBlog from './RecentBlog';
import AllBlog from './AllBlog';
import { Pagination } from '../../components';
import { motion } from 'framer-motion';

function Blog() {
    return (
        <motion.div className="pt-[4rem] max-w-screen-xl m-auto">
            <Navigation></Navigation>
            <div className="text-center text-9xl">GET TECH</div>
            <CategoryBlog></CategoryBlog>
            <RecentBlog></RecentBlog>
            <AllBlog></AllBlog>
        </motion.div>
    );
}

export default Blog;
