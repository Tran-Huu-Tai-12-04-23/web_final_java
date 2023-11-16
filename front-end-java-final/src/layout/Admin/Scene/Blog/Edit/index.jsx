import AddProduct from '../Add';
import { productDemo } from '../../../../../assets/data';
function BlogEdit({}) {
    return <AddProduct data={productDemo} mode="edit"></AddProduct>;
}

export default BlogEdit;
