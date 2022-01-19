import LoginGraphic from './../assets/LoginGraphic.svg';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

import { useUserAuth } from './../auth/userAuthContext';

const LoginPage = () => {
  const [loginError, setError] = useState('');

  const { googleSignin, user } = useUserAuth();
  const navigate = useNavigate();

  const loginHandler = async () => {
    try {
      await googleSignin();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  console.log(user);

  return (
    <div className='flex flex-col w-full h-full  p-2 bg-[#F5FCFF]'>
      <div className='flex items-center h-[60%] w-full justify-center'>
        <img className=' w-[85%] md:w-2/3 ' src={LoginGraphic} alt='' />
      </div>
      <div className='flex flex-col flex-1 px-4 '>
        <p className='px-4 mb-4 text-3xl font-semibold text-blue-500'>
          Login your <span className='text-red-400'>ToDo🔥</span> Account
        </p>
        <button
          onClick={loginHandler}
          className='flex items-center justify-around w-full px-4 py-4 mt-6 mr-2 text-3xl font-bold text-center text-white border-2 border-blue-400 rounded-full shadow-xl cursor-pointer '>
          <FcGoogle className='text-4xl' />
          <p className='text-xl font-semibold text-black'>Login with Google </p>
        </button>
      </div>

      <p className='mt-2 text-center text-red-400 text-md'>{loginError}</p>
    </div>
  );
};

export default LoginPage;
