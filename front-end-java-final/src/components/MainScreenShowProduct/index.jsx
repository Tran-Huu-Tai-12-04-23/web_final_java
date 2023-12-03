import { CardMain } from '../../components';
function MainScreenShowProduct({ data = [] }) {
    return (
        <div className="w-full grid grid-cols-4 gap-10">
            {data.map((dt, index) => {
                return <CardMain key={index} data={dt}></CardMain>;
            })}
        </div>
    );
}

export default MainScreenShowProduct;
