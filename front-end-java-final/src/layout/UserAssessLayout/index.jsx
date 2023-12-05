import { useEffect } from 'react';
import { useLogin } from '../../context/login';
import { useNavigate } from 'react-router-dom';

function UserAssessLayout({ children }) {
    const { account } = useLogin();
    const history = useNavigate();

    useEffect(() => {
        if (account === null) {
            history('/');
        }
    }, [account]);

    return <>{children}</>;
}

export default UserAssessLayout;
