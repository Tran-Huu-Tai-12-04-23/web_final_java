import SubHeader from '../../../Includes/SubHeader';

import InformationMemberOrder from './InformationMemberOrder';
import ConfigStatusOrder from './ConfigStatusOrder';
import SummaryProduct from './SummaryProduct';
import { TextMain } from '../../../../../components';

function OrderDetail() {
    return (
        <div className="p-4">
            <SubHeader nameHeader={'Orders detail'} sub="Detail" main="Orders"></SubHeader>
            <div className="flex justify-between gap-10 mt-10 ">
                <div className="flex flex-col gap-10 w-2/3">
                    <SummaryProduct></SummaryProduct>
                    <ConfigStatusOrder></ConfigStatusOrder>
                </div>
                <div className="w-1/3">
                    <InformationMemberOrder></InformationMemberOrder>
                </div>
            </div>
        </div>
    );
}

export default OrderDetail;
