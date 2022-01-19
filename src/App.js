//router imports
import { Route, Routes } from 'react-router-dom';

//pages imports
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

//component imports
import ProtectedRoute from './components/ProtectedRoute';
import UnprotectedRoute from './components/UnprotectedRoute';

function App() {
  return (
    <div className='flex flex-col items-center justify-center w-full h-full sm:h-[96%] max-w-xl mx-auto rounded-2xl  sm:shadow-2xl '>
      <Routes>
        <Route
          path='/'
          element={<ProtectedRoute ProtectedComponent={<HomePage />} />}
        />
        <Route
          path='/login'
          element={<UnprotectedRoute UnprotectedComponent={<LoginPage />} />}
        />
      </Routes>
    </div>
  );
}

export default App;
