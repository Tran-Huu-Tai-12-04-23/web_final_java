import { createContext, useContext, useState } from 'react';

const LoginContext = createContext(null);

export default function LoginProviderApp({ children }) {
    const [account, setAccount] = useState(null);

    return (
        <LoginContext.Provider
            value={{
                account,
                setAccount,
            }}
        >
            {children}
        </LoginContext.Provider>
    );
}

export const useLogin = () => {
    return useContext(LoginContext);
};
