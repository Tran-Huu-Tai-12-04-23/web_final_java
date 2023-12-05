import { createContext, useContext, useState } from 'react';
import Util from '../utils/Util';

const LoginContext = createContext(null);

export default function LoginProviderApp({ children }) {
    const [account, setAccount] = useState(null);
    const logOut = () => {
        setAccount(null);
        Util.logOut();
    };
    return (
        <LoginContext.Provider
            value={{
                account,
                setAccount,
                logOut,
            }}
        >
            {children}
        </LoginContext.Provider>
    );
}

export const useLogin = () => {
    return useContext(LoginContext);
};
