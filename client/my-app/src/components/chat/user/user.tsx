import { FC } from 'react';

import './user.css';

interface UserProps {
  user: string;
}
const User: FC<UserProps> = ({ user }) => {
  return <div className='chat-user-list'>{user}</div>;
};
export default User;
