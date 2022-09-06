import React, { FC, useRef, useState } from 'react';

const WebSocketComponent: FC = () => {
  const [connected, setConnected] = useState(false);
  const [username, setUserName] = useState('');
  const [messages, setMessages] = useState<
    [
      {
        id?: number;
      }
    ]
  >([{}]);
  const socket = useRef<WebSocket>();

  const connect = () => {
    socket.current = new WebSocket('ws://localhost:5000');

    socket.current.onopen = () => {
      setConnected(true);
      const msg = {
        event: 'connection',
        type: 'String',
        username,
        id: Date.now(),
      };

      socket.current?.send(JSON.stringify(msg));

      setUserName('');
    };

    socket.current.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      // @ts-ignore
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

  const sendMsg = () => {
    socket.current?.send(
      JSON.stringify({
        event: 'message',
        username,
        id: Date.now(),
      })
    );

    setUserName('');
  };

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
      />
      {!connected ? (
        <button onClick={connect}>Connect</button>
      ) : (
        <button onClick={sendMsg}>Send</button>
      )}

      <hr />
      <div>
        {messages.map((it) => {
          return <div key={it.id || 1}>{it.id}</div>;
        })}
      </div>
    </div>
  );
};

export default WebSocketComponent;
