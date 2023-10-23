function Pagination({ page, activePage, setActivePage }) {
    const numberPages = Array.from({ length: page }, (_, index) => index + 1);

    const renderPageNumber = () => {
        const displayedPages = 4; // Số trang hiển thị trước và sau trang active

        if (page <= displayedPages) {
            // Hiển thị tất cả các trang nếu có ít hơn hoặc bằng số trang được hiển thị
            return numberPages.map((stt, index) => (
                <li
                    key={index}
                    onClick={() => setActivePage(stt)}
                    className={`${
                        activePage === stt ? 'bg-gray-100 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'
                    } flex cursor-pointer items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                >
                    {stt}
                </li>
            ));
        }

        const halfDisplayedPages = Math.floor(displayedPages / 2);

        if (activePage <= halfDisplayedPages) {
            // Hiển thị các trang đầu và dấu "..." ở cuối
            const visiblePages = numberPages.slice(0, displayedPages);
            visiblePages.push('...');
            visiblePages.push(page);
            return visiblePages.map((stt, index) => {
                if (stt === '...') {
                    return (
                        <li
                            key={index}
                            className="cursor-not-allowed flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                        >
                            ...
                        </li>
                    );
                }
                return (
                    <li
                        key={index}
                        onClick={() => setActivePage(stt)}
                        className={`${
                            activePage === stt ? 'bg-gray-100 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'
                        } flex cursor-pointer items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                    >
                        {stt}
                    </li>
                );
            });
        }

        if (activePage >= page - halfDisplayedPages) {
            // Hiển thị các trang cuối và dấu "..." ở đầu
            const visiblePages = [1, '...'].concat(numberPages.slice(page - displayedPages + 1, page + 1));
            return visiblePages.map((stt, index) => {
                if (stt === '...') {
                    return (
                        <li
                            key={index}
                            className="cursor-not-allowed flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                        >
                            ...
                        </li>
                    );
                }
                return (
                    <li
                        key={index}
                        onClick={() => setActivePage(stt)}
                        className={`${
                            activePage === stt ? 'bg-gray-100 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'
                        } flex cursor-pointer items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                    >
                        {stt}
                    </li>
                );
            });
        }

        // Hiển thị các trang giữa và dấu "..." ở cả hai bên
        const visiblePages = [1, '...'].concat(
            numberPages.slice(activePage - halfDisplayedPages, activePage + halfDisplayedPages + 1),
            '...',
        );
        return visiblePages.map((stt, index) => {
            if (stt === '...') {
                return (
                    <li
                        key={index}
                        className="cursor-not-allowed flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                    >
                        ...
                    </li>
                );
            }
            return (
                <li
                    key={index}
                    onClick={() => setActivePage(stt)}
                    className={`${
                        activePage === stt ? 'bg-gray-100 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'
                    } flex cursor-pointer items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                >
                    {stt}
                </li>
            );
        });
    };

    return (
        <nav className="flex justify-center items-center w-full">
            <ul className="inline-flex -space-x-px text-sm">
                <li
                    onClick={() =>
                        setActivePage((prev) => {
                            if (prev > 1) {
                                return prev - 1;
                            }
                            return prev;
                        })
                    }
                    className="flex cursor-pointer items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                    Previous
                </li>
                {renderPageNumber()}
                <li
                    onClick={() =>
                        setActivePage((prev) => {
                            if (prev < page) {
                                return prev + 1;
                            }
                            return prev;
                        })
                    }
                    className="flex cursor-pointer items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                    Next
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;
