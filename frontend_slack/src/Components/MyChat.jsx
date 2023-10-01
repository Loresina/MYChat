import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Container, Row, Col, Button,
} from 'react-bootstrap';
import io from 'socket.io-client';
import { actions as channelsActions } from '../Slices/channelsSlice';
import { actions as messagesActions } from '../Slices/messagesSlice';
import Channels from './Channels';
import Messages from './Messages';
import SendingMessage from './SendMessage';
import getModal from '../Modals/index';

const MyChat = ({ t }) => {
  // console.log('Я в MyChat &&&&&&');
  const [currentChannel, setCurrentChannel] = useState({});
  const [socket, setSocket] = useState(null);
  const [typeModal, setModal] = useState(null);
  const [messagesCount, setMessagesCount] = useState(0);
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
      dispatch(channelsActions.addChannel(payload));
      setCurrentChannel(payload);
    });

    socketIo.on('removeChannel', (payload) => {
      dispatch(channelsActions.removeChannel(payload));
      setCurrentChannel(defoltChannel);
    });

    socketIo.on('renameChannel', (payload) => {
      dispatch(channelsActions.renameChannel(payload));
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
        console.log('Я НЕИЗВЕСТНАЯ ОШИБКА');
        console.error(error);
      }
    };
    fetchData();

    return () => {
      socketIo.off('newMessage');
      socketIo.off('newChannel');
      socketIo.off('removeChannel');
      socketIo.off('renameChannel');
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
          <div className="d-flex mt-1 justify-content-between align-items-center mb-2 ps-4 pe-2 p-4">
            <b>Каналы</b>
            <Button variant="group-vertical" onClick={changeModal('adding')}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
              <span className="visually-hidden">+</span>
            </Button>
          </div>
          <Channels
            setCurrentChannel={setCurrentChannel}
            currentChannel={currentChannel}
            setModal={setModal}
            t={t}
          />
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
              <span className="text-muted">{t('message', { count: messagesCount })}</span>
            </div>
            <div id="messages-box" className="chat-messages overflow-auto px-5 ">
              <Messages currentChannel={currentChannel} setMessagesCount={setMessagesCount} />
            </div>
            <div className="mt-auto px-5 py-3">
              <SendingMessage socket={socket} currentChannel={currentChannel} t={t} />
            </div>
          </div>
        </Col>
      </Row>

      {typeModal && (
      <ModalComponent
        currentChannel={currentChannel}
        socket={socket}
        setModal={setModal}
        t={t}
      />
      ) }

    </Container>

  );
};

export default MyChat;