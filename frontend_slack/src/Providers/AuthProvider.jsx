import React, { useMemo, useState } from 'react';
import AuthContext from '../Context/AuthContext';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('userToken'));
  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userToken');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={useMemo(
      () => ({ loggedIn, logIn, logOut }),
      [loggedIn, logIn, logOut],
    )}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
