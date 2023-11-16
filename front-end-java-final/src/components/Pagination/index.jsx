import { Pagination as PG } from 'flowbite-react';

export default function Pagination({ currentPage = 0, onPageChange = () => {}, totalPages = 10 }) {
    const onPageChangePG = (page) => onPageChange(page);
    return (
        <div className="flex overflow-x-auto sm:justify-center">
            <PG currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChangePG} />
        </div>
    );
}
