import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import {
  Modal, Button, Form, FormControl, FormGroup,
} from 'react-bootstrap';
import * as yup from 'yup';
import { selectors } from '../Slices/channelsSlice';

const AddChannel = ({
  socket, setModal, t, setCurrentChannel,
}) => {
  const inputFocus = useRef(null);
  const existingChannels = useSelector(selectors.selectAll);
  const existingNames = existingChannels.map((channel) => channel.name);

  useEffect(() => {
    inputFocus.current.focus();
  }, []);

  const doAfterAddChannel = (currentChennel) => {
    setModal(null);
    toast(t('addChannelSuccess'));
    setCurrentChannel(currentChennel);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object({
      name: yup.string()
        .required(t('required'))
        .min(3, t('nameMinMax'))
        .max(20, t('nameMinMax'))
        .notOneOf(existingNames, t('uniqueName')),
    }),
    onSubmit: (values) => {
      try {
        socket.addChannel(values.name, doAfterAddChannel);
      } catch (err) {
        toast.error(t('badConnect'));
      }
    },
  });

  return (
    <Modal show centered className="fade modal show" onHide={() => setModal(null)} style={{ display: 'block' }}>
      <Modal.Header closeButton>
        <Modal.Title>{t('addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              name="name"
              id="name"
              className="mb-2"
              onChange={formik.handleChange}
              value={formik.values.name}
              ref={inputFocus}
            />
            <Form.Label htmlFor="name" className="visually-hidden">
              {t('channelsName')}
            </Form.Label>
            {formik.submitCount > 0 && formik.errors.name && (
            <p className="text-danger">{formik.errors.name}</p>
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

export default AddChannel;
