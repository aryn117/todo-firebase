import React from 'react';
import { Navigate } from 'react-router-dom';

import { useUserAuth } from '../auth/userAuthContext';

const UnprotectedRoute = ({ UnprotectedComponent }) => {
  const { user } = useUserAuth();

  if (user) {
    return <Navigate to='/' />;
  }
  return UnprotectedComponent;
};

export default UnprotectedRoute;
