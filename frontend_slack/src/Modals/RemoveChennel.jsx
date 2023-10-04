import React from 'react';
import { toast } from 'react-toastify';
import {
  Modal, Button,
} from 'react-bootstrap';
import useSocket from '../Hooks/SocketHook';

const RemoveChannel = ({
  currentChannel, setModal, t, setCurrentChannel, defoltChannel,
}) => {
  const socket = useSocket();

  const removeChannel = () => {
    try {
      socket.removeChannel(currentChannel.id, () => setModal(null));
      setCurrentChannel(defoltChannel);
      toast(t('deleteChannelSuccess'));
    } catch {
      toast.error(t('badConnect'));
    }
  };

  return (
    <Modal show centered className="fade modal show" onHide={() => setModal(null)} style={{ display: 'block' }}>
      <Modal.Header closeButton>
        <Modal.Title>{t('deleteChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('actionСonfirm')}</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={() => setModal(null)}>{t('cancelButton')}</Button>
          <Button variant="danger" onClick={() => removeChannel()}>{t('deleteButton')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
