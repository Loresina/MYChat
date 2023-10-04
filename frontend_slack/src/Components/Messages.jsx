import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectors } from '../Slices/messagesSlice';

const Messages = ({ currentChannel, setMessagesCount }) => {
  const messages = useSelector(selectors.selectAll);
  const messagesToShow = messages.filter((one) => one.channelId === currentChannel.id);

  useEffect(() => {
    setMessagesCount(messagesToShow.length);
  }, [messagesToShow]);

  return (
    messagesToShow.map((message) => (
      <div key={message.id} className="text-break mb-2">
        <b>{message.username}</b>
        {': '}
        {message.body}
      </div>
    ))
  );
};

export default Messages;
