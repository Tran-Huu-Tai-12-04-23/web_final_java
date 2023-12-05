import { createContext, useContext, useState } from 'react';
import { Modal } from '../components';
import { Spinner } from 'flowbite-react';

const LoadingContext = createContext(null);

export default function LoadingProviderApp({ children }) {
    const [loading, setLoading] = useState(null);

    const stopLoading = () => {
        setLoading(false);
    };
    const startLoading = () => {
        setLoading(true);
    };
    return (
        <LoadingContext.Provider
            value={{
                stopLoading,
                startLoading,
            }}
        >
            {children}
            {loading && (
                <Modal>
                    <Spinner color="pink" className="animate-spin" aria-label="Pink spinner example" />
                </Modal>
            )}
        </LoadingContext.Provider>
    );
}

export const useLoading = () => {
    return useContext(LoadingContext);
};
