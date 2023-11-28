import OrderItem from './OrderItem';

function ViewOrder({ orders = [] }) {
    return (
        <div className="flex flex-col gap-4 p-4">
            <OrderItem></OrderItem>
            <OrderItem></OrderItem>
            <OrderItem></OrderItem>
            <OrderItem></OrderItem>
            <OrderItem></OrderItem>
            <OrderItem></OrderItem>
        </div>
    );
}

export default ViewOrder;
