import { useState, Suspense, useEffect } from 'react';
import Sidebar from './Sidebar';
import { useLocation } from 'react-router-dom';
import Constants from '../../Constants';
function Account({ children }) {
    const location = useLocation();
    const [active, setActive] = useState({
        menu: 0,
        subMenu: 0,
    });

    useEffect(() => {
        const pathName = location.pathname;

        switch (pathName) {
            case Constants.ACCOUNT_INFO: {
                setActive({
                    menu: 0,
                    subMenu: 0,
                });
                break;
            }
            case Constants.ACCOUNT_ADDRESS: {
                setActive({
                    menu: 0,
                    subMenu: 1,
                });
                break;
            }
            case Constants.ACCOUNT_CHANGE_PASSWORD: {
                setActive({
                    menu: 0,
                    subMenu: 2,
                });
                break;
            }
            case Constants.ACCOUNT_ORDER: {
                setActive({
                    menu: 1,
                    subMenu: null,
                });
                break;
            }
            case Constants.ACCOUNT_NOTIFICATION: {
                setActive({
                    menu: 2,
                    subMenu: null,
                });
                break;
            }
            default: {
                setActive({
                    menu: -1,
                    subMenu: 0,
                });
            }
        }
    }, [location]);
    return (
        <div className="pt-20 pb-20 flex justify-between gap-4 max-w-screen-xl m-auto p-4">
            <Sidebar active={active} />
            <div className="w-full bg-bg-light-menu dark:bg-bg-dark-menu rounded-md">
                <Suspense fallback={<div> loading...</div>}>{children}</Suspense>
            </div>
        </div>
    );
}

export default Account;
