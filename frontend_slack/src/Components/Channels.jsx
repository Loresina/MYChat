import React from 'react';
import { useSelector } from 'react-redux';
import { selectors } from '../Slices/channelsSlice';

const Channels = () => {
//   const channels = useSelector((state) => state.channelsStore.channels);
  const channels = useSelector(selectors.selectAll);
  console.log('Я в канале Channels!!!!!!', channels);

  return (
    channels.map((channel) => (
      <li key={channel.id} className="nav-item w-100">
        <button type="button" className="w-100 rounded-0 text-start btn btn-secondary">
          <span className="me-1">#</span>
          {channel.name}
        </button>
      </li>
    ))
  );
};

export default Channels;
