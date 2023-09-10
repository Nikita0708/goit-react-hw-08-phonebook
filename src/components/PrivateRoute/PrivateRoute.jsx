import { LOGIN_ROUTE } from 'components/constants/routes';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUserAuthentication } from 'redux/authReducer';

export const PrivateRoute = ({ children, redirectTo = LOGIN_ROUTE }) => {
  const authenticated = useSelector(selectUserAuthentication);
  return authenticated ? children : <Navigate to={redirectTo} replace />;
};
