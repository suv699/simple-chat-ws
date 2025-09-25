import { FC } from 'react';

import './message.css';

import { IMessage } from '../../ws/ws';

interface MessageProps {
  message: IMessage;
  formatDate: (date: number) => string;
  inMessage: boolean;
}

const Message: FC<MessageProps> = ({ message, formatDate, inMessage }) => {
  return message.event !== 'message' ? (
    <div className='chat-message-item-connection' key={message.id}>
      <div className='chat-message-text'>{message.message}</div>
      <div className='chat-message-time'>{formatDate(message.id)}</div>
    </div>
  ) : (
    <div
      className='chat-message-item'
      key={message.id}
      style={{
        background: inMessage ? 'rgb(188 201 249)' : 'rgb(216, 209, 209)',
      }}
    >
      <div className='chat-message-text'>
        {message.message}
        <small> &nbsp; {message.author}</small>
      </div>
      <div className='chat-message-time'>{formatDate(message.id)}</div>
    </div>
  );
};

export default Message;
