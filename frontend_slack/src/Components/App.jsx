import {
  BrowserRouter, Routes, Route, Navigate,
  useLocation, Link,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import React, {
  useState, useContext, useMemo,
} from 'react';
import { Button, Navbar, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Autorization from './Autorization';
import NotFound from './NotFound';
import MyChat from './MyChat';
import AuthContext from '../Context/AuthContext';
import Registration from './Registration';

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

const LogInRoute = ({ children }) => {
  const { loggedIn } = useContext(AuthContext);
  const location = useLocation();

  return (
    loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const LogOut = ({ t }) => {
  const { loggedIn, logOut } = useContext(AuthContext);

  return (
    loggedIn ? <Button tabIndex="0" onClick={logOut}>{t('logOut')}</Button> : null
  );
};

const App = () => {
  const { t } = useTranslation();

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="h-100">
          <div className="h-100" id="chat">
            <div className="d-flex flex-column h-100">
              <Navbar className="shadow-sm navbar-expand-lg navbar-light bg-white">
                <Container>
                  <Navbar.Brand>
                    <Link className="navbar-brand" tabIndex="0" to="/">MY Hexlet Chat</Link>
                  </Navbar.Brand>
                  <LogOut t={t} />
                </Container>
              </Navbar>
              <Routes>
                <Route path="login" element={<Autorization t={t} />} />
                <Route path="/signup" element={<Registration t={t} />} />
                <Route
                  path="/"
                  element={(
                    <LogInRoute>
                      <MyChat t={t} />
                    </LogInRoute>
          )}
                />
                <Route path="*" element={<NotFound t={t} />} />
              </Routes>
              <ToastContainer />
            </div>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>

  );
};

export default App;
