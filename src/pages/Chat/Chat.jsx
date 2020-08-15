import React from "react";
import "./Chat.css";
import Message from "./components/Message";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001", {
  transports: ["websocket"],
});

function Chat() {
  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("Tanya");
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState([]);

  const getUserName = (e) => setName(e.target.value);

  const changeUserName = () => {
    setUsername(name);
  }

  const getUserMessage = (e) => {
    setMessage(e.target.value);
  }

  const sendUserMessage = () => {
    const msg = {
      message,
      username,
    };
    setMessages((messages) => [...messages, msg]);
    socket.emit("set-message", msg);
  };

  React.useEffect(() => {
    socket.on("get-message", (msg) => {
      setMessages((messages) => [...messages, msg]);
    });
  }, []);



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
            name="message"
            onChange={getUserName}
          />
          <button id="send_username" type="button" onClick={changeUserName}>
            Change username
          </button>
        </div>
      </section>

      <section id="chatroom">
        {messages.map((item) => (
          <Message username={item.username} message={item.message} />
        ))}
      </section>
      <section>

      </section>
      <section id="input_zone">
        <input
          id="message"
          className="vertical-align"
          type="text"
          onChange={getUserMessage}
        />
        <button
          id="send_message"
          className="vertical-align"
          type="button"
          onClick={sendUserMessage}
        >
          Send
        </button>
      </section>
    </div>
  );
}

export default Chat;



// import React, { useEffect, useState, useCallback } from 'react';
// import openSocket from 'socket.io-client';
// import { debounce } from 'lodash';

// import Message from '../../pages/Chat/components/Message/Message';

// import './Chat.css';

// const socket = openSocket('http://localhost:3001');

// const Chat = () => {
//   const [nameInputValue, setNameInputValue] = useState('anonym');
//   const [messageInputValue, setMessageInputValue] = useState('');
//   const [userName, setUserName] = useState('anonym');
//   const [messages, setMessages] = useState([]);
//   const [typingUsers, setTypingUsers] = useState([]);

//   const handleNameChange = (value) => {
//     setUserName(value);
//   };

//   const sendMessage = (value) => {
//     socket.emit('new_message', { value, userName });
//   };

//   const handleTyping = () => {
//     socket.emit('typing', { userName });
//   };

//   const onMessage = useCallback(
//     (message) => {
//       console.log(message);
//       console.log(messages);
//       setMessages([...messages, message]);
//       console.log(messages);
//     },
//     [messages]
//   );

//   const onTyping = () => {
//         if (!typingUsers.includes(userName)) {
//           setTypingUsers([...typingUsers, userName]);
//         }
//       setTimeout(() => {
//           setTypingUsers(
//             typingUsers.filter((typingUser) => typingUser !== userName)
//           );
//         }, 3000);
//       }


//   useEffect(() => {
//     socket.emit('connect');
//     socket.on('message', onMessage);
//     socket.on('typing', onTyping);
//   }, [onMessage, onTyping]);

//   return (
//     <div className="chat">
//       <header>
//         <h1>Super Chat</h1>
//       </header>

//       <section>
//         <div id="change_username">
//           <input
//             id="username"
//             value={nameInputValue}
//             onChange={(event) => {
//               setNameInputValue(event.target.value);
//             }}
//             type="text"
//           />
//           <button
//             id="send_username"
//             onClick={() => {
//               handleNameChange(nameInputValue);
//             }}
//             type="button"
//           >
//             Change username
//           </button>
//         </div>
//       </section>

//       <section id="chatroom">
//         {messages.map((message) => (
//           <Message username={message.userName} message={message.value} />
//         ))}
//         <section id="feedback">
//           {typingUsers.map((user) => (
//             <div>{user + ' is typing'}</div>
//           ))}
//         </section>
//       </section>

//       <section id="input_zone">
//         <input
//           id="message"
//           value={messageInputValue}
//           className="vertical-align"
//           onChange={(event) => {
//             setMessageInputValue(event.target.value);
//             handleTyping();
//           }}
//           type="text"
//         />
//         <button
//           id="send_message"
//           className="vertical-align"
//           onClick={() => {
//             sendMessage(messageInputValue);
//             setMessageInputValue('');
//           }}
//           type="button"
//         >
//           Send
//         </button>
//       </section>
//     </div>
//   );
// };

// export default Chat;

