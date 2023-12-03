import { createContext, useContext, useState } from 'react';

const SearchContext = createContext(null);

export default function SearchProviderApp({ children }) {
    const [key, setKey] = useState(null);

    const search = (value) => {
        setKey(value);
    };
    return (
        <SearchContext.Provider
            value={{
                key,
                search,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
}

export const useSearch = () => {
    return useContext(SearchContext);
};
