import { motion } from 'framer-motion';
import { Header, Footer } from '../../components';

function MainLayout({ children }) {
    return (
        <motion.div className="bg-light dark:bg-dark">
            <Header></Header>
            {children}
            <Footer></Footer>
        </motion.div>
    );
}

export default MainLayout;
