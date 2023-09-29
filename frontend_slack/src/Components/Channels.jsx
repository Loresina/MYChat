import React from 'react';
import {
  Nav, ButtonGroup, InputGroup, Button, FormControl, Dropdown,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { selectors } from '../Slices/channelsSlice';

const Channels = ({ currentChannel, setCurrentChannel }) => {
  const channels = useSelector(selectors.selectAll);

    <ButtonGroup className="d-flex">
      <button type="button" className="w-100 rounded-0 text-start text-truncate btn btn-secondary">
        <span className="me-1">#</span>
        new
      </button>
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic" />

        <Dropdown.Menu>
          <Dropdown.Item href="#">Удалить</Dropdown.Item>
          <Dropdown.Item href="#">Переименовать</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </ButtonGroup>;

    const renderFix = (channel) => (
      <li key={channel.id} className="nav-item w-100">
        <button
          type="button"
          className={cn('w-100', 'rounded-0', 'text-start', 'btn', { 'btn-secondary': currentChannel.id === channel.id })}
          onClick={() => setCurrentChannel(channel)}
        >
          <span className="me-1">#</span>
          {channel.name}
        </button>
      </li>
    );

    const renderNew = (channel) => (
      <li key={channel.id} className="nav-item w-100">
        <ButtonGroup className="d-flex">
          <button
            type="button"
            className={cn('w-100', 'rounded-0', 'text-start', 'btn', { 'btn-secondary': currentChannel.id === channel.id })}
            onClick={() => setCurrentChannel(channel)}
          >
            <span className="me-1">#</span>
            {channel.name}
          </button>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic" />
            <Dropdown.Menu>
              <Dropdown.Item href="#">Удалить</Dropdown.Item>
              <Dropdown.Item href="#">Переименовать</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </ButtonGroup>
      </li>
    );

    return (
      <ul id="channels-box" className="flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => (
          channel.removable ? renderNew(channel) : renderFix(channel)

        ))}
      </ul>

    );
};

export default Channels;
