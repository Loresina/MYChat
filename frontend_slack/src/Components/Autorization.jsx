import React, {
  useState, useContext, useRef, useEffect,
} from 'react';
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
  const [showError, setShowError] = useState(false);
  const { logIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const inputFocus = useRef(null);

  useEffect(() => {
    inputFocus.current.focus();
  }, []);

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
          navigate('/');
        })
        .catch((error) => {
          if (error.name === 'AxiosError') {
            setShowError(true);
          }
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
                  <img src={mainImg} alt={t('welcome')} className="img-fluid p-2" />
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
                          ref={inputFocus}
                        />
                        <Form.Label htmlFor="username">{t('nik')}</Form.Label>
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
                        <Form.Label htmlFor="username">{t('password')}</Form.Label>
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
                <span>
                  {t('noAccount')}
                  {' '}
                </span>
                <a href="/signup">{t('registration')}</a>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>

  );
};

export default Autorization;
