//prettier-ignore
import React  from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/AuthPage/LoginPage';
import SignUpPage from './pages/AuthPage/SignUpPage';
import ProtectedRoute from './components/ProtectedRoute';
import UnprotectedRoute from './components/UnprotectedRoute';
import { UserAuthContextProvider } from './context/UserAuthContext';

function App() {
  return (
    <div className='flex flex-col items-center justify-center w-full h-full sm:h-[96%] max-w-xl mx-auto rounded-2xl  sm:shadow-2xl '>
      <UserAuthContextProvider>
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route path='/login' element={<LoginPage />} />
          <Route
            path='/signup'
            element={
              <UnprotectedRoute>
                <SignUpPage />
              </UnprotectedRoute>
            }
          />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />
        </Routes>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
