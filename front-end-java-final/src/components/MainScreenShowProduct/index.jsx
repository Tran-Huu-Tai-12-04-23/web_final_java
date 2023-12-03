import { CardMain, TextMain } from '../../components';
function MainScreenShowProduct({ data = [] }) {
    return (
        <>
            <div className="w-full grid grid-cols-4 gap-10">
                {data.length > 0 &&
                    data.map((dt, index) => {
                        return <CardMain key={index} data={dt}></CardMain>;
                    })}
            </div>
            {data.length <= 0 && (
                <div className="w-full flex justify-center items-center flex-col gap-3">
                    <img
                        src="https://i.ibb.co/FW4MfWH/Screenshot-2023-12-03-095539-removebg-preview.png"
                        className="w-30 h-30 rounded-md w-fit "
                    />
                    <TextMain>Không tìm thấy sản phẩm nào</TextMain>
                </div>
            )}
        </>
    );
}

export default MainScreenShowProduct;
