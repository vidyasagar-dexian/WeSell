import React from 'react'
import { Navigate } from 'react-router-dom';
import { AuthConsumer } from '../Context/AuthContext';

const ValidateAuth = ({children}) => {
  const {isLogIn} = AuthConsumer();
  return (
    isLogIn?children:<Navigate to="/"/>
  )
}
export default ValidateAuth
