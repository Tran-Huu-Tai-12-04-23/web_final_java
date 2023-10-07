import TextMain from '../TextMain';

function ItemSearch() {
    return (
        <div className="hover:bg-second cursor-pointer select-none p-2 max-w-[50%] rounded-xl flex h-24 scale-95 items-center justify-center">
            <img
                className="h-full rounded-lg mr-2"
                src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook_air_m22.png"
            ></img>
            <TextMain className={'truncate w-full'}>MacBook m2 pro max 64gb, 128gb</TextMain>
        </div>
    );
}

export default ItemSearch;
