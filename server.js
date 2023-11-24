const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname));
app.use(cors());

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.broadcast.emit('user joined', 'User');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    io.emit('user left', 'User');
  });
});

// Update the PORT to the appropriate port number
const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

