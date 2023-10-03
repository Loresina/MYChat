import { toast } from 'react-toastify';
import {
  Modal, Button,
} from 'react-bootstrap';

const RemoveChannel = ({
  currentChannel, socket, setModal, t, setCurrentChannel,
}) => {
  const removeChannel = () => {
    try {
      socket.removeChannel(currentChannel.id, () => setModal(null));
      console.log('UUUU', setCurrentChannel);
      setCurrentChannel({ id: 1, name: 'general', removable: false });
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
