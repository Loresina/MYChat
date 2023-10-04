import React, { useMemo } from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import SocketContext from '../Context/SocketContext';
import { actions as channelsActions } from '../Slices/channelsSlice';
import { actions as messagesActions } from '../Slices/messagesSlice';

const socketIo = io();

export const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  //   const messages = useSelector(messagesSelectors.selectAll);

  socketIo.on('newMessage', (payload) => {
    dispatch(messagesActions.addMessage(payload));
  });

  socketIo.on('newChannel', (payload) => {
    dispatch(channelsActions.addChannel(payload));
  });

  socketIo.on('removeChannel', (payload) => {
    dispatch(channelsActions.removeChannel(payload));
  });

  socketIo.on('renameChannel', (payload) => {
    dispatch(channelsActions.renameChannel(payload));
  });

  const addMessage = (body, channelId, username, callback) => {
    socketIo.emit('newMessage', { body, channelId, username }, (response) => {
      if (response.status === 'ok') {
        callback();
      }
    });
  };

  const addChannel = (name, callback) => {
    socketIo.emit('newChannel', { name }, (response) => {
      if (response.status === 'ok') {
        callback(response.data);
      }
    });
  };

  const renameChannel = (id, name, callback) => {
    socketIo.emit('renameChannel', { id, name }, (response) => {
      if (response.status === 'ok') {
        callback();
      }
    });
  };

  const removeChannel = (id, callback) => {
    socketIo.emit('removeChannel', { id }, (response) => {
      if (response.status === 'ok') {
        callback();
      }
    });
  };

  const sockets = useMemo(() => ({
    addMessage, addChannel, renameChannel, removeChannel,
  }));

  return (
    <SocketContext.Provider value={sockets}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
