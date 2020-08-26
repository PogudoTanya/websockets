const Koa = require("koa");
const app = new Koa();
const server = require("http").createServer(app.callback());
const io = require("socket.io")(server);

io.on("connection", (socket) => {
  socket.on("set-message", (msg) => {
    socket.broadcast.emit("get-message", msg);
  });
  socket.on('typing', (username) => {
    socket.broadcast.emit('typing', username);
  });
});

server.listen(3001);