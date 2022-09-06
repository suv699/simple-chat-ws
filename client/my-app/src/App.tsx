import React, { useRef, useState, FC } from 'react';
import './App.css';
import WebSocketComponent from './ws';

const App: FC<{}> = () => {
  return (
    <div>
      <h1>Hello</h1>
      <WebSocketComponent></WebSocketComponent>
    </div>
  );
};

export default App;
