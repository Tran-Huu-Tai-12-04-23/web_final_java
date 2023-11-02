import AddProduct from '../Add';
import { productDemo } from '../../../../../assets/data';
function ProductEdit({}) {
    return <AddProduct data={productDemo} mode="edit"></AddProduct>;
}

export default ProductEdit;
