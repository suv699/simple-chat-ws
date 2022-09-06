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
// TODO move to utils
const isValidDate = (date: number) =>
  new Date(date).toString() !== 'Invalid Date';
const getFormatTitleDate = (date: number): string =>
  isValidDate(date)
    ? new Date(date).toLocaleString('ru', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        // timeZone: default_timezone,
      })
    : `${date}`;

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

  const formatDate = useCallback(getFormatTitleDate, []);
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
              return it.event !== 'message' ? (
                <div className="chat-message-item-connection" key={it.id}>
                  <div className="chat-message-text">{it.message}</div>
                  <div className="chat-message-time">{formatDate(it.id)}</div>
                </div>
              ) : (
                <div className="chat-message-item" key={it.id}>
                  <div className="chat-message-text">
                    {it.message}
                    <small> &nbsp; {it.author}</small>
                  </div>
                  <div className="chat-message-time">{formatDate(it.id)}</div>
                </div>
              );
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
