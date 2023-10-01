import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  Button, Form, Row, Col, Container, Card,
} from 'react-bootstrap';
import * as yup from 'yup';
import axios from 'axios';
import registrationImg from '../Img/registrationImg.svg';
import AuthContext from '../Context/Context';

const Registration = ({ t }) => {
  const [showError, setShowError] = useState(false);
  const { logIn } = useContext(AuthContext);
  const navigate = useNavigate();

  // console.log('Я в Registration +++++++');

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
        .min(6, t('passwordMin')),
      confirmPassword: yup.string()
        .required(t('required'))
        .oneOf([yup.ref('password')], t('passwordConfirmValid')),
    }),
    onSubmit: (values) => {
      const { username, password } = values;
      axios.post('/api/v1/signup', { username, password })
        .then((resp) => {
          logIn();
          localStorage.setItem('userToken', JSON.stringify({ token: resp.data.token }));
          localStorage.setItem('userName', JSON.stringify({ user: resp.data.username }));
          navigate('/');
        })
        .catch((error) => {
          if (error.name === 'AxiosError' && error.response.status === 409) {
            setShowError(true);
          } else {
            console.log('Я ОШИБОЧКА', error);
          }
        });
    },
  });

  const getConfirmPasswordError = () => {
    if (formik.submitCount > 0 && !!formik.errors.confirmPassword) {
      return formik.errors.confirmPassword;
    }
    if (showError) {
      return t('userExist');
    }
    return false;
  };

  return (
    <Container className="fluid h-100 overflow-hidden rounded my-4">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <Col md={6}>
                <img src={registrationImg} alt="Регистрация" className="img-fluid p-2" />
              </Col>
              <Col md={6}>
                <Form onSubmit={formik.handleSubmit} className="w-3">
                  <fieldset>
                    <h1 className="text-center mb-4 w-2">{t('registration')}</h1>
                    <Form.Group className="form-floating mb-3">
                      <Form.Control
                        className="mb-3"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        placeholder="username"
                        name="username"
                        id="username"
                        autoComplete="username"
                        isInvalid={formik.submitCount > 0 && !!formik.errors.username}
                      />
                      <Form.Label htmlFor="username">{t('nik')}</Form.Label>
                      <Form.Control.Feedback className="invalid-tooltip" type="invalid">
                        {formik.errors.username}
                      </Form.Control.Feedback>
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
                        isInvalid={formik.submitCount > 0 && !!formik.errors.password}
                      />
                      <Form.Label htmlFor="password">{t('password')}</Form.Label>
                      <Form.Control.Feedback className="invalid-tooltip" type="invalid">
                        {formik.errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="form-floating mb-3">
                      <Form.Control
                        className="mb-3"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                        placeholder="confirmPassword"
                        name="confirmPassword"
                        id="confirmPassword"
                        autoComplete="current-password"
                        isInvalid={!!getConfirmPasswordError()}
                      />
                      <Form.Label htmlFor="confirmPassword">{t('passwordConfirm')}</Form.Label>
                      <Form.Control.Feedback className="invalid-tooltip" type="invalid">
                        {getConfirmPasswordError()}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit" className="btn btn-primary w-100">{t('registrationButton')}</Button>
                  </fieldset>
                </Form>
              </Col>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Registration;
