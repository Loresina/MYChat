import React from 'react';
// import { Formik, Field, Form } from 'formik';
import { useFormik } from 'formik';
import {
  Button, Form, Row, Col,
} from 'react-bootstrap';
import * as yup from 'yup';
import axios from 'axios';
import logo from './93.jpg';

const Autorization = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object({
      username: yup.string()
        .required('Username is required')
        .max(16, 'Username must not be more than 16 characters'),
      password: yup.string()
        .required('Password is required')
        .min(5, 'Password must have at least 6 characters')
        .max(18, 'Max password length is 18'),
    }),
    onSubmit: (values) => {
      console.log(values);
      axios.post('/api/v1/login', values)
        .then((resp) => {
          localStorage.setItem('userId', JSON.stringify({ token: resp.data.token }));
          console.log(localStorage);
        })
        .catch((error) => {
          if (error.name === 'AxiosError') {
            console.error('the username or password is incorrect');
          }
          return 'ДРУГАЯ ОШИБКА';
        });
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <Row className="d-flex align-items-center justify-content-center">
                <Col md={6}>
                  <img src={logo} alt="Описание изображения" className="img-fluid p-2" />
                </Col>
                <Col md={6}>
                  <Form onSubmit={formik.handleSubmit} className="p-3">
                    <fieldset>
                      <h1 className="text-center mb-4">Войти</h1>
                      <Form.Group className="form-floating mb-3">
                        <Form.Control
                          className="mb-4"
                          onChange={formik.handleChange}
                          value={formik.values.username}
                          placeholder="username"
                          name="username"
                          id="username"
                          autoComplete="username"
                        />
                        <Form.Label htmlFor="username">Ваш ник</Form.Label>
                        {formik.submitCount > 0 && formik.errors.username && (
                        <p>{formik.errors.username}</p>
                        )}
                      </Form.Group>
                      <Form.Group className="form-floating mb-3">
                        <Form.Control
                          className="mb-4"
                          type="password"
                          onChange={formik.handleChange}
                          value={formik.values.password}
                          placeholder="password"
                          name="password"
                          id="password"
                          autoComplete="current-password"
                        />
                        <Form.Label htmlFor="username">Пароль</Form.Label>
                        {formik.submitCount > 0 && formik.errors.password && (
                        <p>{formik.errors.password}</p>
                        )}
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
