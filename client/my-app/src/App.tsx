import React, { useRef, useState, FC } from 'react';
import './App.css';
import WebSocketComponent from './components/ws/ws';

const App: FC<{}> = () => {
  return (
    <div className="app-wrapper">
      <WebSocketComponent></WebSocketComponent>
    </div>
  );
};

export default App;
