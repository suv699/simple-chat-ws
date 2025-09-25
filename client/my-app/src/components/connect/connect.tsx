import React, { ChangeEvent, FC, useCallback, useState } from 'react';

import './connect.css';

interface ConnectProps {
  connect: (username: string) => void;
}

const Connect: FC<ConnectProps> = ({ connect }) => {
  const [userName, setUserName] = useState('');

  const changeUserName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  }, []);

  const connectAction = useCallback(() => {
    connect(userName);
  }, [userName]);

  return (
    <div className='connect-wrapper'>
      <div className='connect-container'>
        <div className='connect-title'>Enter name or nick for connect to chat.</div>
        <div className='connect-input'>
          <input type='text' value={userName} onChange={changeUserName} placeholder='Enter name or nickname' />
        </div>
        <div className='connect-btn'>
          <input type='button' value='Connect' onClick={connectAction} disabled={userName.length < 3} />
        </div>
      </div>
    </div>
  );
};

export default Connect;
