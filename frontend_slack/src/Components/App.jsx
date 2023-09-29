import {
  BrowserRouter, Routes, Route, Navigate,
  useLocation,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import React, { useState, useContext } from 'react';
import { Button, Navbar, Container } from 'react-bootstrap';
import Autorization from './Autorization';
import NotFound from './NotFound';
import MyChat from './MyChat';
import AuthContext from '../Context/Context';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('userToken'));

  console.log('!!!! loggedIn', loggedIn);

  console.log('--->>>  localStorage', localStorage.getItem('userToken'));

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userToken');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
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

const LogOut = () => {
  const { loggedIn, logOut } = useContext(AuthContext);

  return (
    loggedIn ? <Button onClick={logOut}>Log out</Button> : null
  );
};

const App = () => (
  <AuthProvider>

    <BrowserRouter>
      <Navbar className="shadow-sm navbar-expand-lg navbar-light bg-white">
        <Container>
          <Navbar.Brand>
            <a className="navbar-brand" href="/">MY Hexlet Chat</a>
          </Navbar.Brand>
          <LogOut>Log out</LogOut>
        </Container>
      </Navbar>

      <Routes>
        <Route path="login" element={<Autorization />} />
        <Route
          path="/"
          element={(
            <LogInRoute>
              <MyChat />
            </LogInRoute>
          )}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  </AuthProvider>

);

export default App;

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           LALA <code>src/App.js</code> and save to reload.
//         </p>
//         <h1>Hello, how are you?</h1>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
