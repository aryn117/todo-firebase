import LoginGraphic from './../../assets/LoginGraphic.svg';
import { useRef, useCallback, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { useUserAuth } from '../../context/UserAuthContext';
import { setDoc, doc } from 'firebase/firestore';
import { db } from './../../context/firebase';

const SignUpPage = () => {
  const confirmEmailRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [signUpError, setError] = useState('');
  const { firebaseSignupHandler, user } = useUserAuth();
  const navigate = useNavigate();

  //? Error Handler Function //////////////////////////////////

  const setSignUpError = errorString => {
    setError(errorString);
    const timer = setTimeout(() => {
      setError('');
      return clearTimeout(timer);
    }, 3000);
  };

  //? /////////////////////////////////////////////////////////

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
      const res = await firebaseSignupHandler(
        emailRef.current.value,
        passwordRef.current.value
      );

      await setDoc(doc(db, 'Users', user?.uid), {
        lists: [
          {
            listID: '0.05712737302733828',
            title: 'Personal',
            tasks: [],
          },
        ],
        currentList: 0,
      });

      navigate('/');
    } catch (error) {
      console.log(error, error.message);
      if (error.message.indexOf('email-already-in-use') !== -1) {
        setSignUpError('You Already Have an account, Please Log in');
      }
    }
    //* Clear Inputs and Errors ///////////////////////////////////////////////
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
