/* const app = require('express')();
const http = require('http').createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origins: "*",
  },
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  console.log('token', token);
  next();
});

app.get('/', (req, res) => {
  res.send('<h1>Hey Socket.io</h1>');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('my message', (msg) => {
    console.log('message: ' + msg);
    io.emit('my broadcast', `server: ${msg}`);
  });
});

http.listen(8080, () => {
  console.log('listening on *:8080');
}); */

const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: { origin: '*' }
});

const port = process.env.PORT || 8080;

/* io.on("connection", (socket) => {
  socket.on("private message", (message) => {
    socket.to(message.id).emit("private message", socket.id, message.mensagem);
  });
}); */

/* io.on("connection", async (socket) => {
  const users = await fetchProjects(socket);

  users.forEach(user => socket.join("user:" + user.id));

  // and then later
  io.to("user:4321").emit("user updated");
}); */

io.sockets.on('connection', (socket) => {

  /*   socket.on('create', (room) => {
      socket.join(room);
    });
  
    socket.on('addToRoom', (roomName) => {
      socket.join(roomName);
    }); */

  socket.on('message', (message) => {
    console.log("bateu back", message);
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected!');
  });
});

httpServer.listen(port, () => console.log(`listening on port ${port}`)); 