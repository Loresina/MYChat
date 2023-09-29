import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Container, Row, Col, Button,
} from 'react-bootstrap';
// import { useFormik } from 'formik';
import io from 'socket.io-client';
import { actions as channelsActions } from '../Slices/channelsSlice';
import { actions as messagesActions } from '../Slices/messagesSlice';
import Channels from './Channels';
import Messages from './Messages';
import SendingMessage from './SendMessage';
import getModal from '../Modals/index';

const MyChat = () => {
  const [currentChannel, setCurrentChannel] = useState({});
  const [socket, setSocket] = useState(null);
  const [typeModal, setModal] = useState(null);
  const dispatch = useDispatch();
  let defoltChannel = {};

  const getAuthHeader = () => {
    const userToken = JSON.parse(localStorage.getItem('userToken'));

    if (userToken && userToken.token) {
      return { Authorization: `Bearer ${userToken.token}` };
    }
    return {};
  };

  const config = {
    headers: getAuthHeader(),
  };

  useEffect(() => {
    const socketIo = io('http://localhost:3000');
    setSocket(socketIo);

    socketIo.on('newMessage', (payload) => {
      dispatch(messagesActions.addMessage(payload));
    });

    socketIo.on('newChannel', (payload) => {
      console.log('Новый канал', payload);
      dispatch(channelsActions.addChannel(payload));
      setCurrentChannel(payload);
    });

    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/data', config);
        const existChannels = response.data.channels;
        const newMessages = response.data.messages;
        [defoltChannel] = existChannels;
        dispatch(messagesActions.addMessages(newMessages));
        dispatch(channelsActions.addChannels(existChannels));
        setCurrentChannel(defoltChannel);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();

    // Функция очистки: отключаем сокет и удаляем обработчики
    return () => {
      socketIo.off('newMessage');
      socketIo.off('newChannel');
      socketIo.disconnect();
    };
  }, []);

  const changeModal = (type) => () => {
    setModal(type);
  };

  const ModalComponent = getModal(typeModal);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>Каналы</b>
            <Button className="p-0 text-primary btn btn-group-vertical" onClick={changeModal('adding')}> +++ </Button>
          </div>

          <Channels setCurrentChannel={setCurrentChannel} currentChannel={currentChannel} />

        </Col>

        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b>
                  #
                  {' '}
                  {currentChannel.name}
                </b>
              </p>
              <span className="text-muted">Информация о том, сколько сообщений - переменная</span>
            </div>
            <div id="messages-box" className="chat-messages overflow-auto px-5 ">
              <Messages currentChannel={currentChannel} />
            </div>
            <div className="mt-auto px-5 py-3">
              <SendingMessage socket={socket} currentChannel={currentChannel} />
            </div>
          </div>
        </Col>
      </Row>

      {typeModal && (
      <ModalComponent
        currentChannel={currentChannel}
        socket={socket}
        setModal={setModal}
      />
      ) }

    </Container>

  );
};

export default MyChat;
