import React from 'react';
import {
  Container, Image, Row, Col,
} from 'react-bootstrap';

import notfoundImg from '../Img/notfoundImg.svg';

const NotFound = ({ t }) => (
  <Container fluid className="h-100">
    <Row className="justify-content-center align-content-center h-100">
      <Col sm={6} className="text-center">
        <Image src={notfoundImg} alt={t('notFound')} className="p-3" fluid style={{ width: '450px', height: '350px' }} />
        <h1 className="h4 text-muted">{t('notFound')}</h1>
        <p className="text-muted">
          {t('navigation')}
          {'  '}
          <a href="/">{t('navigationTo')}</a>
        </p>
      </Col>
    </Row>
  </Container>
);

export default NotFound;
