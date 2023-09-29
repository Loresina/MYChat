import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Formik, Field, Form } from 'formik';
// useEffect, useRef,
import { useFormik } from 'formik';
import {
  Button, Form, Row, Col,
} from 'react-bootstrap';
import * as yup from 'yup';
import axios from 'axios';
import AuthContext from '../Context/Context';
import mainImg from '../Img/mainImg.svg';

const Autorization = () => {
  const [showError, setShowError] = useState(false);
  const { logIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object({
      username: yup.string()
        .required('Это поле необходимо заполнить.'),
      password: yup.string()
        .required('Это поле необходимо заполнить.'),
    }),
    onSubmit: (values) => {
      axios.post('/api/v1/login', values)
        .then((resp) => {
          logIn();
          localStorage.setItem('userToken', JSON.stringify({ token: resp.data.token }));
          localStorage.setItem('userName', JSON.stringify({ user: resp.data.username }));
          console.log('После авторизации', localStorage);
          navigate('/');
        })
        .catch((error) => {
          if (error.name === 'AxiosError') {
            setShowError(true);
            console.error('the username or password is incorrect');
          }
          return 'ДРУГАЯ ОШИБКА';
        });
    },
  });

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <Row className="d-flex align-items-center justify-content-center">
                  <Col md={6}>
                    <img src={mainImg} alt="Описание изображения" className="img-fluid p-2" />
                  </Col>
                  <Col md={6}>
                    <Form onSubmit={formik.handleSubmit} className="p-3">
                      <fieldset>
                        <h1 className="text-center mb-4">Войти</h1>
                        <Form.Group className="form-floating mb-3">
                          <Form.Control
                            className="mb-2"
                            onChange={formik.handleChange}
                            value={formik.values.username}
                            placeholder="username"
                            name="username"
                            id="username"
                            autoComplete="username"
                            isInvalid={showError}
                          />
                          <Form.Label htmlFor="username">Ваш ник</Form.Label>
                          {formik.submitCount > 0 && formik.errors.password && (
                          <p className="text-danger">{formik.errors.password}</p>
                          )}
                        </Form.Group>
                        <Form.Group className="form-floating mb-3">
                          <Form.Control
                            className="mb-2"
                            type="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            placeholder="password"
                            name="password"
                            id="password"
                            autoComplete="current-password"
                            isInvalid={showError}
                          />
                          <Form.Label htmlFor="username">Пароль</Form.Label>
                          {formik.submitCount > 0 && formik.errors.password && (
                          <p className="text-danger">{formik.errors.password}</p>
                          )}
                          <Form.Control.Feedback className="invalid-tooltip" type="invalid">Неверное имя пользователя или пароль.</Form.Control.Feedback>
                        </Form.Group>
                        <Button type="submit" className="btn btn-primary w-100">Войти</Button>
                      </fieldset>
                    </Form>
                  </Col>
                </Row>
              </div>
              <div className="card-footer p-4 bg-light">
                <div className="text-center">
                  <span>Нет аккаунта? </span>
                  <a href="/signup">Регистрация</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Autorization;

// Использование Formik как компонента
// <Formik
//         initialValues={{ nik: '', password: '' }}
//         onSubmit={(values) => {
//           console.log('HEY', values);
//         }}
//       >
//         {() => (
//           <Form>
//             <div className="form-group">
//               <label htmlFor="email">Email</label>
//               <Field
//                 type="email"
//                 name="email"
//                 className="form-control"
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="password">Password</label>
//               <Field
//                 type="password"
//                 name="password"
//                 className="form-control"
//               />
//             </div>
//             <button className="button" type="submit">Отправить</button>
//           </Form>
//         )}
//       </Formik>

// <div className="container-fluid">
//   <div className="row justify-content-center pt-5">
//     <div className="col-sm-4">
//       <img src={logo} alt="Описание изображения" className="img-fluid" />
//       <Form onSubmit={formik.handleSubmit} className="p-3">
//         <fieldset>
//           <Form.Group>
//             <Form.Control
//               className="mb-3"
//               onChange={formik.handleChange}
//               value={formik.values.username}
//               placeholder="username"
//               name="username"
//               id="username"
//               autoComplete="username"
//             />
//             {formik.submitCount > 0 && formik.errors.username && (
//             <p>{formik.errors.username}</p>
//             )}
//           </Form.Group>
//           <Form.Group>
//             <Form.Control
//               className="mb-3"
//               type="password"
//               onChange={formik.handleChange}
//               value={formik.values.password}
//               placeholder="password"
//               name="password"
//               id="password"
//               autoComplete="current-password"
//             />
//             {formik.submitCount > 0 && formik.errors.password && (
//             <p>{formik.errors.password}</p>
//             )}
//           </Form.Group>
//           <Button type="submit" className="btn btn-primary">Войти</Button>
//         </fieldset>
//       </Form>
//     </div>
//   </div>
// </div>;
