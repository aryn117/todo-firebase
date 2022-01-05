import LoginGraphic from './../../assets/LoginGraphic.svg';
import { useRef, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../context/UserAuthContext';
import { FcGoogle } from 'react-icons/fc';

const LoginPage = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [loginError, setError] = useState('');

  const { firebaseLoginHandler, firebaseGoogleSigninHandler } = useUserAuth();

  const navigate = useNavigate();

  //? /////////////////////////////////////////////////////////
  //? Login Handler ///////////////////////////////////////////

  const setLoginError = ErrorString => {
    setError(ErrorString);
    const timer = setTimeout(() => {
      setError('');
      return clearTimeout(timer);
    }, 2000);
  };
  //? ///////////////////////////////////////////////////

  const loginHandler = useCallback(async event => {
    //* Form Validation //////////////////////////////////////////////

    event.preventDefault();
    if (emailRef.current.value === '' || passwordRef.current.value === '') {
      setLoginError('Email/Password Field Cannot Be Empty');
      return;
    }

    if (passwordRef.current.value.length < 6) {
      setLoginError('Password Length Must Be 6 Characters or Longer');
      return;
    }

    if (emailRef.current.value.indexOf('@') === -1) {
      setLoginError('Enter a Valid Email');
      return;
    }

    //* Login Request to Firebase //////////////////////////////////////////////

    try {
      const res = await firebaseLoginHandler(
        emailRef.current.value,
        passwordRef.current.value
      );
      navigate('/');
    } catch (error) {
      if (error.message.indexOf('wrong-password') !== -1) {
        setLoginError('Wrong Email/Password');
        return;
      }
    }

    //* Clearing Fields and Errors //////////////////////////////////////////////

    emailRef.current.value = '';
    passwordRef.current.value = '';
  }, []);

  //? /////////////////////////////////////////////////////////
  //? /////////////////////////////////////////////////////////

  return (
    <div className='flex flex-col w-full h-full  p-2 bg-[#F5FCFF]'>
      <div className='flex items-center h-[50%] w-full justify-center'>
        <img src={LoginGraphic} alt='' />
      </div>
      <div className='flex flex-col flex-1 px-4 '>
        <input
          ref={emailRef}
          type='text'
          placeholder='Email'
          className='w-full px-4 py-4 border-2 border-blue-400 rounded-full shadow-xl text-md text-semibold'
        />
        <input
          ref={passwordRef}
          type='text'
          placeholder='Password'
          className='w-full px-4 py-4 mt-6 border-2 border-blue-400 rounded-full shadow-xl text-md text-semibold'
        />

        <div className='flex flex-row-reverse '>
          <button
            onClick={loginHandler}
            className='w-full px-4 py-4 mt-6 ml-2 text-xl font-bold text-white bg-blue-400 border-2 border-blue-400 rounded-full shadow-xl text-md text-semibold'>
            Log In
          </button>
          {/* <button
            onClick={firebaseGoogleSigninHandler}
            className='w-full px-4 py-0 mt-6 mr-2 text-3xl font-bold text-center text-white border-2 border-blue-400 rounded-full shadow-xl text-md text-semibold'>
            <FcGoogle className='mx-auto ' />
          </button> */}
        </div>

        <p className='mt-2 text-center text-red-400 text-md'>{loginError}</p>
      </div>

      <p className='w-full mb-6 text-center text-md'>
        Dont't Have an Account?
        <Link to='/signup' replace>
          <span className='ml-2 text-blue-400'>Sign Up</span>
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
