import React from 'react';
import {
  Container, Image, Row, Col,
} from 'react-bootstrap';

import notfoundImg from '../Img/notfoundImg.svg';

const NotFound = ({ t }) => {
  console.log('Я в NotFound +++++++');
  return (
    <Container fluid>
      <Row className="justify-content-center pt-5">
        <Col sm={6} className="text-center">
          <Image src={notfoundImg} alt="Страница не найдена" className="p-3" fluid style={{ width: '400px', height: '300px' }} />
          <h1 className="h4 text-muted">{t('notFound')}</h1>
          <p className="text-muted">
            Но вы можете перейти
            {'  '}
            <a href="/">на главную страницу</a>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
