import { useContext } from 'react';
import SocketContext from '../Context/SocketContext';

const useSocket = () => useContext(SocketContext);

export default useSocket;
