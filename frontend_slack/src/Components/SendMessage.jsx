import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import {
  Form, InputGroup, Button, FormControl,
} from 'react-bootstrap';
import leoProfanity from 'leo-profanity';

const SendingMessage = ({ socket, currentChannel, t }) => {
  leoProfanity.loadDictionary('ru');
  leoProfanity.loadDictionary('en');
  const [isSending, setIsSending] = useState(false);
  const inputFocus = useRef(null);
  const { user } = JSON.parse(localStorage.getItem('userName'));

  useEffect(() => {
    inputFocus.current.focus();
  }, [currentChannel, isSending]);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: (values) => {
      setIsSending(true);
      const filteredMessage = leoProfanity.clean(values.body);
      try {
        socket.addMessage(filteredMessage, currentChannel.id, user, () => formik.setFieldValue('body', ''));
        setIsSending(false);
        console.log(filteredMessage);
      } catch (err) {
        toast.error(t('badConnect'));
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
      <InputGroup>
        <FormControl
          name="body"
          placeholder={t('addMessage')}
          aria-label="Новое сообщение"
          className="border-0 p-0 ps-2"
          onChange={formik.handleChange}
          value={formik.values.body}
          ref={inputFocus}
          disabled={isSending}
        />
        <Button type="submit" variant="group-vertical" disabled={!formik.values.body} style={{ border: 0 }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0
            2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0
            1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
            />
          </svg>
          <span className="visually-hidden">{t('submittButton')}</span>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SendingMessage;
