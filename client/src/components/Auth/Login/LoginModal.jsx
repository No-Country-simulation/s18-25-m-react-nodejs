/* eslint-disable react/prop-types */
import auth0 from 'auth0-js';
import { DOMAIN, CLIENT_ID, REDIRECT_URI, SCOPE, AUDIENCE } from '../../../../vars';
import auth0Login from '../../../services/Auth/auth0login';

const LoginModal = ({ onClose }) => {
    const handleGoogleLogin = async () => {
        try {
            let webAuth = new auth0.WebAuth({
                domain: `${DOMAIN}`,
                clientID: `${CLIENT_ID}`
            });

            let url = webAuth.client.buildAuthorizeUrl({
                connection: 'google-oauth2',
                clientID: `${CLIENT_ID}`,
                responseType: 'code',
                redirectUri: `${REDIRECT_URI}/login`,
                scope: `${SCOPE}`,
                audience: `${AUDIENCE}`
            });

            window.location.replace(url);
        } catch (error) {
            console.error("Error during Google login:", error);
        }
    };

    return (
        <>
            <div className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-50 z-40"></div>
            <div
                id="authentication-modal"
                tabIndex="-1"
                aria-hidden="true"
                className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
            >
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Inicia Sesion con:
                            </h3>
                            <button
                                onClick={onClose}
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-hide="authentication-modal"
                            >
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Volver</span>
                            </button>
                        </div>
                        <div className="p-4 md:p-5">
                            <button
                                className="mb-4 w-full px-4 py-2 border flex justify-center items-center gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
                                onClick={auth0Login}
                            >
                                <img
                                    className="w-6 h-6"
                                    src="https://www.svgrepo.com/show/349297/auth0.svg"
                                    loading="lazy"
                                    alt="auth0 logo"
                                />
                                Login con Auth0
                            </button>
                            <button
                                className="mb-4 w-full px-4 py-2 border flex justify-center items-center gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
                                onClick={handleGoogleLogin}
                            >
                                <img
                                    className="w-6 h-6"
                                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                                    loading="lazy"
                                    alt="google logo"
                                />
                                <span>Login con Google</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginModal;
