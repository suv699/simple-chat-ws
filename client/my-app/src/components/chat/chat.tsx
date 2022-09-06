import React, {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useCallback,
  useState,
} from 'react';
import { IMessage } from '../ws/ws';
import './chat.css';

interface ChatProps {
  messages: IMessage[];
  userList: string[];
  sendMessage: (message: IMessage) => void;
}
const Chat: FC<ChatProps> = ({ messages, userList, sendMessage }) => {
  const [message, setMessage] = useState('');

  const handleInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        const msg: IMessage = {
          id: Date.now(),
          event: 'message',
          author: userList[0],
          message: `${message}`,
        };
        sendMessage(msg);
        setMessage('');
      }
    },
    [message]
  );
  return (
    <div className="chat-wrapper">
      <div className="chat-container">
        <div className="chat-users">
          {userList.map((user) => (
            <div key={user.toString()} className="chat-user-list">
              {user}
            </div>
          ))}
        </div>
        <div className="chat-message">
          <div className="chat-message-list">
            {messages.map((it) => {
              return <div key={it.id}>{it.message}</div>;
            })}
          </div>
          <div className="chat-message-input">
            <input
              type="text"
              value={message}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
