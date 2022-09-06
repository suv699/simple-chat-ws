import React, { FC, useCallback, useRef, useState } from 'react';
import Chat from '../chat/chat';
import Connect from '../connect/connect';
import './ws.css';

export interface IMessage {
  id: number;
  message: string;
  author: string;
  event: string;
}
const WebSocketComponent: FC = () => {
  const [connected, setConnected] = useState(false);
  const [username, setUserName] = useState('');
  const [messages, setMessages] = useState<IMessage[]>([]);
  const socket = useRef<WebSocket>();

  const connect = (userName: string) => {
    socket.current = new WebSocket('ws://localhost:5000');

    socket.current.onopen = () => {
      setConnected(true);
      const msg: IMessage = {
        id: Date.now(),
        event: 'connection',
        author: userName,
        message: `${userName} connect`,
      };

      socket.current?.send(JSON.stringify(msg));

      setUserName(userName);
    };

    socket.current.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      setMessages((prev) => {
        return [...prev, msg];
      });
    };

    socket.current.onclose = () => {
      setConnected(false);
    };

    socket.current.onerror = () => {
      setConnected(false);
    };
  };

  const sendMsg = useCallback((message: IMessage) => {
    socket.current?.send(JSON.stringify(message));
    return;
  }, []);

  if (!connected) {
    return <Connect connect={connect}></Connect>;
  }

  return (
    <Chat
      messages={messages}
      userList={[username]}
      sendMessage={sendMsg}
    ></Chat>

    // <div className="container">
    //   <input
    //     type="text"
    //     value={username}
    //     onChange={(e) => setUserName(e.target.value)}
    //     placeholder={connected ? 'Enter message' : 'Enter name or nickname'}
    //   />

    //   <button onClick={sendMsg}>Send</button>

    //   <hr />
    //   <div>
    //     {messages.map((it) => {
    //       return <div key={it.id}>{it.message}</div>;
    //     })}
    //   </div>
    // </div>
  );
};

export default WebSocketComponent;
