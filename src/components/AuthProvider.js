import React, { createContext } from 'react';
import WegoApiClient from '../api-client';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const client = new WegoApiClient('https://togetherwego.herokuapp.com/', 'Customers');

  return <AuthContext.Provider value={client}>
    {children}
  </AuthContext.Provider>
}

export default AuthProvider;
