import {motion} from 'framer-motion';
import { Header } from '../../components';
function AccountLayout({children}){
    return(
        <motion.div>
            <Header></Header>
            {children}
        </motion.div>
    )
}
export default AccountLayout;