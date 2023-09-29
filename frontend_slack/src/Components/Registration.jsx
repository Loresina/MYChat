import React, { useState, useContext } from 'react';
// import { Formik, Field, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  Button, Form, Row, Col,
} from 'react-bootstrap';
import * as yup from 'yup';
import axios from 'axios';
import registrationImg from '../Img/registrationImg.svg';
import AuthContext from '../Context/Context';

const Autorization = ({ t }) => {
  const [showError, setShowError] = useState(false);
  const { logIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object({
      username: yup.string()
        .required(t('required'))
        .min(3, t('nameMinMax'))
        .max(20, t('nameMinMax')),
      password: yup.string()
        .required(t('required'))
        .min(6, t('passwordMin', { count: 6 })),
      confirmPassword: yup.string()
        .required(t('required'))
        .oneOf([yup.ref('password')], t('passwordConfirmValid')),
    }),
    onSubmit: (values) => {
      const { username, password } = values;
      console.log('Данные', { username, password });
      axios.post('/api/v1/signup', { username, password })
        .then((resp) => {
          console.log('KKKKKKKK', resp);
          logIn();
          localStorage.setItem('userToken', JSON.stringify({ token: resp.data.token }));
          localStorage.setItem('userName', JSON.stringify({ user: resp.data.username }));
          navigate('/');
        })
        .catch((error) => {
          if (error.name === 'AxiosError' && error.response.status === 409) {
            setShowError(true);
          }
          console.log('Я ОШИБОЧКА', error);
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
                  <img src={registrationImg} alt="Описание изображения" className="img-fluid p-2" />
                </Col>
                <Col md={6}>
                  <Form onSubmit={formik.handleSubmit} className="p-3">
                    <fieldset>
                      <h1 className="text-center mb-4">{t('registration')}</h1>
                      <Form.Group className="form-floating mb-3">
                        <Form.Control
                          className="mb-3"
                          onChange={formik.handleChange}
                          value={formik.values.username}
                          placeholder="username"
                          name="username"
                          id="username"
                          autoComplete="username"
                          isInvalid={showError}
                        />
                        <Form.Label htmlFor="username">{t('nik')}</Form.Label>
                        {formik.submitCount > 0 && formik.errors.username && (
                        <p className="text-danger">{formik.errors.username}</p>
                        )}
                      </Form.Group>
                      <Form.Group className="form-floating mb-3">
                        <Form.Control
                          className="mb-3"
                          type="password"
                          onChange={formik.handleChange}
                          value={formik.values.password}
                          placeholder="password"
                          name="password"
                          id="password"
                          autoComplete="current-password"
                          isInvalid={showError}
                        />
                        <Form.Label htmlFor="password">{t('password')}</Form.Label>
                        {formik.submitCount > 0 && formik.errors.password && (
                        <p className="text-danger">{formik.errors.password}</p>
                        )}
                      </Form.Group>
                      <Form.Group className="form-floating mb-3">
                        <Form.Control
                          className="mb-3"
                          type="password"
                          onChange={formik.handleChange}
                          value={formik.values.confirmPassword}
                          placeholder="confirmPasswordd"
                          name="confirmPassword"
                          id="confirmPassword"
                          autoComplete="current-password"
                          isInvalid={showError}
                        />
                        <Form.Label htmlFor="confirmPassword">{t('passwordConfirm')}</Form.Label>
                        {formik.submitCount > 0 && formik.errors.confirmPassword && (
                          <p className="text-danger">{formik.errors.confirmPassword}</p>
                        )}
                        <Form.Control.Feedback className="invalid-tooltip" type="invalid">Неверное.</Form.Control.Feedback>
                      </Form.Group>
                      <Button type="submit" className="btn btn-primary w-100">{t('registrationButton')}</Button>
                    </fieldset>
                  </Form>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Autorization;
