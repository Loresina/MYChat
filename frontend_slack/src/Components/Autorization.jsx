import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  Button, Form, Row, Col, Container, Card,
} from 'react-bootstrap';
import * as yup from 'yup';
import axios from 'axios';
import AuthContext from '../Context/Context';
import mainImg from '../Img/mainImg.svg';

const Autorization = ({ t }) => {
  console.log('Я в Autorization +++++++');
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
        .required(t('required')),
      password: yup.string()
        .required(t('required')),
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
          }
          return 'ДРУГАЯ ОШИБКА';
        });
    },
  });

  const getPasswordError = () => {
    if (formik.submitCount > 0 && !!formik.errors.password) {
      return formik.errors.password;
    }
    if (showError) {
      return t('loginMistake');
    }
    return false;
  };

  return (
    <Container className="fluid h-100 overflow-hidden rounded my-4">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Row className="d-flex align-items-center justify-content-center">
                <Col md={6}>
                  <img src={mainImg} alt="Войти" className="img-fluid p-2" />
                </Col>
                <Col md={6}>
                  <Form onSubmit={formik.handleSubmit} className="p-3">
                    <fieldset>
                      <h1 className="text-center mb-4">{t('welcome')}</h1>
                      <Form.Group className="form-floating mb-3">
                        <Form.Control
                          className="mb-2"
                          onChange={formik.handleChange}
                          value={formik.values.username}
                          placeholder="username"
                          name="username"
                          id="username"
                          autoComplete="username"
                          isInvalid={formik.submitCount > 0 && !!formik.errors.username}
                        />
                        <Form.Label htmlFor="username">Ваш ник</Form.Label>
                        <Form.Control.Feedback className="invalid-tooltip" type="invalid">
                          {formik.errors.username}
                        </Form.Control.Feedback>
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
                          isInvalid={!!getPasswordError()}
                        />
                        <Form.Label htmlFor="username">Пароль</Form.Label>
                        <Form.Control.Feedback className="invalid-tooltip" type="invalid">
                          {getPasswordError()}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Button type="submit" className="w-100">{t('welcome')}</Button>
                    </fieldset>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="p-4 bg-light">
              <div className="text-center">
                <span>Нет аккаунта? </span>
                <a href="/signup">Регистрация</a>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>

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
