const ws = require('ws');
const activeClients = [];
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
    // broadcastMessage(msg);
    msg = JSON.parse(msg);
    // console.log('msg - ', msg);
    switch (msg.event) {
      case 'message':
        broadcastMessage(msg);
        break;
      case 'connection':
        console.log('connection');
        activeClients.push(msg.author);
        broadcastMessage({ ...msg, activeClients });
        break;
    }
  });
  ws.on('close', (msg) => {
    console.log('CLOSE - ', msg);
  });
});

function broadcastMessage(msg) {
  socket.clients.forEach((client) => {
    client.send(JSON.stringify(msg));
  });
}
