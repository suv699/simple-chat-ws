const ws = require('ws');

const PORT = 5000;
const socket = new ws.Server(
  {
    port: PORT,
  },
  () => {
    console.log('WS connected on port ' + PORT);
  }
);

socket.on('connection', (ws) => {
  ws.on('message', (msg) => {
    socket.clients.forEach((client) => {
      client.send(msg.toString());
    });
  });
});
