import React, { createContext, useContext, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from './firebase';
import { useGlobalContext } from './context';

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const { user, setUser } = useGlobalContext();
  // const [user, setUser] = useState({});

  function firebaseLoginHandler(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function firebaseSignupHandler(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function firebaseLogoutHandler() {
    return signOut(auth);
  }
  function firebaseGoogleSigninHandler() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{
        user,
        firebaseLoginHandler,
        firebaseSignupHandler,
        firebaseLogoutHandler,
        firebaseGoogleSigninHandler,
      }}>
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
