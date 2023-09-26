import React from 'react';
import { useSelector } from 'react-redux';

const Messages = () => {
  const messages = useSelector((state) => state.messagesStore.messages);
  console.log('Я в канале Messages!!!!!!', messages);

  return (
    <p>Здесь будут сообщения</p>
  );
};

export default Messages;

// messages.map((message) => (
//     <div key={message.id} className="text-break mb-2">
//       <b>кто отправил</b>
//       : что отправил
//     </div>
//   ))
