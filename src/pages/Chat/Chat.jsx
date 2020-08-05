import React from 'react';
import './Chat.css';
import Message from './components/Message';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3002', { transports: ['websocket'] });
function Chat() {
  const [name, setName] = React.useState('Bob');
  socket.emit('sendName', name);
  return (
    <div className="chat">
      <header>
        <h1>Super Chat</h1>
      </header>
      <section>
        <div id="change_username">
          <input 
           id="username"
           type="text"
           value={name}
           onChange={(e)=>{setName(e.target.value)}}
           />
          <button id="send_username" type="button">Change name</button>
        </div>
      </section>

      <section id="chatroom">
        <Message username={name} message="Help me" />
        <Message username={name} message="Help me" />
        <section id="feedback"></section>
      </section>


      <section id="input_zone">
        <input id="message" className="vertical-align" type="text"/>
        <button id="send_message" className="vertical-align" type="button">Send</button>
      </section>
    </div>
  );
}

export default Chat;
