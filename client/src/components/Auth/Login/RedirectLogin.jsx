import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { APIDOMAIN, APIDOMAIN_VERSION } from '../../../../vars';
import { checkAuth } from '../../../services/Auth/checkAuth';
import userProfileStore from '../../../context/users/user-store';

const RedirectLogin = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { search } = location;
    const { code } = queryString.parse(search);
    const [challengesData, setChallengesData] = useState('none');
    const { fetchUserDetail } = userProfileStore();
    let bandera = true;


    useEffect(() => {
        const getUser = async () => {
            if (challengesData === 'none' && code) {
                try {
                    const response = await fetch(`${APIDOMAIN}${APIDOMAIN_VERSION}/auth/login?code=${code}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                        credentials: 'include',
                    });

                    const data = await response.json();
                    await checkAuth();

                    await fetchUserDetail();
                    
                    if (data.user.email) setChallengesData(JSON.stringify(data.user.email));

                    else setChallengesData('error');
                } catch (error) {
                    console.error(
                        'Error in the request:',
                        error.response ? error.response.data : error.message,
                    );
                    setChallengesData('error');
                }
            }
        };

        if (code && challengesData === 'none' && bandera) {
            bandera = false;
            getUser();
        }
    }, [code, challengesData]);

    const handleLoginRedirect = () => {
        navigate('/');
        window.location.reload();
    };

    return (
        <div>
            {challengesData !== 'none' && challengesData !== null && challengesData !== "error" ? (
                <div className="my-10 text-center h-[61.4vh] flex flex-col justify-center items-center">
                    <div className="text-6xl">
                        <p className="mb-4">Bienvenido!</p>
                        <p className="mb-4 text-green-700">Estas logueado</p>
                    </div>
                    <button
                        type="button"
                        className="mt-4 w-1/3 text-black bg-accents hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        onClick={handleLoginRedirect}
                    >
                        Volver al Inicio
                    </button>
                </div>
            ) : challengesData === "error" ? (
                <div className="my-10 text-center h-[61.4vh] flex flex-col justify-center items-center">
                    <div className="text-6xl">
                        <p className="mb-6">Error en el login</p>
                        <p className="mb-4">Vuelve a interntarlo</p>
                    </div>
                    <button
                        type="button"
                        className="mt-4 w-1/3 text-black bg-black hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        onClick={handleLoginRedirect}
                    >
                        Volver al Inicio
                    </button>
                </div>
            ) : (
                <div
                    role="status"
                    className="my-10 text-center flex flex-col justify-center items-center h-[57vh]"
                >
                    <svg
                        aria-hidden="true"
                        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-accents"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                        />
                    </svg>
                    <span className="sr-only">Cargando...</span>
                </div>
            )}
        </div>
    );
};

export default RedirectLogin;