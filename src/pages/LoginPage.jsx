import { Button, Checkbox } from '@material-tailwind/react';
import React from 'react';
import { FaFacebookF } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import loginPage from '../assets/loginPage.jpg';
import { selectLoggedInStatus } from '../selectors/authStatusSelectors';
import authService from '../services/authService';
import { login } from '../slices/authSlice';
import { useState } from 'react';

const LoginPage = ({ setNewUser }) => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const loggedInStatus = useSelector(selectLoggedInStatus);
  const navigate = useNavigate()
  if (loggedInStatus === true) {
    navigate('/')
    return
  }



  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      const response = await authService.loginWithGoogle();

      console.log(response);
      if (response) {
        dispatch(login(response));
        setLoading(false);
        if (response.username === '') {
          setNewUser(true)

        } else {
          setNewUser(false)
          navigate('/')
        }
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">

      <div className="w-full md:w-1/2 bg-white p-8 flex flex-col justify-center items-center">
        <svg className="w-32 md:w-40 lg:w-40" viewBox="0 0 350 212.909198897464">
          <defs id="SvgjsDefs1194"></defs>
          <g id="SvgjsG1195" featurekey="e7LhAk-0" transform="matrix(7.777777777777778,0,0,7.777777777777778,81.66666666666667,-27.22222222222222)" fill="#5e63b6">
            <title xmlns="http://www.w3.org/2000/svg">bluetooth</title>
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M5.5,20.5A.5.5,0,0,1,5,20l-.4-4A7.34,7.34,0,0,1,3,11.5c0-4.41,4-8,9-8s9,3.59,9,8-4,8-9,8a10,10,0,0,1-2.67-.36L5.67,20.47A.49.49,0,0,1,5.5,20.5ZM12,4.5c-4.41,0-8,3.14-8,7a6.37,6.37,0,0,0,1.47,4,.5.5,0,0,1,.11.26l.35,3.51,3.21-1.17a.5.5,0,0,1,.31,0A9,9,0,0,0,12,18.5c4.41,0,8-3.14,8-7S16.41,4.5,12,4.5Z"
            ></path>
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M12.5,13.5a.5.5,0,0,1-.47-.33l-.81-2.32L7.72,12.59a.5.5,0,1,1-.45-.89l4-2A.5.5,0,0,1,12,10l.82,2.34,3.5-1.62a.5.5,0,0,1,.42.91l-4,1.86A.5.5,0,0,1,12.5,13.5Z"
            ></path>
          </g>
          <g id="SvgjsG1196" featurekey="Qg0WB5-0" transform="matrix(3.6450749392357733,0,0,3.6450749392357733,-3.7544288212335912,139.16933367625361)" fill="#5e63b6">
            <path d="M12.94 6.23 q0.17 0.1 0.25 0.26 t-0.03 0.38 l-1.69 2.4 q-0.11 0.17 -0.235 0.195 t-0.305 -0.085 q-0.49 -0.37 -1.08 -0.57 t-1.25 -0.2 q-0.82 0 -1.51 0.31 t-1.19 0.85 t-0.78 1.26 t-0.28 1.54 t0.28 1.535 t0.78 1.25 t1.19 0.845 t1.51 0.31 q0.66 0 1.26 -0.205 t1.09 -0.575 q0.18 -0.11 0.3 -0.09 t0.24 0.18 l1.71 2.46 q0.11 0.22 0.03 0.37 t-0.25 0.25 q-0.94 0.63 -2.025 0.975 t-2.285 0.345 q-1.06 0 -2.035 -0.27 t-1.825 -0.77 t-1.545 -1.195 t-1.195 -1.54 t-0.77 -1.82 t-0.27 -2.035 t0.27 -2.035 t0.77 -1.83 t1.195 -1.555 t1.545 -1.195 t1.825 -0.77 t2.035 -0.275 q1.2 0 2.265 0.335 t2.005 0.965 z M19.13 8.63 q0.19 -0.28 0.46 -0.555 t0.635 -0.49 t0.83 -0.35 t1.055 -0.135 q1.14 0 2.035 0.44 t1.52 1.2 t0.95 1.775 t0.325 2.165 l0 6.55 q0 0.38 -0.165 0.575 t-0.525 0.195 l-2.31 0 q-0.43 0 -0.59 -0.145 t-0.16 -0.565 l0 -6.61 q0 -0.43 -0.165 -0.8 t-0.445 -0.645 t-0.655 -0.43 t-0.795 -0.155 q-0.36 0 -0.705 0.145 t-0.62 0.41 t-0.46 0.635 t-0.215 0.82 l0 6.6 q0 0.17 -0.065 0.34 t-0.195 0.26 q-0.13 0.08 -0.245 0.11 t-0.265 0.03 l-2.26 0 q-0.43 0 -0.62 -0.21 t-0.19 -0.56 l0 -8.14 l0 -0.07 l0 -2.98 l0 -0.05 l0 -3.71 q0 -0.34 0.19 -0.55 t0.62 -0.21 l2.26 0 q0.23 0 0.51 0.16 q0.13 0.09 0.195 0.26 t0.065 0.32 l0 4.37 z M42.41 19.26 q0 0.17 -0.06 0.325 t-0.2 0.245 q-0.11 0.11 -0.26 0.14 t-0.26 0.03 l-1.97 0 q-0.21 0 -0.34 -0.055 t-0.21 -0.155 t-0.135 -0.245 t-0.115 -0.315 l-0.29 -0.75 q-0.27 0.27 -0.59 0.575 t-0.705 0.565 t-0.835 0.435 t-0.96 0.175 q-0.91 0 -1.745 -0.23 t-1.56 -0.655 t-1.315 -1.02 t-1.015 -1.325 t-0.655 -1.575 t-0.23 -1.765 q0 -1.39 0.51 -2.585 t1.39 -2.08 t2.07 -1.39 t2.55 -0.505 q0.62 0 1.14 0.185 t0.945 0.485 t0.77 0.68 t0.615 0.77 l0.39 -1.21 q0.1 -0.25 0.165 -0.405 t0.14 -0.23 t0.185 -0.1 t0.31 -0.025 l1.49 0 q0.11 0 0.26 0.03 t0.26 0.14 q0.14 0.11 0.2 0.25 t0.06 0.32 l0 11.27 z M32.56 13.66 q0 0.66 0.205 1.235 t0.585 0.995 t0.915 0.665 t1.185 0.245 q0.67 0 1.245 -0.245 t1 -0.665 t0.665 -0.995 t0.24 -1.235 q0 -0.64 -0.24 -1.22 t-0.665 -1.02 t-1 -0.695 t-1.245 -0.255 q-0.65 0 -1.185 0.255 t-0.915 0.695 t-0.585 1.02 t-0.205 1.22 z M45.58 5.32 q0 -0.31 0.205 -0.465 t0.585 -0.295 l2.27 -0.79 q0.05 -0.01 0.095 -0.01 l0.085 0 q0.37 0 0.495 0.215 t0.125 0.565 l-0.01 3.15 l1.67 0 q0.32 0 0.52 0.19 t0.2 0.57 l0 1.93 q0 0.42 -0.2 0.615 t-0.52 0.195 l-1.67 0 l0.01 8.04 q0 0.38 -0.22 0.575 t-0.61 0.195 l-2.26 0 q-0.77 0 -0.77 -0.77 l-0.01 -8.04 l-0.73 0 q-0.77 0 -0.77 -0.81 l0 -1.93 q0 -0.76 0.77 -0.76 l0.73 0 z M53.85 5.59 q0.01 -0.17 0.125 -0.305 t0.305 -0.135 l2.97 0 q0.15 0 0.31 0.125 t0.16 0.315 l0 4.74 l4.97 0 l0 -4.74 q0 -0.18 0.125 -0.31 t0.325 -0.13 l2.93 0 q0.2 0 0.35 0.1 t0.15 0.32 l0 13.99 q0 0.22 -0.13 0.33 t-0.34 0.11 l-2.96 0 q-0.2 0 -0.325 -0.11 t-0.125 -0.33 l0 -5.68 l-4.97 0 l0 5.68 q0 0.21 -0.135 0.325 t-0.365 0.115 l-2.94 0 q-0.42 0 -0.43 -0.39 l0 -14.02 z M81.21 19.83 q-0.13 0.11 -0.275 0.14 t-0.275 0.03 l-1.51 0 q-0.18 0 -0.31 -0.065 t-0.22 -0.175 t-0.15 -0.25 t-0.1 -0.29 l-0.31 -1.28 q-0.15 0.31 -0.435 0.705 t-0.725 0.74 t-1.05 0.58 t-1.4 0.235 q-1.14 0 -2.07 -0.44 t-1.585 -1.2 t-1.015 -1.775 t-0.36 -2.165 l0 -6.55 q0 -0.38 0.165 -0.575 t0.525 -0.195 l2.31 0 q0.43 0 0.59 0.145 t0.16 0.565 l0 6.51 q0 0.43 0.195 0.815 t0.515 0.68 t0.725 0.465 t0.825 0.17 q0.36 0 0.745 -0.17 t0.71 -0.455 t0.535 -0.67 t0.21 -0.815 l0 -6.5 q0 -0.17 0.065 -0.34 t0.195 -0.26 q0.13 -0.08 0.245 -0.11 t0.265 -0.03 l2.26 0 q0.43 0 0.62 0.21 t0.19 0.56 l0 11.19 q0 0.19 -0.085 0.35 t-0.235 0.25 z M87.42 19.23 q-0.09 0.19 -0.15 0.335 t-0.135 0.24 t-0.185 0.145 t-0.3 0.05 l-1.98 0 q-0.8 0 -0.8 -0.77 l0 -14.94 q0 -0.17 0.065 -0.31 t0.17 -0.24 t0.24 -0.155 t0.265 -0.055 l2.27 0 q0.38 0 0.6 0.22 t0.22 0.54 l0 4.56 q0.28 -0.3 0.6 -0.61 t0.695 -0.565 t0.825 -0.415 t1 -0.16 q1.36 0 2.505 0.505 t1.97 1.39 t1.29 2.08 t0.465 2.585 q0 1.38 -0.465 2.58 t-1.29 2.085 t-1.97 1.395 t-2.505 0.51 q-0.51 0 -0.96 -0.175 t-0.84 -0.445 t-0.72 -0.58 t-0.6 -0.58 z M93.45 13.66 q0 -0.64 -0.205 -1.22 t-0.585 -1.02 t-0.91 -0.695 t-1.19 -0.255 t-1.235 0.255 t-0.995 0.695 t-0.665 1.02 t-0.245 1.22 l0 0.14 q0.03 0.63 0.285 1.18 t0.675 0.955 t0.98 0.635 t1.2 0.23 q0.66 0 1.19 -0.245 t0.91 -0.665 t0.585 -0.995 t0.205 -1.235 z"></path>
          </g>
        </svg>

        <h2 className="text-2xl font-semibold mb-6 text-center py-5">Welcome Back, Please login to your account.</h2>
        <p className="text-gray-500 text-xs mt-4 flex items-center text-wrap break-words">
          <Checkbox defaultChecked color="blue" />
          <span>By signing up, you agree to Housy's Terms and Conditions & Privacy Policy</span>
        </p>

        <div className="flex gap-2 flex-col md:flex-row mt-5">
          <Button loading={loading} onClick={loginWithGoogle} size="lg" variant="outlined" color="blue-gray" className="flex items-center gap-3 flex-grow">
            <img src="https://docs.material-tailwind.com/icons/google.svg" alt="metamask" className="h-6 w-6 flex-grow" />
            Continue with Google
          </Button>
          <Button size="lg" variant="outlined" color="blue-gray" className="flex items-center gap-3">
            <FaFacebookF className="text-blue-400 text-xl" />
            Continue with Facebook
          </Button>
        </div>
      </div>
      <div className="hidden md:block w-1/2 bg-gradient-to-br from-purple-500 to-pink-500 flex flex-col justify-center items-center text-white  flex-shrink-0">

        <img src={loginPage} className="w-full h-full flex-shrink-0" alt="" />
      </div>
    </div>




  );
};

export default LoginPage;
