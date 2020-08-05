const Koa = require('koa')
const app = new Koa();
const server = require('http').createServer(app.callback())
const io = require('socket.io')(server);


io.on('connection',(socket)=>{
   console.log('we are connected')
   socket.on('sendName',(name)=>{ 
   socket.name=name 
   socket.emit('name', { name: socket.name });
})
})

server.listen(3000)