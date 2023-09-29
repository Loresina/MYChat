import React from 'react';
import { useSelector } from 'react-redux';
import { selectors } from '../Slices/messagesSlice';

const Messages = ({ currentChannel }) => {
  const messages = useSelector(selectors.selectAll);
  console.log('Я в канале Messages!!!!!!', messages);

  const messagesToShow = messages.filter((one) => one.channelId === currentChannel.id);

  return (
    messagesToShow.map((message) => (
      <div key={message.id} className="text-break mb-2">
        <b>{message.username}</b>
        :
        {' '}
        {message.body}
      </div>
    ))
  );
};

export default Messages;
