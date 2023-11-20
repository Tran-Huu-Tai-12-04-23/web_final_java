import {motion} from 'framer-motion';
import { Header } from '../../components';
function AccountLayout({children}){
    return(
        <motion.div className='container mt-20 mx-auto'>
            <Header></Header>
            {children}
        </motion.div>
    )
}
export default AccountLayout;