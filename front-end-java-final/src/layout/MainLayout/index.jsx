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
        <div className="bg-light dark:bg-dark">
            <Header></Header>
            {children}
            <Footer></Footer>
        </div>
    );
}

export default MainLayout;
