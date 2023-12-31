import React from 'react';
import {
  ButtonGroup, Dropdown, Button, Nav,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { selectors } from '../Slices/channelsSlice';

const Channels = ({
  currentChannel, setCurrentChannel, setModal, t,
}) => {
  const channels = useSelector(selectors.selectAll);

  const renderFix = (channel) => (
    <Nav.Item as="li" key={channel.id} className="w-100">
      <Button
        type="button"
        className={cn('w-100', 'rounded-0', 'text-start', {
          'btn-secondary': currentChannel.id === channel.id,
          'btn-light': currentChannel.id !== channel.id,
        })}
        onClick={() => setCurrentChannel(channel)}
      >
        <span className="me-1">#</span>
        {channel.name}
      </Button>
    </Nav.Item>
  );

  const changeChannel = (channel, typeModal) => {
    setCurrentChannel(channel);
    setModal(typeModal);
  };

  const renderNew = (channel) => (
    <Nav.Item as="li" key={channel.id} className="w-100">
      <ButtonGroup className="d-flex dropdown">
        <Button
          className={cn('w-100', 'rounded-0', 'text-start', 'text-truncate', {
            'btn-secondary': currentChannel.id === channel.id,
            'btn-light': currentChannel.id !== channel.id,
          })}
          onClick={() => setCurrentChannel(channel)}
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>
        <Dropdown as={ButtonGroup} className="d-flex">
          <Dropdown.Toggle
            split
            variant="secondary"
            id="dropdown-split-basic"
            className={cn('w-100', 'rounded-0', 'text-start', {
              'btn-secondary': currentChannel.id === channel.id,
              'btn-light': currentChannel.id !== channel.id,
            })}
          >
            <span className="visually-hidden">{t('channelsManage')}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => changeChannel(channel, 'removing')}>{t('deleteButton')}</Dropdown.Item>
            <Dropdown.Item onClick={() => changeChannel(channel, 'renaming')}>{t('renameButton')}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </ButtonGroup>
    </Nav.Item>
  );

  return (
    <Nav.Item as="ul" id="channels-box" className="flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {channels.map((channel) => (
        channel.removable ? renderNew(channel) : renderFix(channel)
      ))}
    </Nav.Item>

  );
};

export default Channels;
