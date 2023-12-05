import { Header, Footer } from '../../components';
import { useEffect } from 'react';

function MainLayout({ children }) {
    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }, 200);
    });
    return (
<<<<<<< HEAD
        <motion.div className="bg-light dark:bg-dark">
=======
        <div className="bg-light dark:bg-dark">
>>>>>>> main
            <Header></Header>
            {children}
            <Footer></Footer>
        </div>
    );
}

export default MainLayout;
