import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Container, Row, Col, Form, InputGroup, Button, FormControl,
} from 'react-bootstrap';
// import { useFormik } from 'formik';
import { actions as channelsActions } from '../Slices/channelsSlice';
import { setMessages } from '../Slices/messagesSlice';
import Channels from './Channels';
import Messages from './Messages';

const MyChat = () => {
  const dispatch = useDispatch();

  const getAuthHeader = () => {
    const userToken = JSON.parse(localStorage.getItem('userToken'));

    if (userToken && userToken.token) {
      return { Authorization: `Bearer ${userToken.token}` };
    }
    return {};
  };

  // const [message, setMessage] = useState('');

  const config = {
    headers: getAuthHeader(),
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/data', config);
        console.log('Это то, что пришло с сервера', response.data.channels, response.data.messages, response.data.currentChannelId);
        console.log('Я отработал, dispatch');
        const existChannels = response.data.channels;
        const newMessages = response.data.messages;
        console.log('Это existChannels', existChannels);

        dispatch(setMessages({ newMessages }));
        dispatch(channelsActions.addChannels(existChannels));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>Каналы</b>
            <button type="button" className="p-0 text-primary btn btn-group-vertical"> +++ </button>
          </div>
          <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
            <Channels />
          </ul>
        </Col>

        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0"><b># имя канала - переменная</b></p>
              <span className="text-muted">Информация о том, сколько сообщений - переменная</span>
            </div>
            <div id="messages-box" className="chat-messages overflow-auto px-5 ">
              <Messages />
            </div>
            <div className="mt-auto px-5 py-3">
              <Form noValidate className="py-1 border rounded-2">
                <InputGroup hasValidation>
                  <FormControl
                    name="body"
                    aria-label="Новое сообщение"
                    placeholder="Введите сообщение..."
                    className="border-0 p-0 ps-2"
                    // value=""
                  />
                  <Button type="submit" disabled variant="group-vertical">---</Button>
                </InputGroup>
              </Form>
            </div>
          </div>
        </Col>
      </Row>

    </Container>

  );
};

// { /* // (
// //   <div className="container-fluid">
// //     <h1 className="h4 text-muted">Здесь Чат</h1>
// //   </div>
// // ); */ }

// { /* <div className="container h-100 my-4 overflow-hidden rounded shadow">
//       <Row className="h-100 dg-white flex-md-row">
//         <Col md={4} className="border-end px-0 bg-light flex-column h-100 d-flex">
//           <h3>Первая колонка</h3>
//         </Col>
//         <Col className="p-0 h-100">
//           <div className="feedback">{values}</div>
//         </Col>
//       </Row>
//     </div> */ }

export default MyChat;
