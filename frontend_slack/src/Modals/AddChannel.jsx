import React, { useEffect, useRef } from 'react';
// import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import {
  Modal, Button, Form, FormControl, FormGroup,
} from 'react-bootstrap';

const AddChannel = ({ currentChannel, socket, setModal }) => {
  const inputFocus = useRef(null);
  const { user } = JSON.parse(localStorage.getItem('userName'));

  useEffect(() => {
    inputFocus.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: (values) => {
      console.log('values.message', currentChannel, user);
      socket.emit('newChannel', { name: values.name });
      toast('Канал создан!');
      setModal(null);
    },
  });

  return (
    <Modal show centered className="fade modal show" onHide={() => setModal(null)} style={{ display: 'block' }}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              name="name"
              id="name"
              placeholder="Имя канала"
              className="mb-2"
              onChange={formik.handleChange}
              value={formik.values.name}
              ref={inputFocus}
            />
            <Form.Label htmlFor="name" className="visually-hidden">
              Имя канала
            </Form.Label>
            <Form.Control.Feedback type="invalid" />
          </FormGroup>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2" onClick={() => setModal(null)}>Отменить</Button>
            <Button variant="primary" type="submit">Отправить</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
