import React from 'react';
import './Chat.css';
import Message from './components/Message';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001', { transports: ['websocket'] });

function Chat() {
  const [name, setName] = React.useState('');
  const [nameUser, setNameUser] = React.useState('');
  const [msg, setMsg] = React.useState('');
  const [msgUser, setMsgUser] = React.useState('');
  const [massMess, setMassMsg] = React.useState([])

  const changeUserMsg = () => {
    const msgs = {
      message: msg,
      username: name
    };
    setMassMsg((messages) => [...massMess, msg]);
    ioClient.emit('send-message', msgs);
  };
  // ()=>{...messages, msg}
  const changeUserName = () =>{
    setNameUser(name);
    // socket.emit('sendName', name);
  }

  const changeUserMsg = () =>{
    setMsgUser(msg);
    socket.emit('sendMessage', {nameUser,msgUser});
    socket.on('getMessage', (msgUser)=>{
      setMassMsg(updateMessage=[...msgUser])
    });
  }
  
  return (
    <div className="chat">
      <header>
        <h1>Super Chat</h1>
      </header>
      <section>
        <div id="change_username">
          <input 
           id = "username"
           type = "text"
           onChange = {(e)=> {setName(e.target.value)}}
           value= {name}
           />
          <button id = "send_username" type = "button" onClick = {changeUserName}>Change name</button>
        </div>
      </section>

      <section id="chatroom">

{      massMess.map((item)=>
  <Message username={item.name} message={item.msg} />
) }       
        <section id="feedback"></section>
      </section> 
      <section id="input_zone">
        <input id="message" className="vertical-align" type="text"   value= {msg}  onChange = {(e)=> {setMsg(e.target.value)}}/>
        <button id="send_message" className="vertical-align" type="button" onClick = {changeUserMsg}>Send</button>
      </section>
    </div>
  );
}

export default Chat;
