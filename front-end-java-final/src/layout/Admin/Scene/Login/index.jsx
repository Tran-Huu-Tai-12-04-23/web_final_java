import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Input } from '../../../../components';
import admin_bg from '../../../../assets/img/admin_bg.png';
import { useEffect, useState } from 'react';
import { request, setAuthHeader, setRefreshToken } from '../../../../services';
import { useLogin } from '../../../../context/login';
import Utils from '../../../../utils/Util';
import Constants from '../../../../Constants';
<<<<<<< HEAD

function Login() {
=======
import { useLoading } from '../../../../context/loadingContext';

function Login() {
    const { startLoading, stopLoading } = useLoading();
>>>>>>> main
    const history = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { account, setAccount } = useLogin();

    useEffect(() => {
        if (account?.role == true) {
            history(Constants.ADMIN);
        }
    }, [account]);

    const handleLogin = async () => {
<<<<<<< HEAD
        try {
            await request('POST', '/api/v1/auth/sign-in', {
                username,
                password,
            })
                .then((response) => {
                    const data = response.data;

                    if (!data) {
                        toast.error('Đăng nhập thất bại!!');
                        return;
                    }
                    setAuthHeader(data.jwtAuthenticationResponse.token);
                    setRefreshToken(data.jwtAuthenticationResponse.refreshToken);
                    const account = data?.data;

                    const authorities = account.authorities;
                    console.log(authorities[0].authority);

                    const role = authorities[0].authority.toString().toLowerCase() === 'admin';

                    console.log(role);
                    const accountData = {
                        ...account,
                        password: null,
                        role,
                    };
                    Utils.addLoginStorage(accountData);
                    setAccount(accountData);
                    history('/admin');
                    return Promise.resolve(true);
                })
                .catch((error) => {
                    setAuthHeader(null);
                    console.log(error);
                    return Promise.reject(error);
                });
        } catch (error) {
            return Promise.reject(error);
        }
=======
        startLoading();
        await request('POST', '/api/v1/auth/sign-in', {
            username,
            password,
        })
            .then((response) => {
                const data = response.data;

                if (!data) {
                    toast.error('Đăng nhập thất bại!!');
                    return;
                }
                setAuthHeader(data.jwtAuthenticationResponse.token);
                setRefreshToken(data.jwtAuthenticationResponse.refreshToken);
                const account = data?.data;

                const authorities = account.authorities;
                console.log(authorities[0].authority);

                const role = authorities[0].authority.toString().toLowerCase() === 'admin';

                console.log(role);
                const accountData = {
                    ...account,
                    password: null,
                    role,
                };
                Utils.addLoginStorage(accountData);
                setAccount(accountData);
                history('/admin');
                return Promise.resolve(true);
            })
            .catch((error) => {
                toast.error('Đăng nhập thất bại!!');
                setAuthHeader(null);
                console.log(error);
                return Promise.reject(error);
            });
        stopLoading();
>>>>>>> main
    };
    const login = async (e) => {
        e.preventDefault();
        if (username === '') {
            toast.error('Vui lòng nhập tài khoản!');
        } else if (password === '') {
            toast.error('Vui lòng nhập mật khẩu!');
        }
<<<<<<< HEAD
        toast.promise(handleLogin(), {
            loading: 'Đang đăng nhập...',
            success: <b>Đăng nhập thành công!</b>,
            error: <b>Đăng nhập thất bại!</b>,
        });
=======
        await handleLogin();
>>>>>>> main
    };
    return (
        <section className="h-screen max-w-screen-xl m-auto select-none">
            <div className="h-full">
                <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
                    <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                        <img src={admin_bg} className="w-full" alt="Admin image" />
                    </div>

                    <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
                        <form>
                            <div className="flex flex-row items-center justify-center lg:justify-start">
<<<<<<< HEAD
                                <p className="font-bold  font-mono mb-0 mr-4 text-xl">Chào mừng đến với trang quản lý</p>
=======
                                <p className="font-bold  font-mono mb-0 mr-4 text-xl">
                                    Chào mừng đến với trang quản lý
                                </p>
>>>>>>> main
                            </div>

                            <div className="relative mb-6 mt-5 pl-4" data-te-input-wrapper-init>
                                <label className="mb-3">Tên tài khoản</label>
                                <Input
                                    placeholder=""
                                    onChange={(e) => setUsername(e.target.value)}
                                    value={username}
                                ></Input>
                            </div>
                            <div className="relative mb-6 mt-5 pl-4" data-te-input-wrapper-init>
                                <label className="mb-3">Mật khẩu</label>
                                <Input
                                    placeholder=""
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    type="password"
                                ></Input>
                            </div>

                            <div className="text-center w-full flex justify-center items-center select-none">
                                <button
                                    className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                    onClick={login}
                                >
                                    Đăng nhập
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
