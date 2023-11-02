import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';

const AddProduct = lazy(() => import('./Add'));
const Manager = lazy(() => import('./Manager'));
const Edit = lazy(() => import('./Edit'));

function ManagerProducts({}) {
    return (
        <motion.div className="">
            <Manager></Manager>
            {/* {order.submenu == 3 && <Edit></Edit>}
                {order.submenu == 2 && <AddProduct></AddProduct>} */}
        </motion.div>
    );
}

export default ManagerProducts;
