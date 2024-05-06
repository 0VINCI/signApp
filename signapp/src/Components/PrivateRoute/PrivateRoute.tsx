import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './helpers/isAuthenticated';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  return isAuthenticated() ? children : <Navigate to="/" />;
};

export default PrivateRoute;
