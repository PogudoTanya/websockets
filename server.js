const Koa = require('koa')
const app = new Koa();
const server = require('http').createServer(app.callback())
const io = require('socket.io')(server);

io.on('connection',(socket)=>{

socket.on('sendMessage',(msg)=>{
   socket.msg = msg 
   socket.broadcast.emit('getMessage',{msg: socket.msg})
})
   // socket.on('sendName',( name )=>{ 
   //    socket.name = name 
   //    socket.emit('name', { name : socket.name });
   // })

   // socket.on('newMessage',( msg )=>{ 
   //    socket.msg = msg 
   //    socket.emit('msg', { msg : socket.msg });
   // })
})

server.listen(3001)