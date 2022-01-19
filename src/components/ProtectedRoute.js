import React from 'react';
import { Navigate } from 'react-router-dom';

import { useUserAuth } from '../auth/userAuthContext';

const ProtectedRoute = ({ ProtectedComponent }) => {
  const { user } = useUserAuth();

  if (!user) {
    return <Navigate to='/login' />;
  }
  return ProtectedComponent;
};

export default ProtectedRoute;
