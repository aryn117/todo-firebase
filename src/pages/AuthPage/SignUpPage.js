import LoginGraphic from './../../assets/LoginGraphic.svg';
import { useRef, useCallback, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

const SignUpPage = () => {
  const confirmEmailRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [signUpError, setSignUpError] = useState('');

  const signUpHandler = useCallback(async () => {
    //* Form Validation //////////////////////////////////////////////
    if (emailRef.current.value !== confirmEmailRef.current.value) {
      setSignUpError("Email Doesn't Match ");
      return;
    }

    if (passwordRef.current.value.length < 6) {
      setSignUpError('Password Length Must Be 6 Characters or Longer');
      return;
    }

    if (emailRef.current.value.indexOf('@') === -1) {
      setSignUpError('Enter a Valid Email');
      return;
    }

    //* SignUp Request to Firebase ////////////////////////////////////

    try {
    } catch (error) {
      setSignUpError(error.message);
    }

    //* Clear Inputs and Errors ///////////////////////////////////////////////

    setSignUpError('');
    emailRef.current.value = '';
    passwordRef.current.value = '';
    confirmEmailRef.current.value = '';
  }, []);

  return (
    <div className='flex flex-col w-full h-full  p-2 bg-[#F5FCFF]'>
      <div className='flex items-center h-[50%] w-full justify-center'>
        <img src={LoginGraphic} alt='' />
      </div>
      <form
        onSubmit={event => {
          event.preventDefault();
          signUpHandler();
        }}
        action='submit'
        className='flex flex-col flex-1 px-4 '>
        <input
          ref={emailRef}
          type='text'
          placeholder='Email'
          className='w-full px-4 py-4 border-2 border-blue-400 rounded-full shadow-xl text-md text-semibold'
        />
        <input
          ref={confirmEmailRef}
          type='text'
          placeholder='Confirm Email'
          className='w-full px-4 py-4 mt-4 border-2 border-blue-400 rounded-full shadow-xl text-md text-semibold'
        />
        <input
          ref={passwordRef}
          type='text'
          placeholder='Password'
          className='w-full px-4 py-4 mt-4 border-2 border-blue-400 rounded-full shadow-xl text-md text-semibold'
        />

        <button className='w-full px-4 py-4 mt-6 text-xl font-bold text-white bg-blue-400 border-2 border-blue-400 rounded-full shadow-xl text-md text-semibold'>
          Sign Up
        </button>
        <p className='mt-2 text-center text-red-400 text-md'>{signUpError}</p>
      </form>
      <p className='mb-6 text-center text-md'>
        Already Have an Account?
        <Link to='/login' replace>
          <span className='ml-2 text-blue-400'>Log In</span>
        </Link>
      </p>
    </div>
  );
};

export default SignUpPage;
