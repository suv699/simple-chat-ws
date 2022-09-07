import React, {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useCallback,
  useState,
} from 'react';
import { IMessage } from '../ws/ws';
import './chat.css';
import Message from './message/message';
import User from './user/user';

interface ChatProps {
  messages: IMessage[];
  userList: string[];
  sendMessage: (message: IMessage) => void;
  currentUser: string;
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

const Chat: FC<ChatProps> = ({
  messages,
  userList,
  sendMessage,
  currentUser,
}) => {
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
          author: currentUser,
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
            <User key={user.toString()} user={user}></User>
          ))}
        </div>
        <div className="chat-message">
          <div className="chat-message-list">
            {messages.map((it) => (
              <Message
                key={it.id}
                message={it}
                formatDate={formatDate}
                inMessage={it.author !== currentUser}
              ></Message>
            ))}
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
