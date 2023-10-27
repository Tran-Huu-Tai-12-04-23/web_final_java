import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';

const AddProduct = lazy(() => import('./Add'));
const Manager = lazy(() => import('./Manager'));
const Edit = lazy(() => import('./Edit'));

function ManagerProducts({ setOrder, order }) {
    console.log(order);
    return (
        <motion.div className="">
            <Suspense fallback={() => <div>Loading...</div>}>
                {order.submenu == 3 && <Edit></Edit>}
                {order.submenu == 2 && <AddProduct></AddProduct>}
                {order.submenu == 1 && <Manager setOrder={setOrder}></Manager>}
            </Suspense>
        </motion.div>
    );
}

export default ManagerProducts;
