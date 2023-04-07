import { useSelector } from 'react-redux';
import { getStatusLogin } from '../../src/store/cartSlice1';
import React from 'react';
import {  Navigate } from 'react-router-dom';

const PrivateRoute = ({component: Component} ) => {
  const isAuthenticated = useSelector(getStatusLogin);
 
  return isAuthenticated ? <Component/> :<Navigate to ='/loginfb' />;
  alert('Vui lòng đăng nhập')
};

export default PrivateRoute;
                                                                                                                                                                                               