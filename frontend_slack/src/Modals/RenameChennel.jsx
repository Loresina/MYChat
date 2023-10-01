import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import {
  Modal, Button, Form, FormControl, FormGroup,
} from 'react-bootstrap';
import * as yup from 'yup';
import { selectors } from '../Slices/channelsSlice';

const RenameChannel = ({
  currentChannel, socket, setModal, t,
}) => {
  const inputFocus = useRef(null);
  const existingChannels = useSelector(selectors.selectAll);
  const existingNames = existingChannels.map((channel) => channel.name);

  useEffect(() => {
    inputFocus.current.select();
  }, []);

  const formik = useFormik({
    initialValues: {
      newName: currentChannel.name,
    },
    validationSchema: yup.object({
      newName: yup.string()
        .required(t('required'))
        .notOneOf(existingNames, t('uniqueName')),
    }),
    onSubmit: (values) => {
      socket.emit('renameChannel', { id: currentChannel.id, name: values.newName }, (response) => {
        if (response.status !== 'ok') {
          toast.error(t('badConnect'));
        } else {
          toast(t('renemeChannelSuccess'));
          setModal(null);
        }
      });
    },
  });

  return (
    <Modal show centered className="fade modal show" onHide={() => setModal(null)} style={{ display: 'block' }}>
      <Modal.Header closeButton>
        <Modal.Title>{t('renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              name="newName"
              id="newName"
              className="mb-2"
              onChange={formik.handleChange}
              value={formik.values.newName}
              ref={inputFocus}
            />
            <Form.Label htmlFor="message" className="visually-hidden">Имя канала</Form.Label>
            {formik.submitCount > 0 && formik.errors.newName && (
            <p className="text-danger">{formik.errors.newName}</p>
            )}
          </FormGroup>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2" onClick={() => setModal(null)}>{t('cancelButton')}</Button>
            <Button variant="primary" type="submit">{t('submittButton')}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;
